import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import PollingOptions from "./PollingOptions";

export default function SettingsBar() {
  const [currentProfile, setCurrentProfile] = useState(
    null as ProfileEntry | null
  );

  useEffect(() => {
    const getCurrentProfile = async () => {
      try {
        const response = await axios.get("/api/state");
        console.log(response.data);
        setCurrentProfile(response.data as ProfileEntry);
      } catch (error) {
        console.error(`error: ${error}`);
      }
    };

    getCurrentProfile();
    const interval = setInterval(getCurrentProfile, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return <PollingOptions currentValue={currentProfile?.start_time} />;
}
