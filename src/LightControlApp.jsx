// LightControlApp.jsx
import React, { useState } from "react";
import LightControlForm from "./LightControlForm";
import Timeline from "./Timeline";
import "./LightControlApp.css";
import ColorPicker from "./ColorPicker";
import { generateRainbowColors } from "./helpers/helpers";

const LightControlApp = () => {
  const [formData, setFormData] = useState([]);
  const [colors, setColors] = useState(generateRainbowColors(8));
  console.log(colors);

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
      <h1>Light Control App</h1>
      <div className="app-container">
        <div>
          <ColorPicker colors={colors} onColorChange={handleColorChange} />
          <LightControlForm
            onSubmit={handleFormSubmit}
            colors={colors}
            formData={formData}
          />
        </div>
        <Timeline formData={formData} colors={colors} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default LightControlApp;
