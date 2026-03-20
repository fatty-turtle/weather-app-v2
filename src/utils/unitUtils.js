export const TOGGLE_UNITS = {
  celsius: "fahrenheit",
  fahrenheit: "celsius",
};

export function toggleUnit(currentUnit) {
  return TOGGLE_UNITS[currentUnit] || "celsius";
}

// Get display temp based on unit (assumes data has temp_c, temp_f)
export function getDisplayTemp(temp_c, temp_f, unit) {
  const temp = unit === "celsius" ? temp_c : temp_f;
  return Math.round(temp);
}

// Get symbol
export function getUnitSymbol(unit) {
  return unit === "celsius" ? "\u00B0C" : "\u00B0F";
}

// Universal getter for any temp field (temp, feelslike, windchill, etc.)
export function getDisplayValue(data, key, unit) {
  const cKey = `${key}_c`;
  const fKey = `${key}_f`;
  if (unit === "celsius" && data.hasOwnProperty(cKey)) {
    return Math.round(data[cKey]);
  }
  if (unit === "fahrenheit" && data.hasOwnProperty(fKey)) {
    return Math.round(data[fKey]);
  }
  return data[key] || "--";
}
