import React from "react";
const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

const getXY = (index, rowCount) => {
  return { x: index % rowCount, y: Math.floor(index / rowCount) };
};

const getWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const a = getXY(lines[i][0], 3);
    const b = getXY(lines[i][1], 3);
    const c = getXY(lines[i][2], 3);

    if (
      board[a.y][a.x] &&
      board[a.y][a.x] === board[b.y][b.x] &&
      board[a.y][a.x] === board[c.y][c.x]
    ) {
      return board[a.y][a.x];
    }
  }

  return null;
};

const Square = React.memo(({ value, rowIndex, cellIndex, onClick }) => {
  return (
    <div
      className="square"
      style={squareStyle}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        onClick(rowIndex, cellIndex);
      }}
    >
      {value}
    </div>
  );
});

const Board = () => {
  const [board, setBoard] = React.useState(Array(3).fill(Array(3).fill(null)));
  const [xIsNext, setXisNext] = React.useState(true);
  const winner = getWinner(board);

  const handleClick = (rId, cId) => {
    if (winner || board[rId][cId]) return;

    const nextBoard = board.map((row, rowIndex) => {
      if (rowIndex !== rId) return row;
      return row.map((cell, cellIndex) => {
        if (cellIndex !== cId) return cell;
        return xIsNext ? "X" : "O";
      });
    });

    setBoard(nextBoard);
    setXisNext(!xIsNext);
  };

  const resetButtonFn = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
  };

  return (
    <div>
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>
          Next player: {xIsNext ? "X" : "O"}
        </div>

        <div className="winner" style={instructionsStyle}>
          {board.flat().includes(null)
            ? ` Winner: ${winner ? winner : "?"}`
            : `Draw`}
        </div>
        <button style={buttonStyle} onClick={resetButtonFn}>
          Reset
        </button>
        <div style={boardStyle}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row" style={rowStyle}>
              {row.map((cell, cellIndex) => (
                <Square
                  key={cellIndex}
                  value={cell}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  onClick={handleClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
