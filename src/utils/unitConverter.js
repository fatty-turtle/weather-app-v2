export const getTemp = (valueC, isMetric) => {
  if (isMetric) return valueC;
  return Math.round((valueC * 9) / 5 + 32);
};

export const getTempLabel = (isMetric) => (isMetric ? "°C" : "°F");

export const getWindSpeed = (valueKph, isMetric) => {
  if (isMetric) return valueKph;
  return Math.round(valueKph * 0.621371);
};

export const getWindLabel = (isMetric) => (isMetric ? "kph" : "mph");

export const getVis = (valueKm, isMetric) => {
  if (isMetric) return valueKm;
  return Math.round(valueKm * 0.621371);
};

export const getVisLabel = (isMetric) => (isMetric ? "km" : "miles");
