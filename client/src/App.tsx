import CurrentReadingsWrapper from "./components/currentReadings/CurrentReadingsWrapper.tsx";
import Navigation from "./components/navigation/Navigation.tsx";
import PastReadingsWrapper from "./components/pastReadings/PastReadingsWrapper.tsx";
import SettingsBar from "./components/settingsBar/SettingsBar.tsx";

function App() {
  return (
    <>
      <Navigation />
      <CurrentReadingsWrapper />
      <SettingsBar />
      <PastReadingsWrapper />
    </>
  );
}

export default App;
