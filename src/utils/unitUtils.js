export const TOGGLE_UNITS = {
  celsius: "fahrenheit",
  fahrenheit: "celsius",
};

export function toggleUnit(currentUnit) {
  return TOGGLE_UNITS[currentUnit] || "celsius";
}

export function getDisplayTemp(temp_c, temp_f, unit) {
  const temp = unit === "celsius" ? temp_c : temp_f;
  return Math.round(temp);
}

export function getUnitSymbol(unit) {
  return unit === "celsius" ? "\u00B0C" : "\u00B0F";
}

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
