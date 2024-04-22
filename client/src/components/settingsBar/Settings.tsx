import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import axios from "axios";
import LightBackground from "../LightBackground";
import SchedulePicker from "./schedule/SchedulePicker";
import Interval from "./interval/Interval";
import Thresholds from "./Thresholds";

export interface Props {
	currentProfile: ProfileEntry | null;
	setCurrentProfile: React.Dispatch<React.SetStateAction<ProfileEntry | null>>;
}

const defaultProfile: ProfileEntry = {
	id: 0,
	name: "Default",
	start_time: "00:00:00",
	end_time: "00:00:00",
	ph_poll_interval: 0,
	dht_poll_interval: 0,
	min_ph: 0,
	max_ph: 14,
	min_temp: 0,
	max_temp: 100,
	min_humd: 0,
	max_humd: 100,
};

export default function SettingsBar() {
	const [currentProfile, setCurrentProfile] = useState(
		defaultProfile as ProfileEntry | null
	);

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get("/api/state");
			if (response.data) {
				setCurrentProfile(response.data as ProfileEntry);
				console.log("Data fetched", response.data);
			}
		};

		getData();
	}, []);

	const handleApplyButtonClick = () => {
		const queryParams = {
			start: currentProfile?.start_time,
			end: currentProfile?.end_time,
			id: currentProfile?.id || "",
			ph_poll_interval: currentProfile?.ph_poll_interval,
			dht_poll_interval: currentProfile?.dht_poll_interval,
			min_ph: currentProfile?.min_ph ?? 0,
			max_ph: currentProfile?.max_ph ?? 14,
			min_temp: currentProfile?.min_temp ?? 0,
			max_temp: currentProfile?.max_temp ?? 100,
			min_humd: currentProfile?.min_humd ?? 0,
			max_humd: currentProfile?.max_humd ?? 100,
		};
		console.log("Query params:", queryParams);
		axios
			.post("/api/update_settings", null, {
				params: queryParams,
			})
			.then(() => {
				console.log("Schedule set successfully");
			})
			.catch((error) => {
				console.error("Error setting schedule:", error);
			});
	};

	const verticalLine = (
		<div className="w-[0.2rem] h-[156px] rounded-full bg-darkGreen"></div>
	);

	return (
		<LightBackground>
			<h2 className="text-4xl font-medium text-center text-darkGreen">
				Settings
			</h2>
			<div className="flex flex-row w-full items-center justify-center gap-2 my-3">
				<SchedulePicker
					currentProfile={currentProfile}
					setCurrentProfile={setCurrentProfile}
				/>
				{verticalLine}
				<Thresholds
					currentProfile={currentProfile}
					setCurrentProfile={setCurrentProfile}
				/>
				{verticalLine}
				<Interval
					currentProfile={currentProfile}
					setCurrentProfile={setCurrentProfile}
				/>
			</div>
			<button
				className="bg-darkGreen text-white text-xl px-4 py-2 rounded-xl self-end hover:scale-105 transition-transform ease-in-out duration-150"
				onClick={handleApplyButtonClick}
			>
				Apply
			</button>
		</LightBackground>
	);
}
