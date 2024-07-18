import React, { useState } from "react";
import LightControlForm from "./LightControlForm";
import Timeline from "./Timeline";
import "./LightControlApp.css";

const LightControlApp = () => {
  const [formData, setFormData] = useState([]);
  const [colors, setColors] = useState(Array(8).fill("#ff0000"));

  const handleFormSubmit = (data) => {
    const newData = { ...data, id: Date.now() };
    setFormData((prevData) => [...prevData, newData]);
  };

  const handleUpdate = (index, updatedData) => {
    const newFormData = [...formData];
    newFormData[index] = updatedData;
    setFormData(newFormData);
  };

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  return (
    <div className="LightControlApp">
      <h1>Light Control Forms</h1>
      <LightControlForm onSubmit={handleFormSubmit} colors={colors} />
      <div className="color-picker">
        <h2>Choose Light Colors:</h2>
        <div className="color-picker-container">
          {colors.map((color, index) => (
            <div key={index} className="color-picker-item">
              <label>
                Light {index + 1} Color:
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      <Timeline formData={formData} colors={colors} onUpdate={handleUpdate} />
    </div>
  );
};

export default LightControlApp;
