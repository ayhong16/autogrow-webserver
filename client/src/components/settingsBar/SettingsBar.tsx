import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import TimePicker from "./TimePicker";
import { query } from "../utils";

export default function SettingsBar() {
  const [currentProfile, setCurrentProfile] = useState(
    null as ProfileEntry | null
  );

  useEffect(() => {
    const getCurrentProfile = async () => {
      query<ProfileEntry>("/api/state")
        .then((response) => {
          if (response.data) {
            setCurrentProfile(response.data as ProfileEntry)
          }
        })
        .catch((error) => {
          console.error(`error: ${error}`);
        });
    };

    getCurrentProfile();
    const interval = setInterval(getCurrentProfile, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return <TimePicker currentValue={currentProfile?.start_time} label="Start" />;
}
