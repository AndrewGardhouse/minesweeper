export function createCell(row, column) {
  return {
    row,
    column,
    isBomb: false,
    bombProximity: null,
  }
}
