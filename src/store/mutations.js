/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

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
  toggleIsTrigger(state, coordinates) {
    const [row, column] = coordinates;
    const cell = state.board[row][column];
    cell.isTrigger = true;
    Object.assign(state.board[row][column], cell);
  },
  setTimerInterval(state, interval) {
    state.timerInterval = interval;
  },
  increaseRunningTime(state) {
    state.runningTime++;
  },
  clearTimerInterval(state) {
    state.timerInterval = null;
  },
  resetRunningTime(state) {
    state.runningTime = 0;
  },
  updateFastestTime(state) {
    state.fastestTimes[state.selectedDifficulty] = state.runningTime;
  },
};
