import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Forecast.css";

const CHART_COLORS = [
  "#3b82f6",
  "#f97316",
  "#22c55e",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
];

const CustomTooltip = ({ active, payload, label, isMetric }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--background-card, #fff)",
        border: "1px solid var(--border, #cbd5e1)",
        borderRadius: "0.75rem",
        padding: "0.6rem 1rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          marginBottom: "0.25rem",
          color: "var(--text-normal)",
        }}
      >
        {label}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          style={{
            color: entry.color,
            margin: "0.1rem 0",
            fontSize: "0.85rem",
          }}
        >
          {entry.name}: {entry.value}°{isMetric ? "C" : "F"}
        </p>
      ))}
    </div>
  );
};

export default function Forecast({ forecast, isMetric = true }) {
  const [activeDay, setActiveDay] = useState(0);
  const [viewMode, setViewMode] = useState("cards");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const forecastDays = forecast?.forecastday || [];
  const hourlyData = forecastDays[activeDay]?.hour || [];

  if (forecastDays.length === 0) {
    return (
      <section className="empty-section">
        <h1 className="empty-title">Hourly Forecast</h1>
        <p className="empty-text">No forecast data available</p>
      </section>
    );
  }

  const chartData = Array.from({ length: 24 }, (_, i) => {
    const point = {
      time:
        forecastDays[0]?.hour?.[i]?.time?.slice(-5) ??
        `${String(i).padStart(2, "0")}:00`,
    };
    forecastDays.forEach((day) => {
      const hour = day.hour?.[i];
      if (hour) {
        point[formatDate(day.date)] = Math.round(
          isMetric ? hour.temp_c : hour.temp_f,
        );
      }
    });
    return point;
  });

  return (
    <section className="forecast-section">
      <h2 className="forecast-title">HOURLY FORECAST</h2>

      {/* Navbar */}
      <nav className="forecast-navbar">
        <div className="forecast-day-btns">
          {forecastDays.map((day, index) => (
            <button
              key={day.date_epoch}
              onClick={() => {
                setActiveDay(index);
                setViewMode("cards");
              }}
              className={`forecast-day-btn ${viewMode === "cards" && index === activeDay ? "active" : ""}`}
            >
              {formatDate(day.date)}
            </button>
          ))}
        </div>

        <div className="forecast-chart-toggle-row">
          <button
            onClick={() => setViewMode("chart")}
            className={`forecast-view-toggle ${viewMode === "chart" ? "active" : ""}`}
          >
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="3 17 9 11 13 15 21 7" />
                <polyline points="17 7 21 7 21 11" />
              </svg>
              Chart
            </>
          </button>
        </div>
      </nav>

      {/* Cards view */}
      {viewMode === "cards" && (
        <div className="forecast-container">
          {hourlyData.slice(0, 24).map((item, index) => {
            const time = item.time.slice(-5);
            const temp = Math.round(isMetric ? item.temp_c : item.temp_f);
            const condition = item.condition;
            return (
              <article key={index} className="forecast-card">
                <h3>{time}</h3>
                <img src={condition.icon} alt={condition.text} loading="lazy" />
                <p className="condition-text">{condition.text}</p>
                <p className="temp">{temp}°</p>
              </article>
            );
          })}
        </div>
      )}

      {/* Chart view */}
      {viewMode === "chart" && (
        <div className="forecast-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border, #cbd5e1)"
                opacity={0.4}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "var(--text-lowlight, #94a3b8)" }}
                tickLine={false}
                axisLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-lowlight, #94a3b8)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}°`}
                width={36}
              />
              <Tooltip content={<CustomTooltip isMetric={isMetric} />} />
              <Legend
                wrapperStyle={{ fontSize: "0.8rem", paddingTop: "0.75rem" }}
              />
              {forecastDays.map((day, i) => (
                <Line
                  key={day.date_epoch}
                  type="monotone"
                  dataKey={formatDate(day.date)}
                  stroke={CHART_COLORS[i % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
