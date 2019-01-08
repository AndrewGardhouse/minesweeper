function getRandomNumber(max) {
  return Math.floor((Math.random() * 1000) + 1) % max;
}

export function createCell(row, column) {
  return {
    row,
    column,
    isBomb: false,
    bombProximity: null,
  }
}

export function createBoard(rows, columns, bombs) {
  const board = Array(rows).fill().map((row, rowIndex) => {
    return Array(columns).fill().map((column, columnIndex) => {
      return createCell(rowIndex, columnIndex);
    });
  });
  return addBombsToBoard(board, bombs);
}

export function addBombsToBoard(board, bombs) {
  const boardWithBombs = JSON.parse(JSON.stringify(board));
  while (bombs > 0) {
    let row = getRandomNumber(board.length);
    let column = getRandomNumber(board[0].length);

    if (!boardWithBombs[row][column].isBomb) {
      boardWithBombs[row][column].isBomb = true;
      bombs--;
    }
  }
  return boardWithBombs;
}
