import React, { useEffect, useState } from "react";

const ThemeSwitcher = ({ toggleTheme }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // Apply initial theme from localStorage or default to light
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="theme-switcher">
      <label>
        <input type="checkbox" onChange={handleThemeChange} checked={theme === "dark"} />
        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </label>
    </div>
  );
};

export default ThemeSwitcher;