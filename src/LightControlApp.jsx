// LightControlApp.jsx
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

  const createInoFile = () => {
    // Prepare content for .ino file
    let fileContent = `// Arduino .ino file\n`;
    formData.forEach((data, index) => {
      fileContent += `// Form ${index + 1}:\n`;
      fileContent += `// Lights: ${data.lights.join(", ")}\n`;
      fileContent += `// Time Unit: ${data.timeUnit}\n\n`;
    });

    // Create a Blob with the file content
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a link element
    const a = document.createElement("a");
    a.href = url;
    a.download = "arduino_code.ino"; // Set the file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    URL.revokeObjectURL(url);
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
      <button className="create-file-button" onClick={createInoFile}>
        Create .ino File
      </button>
    </div>
  );
};

export default LightControlApp;
