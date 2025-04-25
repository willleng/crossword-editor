export function extractClues(grid) {
    const across = [];
    const down = [];
  
    const size = grid.length;
  
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = grid[r][c];
        if (cell.black || !cell.number) continue;
  
        // Check for Across clue
        if (c === 0 || grid[r][c - 1].black) {
          let word = '';
          let col = c;
          while (col < size && !grid[r][col].black) {
            word += grid[r][col].value || '.';
            col++;
          }
          if (word.length > 1) {
            across.push({ number: cell.number, word });
          }
        }
  
        // Check for Down clue
        if (r === 0 || grid[r - 1][c].black) {
          let word = '';
          let row = r;
          while (row < size && !grid[row][c].black) {
            word += grid[row][c].value || '.';
            row++;
          }
          if (word.length > 1) {
            down.push({ number: cell.number, word });
          }
        }
      }
    }
  
    return { across, down };
  }
  