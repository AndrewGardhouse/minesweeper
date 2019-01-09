/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */

function getRandomNumber(max) {
  return Math.floor((Math.random() * 1000) + 1) % max;
}

export function createCell(row, column) {
  return {
    row,
    column,
    isBomb: false,
    bombProximity: null,
    surroundingCellCoordinates: [],
  };
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
    const row = getRandomNumber(board.length);
    const column = getRandomNumber(board[0].length);

    if (!boardWithBombs[row][column].isBomb) {
      boardWithBombs[row][column].isBomb = true;
      bombs--;
    }
  }
  return boardWithBombs;
}

export function getSurroundingCellCoordinates(board, cell) {
  const cells = [];

  // top cell
  if (cell.row > 0) {
    cells.push([cell.row - 1, cell.column]);
  }

  // bottom cell
  if (cell.row < board.length - 1) {
    cells.push([cell.row + 1, cell.column]);
  }

  // left cell
  if (cell.column > 0) {
    cells.push([cell.row, cell.column - 1]);
  }

  // right cell
  if (cell.column < board[0].length - 1) {
    cells.push([cell.row, cell.column + 1]);
  }

  // top-left cell
  if (cell.row > 0 && cell.column > 0) {
    cells.push([cell.row - 1, cell.column - 1]);
  }

  // top-right cell
  if (cell.row > 0 && cell.column < board[0].length - 1) {
    cells.push([cell.row - 1, cell.column + 1]);
  }

  // bottom-left cell
  if (cell.row < board.length - 1 && cell.column > 0) {
    cells.push([cell.row + 1, cell.column - 1]);
  }

  // bottom-right cell
  if (cell.row < board.length - 1 && cell.column < board[0].length - 1) {
    cells.push([cell.row + 1, cell.column + 1]);
  }

  return cells;
}
