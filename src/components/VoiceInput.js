import React, { useState } from "react";

const VoiceInput = ({ onTranslate }) => {
  const [isListening, setIsListening] = useState(false);
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = fromLang;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onTranslate(text, fromLang, toLang);
    };
    recognition.start();
    setIsListening(true);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <div className="voice-input">
      <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="ja">Japanese</option>
      </select>
      <span>to</span>
      <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="ja">Japanese</option>
      </select>
      <button onClick={startListening}>
        {isListening ? "Listening..." : "Start Voice Input"}
      </button>
    </div>
  );
};

export default VoiceInput;