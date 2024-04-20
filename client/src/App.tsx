import ReadingsWrapper from "./components/currentReadings/ReadingsWrapper.tsx";
import Navigation from "./components/navigation/Navigation.tsx";
import SettingsBar from "./components/settingsBar/SettingsBar.tsx";

function App() {
  return (
    <>
      <Navigation />
      <SettingsBar />
      <ReadingsWrapper />
    </>
  );
}

export default App;
