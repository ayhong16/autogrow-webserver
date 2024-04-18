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
    print(now)
    print(start_time)
    print(end_time)
    
    if start_time <= now <= end_time:
        return True
    else:
        return False
    

def _insert_state(name, start_time, end_time, ph_poll_interval, dht_poll_interval):
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
            "INSERT INTO profiles (name, start_time, end_time, ph_poll_interval, dht_poll_interval) VALUES (%s, %s, %s, %s, %s)",
            (name, start_time, end_time, ph_poll_interval, dht_poll_interval),
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"Message": "Successfully posted profile."}
    except Exception as e:
        return {f"Error {e}": "Could not post profile."}
    
    
def set_schedule_state(data):
    """Updates the start and end times for the grow light for a specified profile.

    Args:
        data: JSON object with information on profile_name, start_time, and end_time.
        
    Returns:
        dict: message of success or error
    """
    if not data:
        return {f"Error": "No JSON data provided"}

    profile = data.get("profile")
    start = data.get("start")
    end = data.get("end")

    if not (profile and start and end):
        return {f"Error": "Invalid JSON data provided"}
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Update the start_light and end_light properties for the specified profile
    try:
        cursor.execute(f"UPDATE profiles SET start_light = ?, end_light = ? WHERE name = ?;", (start, end, profile_name))
        conn.commit()
        return {"Message": "Successfully updated schedule."}
    except Exception as e:
        return {f"Error {str(e)}": "Unable to update schedule."}
    finally:
        cursor.close()
        conn.close()
    
    
def get_state():
    """Returns the current state of the profile.

    Returns:
        dict: description of the name of the current profile, the light state, and the poll intervals
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(f"SELECT * FROM profiles LIMIT 1;")
    
    col_names = [desc[0] for desc in cursor.description]
    state = None
    for row in cursor.fetchall():
        data_entry = dict(zip(col_names, row))
        state = data_entry
    
    cursor.close()
    conn.close()
    
    if not state:
        return {"Error": "No profiles available"}
    
    light_state = _interpret_light_state(state)
    return {"name": state["name"],
            "light_state": light_state,
            "ph_poll_interval": state["ph_poll_interval"],
            "dht_poll_interval": state["dht_poll_interval"]}

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
    print(name, start_light, end_light, ph_poll_interval, dht_poll_interval)
    return _insert_state(name, start_light, end_light, ph_poll_interval, dht_poll_interval)
    
    