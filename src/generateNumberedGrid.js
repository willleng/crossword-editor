export function generateNumberedGrid(grid) {
    const numberedGrid = grid.map(row => row.map(cell => ({ ...cell, number: null })));
    let count = 1;
  
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c].black) continue;
  
        const isStartOfAcross =
          c === 0 || grid[r][c - 1].black;
        const isStartOfDown =
          r === 0 || grid[r - 1][c].black;
  
        if (isStartOfAcross || isStartOfDown) {
          numberedGrid[r][c].number = count;
          count++;
        }
      }
    }
  
    return numberedGrid;
  }
  