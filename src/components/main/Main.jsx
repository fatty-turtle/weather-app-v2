import Forecast from "./forecast/Forecast";
import AppStatus from "./AppStatus";
import InfoBox from "./info-box/InfoBox";

import "./Main.css";

export default function Main({
  weatherData,
  loading,
  error,
  isMetric,
  status,
}) {
  return (
    <main>
      <AppStatus loading={loading} error={error} status={status} />

      {error && !weatherData && (
        <div className="no-data text-center py-8 text-gray-500">
          {error.includes("enter") ? null : "Enter a city to see weather"}
        </div>
      )}
      {!loading && !error && !weatherData && (
        <div className="no-data text-center py-8 text-gray-500">
          Enter a city and search to see weather...
        </div>
      )}
      {!loading && !error && weatherData && (
        <>
          <InfoBox
            current={weatherData.current}
            location={weatherData.location}
            isMetric={isMetric}
          />
          <Forecast forecast={weatherData.forecast} isMetric={isMetric} />
        </>
      )}
    </main>
  );
}
