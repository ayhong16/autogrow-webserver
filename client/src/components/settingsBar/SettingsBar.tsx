import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import TimePicker from "./TimePicker";
import axios from "axios";
import moment from "moment";

export default function SettingsBar() {
  const [currentProfile, setCurrentProfile] = useState(
    null as ProfileEntry | null
  );
  // const [startTime, setStartTime] = useState(
  //   currentProfile?.start_time || null
  // );
  // const [endTime, setEndTime] = useState(currentProfile?.end_time || null);

  useEffect(() => {
    if (currentProfile) {
      // setStartTime(currentProfile!.start_time);
      // setEndTime(currentProfile!.end_time);
    }
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
    <div className="flex flex-col w-fit items-center border-2 border-darkGreen m-2 rounded-xl">
      <h1 className="text-darkGreen text-2xl m-2">Grow Light Schedule</h1>
      <TimePicker
        currentTime={
          currentProfile === null
            ? undefined
            : moment(currentProfile?.start_time, "HH:mm:ss")
        }
        label="Start:"
        onTimeChange={handleStartTimeChange}
      />
      <TimePicker
        currentTime={
          currentProfile === null
            ? undefined
            : moment(currentProfile?.end_time, "HH:mm:ss")
        }
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
