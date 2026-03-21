import { useState } from "react";
import "./Forecast.css";

export default function Forecast({ forecast, isMetric = true }) {
  const [activeDay, setActiveDay] = useState(0);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const forecastDays = forecast?.forecastday || [];
  const hourlyData = forecastDays[activeDay]?.hour || [];

  if (forecastDays.length === 0) {
    return (
      <section
        className="
          empty-section
        "
      >
        <h2
          className="
            empty-title
          "
        >
          Hourly Forecast
        </h2>
        <p
          className="
            empty-text
          "
        >
          No forecast data available
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        forecast-section
      "
    >
      <h2
        className="
          forecast-title
        "
      >
        Hourly Forecast
      </h2>

      {/* Day selection navbar */}
      <nav
        className="
          forecast-navbar
        "
      >
        {forecastDays.map((day, index) => (
          <button
            key={day.date_epoch}
            onClick={() => setActiveDay(index)}
            className={`
              forecast-day-btn
              ${index === activeDay ? "active" : ""}
            `}
          >
            {formatDate(day.date)}
          </button>
        ))}
      </nav>

      <div
        className="
          forecast-container
        "
      >
        {hourlyData.slice(0, 24).map((item, index) => {
          const time = item.time.slice(-5);
          const temp = Math.round(isMetric ? item.temp_c : item.temp_f);
          const condition = item.condition;

          return (
            <article
              key={index}
              className="
                forecast-card
              "
            >
              <h3>{time}</h3>
              <img src={condition.icon} alt={condition.text} loading="lazy" />
              <p
                className="
                  condition-text
                "
              >
                {condition.text}
              </p>
              <p
                className="
                  temp
                "
              >
                {temp}°
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
