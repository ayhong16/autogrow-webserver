import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import TimePicker from "./TimePicker";
import axios from "axios";

export default function SettingsBar() {
  const [currentProfile, setCurrentProfile] = useState(
    null as ProfileEntry | null
  );
  const [startTime, setStartTime] = useState(
    currentProfile?.start_time || "00:00:00"
  );
  const [endTime, setEndTime] = useState(
    currentProfile?.end_time || "00:00:00"
  );

  useEffect(() => {
    const getCurrentProfile = async () => {
      const getData = async () => {
        const response = await axios.get("/api/state");
        if (response.data) {
          setCurrentProfile(response.data as ProfileEntry);
        }
      };
      getData();
    };

    getCurrentProfile();
    const interval = setInterval(getCurrentProfile, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  const handleApplyButtonClick = () => {
    const params: Record<string, string> = {
      start: startTime,
      end: endTime,
      profile_name: currentProfile?.name || "",
    };
    const postData = async (params: any) => {
      const response = await axios.post("/api/set_schedule", params);
      console.log(response.data);
    };
    postData(params);
  };

  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime);
  };

  const handleEndTimeChange = (newEndTime: string) => {
    setEndTime(newEndTime);
  };

  return (
    <div className="flex flex-col w-fit items-center border-2 border-darkGreen m-2 rounded-xl">
      <h1 className="text-darkGreen text-2xl m-2">Grow Light Schedule</h1>
      <TimePicker
        currentValue={currentProfile?.start_time}
        label="Start:"
        onTimeChange={handleStartTimeChange}
      />
      <TimePicker
        currentValue={currentProfile?.end_time}
        label="End:"
        onTimeChange={handleEndTimeChange}
      />
      <button
        className="bg-darkGreen text-white text-sm p-1 m-1 rounded-md self-end"
        onClick={handleApplyButtonClick}
      >
        Apply
      </button>
    </div>
  );
}
