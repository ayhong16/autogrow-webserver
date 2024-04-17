import psycopg2
import csv

def _get_db_connection():
    return psycopg2.connect(
        dbname="environment",
        user="postgres",
        password="password",
        host="localhost",
        port="5432",
    )


def insert_sensor_data(temperature, humidity, timestamp, ph, light):
    conn = _get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO data (time, temp, humd, ph, light) VALUES (%s, %s, %s, %s, %s)",
        (timestamp, temperature, humidity, ph, light),
    )
    conn.commit()
    cursor.close()
    conn.close()


def get_sensor_data(start_time, end_time):
    conn = _get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM data WHERE time >= %s AND time <= %s ORDER BY time DESC;", (start_time, end_time))
    
    col_names = [desc[0] for desc in cursor.description]
    recent = []
    for row in cursor.fetchall():
        data_entry = dict(zip(col_names, row))
        recent.append(data_entry)
    
    cursor.close()
    conn.close()
    return recent


def get_current_sensor_data():
    conn = _get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM data ORDER BY time DESC LIMIT 1;")
    
    col_names = [desc[0] for desc in cursor.description]
    recent = None
    for row in cursor.fetchall():
        data_entry = dict(zip(col_names, row))
        recent = data_entry
    
    cursor.close()
    conn.close()
    return recent


def psql_to_csv():
    conn = _get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM data")
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    with open("./environment_data.csv", "w", newline="") as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(col_names)
        csv_writer.writerows(rows)