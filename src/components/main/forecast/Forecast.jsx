import "./Forecast.css";

export default function Forecast({ forecast }) {
  const hourlyData = forecast?.forecastday?.[0]?.hour || [];

  if (hourlyData.length === 0) {
    return (
      <section className="empty-section">
        <h2 className="empty-title">Hourly Forecast</h2>
        <p className="empty-text">No forecast data available</p>
      </section>
    );
  }

  return (
    <section className="forecast-section">
      <h2 className="forecast-title">Hourly Forecast</h2>
      <div className="forecast-container">
        {hourlyData.slice(0, 24).map((item, index) => {
          const time = item.time.slice(-5);
          const temp = Math.round(item.temp_c);
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
    </section>
  );
}
