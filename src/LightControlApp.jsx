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
    console.log("Form Data:", formData);
    let fileContent = "";
    fileContent += `const int tu=250;        // time unit 0.25 seconds\n`;
    fileContent += `const int arr_length=${formData.length};\n\n`;
    fileContent += `int arrayA7out[ arr_length ] = { \n`;

    formData.forEach((data, index) => {
      let str = "  0b";
      data.lights.forEach((light, lightIndex) => {
        str += light ? "1" : "0";
      });
      fileContent += `${str}${index === formData.length - 1 ? "" : ","}\n`;
    });
    fileContent += ` };\n`;
    fileContent += `int arrayA7time[ arr_length ] = { \n`;
    formData.forEach((data, index) => {
      fileContent += `  ${data.timeUnit * 1000}${
        index === formData.length - 1 ? "" : ","
      }\n`;
    });

    fileContent += ` };\n\n`;
    // Map arrays function
    fileContent += `void map_arrays() {          // list of pointers with the addresses of the\n`;
    fileContent += `  // arrays\n`;
    formData.forEach((data, index) => {
      fileContent += `  EL_ArrayTime[${index}]=(int*)array${data.id}time;\n`;
      fileContent += `  EL_ArrayOut[${index}]=(int*)array${data.id}out;\n`;
    });
    fileContent += `}\n\n`;

    // Array sizes
    fileContent += `const int arr_sizes[${formData.length}] = {${formData
      .map((data) => data.lights.length)
      .join(",")}};  // array of the array sizes\n\n`;

    // Input array
    fileContent += `const int inpArr[${formData.length}]={${formData
      .map((data, index) => `A${index + 2}`)
      .join(",")}};\n\n`;

    // Setup function
    fileContent += `void setup() \n{\n`;
    formData.forEach((data, index) => {
      fileContent += `  pinMode(A${index + 2}, INPUT); \n`;
    });
    fileContent += `  int x;\n`;
    fileContent += `  for (x=2;x<10;x++)\n`;
    fileContent += `  {\n`;
    fileContent += `    pinMode(x, OUTPUT);\n`;
    fileContent += `  }\n`;
    fileContent += `  map_arrays();\n`;
    fileContent += `  Serial.begin(9600);\n`;
    fileContent += `  digitalWrite(2, HIGH);\n`;
    fileContent += `}\n\n`;

    // Loop function
    fileContent += `void loop()\n{\n`;
    fileContent += `  for (int idx=0; idx<${formData.length}; idx++)\n`;
    fileContent += `  {\n`;
    fileContent += `    Serial.print("idx = ");\n`;
    fileContent += `    Serial.println(idx);\n`;
    fileContent += `    {\n`;
    fileContent += `      Serial.print("run = ");\n`;
    fileContent += `      int status=idx+1;  // mark as running\n`;
    fileContent += `      Serial.print("stat = ");\n`;
    fileContent += `      Serial.println(status);\n`;
    fileContent += `      int ptr=0;\n`;
    fileContent += `      long ctime=0xffffffff;\n`;
    fileContent += `      doOutput(EL_ArrayOut[idx],0);   // start sequence\n`;
    fileContent += `      }\n`;
    fileContent += `      if (status==(idx+1) && (millis()>ctime))\n`;
    fileContent += `      {\n`;
    fileContent += `        ptr++;\n`;
    fileContent += `        if(ptr==arr_sizes[idx]) {ptr=0;}\n`;
    fileContent += `        Serial.print("Ptr = ");\n`;
    fileContent += `        Serial.println(ptr);\n`;
    fileContent += `        ctime+=EL_ArrayTime[idx][ptr];\n`;
    fileContent += `        Serial.print("ctimN = ");\n`;
    fileContent += `        Serial.println(ctime);\n`;
    fileContent += `        Serial.print("cArr = ");\n`;
    fileContent += `        Serial.println(curout[ptr]);\n`;
    fileContent += `        doOutput(curout,ptr);   // do step in sequence\n`;
    fileContent += `      }\n`;
    fileContent += `    }\n`;
    fileContent += `    delay(50);\n`;
    fileContent += `}\n\n`;

    // Output function
    fileContent += `void doOutput(int myArr[],int myptr)\n{\n`;
    fileContent += `  int inx;\n`;
    fileContent += `  Serial.print("Ptr = ");\n`;
    fileContent += `  Serial.println(myptr);\n`;
    fileContent += `  Serial.print("Arr = ");\n`;
    fileContent += `  Serial.println(myArr[myptr]);\n`;
    fileContent += `  for (inx=0; inx<8; inx++)\n`;
    fileContent += `  {\n`;
    fileContent += `    if ((1<<inx) & myArr[myptr])\n`;
    fileContent += `    {\n`;
    fileContent += `      digitalWrite(inx+2, HIGH);\n`;
    fileContent += `    }\n`;
    fileContent += `    else\n`;
    fileContent += `    {\n`;
    fileContent += `      digitalWrite(inx+2, LOW);\n`;
    fileContent += `    }\n`;
    fileContent += `  }\n`;
    fileContent += `}\n\n`;

    // Clear function
    fileContent += `void doClear(void)\n{\n`;
    fileContent += `  int j;\n`;
    fileContent += `  for (j=2;j<10;j++)\n`;
    fileContent += `  {\n`;
    fileContent += `    digitalWrite(5, LOW);\n`;
    fileContent += `  }\n`;
    fileContent += `  digitalWrite(5, HIGH);\n`;
    fileContent += `}\n\n`;

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
      <LightControlForm onSubmit={handleFormSubmit} colors={colors} />
      <Timeline formData={formData} colors={colors} onUpdate={handleUpdate} />
      <button className="create-file-button" onClick={createInoFile}>
        Create .ino File
      </button>
    </div>
  );
};

export default LightControlApp;
