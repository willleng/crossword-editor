export function generateNumberedGrid(grid) {
  let count = 1;
  const size = grid.length;
  const newGrid = grid.map((row, r) =>
    row.map((cell, c) => {
      const isBlack = cell.black;
      let shouldNumber = false;

      // Check if cell should be numbered
      if (!isBlack) {
        const isStartOfAcross =
          (c === 0 || grid[r][c - 1].black) && c + 1 < size && !grid[r][c + 1].black;
        const isStartOfDown =
          (r === 0 || grid[r - 1][c].black) && r + 1 < size && !grid[r + 1][c].black;

        if (isStartOfAcross || isStartOfDown) {
          shouldNumber = true;
        }
      }

      return {
        ...cell,
        number: shouldNumber ? count++ : undefined,
      };
    })
  );

  return newGrid;
}
