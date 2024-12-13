import React, { useState } from "react";
import { useHistory } from "./HistoryContext";
import axios from "axios"; // Make sure to import axios
import './index.css';  // For global styles and resets
import './App.css';    // For component-specific styles
import "./App.css";

const App = () => {
  const { addHistory, history } = useHistory(); // Access history context
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("en");
  const [feedback, setFeedback] = useState(null);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Voice recognition setup
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = sourceLang;
    recognition.interimResults = true;

    recognition.onstart = () => setIsVoiceInput(true);
    recognition.onerror = () => setIsVoiceInput(false);
    recognition.onend = () => setIsVoiceInput(false);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInputText(transcript);
    };

    recognition.start();
  };

  // Translation logic using LibreTranslate
  const handleTranslate = async () => {
    if (!inputText) {
      alert("Please enter text to translate.");
      return;
    }
  
    // Check if the source and target languages are the same
    if (sourceLang === targetLang) {
      setTranslatedText(inputText); // Just return the same text if languages are the same
      addHistory({ text: inputText, translation: inputText });
      setFeedback(null); // Reset feedback for new translation
      return;
    }
  
    const url = 'https://libretranslate.com/translate'; // LibreTranslate API endpoint
    const data = {
      q: inputText,
      source: sourceLang,
      target: targetLang,
      format: "text",
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
  
      // Log the response to see the structure of the data
      console.log(response.data);
  
      if (response.data && response.data.translatedText) {
        const translation = response.data.translatedText;
        setTranslatedText(translation);
        addHistory({ text: inputText, translation });
        setFeedback(null); // Reset feedback for new translation
      } else {
        throw new Error("Translation failed.");
      }
    } catch (error) {
      console.error("Error in translation:", error);
      setTranslatedText("Translation failed. Please try again.");
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Feedback handling
  const handleFeedback = (type) => {
    setFeedback(type === "positive" ? "👍 Translation was helpful!" : "👎 Translation needs improvement.");
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>Live Translation App</h1>
        <label>
          <input type="checkbox" onChange={toggleTheme} />
          {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </label>
      </header>

      <main>
        <div className="translation-container">
          <textarea
            placeholder="Enter text for translation..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="language-selectors">
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>
            </select>
            <span>to</span>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          <button onClick={handleTranslate}>Translate</button>
          <button onClick={handleVoiceInput}>
            {isVoiceInput ? "Listening..." : "Start Voice Input"}
          </button>
        </div>

        <div className="output-section">
          <h3>Translated Text</h3>
          <p>{translatedText}</p>

          <div className="feedback">
            <button onClick={() => handleFeedback("positive")}>👍</button>
            <button onClick={() => handleFeedback("negative")}>👎</button>
          </div>
          {feedback && <p>{feedback}</p>}
        </div>

        <div className="history-section">
          <h3>Translation History</h3>
          {history.length ? (
            <ul>
              {history.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.text}</strong> ➡️ {entry.translation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;