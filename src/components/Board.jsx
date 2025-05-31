const Cell = ({ value }) => (
  <div
    style={{
      width: "100%",
      aspectRatio: "1",
      borderRadius: "50%",
      backgroundColor: value || "lightgray",
      transition: "background-color 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }}
  />
);

const Board = ({ grid, onColumnClick }) => {
  const numCols = grid[0].length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gap: "8px",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onColumnClick(colIndex)}
            style={{
              width: "100%",
              cursor: "pointer",
            }}
          >
            <Cell value={cell} />
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
