import psycopg2
from flask import current_app


def get_db_connection():
    return psycopg2.connect(
        dbname="environment",
        user="postgres",
        password="password",
        host="localhost" if current_app.config["DEBUG"] else "postgres",
        port="5432",
    )
