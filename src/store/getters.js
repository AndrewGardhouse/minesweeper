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
};
