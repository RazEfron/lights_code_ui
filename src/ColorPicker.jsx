import "./ColorPicker.css";

const ColorPicker = ({ colors, onColorChange }) => {
  return (
    <div className="color-picker">
      <h2>Choose Light Colors:</h2>
      <div className="color-picker-container">
        {colors.map((color, index) => (
          <div key={index} className="color-picker-item">
            <label>
              Color{index + 1}
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
