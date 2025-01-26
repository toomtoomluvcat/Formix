"use client"

import { useState } from "react";

export default function DynamicColorManager() {
  const [components, setComponents] = useState([
    { id: "header", colors: ["#ff0000", "#00ff00"] },
    { id: "button", colors: ["#0000ff"] },
    { id: "background", colors: ["#ffffff", "#cccccc", "#333333"] },
  ]);

  // อัปเดตสีของ component
  const updateColor = (componentId: string, colorIndex: number, newColor: string) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId
          ? {
              ...component,
              colors: component.colors.map((color, index) =>
                index === colorIndex ? newColor : color
              ),
            }
          : component
      )
    );
  };

  // เพิ่มสีใหม่ใน component
  const addColor = (componentId: string) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId
          ? { ...component, colors: [...component.colors, "#000000"] } // สีเริ่มต้นเป็นดำ
          : component
      )
    );
  };

  // ลบสีใน component
  const removeColor = (componentId: string, colorIndex: number) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId
          ? {
              ...component,
              colors: component.colors.filter((_, index) => index !== colorIndex),
            }
          : component
      )
    );
  };

  return (
    <div>
      <h1>Dynamic Color Manager</h1>
      {components.map((component) => (
        <div key={component.id} style={{ marginBottom: "20px" }}>
          <h2>{component.id}</h2>
          {component.colors.map((color, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <label>Color {index + 1}:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(component.id, index, e.target.value)}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              <button onClick={() => removeColor(component.id, index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addColor(component.id)} style={{ marginTop: "10px" }}>
            Add New Color
          </button>
        </div>
      ))}

      <h2>Preview:</h2>
      {components.map((component) => (
        <div
          key={component.id}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <span>{component.id}:</span>
          {component.colors.map((color, index) => (
            <div
              key={index}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
