export function generateNumberedGrid(grid) {
  let number = 1;
  const numberedGrid = grid.map((row, rIdx) =>
    row.map((cell, cIdx) => {
      if (!cell.black) {
        // Check if the cell should be numbered
        const isFirstInRow = cIdx === 0 || grid[rIdx][cIdx - 1].black;
        const isFirstInColumn = rIdx === 0 || grid[rIdx - 1][cIdx].black;

        // Number the cell if it's the first in a row or column
        if (isFirstInRow || isFirstInColumn) {
          cell.number = number++;
        }
      }
      return cell;
    })
  );

  return numberedGrid;
}
