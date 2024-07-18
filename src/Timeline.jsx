// Timeline.js
import React, { useState } from "react";
import "./Timeline.css";
import LightDisplay from "./LightDisplay";

const Timeline = ({ formData, colors, onUpdate }) => {
  const [editIndices, setEditIndices] = useState([]);
  const [editedTimeUnit, setEditedTimeUnit] = useState(null);

  const handleSave = () => {
    editIndices.forEach((index) => {
      onUpdate(index, { ...formData[index], timeUnit: editedTimeUnit });
    });
    setEditIndices([]);
  };

  const handleTimeChange = (e) => {
    setEditedTimeUnit(parseFloat(e.target.value));
  };

  return (
    <div className="timeline">
      {formData.map((data, index) => (
        <div
          key={index}
          className={`timeline-segment ${
            editIndices.includes(index) ? "editing" : ""
          }`}
        >
          <div className="timeline-lights">
            <LightDisplay
              data={data}
              colors={colors}
              index={index}
              isEditing={editIndices.includes(index)}
              onUpdate={onUpdate}
            />
          </div>
          <div className="timeline-controls">
            <label>
              Time Unit (0.05 to 10 seconds):
              <input
                type="number"
                value={editedTimeUnit}
                min="0.05"
                max="10"
                step="0.01"
                onChange={handleTimeChange}
              />
            </label>
          </div>
        </div>
      ))}
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Timeline;
