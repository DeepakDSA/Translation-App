import React from "react";

const Settings = ({ currentTheme, onThemeToggle, onLanguageChange }) => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <label>
        Language:
        <select onChange={(e) => onLanguageChange(e.target.value)}>
          <option value="en-US">English</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          <option value="hi-IN">Hindi</option> {/* Added Hindi */}
        </select>
      </label>
      <button onClick={onThemeToggle}>
        {currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default Settings;