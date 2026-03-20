import LiveClock from "./LiveClock";
import Compass from "./Compass";
import {
  getTempLabel,
  getWindLabel,
  getVisLabel,
} from "../../utils/unitConverter.js";
import { getDisplayValue } from "../../utils/unitUtils.js";

export default function InfoBox({ current, location, isMetric }) {
  const date = location.localtime.slice(0, 10);
  const hour = parseInt(location.localtime.slice(11, 13));
  const ampm = hour >= 12 ? "PM" : "AM";

  // Clean dual display: primary (current unit) ↔ exchange (other unit)
  const dualDisplay = (metricKey, imperialKey, metricLabel, imperialLabel) => {
    const metricVal = Math.round(current[metricKey] * 10) / 10;
    const imperialVal = Math.round(current[imperialKey] * 10) / 10;
    const primaryVal = isMetric ? metricVal : imperialVal;
    const exchangeVal = isMetric ? imperialVal : metricVal;
    const primaryLabel = isMetric ? metricLabel : imperialLabel;
    const exchangeLabel = isMetric ? imperialLabel : metricLabel;
    return `${primaryVal}${primaryLabel}`;
  };

  // Temp uses getTempLabel logic
  const tempUnitMetric = "°C";
  const tempUnitImperial = "°F";
  const tempPrimary = isMetric
    ? Math.round(current.temp_c * 10) / 10
    : Math.round(current.temp_f * 10) / 10;
  const tempExchange = isMetric
    ? Math.round(current.temp_f * 10) / 10
    : Math.round(current.temp_c * 10) / 10;
  const tempDisplay = `${tempPrimary}${isMetric ? tempUnitMetric : tempUnitImperial}`;

  return (
    <section id="current-container" className="flex flex-col gap-5 p-4">
      <article>
        <h1 className="text-center m-2.5">CITY: {location.name}</h1>
        <div
          id="city-container"
          className="flex flex-row justify-evenly gap-2.5 "
        >
          <div
            id="city-info"
            className="flex flex-col items-center justify-center"
          >
            <p>Time zone: {location.tz_id}</p>
            <p>
              Date: {date} · {ampm}
            </p>
          </div>
          <LiveClock tzId={location.tz_id} size={180}></LiveClock>
        </div>
      </article>
      <article>
        <h1 className="text-center m-2.5">WEATHER STATUS</h1>
        <div id="weather-info" className="flex flex-col gap-5">
          <div
            id="current-temp-status"
            className="flex flex-row justify-evenly"
          >
            <div>
              <p>
                Current temperature: <span>({tempDisplay})</span>
              </p>
              <p>
                Feel like:{" "}
                {dualDisplay("feelslike_c", "feelslike_f", "°C", "°F")}
              </p>
              <p>{current.condition.text}</p>
            </div>
            <img src={current.condition.icon} alt="" />
          </div>
          <div
            id="current-other-status"
            className="grid grid-cols-2 gap-5 items-center"
          >
            <div id="humidity">
              <p>Humidity: {current.humidity}%</p>
              <p>
                Dewpoint: {dualDisplay("dewpoint_c", "dewpoint_f", "°C", "°F")}
              </p>
            </div>
            <div id="wind">
              <p>
                Wind:{" "}
                {dualDisplay(
                  "wind_kph",
                  "wind_mph",
                  getWindLabel(true),
                  getWindLabel(false),
                )}
              </p>
              <p>
                Gust:{" "}
                {dualDisplay(
                  "gust_kph",
                  "gust_mph",
                  getWindLabel(true),
                  getWindLabel(false),
                )}
              </p>
              <p>Wind direction: {current.wind_dir}</p>
              <Compass
                windDegree={current.wind_degree}
                windDir={current.wind_dir}
              />
            </div>
            <div id="other">
              <p>
                Vision:{" "}
                {dualDisplay(
                  "vis_km",
                  "vis_miles",
                  getVisLabel(true),
                  getVisLabel(false),
                )}
              </p>
              <p>Cloud: {current.cloud}%</p>
              <p>UV: {current.uv}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
