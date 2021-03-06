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
    isRevealed: false,
    isDisabled: false,
    possibleBomb: false,
    notSure: false,
    isTrigger: false,
    surroundingBombCount: null,
    surroundingCellCoordinates: [],
  };
}

export function createBoard(rows, columns, bombs = null) {
  let board = Array(rows).fill().map((row, rowIndex) => {
    return Array(columns).fill().map((column, columnIndex) => createCell(rowIndex, columnIndex));
  });

  if (bombs) {
    board = addBombsToBoard(board, bombs);
  }

  board = board.map((row) => {
    return row.map((cell) => {
      if (!cell.isBomb) {
        cell.surroundingCellCoordinates = getSurroundingCellCoordinates(board, cell);
        cell.surroundingBombCount = getSurroundingBombCount(board, cell);
      }
      return cell;
    });
  });

  return board;
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
  const hasCellAbove = cell.row > 0;
  const hasCellBelow = cell.row < board.length - 1;
  const hasCellToLeft = cell.column > 0;
  const hasCellToRight = cell.column < board[0].length - 1;

  // top cell
  if (hasCellAbove) {
    cells.push([cell.row - 1, cell.column]);
  }

  // bottom cell
  if (hasCellBelow) {
    cells.push([cell.row + 1, cell.column]);
  }

  // left cell
  if (hasCellToLeft) {
    cells.push([cell.row, cell.column - 1]);
  }

  // right cell
  if (hasCellToRight) {
    cells.push([cell.row, cell.column + 1]);
  }

  // top-left cell
  if (hasCellAbove && hasCellToLeft) {
    cells.push([cell.row - 1, cell.column - 1]);
  }

  // top-right cell
  if (hasCellAbove && hasCellToRight) {
    cells.push([cell.row - 1, cell.column + 1]);
  }

  // bottom-left cell
  if (hasCellBelow && hasCellToLeft) {
    cells.push([cell.row + 1, cell.column - 1]);
  }

  // bottom-right cell
  if (hasCellBelow && hasCellToRight) {
    cells.push([cell.row + 1, cell.column + 1]);
  }

  return cells;
}

export function getSurroundingBombCount(board, cell) {
  return cell.surroundingCellCoordinates.reduce((bombCount, currentCell) => {
    if (board[currentCell[0]][currentCell[1]].isBomb) {
      bombCount++;
    }
    return bombCount;
  }, 0);
}

export function createTestBoard() {
  let board = Array(3).fill().map((row, rowIndex) => {
    return Array(3).fill().map((column, columnIndex) => createCell(rowIndex, columnIndex));
  });

  board[2][2].isBomb = true;

  board = board.map((row) => {
    return row.map((cell) => {
      if (!cell.isBomb) {
        cell.surroundingCellCoordinates = getSurroundingCellCoordinates(board, cell);
        cell.surroundingBombCount = getSurroundingBombCount(board, cell);
      }
      return cell;
    });
  });

  return board;
}
