from flask import Flask, request, jsonify
import psycopg2
from datetime import datetime
import os
import csv

def get_db_connection():
    return psycopg2.connect(
        dbname="environment",
        user="postgres",
        password="password",
        host="localhost",
        port="5432"
    )

def insert_sensor_data(temperature, humidity, timestamp, ph, light):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO data (time, temp, humd, ph, light) VALUES (%s, %s, %s, %s, %s)", (timestamp, temperature, humidity, ph, light))
    conn.commit()
    conn.close()

def psql_to_csv():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM data")
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    with open("./environment_data.csv", 'w', newline='') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(col_names)
        csv_writer.writerows(rows)

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
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

    @app.route('/sensor_data', methods=['POST'])
    def receive_sensor_data():
        data = request.get_json()
        temperature = round(data.get('temp'), 2)
        humidity = round(data.get('humd'), 2)
        ph = round(data.get('ph'), 2)
        light = data.get('light')
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(temperature, humidity, timestamp, ph, light)
        insert_sensor_data(temperature, humidity, timestamp, ph, light)
        return jsonify({'message': 'Sensor data received and stored successfully.'})
    return app