// Timeline.js
import React from "react";
import "./Timeline.css";
import LightDisplay from "./LightDisplay";

const Timeline = ({ formData, colors, onUpdate }) => {
  const handleSave = (index, updatedTimeUnit) => {
    onUpdate(index, { ...formData[index], timeUnit: updatedTimeUnit });
  };

  return (
    <div className="timeline">
      {formData.map((data, index) => (
        <div key={index} className={`timeline-segment`}>
          <div className="timeline-lights">
            <LightDisplay
              data={data}
              colors={colors}
              index={index}
              onUpdate={onUpdate}
            />
          </div>
          <div className="timeline-controls">
            <label>
              Time Unit (0.05 to 10 seconds):
              <input
                type="number"
                value={data.timeUnit / 1000}
                min="0.05"
                max="10"
                step="0.01"
                onChange={(e) => handleSave(index, parseFloat(e.target.value) * 1000)}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
