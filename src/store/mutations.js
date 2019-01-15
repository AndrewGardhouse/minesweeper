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
  togglePossibleBomb(state, coordinates) {
    const [row, column] = coordinates;
    const cell = state.board[row][column];
    cell.possibleBomb = !cell.possibleBomb;
    Object.assign(state.board[row][column], cell);
  },
  toggleNotSure(state, coordinates) {
    const [row, column] = coordinates;
    const cell = state.board[row][column];
    cell.notSure = !cell.notSure;
    Object.assign(state.board[row][column], cell);
  },
  toggleGameOver(state, isGameOver) {
    state.gameOver = isGameOver;
  }
};
