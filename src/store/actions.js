/* eslint-disable max-len */
import { createBoard } from '@/helpers';

export default {
  createBoard({ commit, state }, difficulty) {
    const { rows, columns, bombs } = state.gameOptions[difficulty];
    const board = createBoard(rows, columns, bombs);

    commit('setSelectedDifficulty', difficulty);
    commit('addBoard', board);
  },
  revealSurroundingCells({ dispatch, commit, state }, surroundingCells) {
    surroundingCells.forEach((cellCoords) => {
      const [row, column] = cellCoords;
      if (state.board[row][column].isBomb || state.board[row][column].isRevealed) {
        return;
      }

      commit('revealCell', cellCoords);

      if (state.board[row][column].surroundingBombCount < 1) {
        dispatch('revealSurroundingCells', state.board[row][column].surroundingCellCoordinates);
      }
    });
  },
  revealAllBombs({ commit, getters }) {
    getters.allBombs.forEach(cell => commit('revealCell', [cell.row, cell.column]));
  },
  startTimer({ commit }) {
    const timerInterval = setInterval(() => {
      commit('increaseRunningTime');
    }, 1000);

    commit('setTimerInterval', timerInterval);
  },
  stopTimer({ commit, state }) {
    clearInterval(state.timerInterval);
    commit('clearTimerInterval');
  },
  resetTimer({ commit, state }) {
    clearInterval(state.timerInterval);
    commit('clearTimerInterval');
    commit('resetRunningTime');
  },
  setFastestTime({ commit, state }) {
    const gameDifficulty = state.selectedDifficulty;

    // if the current fastest time with the selectedDifficulty is null
    // or the current runningTime is less than the fastestTime set for that selectedDifficulty
    // update the fastest time for the selectedDifficulty
    if (!state.fastestTimes[gameDifficulty] || state.fastestTimes[gameDifficulty] > state.runningTime) {
      commit('updateFastestTime');
    }
  },
};
