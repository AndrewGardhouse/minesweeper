/* eslint-disable no-param-reassign */

export default {
  addBoard(state, board) {
    state.board = board;
  },
  setSelectedDifficulty(state, difficulty) {
    state.selectedDifficulty = difficulty;
  },
  revealCell(state, coordinates) {
    const [row, column] = coordinates;
    const cell = state.board[row][column];
    cell.isRevealed = true;
    Object.assign(state.board[row][column], cell);
  },
};
