import LightBackground from "../LightBackground";
import axios from "axios";
import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import ReadingsLineChart from "./ReadingsLineChart";

export default function PastReadingsWrapper() {
  const [data, setData] = useState([] as DataEntry[]);
  const [times, setTimes] = useState([] as Date[]);

  useEffect(() => {
    const getPastReadings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/past_data");
        console.log(response.data);
        setData(response.data as DataEntry[]);
        setTimes(response.data.map((datapoint: DataEntry) => datapoint.time));
      } catch (error) {
        console.error(`error: ${error}`);
      }
    };

    getPastReadings();
    const interval = setInterval(getPastReadings, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return (
    <LightBackground>
      <ReadingsLineChart
        x={times}
        y={data.map((datapoint) => datapoint.temp)}
        title="Historical Temperatures"
        xLabel="Dates"
        yLabel="Temperature(°F)"
      />
    </LightBackground>
  );
}
