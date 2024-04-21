from datetime import datetime
from .db_connection import get_db_connection


def post_sensor_data(data):
    temperature = round(data.get("temp"), 2)
    humidity = round(data.get("humd"), 2)
    ph = round(data.get("ph"), 2)
    light = data.get("light")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return _insert_sensor_data(temperature, humidity, timestamp, ph, light)


def _insert_sensor_data(temperature, humidity, timestamp, ph, light):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO data (time, temp, humd, ph, light) VALUES (%s, %s, %s, %s, %s)",
            (timestamp, temperature, humidity, ph, light),
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"Message": "Sensor data received and stored successfully."}
    except Exception as e:
        return {"Error: Could not post sensor data."}


def get_sensor_data(start_time, end_time):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        if start_time is None or end_time is None:
            cursor.execute("SELECT * FROM data ORDER BY time DESC;")
        else:
            start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
            end_time = datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S")
            cursor.execute(
                "SELECT * FROM data WHERE time >= %s AND time <= %s ORDER BY time DESC;",
                (start_time, end_time),
            )
        col_names = [desc[0] for desc in cursor.description]
        data = []
        for row in cursor.fetchall():
            data_entry = dict(zip(col_names, row))
            data.append(data_entry)
        if not data:
            return {"Error": "No data available"}
        return data
    except Exception as e:
        return {"Error": f"Could not retrieve data. {str(e)}"}
    finally:
        cursor.close()
        conn.close()
    return data


def get_current_sensor_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM data ORDER BY time DESC LIMIT 1;")

    col_names = [desc[0] for desc in cursor.description]
    recent = None
    for row in cursor.fetchall():
        data_entry = dict(zip(col_names, row))
        recent = data_entry

    cursor.close()
    conn.close()

    print("data", recent)

    return {"Error": "No data available"} if not recent else recent
