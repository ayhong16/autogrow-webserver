import contextlib
from flask import Flask, request, jsonify
from .data_utils import post_sensor_data, get_sensor_data, get_current_sensor_data
from .state_utils import get_state, post_state, change_settings
import os

last_light_state = False


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    debug_value = app.config.get("DEBUG", False)
    app.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY="dev" if debug_value else os.urandom(16),
        # store the database in the instance folder
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.update(test_config)
    # ensure the instance folder exists
    with contextlib.suppress(OSError):
        os.makedirs(app.instance_path)

    @app.after_request
    def after_request(response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type,Authorization"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"
        )
        return response
    
    @app.route("/api/update_settings", methods=["POST"])
    def update_settings():
        min_ph = request.args.get("min_ph")
        max_ph = request.args.get("max_ph")
        min_temp = request.args.get("min_temp")
        max_temp = request.args.get("max_temp")
        min_humd = request.args.get("min_humd")
        max_humd = request.args.get("max_humd")
        start = request.args.get("start")
        end = request.args.get("end")
        dht_poll = request.args.get("dht_poll_interval")
        ph_poll = request.args.get("ph_poll_interval")
        id = request.args.get("id")
        return jsonify(change_settings(id, start, end, dht_poll, ph_poll, min_ph, max_ph, min_temp, max_temp, min_humd, max_humd))

    @app.route("/api", methods=["GET", "POST"])
    def server_works():
        return "Server is up and running."

    @app.route("/api/state", methods=["GET"])
    def fetch_state():
        new_state = get_state()
        if new_state is None:
            return jsonify({"error": "No state found."})
        global last_light_state
        if new_state["light_state"] != last_light_state:
            last_light_state = new_state["light_state"]
            print(f"Light state changed to {last_light_state}")
        return jsonify(new_state)

    @app.route("/api/state", methods=["POST"])
    def create_state():
        resp = post_state(request.get_json())
        return jsonify(resp)

    @app.route("/api/current_data", methods=["GET"])
    def recent_data():
        return jsonify(get_current_sensor_data())

    @app.route("/api/reading", methods=["POST"])
    def receive_sensor_data():
        resp = post_sensor_data(request.json)
        return jsonify(resp)

    @app.route("/api/past_data", methods=["GET"])
    def data():
        start = request.args.get("start")
        end = request.args.get("end")
        return jsonify(get_sensor_data(start, end))

    @app.route("/api/memory", methods=["POST"])
    def memory():
        memory = request.get_json()
        print(memory)
        return jsonify({"success": "Memory received."})

    return app
