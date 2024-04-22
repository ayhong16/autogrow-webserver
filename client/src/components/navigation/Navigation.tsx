import { useEffect, useState } from "react";
import { ProfileEntry } from "../../types/Profile";
import axios from "axios";

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

  console.log("currentProfile: ", currentProfile);

  return (
    <nav className="flex flex-row relative bg-darkGreen h-12 items-center">
      <select
        id="profilesDropdown"
        className="preline-dropdown bg-darkGreen text-white text-2xl m-2"
      >
        <option value="">
          {currentProfile === null ? "Loading..." : currentProfile.name}
        </option>
      </select>
      <h1 className="absolute text-white text-3xl font-semibold m-2 left-[50%] -translate-x-[50%]">
        AutoGrow
      </h1>
    </nav>
  );
}
