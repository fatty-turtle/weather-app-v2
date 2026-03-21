import { useState } from "react";

export default function UnitBtn({ isMetric, onToggle }) {
  const toggleUnit = () => {
    onToggle(!isMetric);
  };
  const [tip, setTip] = useState(false);

  const toggleTip = () => {
    if (tip === false) setTip(true);
    else setTip(false);
  };
  return (
    <div>
      <div className="flex gap-0.5 relative">
        <button
          onClick={toggleUnit}
          id="unit-btn"
          aria-label={`Switch to ${isMetric ? "imperial" : "metric"} units`}
          className="flex-1 "
        >
          Convert Unit
        </button>

        <button id="tip-indicator" onClick={toggleTip}>
          ?
        </button>
      </div>
      {tip && (
        <div
          id="tip-box"
          className="absolute right-4 mt-1 bg-background border border-dotted border-text-normal rounded-2xl shadow-md px-3 py-2 text-sm z-10 whitespace-nowrap"
        >
          Convert Units (C/F, mph/kph, km/miles)
        </div>
      )}
    </div>
  );
}
