import { useState, useEffect } from "react";
import axios from "axios";
import ReadingsWrapper from "./components/currentReadings/ReadingsWrapper.tsx";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async (endpoint: string) => {
    const response = await axios.get("http://localhost:5000/api/" + endpoint);
    setArray(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchAPI("current_data");
    const interval = setInterval(() => fetchAPI("current_data"), 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return <ReadingsWrapper />;
}

export default App;
