import axios from "axios";
import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import SingleReading from "./SingleReading";
import LightBackground from "../LightBackground";

export default function ReadingsWrapper() {
  const [currentReading, setCurrentReading] = useState(
    null as DataEntry | null
  );

  useEffect(() => {
    const getCurrentReading = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/current_data"
        );
        console.log(response.data);
        setCurrentReading(response.data as DataEntry);
      } catch (error) {
        console.error(`error: ${error}`);
      }
    };

    getCurrentReading();
    const interval = setInterval(getCurrentReading, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return (
    <LightBackground>
      <div className="flex flex-row justify-evenly">
        <SingleReading
          value={currentReading?.temp}
          label="Temperature"
          unit="°F"
        />
        <SingleReading value={currentReading?.humd} label="Humidity" unit="%" />
        <SingleReading value={currentReading?.ph} label="pH" />
        <SingleReading
          value={
            currentReading ? (currentReading.light ? "On" : "Off") : undefined
          }
          label="Light Status"
        />
      </div>
    </LightBackground>
  );
}
