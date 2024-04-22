import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import ReadingsLineChart from "./ReadingsLineChart";
import axios from "axios";

export default function PastReadingsWrapper() {
  const [data, setData] = useState([] as DataEntry[]);
  const [times, setTimes] = useState([] as Date[]);

  useEffect(() => {
    const getPastReadings = async () => {
      const getData = async () => {
        const response = await axios.get("/api/past_data");
        if (response.data && response.data.length !== 0) {
          setTimes(
            response.data.map((datapoint: DataEntry) => datapoint.time)
          );
          setData(response.data as DataEntry[]);
        }
      };
      getData();
    };

    let interval = setInterval(getPastReadings, 5000); // 5 second sample interval
    getPastReadings();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ReadingsLineChart
        x={times}
        y={data.map((datapoint) => datapoint.temp)}
        title="Historical Temperatures"
        xLabel="Dates"
        yLabel="Temperature(°F)"
      />
      <ReadingsLineChart
        x={times}
        y={data.map((datapoint) => datapoint.humd)}
        title="Historical Humidity"
        xLabel="Dates"
        yLabel="Humidity(%)"
      />
      <ReadingsLineChart
        x={times}
        y={data.map((datapoint) => datapoint.ph)}
        title="Historical pH Levels"
        xLabel="Dates"
        yLabel="pH"
      ></ReadingsLineChart>
      <ReadingsLineChart
        x={times}
        y={data.map((datapoint) => (datapoint.light ? 1 : 0))}
        title="Historical Light Levels"
        xLabel="Dates"
        yLabel="Light On/Off"
      ></ReadingsLineChart>
    </>
  );
}
