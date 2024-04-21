import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import TimePicker from "./TimePicker";

export default function SettingsBar() {
  const [currentProfile, setCurrentProfile] = useState(
    null as ProfileEntry | null
  );

  useEffect(() => {
    const getCurrentProfile = async () => {
      const getData = async () => {
        const response = await axios.get("/api/state");
        if (response.data) {
          setCurrentProfile(response.data as ProfileEntry);
        }
      }
      getData();
    };

    getCurrentProfile();
    const interval = setInterval(getCurrentProfile, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return <TimePicker currentValue={currentProfile?.start_time} label="Start" />;
}
