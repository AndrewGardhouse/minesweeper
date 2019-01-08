import { createCell, createBoard } from '@/helpers';

describe('helpers', () => {
  it('createCell returns an object representing a cell', () => {
    const row = 3;
    const column = 4;

    const cell = createCell(row, column);

    expect(cell.row).toBe(row);
    expect(cell.column).toBe(column);
    expect(cell.isBomb).toBeFalsy();
    expect(cell.bombProximity).toBeNull();
  });

  it('createBoard creates a 2D array representing the board', () => {
    const rows = 9;
    const columns = 9;

    const board = createBoard(rows, columns);
    const firstCell = board[0][0];

    expect(board.length).toBe(rows);
    expect(board[0].length).toBe(columns);
    expect(board[0][0]).toMatchObject({
      column: 0,
      row: 0,
    });
  })
})
