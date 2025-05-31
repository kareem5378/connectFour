import React from "react";

const Cell = ({ value }) => (
  <div
    style={{
      width: 60,
      height: 60,
      borderRadius: "50%",
      backgroundColor: value || "lightgray",
      margin: 5,
      transition: "background-color 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }}
  />
);

const Board = ({ grid, onColumnClick }) => {
  return (
    <div style={{ display: "inline-block" }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => onColumnClick(colIndex)}
              style={{ cursor: "pointer" }}
            >
              <Cell value={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
