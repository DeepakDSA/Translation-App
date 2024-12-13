import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="feedback-form">
      <h3>Submit Your Feedback</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your thoughts on the app..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;