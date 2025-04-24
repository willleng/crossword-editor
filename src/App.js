import React, { useState, useEffect } from 'react';
import { generateNumberedGrid } from './generateNumberedGrid';

function App() {
  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState(generateEmptyGrid(5));

  function generateEmptyGrid(size) {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ value: '', black: false }))
    );
  }

  // Automatically update clue numbers when the grid or size changes
  useEffect(() => {
    const numbered = generateNumberedGrid(grid);
    setGrid(numbered);
  }, [size]);

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    if (newSize >= 3 && newSize <= 25) {
      setSize(newSize);
      setGrid(generateEmptyGrid(newSize));
    }
  };

  const toggleBlack = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col].black = !newGrid[row][col].black;
    newGrid[row][col].value = '';
    setGrid(generateNumberedGrid(newGrid));
  };

  const handleInput = (e, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col].value = e.target.value.toUpperCase().slice(0, 1);
    setGrid(generateNumberedGrid(newGrid));
  };

  const exportToJson = () => {
    const data = {
      size,
      grid,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'puzzle.json';
    link.click();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🧩 Crossword Puzzle Editor</h1>
      <label>
        Grid Size (3–25):{' '}
        <input
          type="number"
          value={size}
          min={3}
          max={25}
          onChange={handleSizeChange}
        />
      </label>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 30px)`,
          gap: '2px',
          margin: '20px 0',
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              style={{
                position: 'relative',
                width: '30px',
                height: '30px',
                backgroundColor: cell.black ? 'black' : 'white',
                color: cell.black ? 'white' : 'black',
                border: '1px solid #ccc',
                textAlign: 'center',
              }}
              onClick={() => toggleBlack(rIdx, cIdx)}
            >
              {!cell.black && cell.number && (
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    fontSize: '10px',
                  }}
                >
                  {cell.number}
                </div>
              )}
              {!cell.black && (
                <input
                  type="text"
                  value={cell.value}
                  onChange={(e) => handleInput(e, rIdx, cIdx)}
                  style={{
                    width: '28px',
                    height: '28px',
                    border: 'none',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    paddingLeft: cell.number ? '10px' : '0',
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>

      <button onClick={exportToJson} style={{ padding: '10px 20px' }}>
        📤 Export Puzzle as JSON
      </button>
    </div>
  );
}

export default App;
