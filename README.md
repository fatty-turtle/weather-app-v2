# Weather App v2

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-orange.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-green.svg)](https://tailwindcss.com/)

A modern, responsive weather application built with React and Vite. Get real-time weather data, forecasts, detailed info (compass, map, live clock), and more for any city worldwide.

## ✨ Features

- **Real-time Weather Data**: Current temperature, feels-like, conditions, humidity, wind speed, pressure, UV, visibility
- **3-Day Forecast**: Detailed hourly and daily predictions with Recharts visualizations
- **Unit Toggle**: Seamless °C ↔ °F conversion
- **Interactive Components**: Wind Compass (SVG), Live Clock, Interactive Map (Leaflet)
- **Smart Header**: Search by city, Theme toggle (dark/light), Units button
- **Responsive Design**: Optimized for desktop, tablet, mobile
- **Robust Error Handling**: React Error Boundary with fallback UI
- **Smooth UX**: Skeleton loading states, optimistic updates

## 🛠️ Technologies Used

| Technology                 | Purpose          | Version                          |
| -------------------------- | ---------------- | -------------------------------- |
| **React**                  | UI Library       | 19.x                             |
| **Vite**                   | Build Tool       | 7.x                              |
| **Tailwind CSS**           | Styling          | 4.x                              |
| **Axios**                  | API Requests     | 1.x (in `src/utils/fetchApi.js`) |
| **Recharts**               | Charts/Forecasts | 3.x                              |
| **React Leaflet**          | Interactive Maps | Latest                           |
| **WeatherAPI**             | Weather Data     | Free Tier                        |
| **React Error Boundary**   | Error Recovery   | 6.x                              |
| **React Loading Skeleton** | Loading UI       | 3.x                              |
| **ESLint**                 | Code Quality     | 9.x                              |

## 📁 Project Structure

```
d:/Projects/weather-app-v2/
├── public/
│   └── wind-solid-full.svg      # Compass icon
├── src/
│   ├── components/
│   │   ├── header/              # App header
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ThemeBtn.jsx
│   │   │   └── UnitBtn.jsx
│   │   └── main/
│   │       ├── AppStatus.jsx
│   │       ├── Main.jsx
│   │       └── forecast/
│   │           └── Forecast.jsx
│   │       └── info-box/
│   │           ├── InfoBox.jsx
│   │           ├── Compass.jsx
│   │           ├── LiveClock.jsx
│   │           └── Map.jsx
│   ├── utils/
│   │   ├── fetchApi.js          # Axios wrapper
│   │   ├── unitConverter.js
│   │   └── unitUtils.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json                 # React 19, deps
├── tailwind.config.js
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js ≥18
- npm/yarn/pnpm

### Quick Start

```bash
git clone https://github.com/yourusername/weather-app-v2.git  # or download
cd weather-app-v2
npm install
```

**API Key** (recommended): Create `.env`:

```env
VITE_WEATHER_API_KEY=your_key_from_weatherapi.com
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

### Build & Deploy

```bash
npm run build      # dist/ folder
npm run preview    # Local prod preview
npm run lint       # Check code
```

## 📋 Available Scripts

| Script            | Description             |
| ----------------- | ----------------------- |
| `npm run dev`     | Dev server (hot reload) |
| `npm run build`   | Production build        |
| `npm run preview` | Preview build           |
| `npm run lint`    | Lint code               |

## 🌐 API: WeatherAPI.com

- [Free Signup](https://www.weatherapi.com/register.aspx)
- Endpoints: Current, Forecast, Location search
- 100,000 calls/month free
- Key via `VITE_WEATHER_API_KEY`

## 📱 Demo / Screenshots

Run `npm run dev` to see live. Features responsive design with dark/light theme.

## 🤝 Contributing

1. Fork & PR
2. `npm install && npm run lint`
3. Add tests if applicable
