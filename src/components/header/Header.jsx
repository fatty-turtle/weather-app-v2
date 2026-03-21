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
    <header>
      <SearchBar
        city={city}
        onCityChange={onCityChange}
        handleSearch={handleSearch}
      />
      <div className="btn-container">
        <ThemeBtn />
        <UnitBtn isMetric={isMetric} onToggle={onUnitToggle} />
      </div>
    </header>
  );
}
