import React, { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addHistory = (item) => {
    setHistory((prevHistory) => [...prevHistory, item]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};