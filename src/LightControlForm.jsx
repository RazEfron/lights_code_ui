import React, { useState, useEffect } from "react";
import "./LightControlForm.css";

const LightControlForm = ({ onSubmit, colors }) => {
  const [lights, setLights] = useState(Array(8).fill(false));
  const [timeUnit, setTimeUnit] = useState(0.05);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyIndex = "12345678".indexOf(e.key);
      if (keyIndex !== -1) {
        handleLightChange(keyIndex);
      }
      if (e.key === "ArrowUp") {
        setTimeUnit((prevTimeUnit) => Math.max(prevTimeUnit - 0.05, 0.05));
      } else if (e.key === "ArrowDown") {
        setTimeUnit((prevTimeUnit) => Math.min(prevTimeUnit + 0.05, 1));
      }
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lights]);

  const handleLightChange = (index) => {
    const newLights = [...lights];
    newLights[index] = !newLights[index];
    setLights(newLights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { lights, timeUnit: timeUnit * 1000 };
    onSubmit(data);
    setLights(Array(8).fill(false));
    setTimeUnit(0.05);
  };

  return (
    <div className="color-form">
      <form  onSubmit={handleSubmit}>
        <div className="lights">
          {lights.map((light, index) => (
            <div key={index} className="light-container">
              <label className="light">
                <input
                  type="checkbox"
                  checked={light}
                  onChange={() => handleLightChange(index)}
                  style={{ display: "none" }}
                />
                <span
                  className={`light-indicator ${light ? "on" : "off"}`}
                  style={{ backgroundColor: light ? colors[index] : "gray" }}
                ></span>
              </label>
            </div>
          ))}
        </div>
        <div className="time-unit">
          <label>
            Time Unit (0.05 to 10 seconds):
            <input
              type="number"
              value={timeUnit}
              min="0.05"
              max="10"
              step="0.01"
              onChange={(e) => setTimeUnit(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button
        className="create-file-button"
        onClick={() => createInoFile(formData)}
      >
        Create .ino File
      </button>
    </div>
  );
};

export default LightControlForm;
