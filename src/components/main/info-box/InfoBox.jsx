import "./InfoBox.css";
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
    <section className="info-section">
      {/* Hero: Location + Clock */}
      <article className="info-hero">
        <div>
          <h1>CITY: {location.name}</h1>
          <div className="info-hero-info">
            <p>
              Time zone: <br></br>
              <strong>{location.tz_id}</strong>
            </p>
            <p>
              Date: <br></br>
              <strong>
                {date} · {ampm}
              </strong>
            </p>
          </div>
        </div>
        <LiveClock tzId={location.tz_id} size={150} />
      </article>
      {/* Temperature + Wind Cards */}
      <article className="info-cards-grid">
        {/* Temperature Card */}
        <article className="info-card">
          <h1>TEMPERATURE</h1>
          <div className="info-card-content">
            <div className="info-metric-container">
              <div className="info-metric">
                <span>Temperature:</span>
                <strong>{tempDisplay}</strong>
              </div>
              <div className="info-metric">
                <span>Feels like:</span>
                <strong>
                  {dualDisplay("feelslike_c", "feelslike_f", "°C", "°F")}
                </strong>
              </div>
              <div className="info-metric">
                <span>Status:</span>
                <strong>{current.condition.text}</strong>
              </div>
            </div>
            <img
              className="info-condition-img"
              src={current.condition.icon}
              alt={current.condition.text}
            />
          </div>
        </article>

        {/* Wind Card */}
        <article className="info-card">
          <h1>WIND</h1>
          <div className="info-card-content">
            <div className="info-metric-container">
              <div className="info-metric">
                <span>Wind:</span>
                <strong>
                  {dualDisplay(
                    "wind_kph",
                    "wind_mph",
                    getWindLabel(true),
                    getWindLabel(false),
                  )}
                </strong>
              </div>
              <div className="info-metric">
                <span>Gust:</span>
                <strong>
                  {dualDisplay(
                    "gust_kph",
                    "gust_mph",
                    getWindLabel(true),
                    getWindLabel(false),
                  )}
                </strong>
              </div>
              <div className="info-metric">
                <span>Direction:</span>
                <strong>{current.wind_dir}</strong>
              </div>
            </div>
            <Compass windDegree={current.wind_degree} size={150} />
          </div>
        </article>
      </article>
      {/* Weather Status */}
      <article className="info-stats">
        <h1 className="info-stats-title">WEATHER STATUS</h1>
        <ul className="info-stat-list">
          <li className="info-stat-item">
            <span className="info-stat-label">Humidity: </span> <br></br>
            <strong className="info-stat-value">{current.humidity}%</strong>
          </li>
          <li className="info-stat-item">
            <span className="info-stat-label">Dewpoint: </span> <br></br>
            <strong className="info-stat-value">
              {dualDisplay("dewpoint_c", "dewpoint_f", "°C", "°F")}
            </strong>
          </li>
          <li className="info-stat-item">
            <span className="info-stat-label">Vision: </span> <br></br>
            <strong className="info-stat-value">
              {dualDisplay(
                "vis_km",
                "vis_miles",
                getVisLabel(true),
                getVisLabel(false),
              )}
            </strong>
          </li>
          <li className="info-stat-item">
            <span className="info-stat-label">Heat Index: </span> <br></br>
            <strong className="info-stat-value">
              {dualDisplay("heatindex_c", "heatindex_f", "°C", "°F")}
            </strong>
          </li>
          <li className="info-stat-item">
            <span className="info-stat-label">Cloud: </span> <br></br>
            <strong className="info-stat-value">{current.cloud}%</strong>
          </li>
          <li className="info-stat-item">
            <span className="info-stat-label">UV: </span> <br></br>
            <strong className="info-stat-value">{current.uv}</strong>
          </li>
        </ul>
      </article>
    </section>
  );
}
