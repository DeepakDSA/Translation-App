import React, { useState } from "react";

const TextInput = ({ onTranslate }) => {
  const [text, setText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");

  const handleTranslate = () => {
    if (text.trim()) {
      onTranslate(text, fromLang, toLang);
      setText("");
    }
  };

  return (
    <div className="text-input">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for translation..."
      />
      <div className="language-select">
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
      </div>
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
};

export default TextInput;