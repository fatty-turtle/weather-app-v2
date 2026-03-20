import LiveClock from "./LiveClock";

export default function InfoBox({ current, location }) {
  console.log(current.cloud);
  console.log(location);
  const date = location.localtime.slice(0, 10);
  return (
    <section>
      <div id="country-container">
        <div id="city-info">
          <h2 className="text-center">City: {location.name}</h2>
          <p>Time zone: {location.tz_id}</p>
          <p>Date: {date}</p>
        </div>
        <LiveClock></LiveClock>
      </div>
      <div id="weather-info">This section is for current weather info </div>
    </section>
  );
}
