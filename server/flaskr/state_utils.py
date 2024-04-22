from .db_connection import get_db_connection
from datetime import datetime


def _interpret_light_state(state):
    """Determine if the grow light should be on or off based on the current time.

    Args:
        state (dict): description of the current profile containing information on the
        grow light schedule

    Returns:
        bool: whether the grow light should be on or off
    """
    if not state or not state.get("start_time") or not state.get("end_time"):
        return False

    now = datetime.now().replace(microsecond=0).time()
    start_time = state["start_time"]
    end_time = state["end_time"]
    # Check if the start time is later than the end time (e.g., from 5 PM to 5 AM)
    if start_time > end_time:
        # If the current time is before midnight, it's within the interval
        if now < end_time or now >= start_time:
            return True
    elif start_time <= now <= end_time:
        return True

    return False


def _insert_state(name, start_time, end_time, ph_poll_interval, dht_poll_interval, 
                  min_ph, max_ph, min_temp, max_temp, min_humd, max_humd):
    """Inserts a new profile into the database.

    Args:
        name (string): name of profile
        start_light (string): in the format HH:MM:SS, defines when to turn on the grow light
        end_light (string): in the format HH:MM:SS, defines when to turn off the grow light
        ph_poll_interval (int): defines how often the ESP32 should poll the pH sensor
        dht_poll_interval (int): defines how often the ESP32 should poll the DHT11 sensor

    Returns:
        dict: Error or success message
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO profiles (name, start_time, end_time, ph_poll_interval, dht_poll_interval, "
            "min_ph, max_ph, min_temp, max_temp, min_humd, max_humd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (name, start_time, end_time, ph_poll_interval, dht_poll_interval, 
             min_ph, max_ph, min_temp, max_temp, min_humd, max_humd),
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"Message": "Successfully posted profile."}
    except Exception as e:
        return {f"Error {e}": "Could not post profile."}


def get_state():
    """Returns the current state of the profile.

    Returns:
        dict: description of the name of the current profile, the light state, and the poll intervals
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM profiles LIMIT 1;")

    col_names = [desc[0] for desc in cursor.description]
    state = None
    for row in cursor.fetchall():
        data_entry = dict(zip(col_names, row))
        state = data_entry

    cursor.close()
    conn.close()

    if not state:
        return None

    light_state = _interpret_light_state(state)
    return {
        "id": state["id"],
        "name": state["name"],
        "start_time": state["start_time"].strftime("%H:%M:%S"),
        "end_time": state["end_time"].strftime("%H:%M:%S"),
        "light_state": light_state,
        "ph_poll_interval": state["ph_poll_interval"],
        "dht_poll_interval": state["dht_poll_interval"],
    }


def post_state(state):
    """Receives a profile state and stores it in the database.

    Args:
        state (dict): describes the profile to be stored in the database including the
        grow light schedule, polling intervals, and name.

    Returns:
        dict: _description_
    """
    name = state.get("name")
    start_light = state.get("start_time")
    end_light = state.get("end_time")
    ph_poll_interval = state.get("ph_poll_interval")
    dht_poll_interval = state.get("dht_poll_interval")
    min_ph = state.get("min_ph")
    max_ph = state.get("max_ph")
    min_temp = state.get("min_temp")
    max_temp = state.get("max_temp")
    min_humd = state.get("min_humd")
    max_humd = state.get("max_humd")
    return _insert_state(
        name, start_light, end_light, ph_poll_interval, dht_poll_interval, 
        min_ph, max_ph, min_temp, max_temp, min_humd, max_humd
    )
    
def change_settings(id, start_time, end_time, dht_poll_interval, ph_poll_interval,
                     min_ph, max_ph, min_temp, max_temp, min_humd, max_humd):
    """Updates the ideal ranges for pH, temperature, and humidity for a specified profile."""
    if not id:
        return {f"Error": "No profile selected to update."}
    if (not start_time and not end_time and not dht_poll_interval and not ph_poll_interval and not min_ph 
        and not max_ph and not min_temp and not max_temp and not min_humd and not max_humd):
        return {f"Error": "No values provided to update."}
    
    conn = get_db_connection()
    cursor = conn.cursor()

    # Update the start_light and end_light properties for the specified profile
    try:
        var_map = {
            "min_ph": min_ph,
            "max_ph": max_ph,
            "min_temp": min_temp,
            "max_temp": max_temp,
            "min_humd": min_humd,
            "max_humd": max_humd,
            "start_time": start_time,
            "end_time": end_time,
            "dht_poll_interval": dht_poll_interval,
            "ph_poll_interval": ph_poll_interval
        }
        for key, value in var_map.items():
            if value:
                cursor.execute(f"UPDATE profiles SET {key} = %s WHERE id = %s;", (value, id))
        conn.commit()
        return {"Message": "Successfully updated settings."}
    except Exception as e:
        return {f"Error {str(e)}": "Unable to update ideal ranges."}
    finally:
        cursor.close()
        conn.close()
