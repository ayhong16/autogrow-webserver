from .db_connection import get_db_connection
from datetime import datetime

def _interpret_light_state(state):
    
    now = datetime.now().replace(year=1900, month=1, day=1, microsecond=0)
    start_light = datetime.strptime(state["start_light"], '1900-1-1 %H:%M:%S')
    end_light = datetime.strptime(state["end_light"], '1900-1-1 %H:%M:%S')
    if start_light <= now <= end_light:
        return True
    else:
        return False
    
    
def set_schedule_state(profile_name, start, end):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM profiles WHERE name = {profile_name};")
    
    

def get_state():
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
        return {"Error: No profiles available"}
    
    light_state = _interpret_light_state(state)
    return {"name": state["name"],
            "light_state": light_state,
            "phPollInterval": state["phPollInterval"],
            "dhtPollInterval": state["dhtPollInterval"]}

def post_state(state):
    name = state.get("name")
    start_light = state.get("start_light")
    end_light = state.get("end_light")
    phPollInterval = state.get("phPollInterval")
    dhtPollInterval = state.get("dhtPollInterval")
    resp = _insert_state(name, start_light, end_light, phPollInterval, dhtPollInterval)
    if resp == {"Error: Could not post profile."}:
        return resp
    else:
        return {"message": "Profile received and stored successfully."}
    
def _insert_state(name, start_light, end_light, phPollInterval, dhtPollInterval):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO profiles (name, start_light, end_light, phPollInterval, dhtPollInterval) VALUES (%s, %s, %s, %s, %s, %s)",
            (name, start_light, end_light, phPollInterval, dhtPollInterval),
        )
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        return {"Error: Could not post profile."}
    
    