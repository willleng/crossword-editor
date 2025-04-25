import React, { useState } from 'react';
import { generateNumberedGrid } from './generateNumberedGrid';
import { extractClues } from './extractClues';

function App() {
  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState(generateEmptyGrid(5));

  function generateEmptyGrid(size) {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ value: '', black: false }))
    );
  }

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
    setGrid(newGrid);
  };

  const handleInput = (e, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col].value = e.target.value.toUpperCase().slice(0, 1);
    setGrid(newGrid);
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

  const numberedGrid = generateNumberedGrid(grid);
  const { across, down } = extractClues(numberedGrid);

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
        {numberedGrid.map((row, rIdx) =>
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
                    top: 0,
                    left: 2,
                    fontSize: '8px',
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
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: '16px',
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

      <div style={{ marginTop: '20px' }}>
        <h2>📝 Clues</h2>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <h3>Across</h3>
            <ul>
              {across.map((clue) => (
                <li key={`across-${clue.number}`}>
                  <strong>{clue.number}</strong>: {clue.word}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Down</h3>
            <ul>
              {down.map((clue) => (
                <li key={`down-${clue.number}`}>
                  <strong>{clue.number}</strong>: {clue.word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
