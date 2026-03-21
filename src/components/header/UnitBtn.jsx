import { useState } from "react";

export default function UnitBtn({ isMetric, onToggle }) {
  const [tip, setTip] = useState(false);

  return (
    <div>
      <div className="flex gap-0.5">
        <button
          onClick={() => onToggle(!isMetric)}
          id="unit-btn"
          aria-label={`Switch to ${isMetric ? "imperial" : "metric"} units`}
          className="flex-1"
        >
          Convert Unit
        </button>

        <button id="tip-indicator" onClick={() => setTip((t) => !t)}>
          ?
        </button>
      </div>
      {tip && (
        <div
          id="tip-box"
          className="absolute min-w-48 right-0 top-full mt-1 bg-background border border-dotted border-text-normal rounded-2xl shadow-md px-3 py-2 text-sm whitespace-nowrap z-[200]"
        >
          Convert Units (C/F, mph/kph, km/miles)
        </div>
      )}
    </div>
  );
}
