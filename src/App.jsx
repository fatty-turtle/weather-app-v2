import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
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
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await fetchApi(
      `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`,
    );
    setLoading(false);

    if (result.error) {
      let errorMsg = "Failed to fetch weather data.";
      const errLower = result.error.toLowerCase();
      if (errLower.includes("400") || errLower.includes("invalid")) {
        errorMsg = "Invalid city name. Please check the spelling.";
      } else if (
        errLower.includes("network") ||
        errLower.includes("conn") ||
        errLower.includes("timeout")
      ) {
        errorMsg =
          "Cannot connect to server. Please check your internet connection.";
      } else if (errLower.includes("401") || errLower.includes("key")) {
        errorMsg = "Weather service unavailable. Please try again later.";
      }
      setError(errorMsg);
    } else {
      setWeatherData(result.data);
    }
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
        status=""
        isMetric={isMetric}
      />
    </>
  );
}
