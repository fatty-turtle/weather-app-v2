import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import fetchApi from "./utils/fetchApi";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true);

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const toggleUnit = () => {
    setIsMetric(!isMetric);
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchApi(
        `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`,
      );
      setWeatherData(result.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
    await console.log(weatherData);
  };

  return (
    <>
      <Header
        city={city}
        onCityChange={onCityChange}
        handleSearch={handleSearch}
        isMetric={isMetric}
        onUnitToggle={toggleUnit}
      />
      <Main
        weatherData={weatherData}
        loading={loading}
        error={error}
        isMetric={isMetric}
      />
      <Footer />
    </>
  );
}
