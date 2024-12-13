import React, { useState } from "react";

const TranslationOutput = ({ translation }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedback = (type) => {
    setFeedback(type === "up" ? "👍 Translation was helpful!" : "👎 Needs improvement.");
  };

  return (
    <div className="translation-output">
      <h3>Translated Text</h3>
      <p>{translation || "Your translation will appear here."}</p>
      <div className="feedback-buttons">
        <button onClick={() => handleFeedback("up")}>👍</button>
        <button onClick={() => handleFeedback("down")}>👎</button>
      </div>
      {feedback && <p className="feedback-message">{feedback}</p>}
    </div>
  );
};

export default TranslationOutput;