import Forecast from "./forecast/Forecast";
import AppStatus from "./AppStatus";
import InfoBox from "./info-box/InfoBox";

import "./Main.css";

export default function Main({ weatherData, loading, error, isMetric }) {
  if (loading)
    return (
      <main>
        <div className="loading">Loading weather...</div>
      </main>
    );
  if (!weatherData)
    return (
      <main>
        <div>Enter a city and search to see weather</div>
      </main>
    );

  return (
    <main>
      <AppStatus error={error}></AppStatus>
      <InfoBox
        current={weatherData.current}
        location={weatherData.location}
        isMetric={isMetric}
      ></InfoBox>
      <Forecast forecast={weatherData.forecast}></Forecast>
    </main>
  );
}
