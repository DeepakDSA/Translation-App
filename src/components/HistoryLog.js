import React from "react";
import { useHistory } from "../HistoryContext";

const HistoryLog = () => {
  const { history } = useHistory();

  return (
    <div className="history-log">
      <h3>Translation History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>From:</strong> {item.text} <br />
              <strong>To:</strong> {item.translation} <br />
              <small>
                {item.fromLang} → {item.toLang}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default HistoryLog;