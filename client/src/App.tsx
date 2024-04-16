import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./components/DataTable.tsx";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async (endpoint: string) => {
    const response = await axios.get("http://localhost:5000/api/" + endpoint);
    setArray(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchAPI("past_data");
    const interval = setInterval(() => fetchAPI("past_data"), 5000); // 5 second sample interval
    return () => clearInterval(interval);
  }, []);

  return <DataTable data={array} />;
}

export default App;
