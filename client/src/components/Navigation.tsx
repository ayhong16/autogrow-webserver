import { Settings } from "./utils";

export default function Navigation() {
  return (
    <nav className="flex flex-row justify-between bg-darkGreen h-12 items-center">
      <h4 className="text-white text-2xl mx-2">Current Profile</h4>
      <div className="mx-2">
        {Settings}
      </div>
    </nav>
  );
}
