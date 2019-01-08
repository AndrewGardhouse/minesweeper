export function createCell(row, column) {
  return {
    row,
    column,
    isBomb: false,
    bombProximity: null,
  }
}

export function createBoard(rows, columns) {
  return Array(rows).fill().map((row, rowIndex) => {
    return Array(columns).fill().map((column, columnIndex) => {
      return createCell(rowIndex, columnIndex);
    });
  });
}
