import ThemeBtn from "./ThemeBtn";
import UnitBtn from "./UnitBtn";
import SearchBar from "./SearchBar";
import "./Header.css";
export default function Header({
  city,
  onCityChange,
  handleSearch,
  isMetric,
  onUnitToggle,
}) {
  return (
    <header className="flex flex-col justify-between gap-2.5 sm:flex-row">
      <SearchBar
        city={city}
        onCityChange={onCityChange}
        handleSearch={handleSearch}
      />
      <div className="flex flex-col justify-between gap-2.5 sm:flex-row">
        <ThemeBtn />
        <UnitBtn isMetric={isMetric} onToggle={onUnitToggle} />
      </div>
    </header>
  );
}
