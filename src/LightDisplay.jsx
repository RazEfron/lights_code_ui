// LightDisplay.js
import React, { useState } from "react";
import "./LightDisplay.css";

const LightDisplay = ({ data, colors, index, onUpdate }) => {
    console.log(data)
  const [lights, setLights] = useState(data.lights);

  const handleLightChange = (lightIndex) => {
    const newLights = [...lights];
    newLights[lightIndex] = !newLights[lightIndex];
    onUpdate(index, { ...data, lights: newLights });
    setLights(newLights);
  };

  const handleSave = () => {
    onUpdate(index, { ...data, lights });
  };

  return (
    <div className="light-display">
      <div className="lights timeline-lights">
        {lights.map((light, lightIndex) => (
          <div key={lightIndex} className="light-container no-margin">
            <label className="light rectangle">
              <input
                type="checkbox"
                checked={light}
                onChange={() => handleLightChange(lightIndex)}
                style={{ display: "none" }}
              />
              <span
                className={`light-indicator rect ${light ? "on" : "off"}`}
                style={{
                  backgroundColor: light ? colors[lightIndex] : "gray",
                  height: data.timeUnit
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightDisplay;
