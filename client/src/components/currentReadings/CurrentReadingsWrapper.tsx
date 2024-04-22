import { useState, useEffect } from "react";
import { DataEntry } from "../../types/Data";
import CurrentReading from "./SingleReading";
import LightBackground from "../LightBackground";
import axios from "axios";

export default function CurrentReadingsWrapper() {
  const [currentReading, setCurrentReading] = useState(
    null as DataEntry | null
  );
	const [state, setState] = useState(null as any | null);
	useEffect(() => {
		const getCurrentData = async () => {
			const response = await axios.get("/api/current_data");
			setCurrentReading(response.data);
		};
		const getState = async () => {
			const response = await axios.get("/api/state");
			setState(response.data);
		};
		getCurrentData();
		getState();
		const interval = setInterval(getCurrentData, 5000); // 5 second sample interval
		return () => clearInterval(interval);
	}, []);

	return (
		<LightBackground>
			<div className="flex flex-col items-center gap-8 w-full">
				<h2 className="text-4xl font-medium text-center text-darkGreen">
					Current Readings
				</h2>
				<div className="flex lg:flex-row flex-col items-center w-full justify-evenly">
					<CurrentReading
						min={state?.min_temp}
						max={state?.max_temp}
						value={currentReading?.temp}
						label="Temperature"
						unit="°C"
					/>
					<CurrentReading
						min={state?.min_humd}
						max={state?.max_humd}
						value={currentReading?.humd}
						label="Humidity"
						unit="%"
					/>
					<CurrentReading
						min={state?.min_ph}
						max={state?.max_ph}
						value={currentReading?.ph}
						label="pH"
					/>
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
