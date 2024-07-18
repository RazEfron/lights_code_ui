// LightDisplay.js
import React, { useState } from "react";
import "./LightDisplay.css";

const LightDisplay = ({ data, colors, index, isEditing, onUpdate }) => {
  const [lights, setLights] = useState(data.lights);

  const handleLightChange = (lightIndex) => {
    const newLights = [...lights];
    newLights[lightIndex] = !newLights[lightIndex];
    setLights(newLights);
  };

  const handleSave = () => {
    onUpdate(index, { ...data, lights });
  };

  return (
    <div className="light-display">
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
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LightDisplay;
