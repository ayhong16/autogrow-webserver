from flask import Flask, request, jsonify

from flask_cors import CORS
from datetime import datetime
from .database import insert_sensor_data, get_sensor_data
import os


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app, origins='*')
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
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/sensor_data", methods=["POST"])
    def receive_sensor_data():
        data = request.get_json()
        temperature = round(data.get("temp"), 2)
        humidity = round(data.get("humd"), 2)
        ph = round(data.get("ph"), 2)
        light = data.get("light")
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(temperature, humidity, timestamp, ph, light)
        insert_sensor_data(temperature, humidity, timestamp, ph, light)
        return jsonify({"message": "Sensor data received and stored successfully."})

    @app.route("/api/data", methods=["GET"])
    def data():
        return get_sensor_data()
    
    @app.route("/")
    def hello():
        return "Hello World"

    return app
