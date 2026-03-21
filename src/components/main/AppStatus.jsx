import { useState, useEffect } from "react";

export default function AppStatus({ loading, error, status }) {
  const [localError, setLocalError] = useState(error || "");
  const [visible, setVisible] = useState(!!error || loading);

  useEffect(() => {
    if (loading) {
      setLocalError("");
      setVisible(true);
    } else if (error) {
      let displayMsg = error;

      if (error.includes("Please enter")) {
        displayMsg = "Please enter a city name.";
      } else if (error.includes("Invalid")) {
        displayMsg = "Invalid city. Check spelling.";
      } else if (error.includes("connect")) {
        displayMsg = "No connection. Check internet.";
      }
      setLocalError(displayMsg);
      setVisible(true);
    } else {
      setLocalError("");
      setVisible(false);
    }
  }, [loading, error]);

  const closeError = () => {
    setVisible(false);
    setLocalError("");
  };

  if (!visible) return null;
  const isError = !!localError;

  return (
    <section className="info-section">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl p-6 flex flex-col items-center animate-in slide-in-from-top-2 duration-300">
        <div
          className={`flex items-center gap-3 text-xl font-bold ${isError ? "text-error" : "text-text-highlight"} mb-3`}
        >
          <span>{isError ? localError : "Loading weather data..."}</span>
        </div>
        {isError && (
          <button
            onClick={closeError}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 text-sm"
          >
            Dismiss
          </button>
        )}
      </div>
    </section>
  );
}
