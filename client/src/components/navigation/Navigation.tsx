export default function Navigation() {
  return (
    <nav className="flex flex-row bg-darkGreen h-12 items-center">
      <select className="preline-dropdown bg-darkGreen text-white text-2xl m-2">
        <option value="">Current Profile</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </nav>
  );
}
