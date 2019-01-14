import { createCell, createBoard, addBombsToBoard, getSurroundingCellCoordinates, getSurroundingBombCount, createTestBoard } from '@/helpers';

describe('helpers', () => {
  const getBombCount = (board) => {
    return [].concat.apply([], board).filter(cell => cell.isBomb).length;
  }

  it('createCell returns an object representing a cell', () => {
    const row = 3;
    const column = 4;

    const cell = createCell(row, column);

    expect(cell.row).toBe(row);
    expect(cell.column).toBe(column);
    expect(cell.isBomb).toBe(false);
    expect(cell.isRevealed).toBe(false);
    expect(cell.possibleBomb).toBe(false);
    expect(cell.notSure).toBe(false);
    expect(cell.surroundingBombCount).toBeNull();
    expect(cell.surroundingCellCoordinates).toEqual([]);
  });

  it('createBoard creates a 2D array representing the board', () => {
    const rows = 9;
    const columns = 9;
    const bombs = 10;

    const board = createBoard(rows, columns, bombs);
    const firstCell = board[0][0];

    expect(board.length).toBe(rows);
    expect(board[0].length).toBe(columns);
    expect(firstCell).toMatchObject({
      column: 0,
      row: 0,
    });
    expect(firstCell.surroundingCellCoordinates).toEqual(expect.arrayContaining([[0, 1], [1, 1], [1, 0]]));
    expect(typeof firstCell.surroundingBombCount).toBe('number');
    expect(getBombCount(board)).toBe(bombs);
  });

  it('addBombsToBoard flags random cells as bombs', () => {
    const rows = 9;
    const columns = 9;
    const bombs = 10;

    const board = createBoard(rows, columns);
    const boardWithBombs = addBombsToBoard(board, bombs);

    expect(getBombCount(boardWithBombs)).toBe(bombs);
  });

  it('getSurroundingCellCoordinates gets coordinates of surrounding cells', () => {
    const rows = 3;
    const columns = 3;
    const bombs = 1;

    const board = createBoard(rows, columns, bombs);
    const topLeftCornerCell = board[0][0];
    const centerCell = board[1][1];
    const bottomRightCell = board[2][2];

    const topLeftCornerCellCoordinates = getSurroundingCellCoordinates(board, topLeftCornerCell);
    const centerCellCoordinates = getSurroundingCellCoordinates(board, centerCell);
    const bottomRightCellCoordinates = getSurroundingCellCoordinates(board, bottomRightCell);

    expect(topLeftCornerCellCoordinates).toEqual(expect.arrayContaining([[0, 1], [1, 1], [1, 0]]));
    expect(centerCellCoordinates).toEqual(expect.arrayContaining([[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0] ]));
    expect(bottomRightCellCoordinates).toEqual(expect.arrayContaining([[2, 1], [1, 1], [1, 2] ]));
  });

  it('getSurroundingBombCount returns number of surrounding bombs', () => {
    const rows = 3;
    const columns = 3;

    const board = createBoard(rows, columns);
    expect(getBombCount(board)).toBe(0);

    board[0][0].isBomb = true;

    expect(getBombCount(board)).toBe(1);

    expect(getSurroundingBombCount(board, board[2][2])).toBe(0);
    expect(getSurroundingBombCount(board, board[1][1])).toBe(1);
  });

  it('creates a board for tests', () => {
    const board = createTestBoard();

    // rows
    expect(board.length).toBe(3)
    // columns
    expect(board[0].length).toBe(3)

    expect(getBombCount(board)).toBe(1);
    expect(board[2][2].isBomb).toBeTruthy();
  });
})
