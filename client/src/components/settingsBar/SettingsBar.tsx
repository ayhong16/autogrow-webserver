import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import axios from "axios";
import LightBackground from "../LightBackground";
import SetSchedule from "./schedule/SetSchedule";
import Interval from "./interval/Interval";
import { min } from "moment";

export interface Props {
	currentProfile: ProfileEntry | null;
	setCurrentProfile: React.Dispatch<React.SetStateAction<ProfileEntry | null>>;
}

export default function SettingsBar() {
	const [currentProfile, setCurrentProfile] = useState(
		null as ProfileEntry | null
	);

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get("/api/state");
			if (response.data) {
				setCurrentProfile(response.data as ProfileEntry);
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
			min_ph: currentProfile?.min_ph,
			max_ph: currentProfile?.max_ph,
			min_temp: currentProfile?.min_temp,
			max_temp: currentProfile?.max_temp,
			min_humd: currentProfile?.min_humd,
			max_humd: currentProfile?.max_humd,
		};
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

	return (
		<LightBackground>
			<h2 className="text-4xl font-medium text-center text-darkGreen">
				Settings
			</h2>
			<div className="flex flex-row w-full items-center justify-center gap-5">
				<SetSchedule
					currentProfile={currentProfile}
					setCurrentProfile={setCurrentProfile}
				/>
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
