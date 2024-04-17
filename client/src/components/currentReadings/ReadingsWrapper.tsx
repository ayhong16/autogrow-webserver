import axios from "axios";
import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import SingleReading from "./SingleReading";

const getCurrentReading = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/reading");
    console.log(response.data);
    return response.data as DataEntry;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export default function ReadingsWrapper() {
  const [currentReading, setCurrentReading] = useState(
    null as DataEntry | null
  );

  useEffect(() => {
    getCurrentReading();
    const interval = setInterval(setCurrentReading(getCurrentReading), 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  console.log(currentReading);

  return (
    <div className="flex flex-row">
      <SingleReading value={currentReading?.temp} label={"Temperature"} />
      <SingleReading value={currentReading?.humd} label={"Humidity"} />
      <SingleReading value={currentReading?.ph} label={"pH"} />
      <SingleReading
        value={currentReading?.light ? "On" : "Off"}
        label={"Light Status"}
      />
    </div>
  );
}
