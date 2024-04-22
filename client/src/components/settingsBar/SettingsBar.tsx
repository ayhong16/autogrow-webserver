import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import TimePicker from "./TimePicker";
import axios from "axios";
import moment from "moment";
import LightBackground from "../LightBackground";

export default function SettingsBar() {
  const [currentProfile, setCurrentProfile] = useState(
    null as ProfileEntry | null
  );

  useEffect(() => {
    console.log("currentProfile: ", currentProfile);
  }, [currentProfile]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/state");
      if (response.data) {
        console.log(response.data);
        setCurrentProfile(response.data as ProfileEntry);
      }
    };

    getData();
  }, []);

  const handleApplyButtonClick = () => {
    const queryParams = {
      start: currentProfile?.start_time,
      end: currentProfile?.end_time,
      name: currentProfile?.name || "",
    };
    console.log("queryParams", queryParams);
    const postData = async () => {
      const response = await axios.post("/api/set_schedule", null, {
        params: queryParams,
      });
      console.log(response.data);
    };
    postData();
  };

  const handleStartTimeChange = (newStartTime: string) => {
    setCurrentProfile((prev) => ({
      ...prev!,
      start_time: newStartTime,
    }));
  };

  const handleEndTimeChange = (newEndTime: string) => {
    setCurrentProfile((prev) => ({
      ...prev!,
      end_time: newEndTime,
    }));
  };

  return (
    <LightBackground>
      <h2 className="text-4xl font-medium text-center text-darkGreen my-4">
        Settings
      </h2>
      <div className="flex flex-col items-center gap-4 w-full">
        <h3 className="text-darkGreen text-2xl m-2">Grow Light Schedule</h3>
        <div className="flex flex-col gap-2">
          <TimePicker
            currentTime={
              currentProfile === null
                ? undefined
                : moment(currentProfile?.start_time, "HH:mm:ss")
            }
            label="Start"
            onTimeChange={handleStartTimeChange}
          />
          <TimePicker
            currentTime={
              currentProfile === null
                ? undefined
                : moment(currentProfile?.end_time, "HH:mm:ss")
            }
            label="End"
            onTimeChange={handleEndTimeChange}
          />
        </div>
        <button
          className="bg-darkGreen text-white text-xl px-4 py-2 rounded-xl self-end hover:scale-105 transition-transform ease-in-out duration-15x0"
          onClick={handleApplyButtonClick}
        >
          Apply
        </button>
      </div>
    </LightBackground>
  );
}
