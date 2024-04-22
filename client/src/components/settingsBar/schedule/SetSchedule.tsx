import moment from "moment";
import TimePicker from "./TimePicker";
import { ProfileEntry } from "../../../types/Profile";

interface Props {
	currentProfile: ProfileEntry | null;
	setCurrentProfile: React.Dispatch<React.SetStateAction<ProfileEntry | null>>;
}

export default function SetSchedule({
	currentProfile,
	setCurrentProfile,
}: Props) {
	const handleStartTimeChange = (newStartTime: string) => {
		setCurrentProfile((prev) => ({
			...prev!,
			start_time: newStartTime,
		}));
	};

	const handleEndTimeChange = (newEndTime: string) => {
		setCurrentProfile((prev) => ({
			...prev!,
			end_time: newEndTime,
		}));
	};
	return (
		<div className="flex flex-col items-center gap-4">
			<h3 className="text-darkGreen text-2xl m-2">Grow Light Schedule</h3>
			<div className="grid grid-cols-5 grid-rows-2 gap-2 justify-center items-center">
				<TimePicker
					currentTime={
						currentProfile === null
							? undefined
							: moment(currentProfile?.start_time, "HH:mm:ss")
					}
					label="Start"
					onTimeChange={handleStartTimeChange}
				/>
				<TimePicker
					currentTime={
						currentProfile === null
							? undefined
							: moment(currentProfile?.end_time, "HH:mm:ss")
					}
					label="End"
					onTimeChange={handleEndTimeChange}
				/>
			</div>
		</div>
	);
}
