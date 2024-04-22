import { useState, useEffect } from "react";
import { ProfileEntry } from "../../types/Profile";
import axios from "axios";
import LightBackground from "../LightBackground";
import SetSchedule from "./schedule/SetSchedule";
import Interval from "./interval/Interval"

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
			name: currentProfile?.name || "",
		};
		axios
			.post("/api/set_schedule", null, {
				params: queryParams,
			})
			.then(() => {
				// Handle success
				console.log("Schedule set successfully");
			})
			.catch((error) => {
				// Handle error
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
				<Interval />
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
