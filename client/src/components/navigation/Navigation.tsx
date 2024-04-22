import axios from "axios";
import { useEffect, useState } from "react";
import { ProfileEntry } from "../../types/Profile";

export default function Navigation() {
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

	return (
		<nav className="flex flex-row justify-between bg-darkGreen h-12 items-center">
			<select
				id="profilesDropdown"
				className="preline-dropdown bg-darkGreen text-white md:text-2xl m-2"
			>
				<option value="">
					{currentProfile === null ? "Loading..." : currentProfile.name}
				</option>
			</select>
			<div className="flex flex-row items-center justify-center">
				<img src={"/Logo_white.png"} className="md:w-[44px] w-[32px]" />
				<h1 className="text-white md:text-3xl font-semibold mx-4">AutoGrow</h1>
			</div>
		</nav>
	);
}
