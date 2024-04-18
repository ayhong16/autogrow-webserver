import contextlib
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timezone
from .data_utils import post_sensor_data, get_sensor_data, get_current_sensor_data
from .state_utils import get_state, set_schedule_state, post_state
import os
import iso8601

light_state = False
last_light_state = False


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, origins="*")
    app.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY="dev",
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

    @app.route("/api/set_schedule", methods=["POST"])
    def set_schedule(profile, start, end):
        """Change the schedule for a given profile.

        Args:
            profile (string): name of profile to modify
            start (string): in the format of HH:MM:SS, defines when to turn on the grow light
            end (string): in the format of HH:MM:SS, defines when to turn off the grow light

        Returns:
            Error or success message
        """
        data = request.get_json()
        return jsonify(set_schedule_state(data))

    @app.route("/api/state", methods=["GET"])
    def fetch_state():
        return get_state()

    @app.route("/api/state", methods=["POST"])
    def create_state():
        resp = post_state(request.get_json())
        return jsonify(resp)

    @app.route("/api/reading", methods=["POST"])
    def receive_sensor_data():
        resp = post_sensor_data(request.json)
        return jsonify(resp)

    @app.route("/api/current_data", methods=["GET"])
    def recent_data():
        return get_current_sensor_data()

    @app.route("/api/past_data/<start>/<end>", methods=["GET"])
    def data(start, end):
        try:
            start_time = iso8601.parse_date(start)
            if end:
                end_time = iso8601.parse_date(end)
            else:
                end_time = iso8601.parse_date(datetime.now(timezone.utc))
        except iso8601.ParseError:
            return (
                jsonify(
                    {
                        "error": "Invalid date format. Use ISO 8601 format: YYYY-MM-DDTHH:MM:SS"
                    }
                ),
            )
        return get_sensor_data(start_time, end_time)

    return app
