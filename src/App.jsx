import { useState, useEffect } from "react";
import Board from "./components/Board";
import Modal from "./components/Modal";

const App = () => {
  const [grid, setGrid] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(7).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (playerOne && playerTwo) {
      const randomStart = Math.random() < 0.5 ? "Red" : "Yellow";
      setCurrentPlayer(randomStart);
    }
  }, [playerOne, playerTwo]);

  const checkWinner = (grid) => {
    const checkLine = (a, b, c, d) => a && a === b && a === c && a === d;

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          checkLine(
            grid[row]?.[col],
            grid[row]?.[col + 1],
            grid[row]?.[col + 2],
            grid[row]?.[col + 3]
          ) ||
          checkLine(
            grid[row]?.[col],
            grid[row + 1]?.[col],
            grid[row + 2]?.[col],
            grid[row + 3]?.[col]
          ) ||
          checkLine(
            grid[row]?.[col],
            grid[row + 1]?.[col + 1],
            grid[row + 2]?.[col + 2],
            grid[row + 3]?.[col + 3]
          ) ||
          checkLine(
            grid[row]?.[col],
            grid[row + 1]?.[col - 1],
            grid[row + 2]?.[col - 2],
            grid[row + 3]?.[col - 3]
          )
        ) {
          return grid[row][col];
        }
      }
    }
    return null;
  };

  const handleClick = (colIndex) => {
    if (winner || !playerOne || !playerTwo || !currentPlayer) return;

    const newGrid = grid.map((row) => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (!newGrid[row][colIndex]) {
        newGrid[row][colIndex] = currentPlayer;
        const gameWinner = checkWinner(newGrid);
        setGrid(newGrid);
        if (gameWinner) {
          setWinner(gameWinner);
        } else {
          setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
        }
        break;
      }
    }
  };

  const resetGame = () => {
    setGrid(
      Array(6)
        .fill(null)
        .map(() => Array(7).fill(null))
    );
    setWinner(null);
    setCurrentPlayer(Math.random() < 0.5 ? "Red" : "Yellow");
  };

  const getPlayerName = (color) => {
    return color === "Red" ? playerOne : playerTwo;
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          width: "fit-content",
        }}
      >
        <h1>Connect Four</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Player 1 (Red)"
            value={playerOne}
            onChange={(e) => setPlayerOne(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 (Yellow)"
            value={playerTwo}
            onChange={(e) => setPlayerTwo(e.target.value)}
          />
        </div>

        {!playerOne || !playerTwo ? (
          <h3>Enter player names to start</h3>
        ) : (
          currentPlayer && (
            <h2>
              {!winner &&
                `${getPlayerName(currentPlayer)}'s turn (${currentPlayer})`}
            </h2>
          )
        )}

        <Board grid={grid} onColumnClick={handleClick} />

        {winner && (
          <Modal
            message={`${getPlayerName(winner)} wins!`}
            onClose={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export default App;
