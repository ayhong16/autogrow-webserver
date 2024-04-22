import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import CurrentReading from "./SingleReading";
import LightBackground from "../LightBackground";
import axios from "axios";

export default function CurrentReadingsWrapper() {
  const [currentReading, setCurrentReading] = useState(
    null as DataEntry | null
  );
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/current_data");
      setCurrentReading(response.data);
    };
    getData();
    const interval = setInterval(getData, 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return (
		<LightBackground>
			<div className="flex flex-col items-center gap-8 w-full">
				<h2 className="text-4xl font-medium text-center text-darkGreen">
					Current Readings
				</h2>
				<div className="flex md:flex-row flex-col items-center w-full justify-evenly">
					<CurrentReading
						value={currentReading?.temp}
						label="Temperature"
						unit="°C"
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
