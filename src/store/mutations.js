/* eslint-disable no-param-reassign */

export default {
  addBoard(state, board) {
    state.board = board;
  },
  setSelectedDifficulty(state, difficulty) {
    state.selectedDifficulty = difficulty;
  },
  revealCell(state, coordinates) {
    const cell = state.board[coordinates.row][coordinates.column];
    cell.isRevealed = true;
    Object.assign(state.board[coordinates.row][coordinates.column], cell);
  }
};
