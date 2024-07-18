import React, { useState } from "react";
import "./LightDisplay.css";

const LightDisplay = ({ data, index, colors, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lights, setLights] = useState(data.lights);
  const [timeUnit, setTimeUnit] = useState(data.timeUnit);

  const handleLightChange = (lightIndex) => {
    const newLights = [...lights];
    newLights[lightIndex] = !newLights[lightIndex];
    setLights(newLights);
  };

  const handleTimeChange = (e) => {
    console.log(e.target.value);
    setTimeUnit(parseFloat(e.target.value * 1000));
  };

  const handleSave = () => {
    onUpdate(index, { lights, timeUnit });
    setIsEditing(false);
  };

  return (
    <div className="light-display">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="lights">
            {lights.map((light, lightIndex) => (
              <div key={lightIndex} className="light-container">
                <label className="light">
                  <input
                    type="checkbox"
                    checked={light}
                    onChange={() => handleLightChange(lightIndex)}
                    style={{ display: "none" }}
                  />
                  <span
                    className={`light-indicator ${light ? "on" : "off"}`}
                    style={{
                      backgroundColor: light ? colors[lightIndex] : "gray",
                    }}
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
                value={timeUnit / 1000}
                min="0.05"
                max="10"
                step="0.01"
                onChange={handleTimeChange}
              />
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="light-data">
          <div className="lights">
            {lights.map((light, lightIndex) => (
              <div key={lightIndex} className="light-container">
                <span
                  className={`light-indicator ${light ? "on" : "off"}`}
                  style={{
                    backgroundColor: light ? colors[lightIndex] : "gray",
                  }}
                ></span>
              </div>
            ))}
          </div>
          <div className="time-unit">
            <p>Time Unit (ms): {timeUnit}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default LightDisplay;
