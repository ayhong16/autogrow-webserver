import CurrentReadingsWrapper from "./components/currentReadings/CurrentReadingsWrapper.tsx";
import Navigation from "./components/navigation/Navigation.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers"; // Correct import path
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import PastReadingsWrapper from "./components/pastReadings/PastReadingsWrapper.tsx";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Navigation />
      <CurrentReadingsWrapper />
      <PastReadingsWrapper />
    </LocalizationProvider>
  );
}

export default App;
