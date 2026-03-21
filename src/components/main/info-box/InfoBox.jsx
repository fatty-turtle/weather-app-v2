import LiveClock from "./LiveClock.jsx";
import Compass from "./Compass.jsx";

import {
  getTempLabel,
  getWindLabel,
  getVisLabel,
} from "../../../utils/unitConverter.js";

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
    <section id="current-container" className="flex flex-col gap-5 p-4 ">
      <div id="article">
        <h1 className="text-center m-2.5">
          <strong> CITY: {location.name}</strong>
        </h1>
        <div
          id="city-container"
          className="flex flex-row justify-evenly gap-5 "
        >
          <div id="city-info" className="flex flex-col justify-center">
            <p>
              Time zone: <br></br>
              <strong>{location.tz_id}</strong>{" "}
            </p>
            <p>
              Date: <br></br>
              <strong>
                {date} · {ampm}
              </strong>
            </p>
          </div>
          <LiveClock tzId={location.tz_id} size={150}></LiveClock>
        </div>
      </div>
      <div className="flex flex-row justify-evenly gap-5">
        <div id="article">
          <h1 className="text-center m-2.5">
            <strong>TEMPERATURE</strong>
          </h1>
          <div
            id="current-temp-status"
            className="flex items-center justify-center gap-2.5 flex-row"
          >
            <div>
              <p>
                Temperature: <strong>{tempDisplay}</strong>
              </p>
              <p>
                Feel like:<br></br>
                <strong>
                  {dualDisplay("feelslike_c", "feelslike_f", "°C", "°F")}
                </strong>
              </p>
              <p>
                Status:
                <br></br>
                <strong>{current.condition.text}</strong>
              </p>
            </div>
            <img src={current.condition.icon} alt="" />
          </div>
        </div>
        <div id="article">
          <h1 className="text-center m-2.5">
            <strong>WIND</strong>
          </h1>
          <div
            id="wind"
            className="flex items-center justify-evenly gap-2.5 flex-row"
          >
            <div>
              <p>
                Wind: <br></br>
                <strong>
                  {dualDisplay(
                    "wind_kph",
                    "wind_mph",
                    getWindLabel(true),
                    getWindLabel(false),
                  )}
                </strong>
              </p>
              <p>
                Gust: <br></br>
                <strong>
                  {dualDisplay(
                    "gust_kph",
                    "gust_mph",
                    getWindLabel(true),
                    getWindLabel(false),
                  )}
                </strong>
              </p>
              <p>
                Direction:<br></br> <strong>{current.wind_dir}</strong>
              </p>
            </div>
            <Compass windDegree={current.wind_degree} size={150} />
          </div>
        </div>
      </div>
      <div id="article">
        <h1 className="text-center m-2.5">
          <strong>WEATHER STATUS</strong>
        </h1>
        <div id="other">
          <p>
            Humidity:<br></br> <strong>{current.humidity}%</strong>
          </p>
          <p>
            Dewpoint: <br></br>
            <strong>
              {dualDisplay("dewpoint_c", "dewpoint_f", "°C", "°F")}
            </strong>
          </p>
          <p>
            Vision: <br></br>
            <strong>
              {dualDisplay(
                "vis_km",
                "vis_miles",
                getVisLabel(true),
                getVisLabel(false),
              )}
            </strong>
          </p>
          <p>
            Heat: <br></br>
            <strong>
              {dualDisplay("heatindex_c", "heatindex_f", "°C", "°F")}
            </strong>
          </p>
          <p>
            Cloud:<br></br> <strong>{current.cloud}%</strong>
          </p>
          <p>
            UV:<br></br> <strong>{current.uv}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
