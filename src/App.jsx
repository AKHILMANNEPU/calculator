import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.body.className = theme; // apply theme to body
  }, [theme]);

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const res = eval(input).toString();
        setResult(res);
        setHistory([...history, `${input} = ${res}`]);
        setInput(res);
      } catch {
        setResult("Error");
      }
    } else if (value === "AC") {
      setInput("");
      setResult("");
    } else if (value === "+/-") {
      setInput(input ? (-1 * parseFloat(input)).toString() : "");
    } else if (value === "%") {
      setInput(input ? (parseFloat(input) / 100).toString() : "");
    } else {
      setInput(input + value);
    }
  };

  // handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [input]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const buttons = [
    "AC", "+/-", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=",
  ];

  return (
    <div className={`calculator-container ${theme}`}>
      <h2 className="title">Akhilesh's Calculator</h2>

      {/* Toggle Switch */}
      <div className="toggle-switch" onClick={toggleTheme}>
        <div className={`switch ${theme}`}></div>
      </div>

      {/* Display */}
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={`btn ${btn === "0" ? "zero" : ""}`}
            onClick={() =>
              handleButtonClick(
                btn === "×" ? "*" : btn === "÷" ? "/" : btn
              )
            }
          >
            {btn}
          </button>
        ))}
      </div>

      {/* History */}
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
