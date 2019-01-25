/* eslint-disable prefer-spread */
/* eslint-disable max-len */

export default {
  allBombs(state) {
    return [].concat.apply([], state.board).filter(cell => cell.isBomb);
  },
  totalBombFreeCells(state) {
    return (state.gameOptions[state.selectedDifficulty].rows * state.gameOptions[state.selectedDifficulty].columns) - state.gameOptions[state.selectedDifficulty].bombs;
  },
  gameWon(state, getters) {
    // return true if all cells without bombs are revealed
    return [].concat.apply([], state.board).filter(cell => cell.isRevealed && !cell.isBomb).length === getters.totalBombFreeCells;
  },
  gameOver(state, getters) {
    return getters.allBombs.every(cell => cell.isRevealed);
  },
  formattedRunningTime(state) {
    return `${('0' + Math.floor((state.runningTime / 60) % 60)).slice(-2)}:${('0' + Math.floor(state.runningTime % 60)).slice(-2)}`;
  },
};
