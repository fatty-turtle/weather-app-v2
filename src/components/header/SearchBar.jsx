export default function SearchBar({ city, onCityChange, handleSearch }) {
  return (
    <div id="search" className="flex gap-3">
      <input
        value={city}
        onChange={onCityChange}
        placeholder="Enter city"
        className="search-input placeholder-text-normal flex-1 min-w-0"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}
