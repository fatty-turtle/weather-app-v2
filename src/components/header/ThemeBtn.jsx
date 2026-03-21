import { useState, useEffect } from "react";

export default function ThemeBtn() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.className = saved === "dark" ? "dark" : "";
    return saved;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const mode = theme === "light" ? "Dark mode" : "Light mode";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="">Change to {mode}</span>
    </button>
  );
}
