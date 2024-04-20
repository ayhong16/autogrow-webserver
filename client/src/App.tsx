import ReadingsWrapper from "./components/currentReadings/ReadingsWrapper.tsx";
import Navigation from "./components/navigation/Navigation.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers"; // Correct import path
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Navigation />
      <ReadingsWrapper />
    </LocalizationProvider>
  );
}

export default App;
