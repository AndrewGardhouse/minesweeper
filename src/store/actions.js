import { createBoard } from '@/helpers';

export default {
  createBoard({ commit, state }, difficulty) {
    const { rows, columns, bombs } = state.gameOptions[difficulty];
    const board = createBoard(rows, columns, bombs);

    commit('setSelectedDifficulty', difficulty);
    commit('addBoard', board);
  },
};
