import { createCell } from '@/helpers';

describe('helpers', () => {
  it('createCell returns an object representing a cell', () => {
    const row = 3;
    const column = 4;

    const cell = createCell(row, column);

    expect(cell.row).toBe(row);
    expect(cell.column).toBe(column);
    expect(cell.isBomb).toBeFalsy();
    expect(cell.bombProximity).toBeNull();
  })
})
