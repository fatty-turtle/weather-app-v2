# Weather App

A modern, responsive weather application built with React and Vite. Get real-time weather data, forecasts, and detailed weather information for any city worldwide.

## Features

- **Real-time Weather Data**: Current temperature, conditions, humidity, wind speed, and more
- **7-Day Forecast**: Hourly and daily weather predictions with interactive charts
- **Unit Conversion**: Toggle between Celsius and Fahrenheit
- **Interactive Wind Compass**: Visual wind direction indicator
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful error boundaries and user-friendly error messages
- **Loading States**: Smooth skeleton loading animations

## Technologies Used

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast development and optimized builds
- **Axios** - HTTP client with request/response interceptors
- **Recharts** - Interactive data visualization for forecasts
- **WeatherAPI** - Real-time weather data provider
- **React Error Boundary** - Error handling and recovery
- **React Loading Skeleton** - Loading state UI components

## Project Structure

```
weather-app/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration
│   │   └── axiosConfig.js   # Axios instance with interceptors
│   ├── components/        # React components
│   │   ├── TempBox.jsx    # Temperature display component
│   │   ├── InfoBox.jsx    # Weather details (General/Wind tabs)
│   │   ├── Forecast.jsx   # Hourly and daily forecast
│   │   ├── Skeletons.jsx  # Loading skeleton components
│   │   └── ErrorBoundary.jsx # Error handling wrapper
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables (Optional but recommended)**

   Create a `.env` file in the root directory:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality              |

## API Information

This application uses the [WeatherAPI](https://www.weatherapi.com/) free tier which provides:

- Real-time weather data
- 7-day weather forecast
- Location search
- Up to 1 million calls per month (free tier)
