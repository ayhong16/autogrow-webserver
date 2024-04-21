import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import CurrentReading from "./SingleReading";
import LightBackground from "../LightBackground";
import { getQuery } from "../utils";

export default function CurrentReadingsWrapper() {
  const [currentReading, setCurrentReading] = useState(
    null as DataEntry | null
  );
  useEffect(() => {
    getQuery<DataEntry>("/api/current_data").then((response) => {
      setCurrentReading(response.data);
    });
    const interval = setInterval(
      () =>
        getQuery<DataEntry>("/api/current_data").then((response) => {
          setCurrentReading(response.data);
        }),
      5000
    ); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return (
    <LightBackground>
      <div className="flex flex-col items-center gap-8 w-full">
        <h1 className="text-4xl font-medium text-center text-darkGreen">
          Current Readings
        </h1>
        <div className="flex flex-row w-full justify-evenly">
          <CurrentReading
            value={currentReading?.temp}
            label="Temperature"
            unit="°F"
          />
          <CurrentReading
            value={currentReading?.humd}
            label="Humidity"
            unit="%"
          />
          <CurrentReading value={currentReading?.ph} label="pH" />
          <CurrentReading
            value={
              currentReading ? (currentReading.light ? "On" : "Off") : undefined
            }
            label="Light Status"
          />
        </div>
      </div>
    </LightBackground>
  );
}
