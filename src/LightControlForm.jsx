import React, { useState } from "react";
import "./LightControlForm.css";

const LightControlForm = () => {
  const [lights, setLights] = useState(Array(8).fill(false));
  const [timeUnit, setTimeUnit] = useState(0.05);

  const handleLightChange = (index) => {
    const newLights = [...lights];
    newLights[index] = !newLights[index];
    setLights(newLights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const binaryString =
      "0b" + lights.map((light) => (light ? "1" : "0")).join("");
    const timeInMilliseconds = timeUnit * 1000;
    console.log(`Binary String: ${binaryString}`);
    console.log(`Time Unit in ms: ${timeInMilliseconds}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="lights">
        {lights.map((light, index) => (
          <label key={index} className="light">
            <input
              type="checkbox"
              checked={light}
              onChange={() => handleLightChange(index)}
            />
            <span className={`light-indicator ${light ? "on" : "off"}`}></span>
          </label>
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
  );
};

export default LightControlForm;
