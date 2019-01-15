import Vue from 'vue';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createTestBoard } from '@/helpers';

Vue.use(Vuex);

describe('actions', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(sampleStore);
    store.commit('addBoard', createTestBoard());
  });

  it('allBombs', () => {
    expect(store.getters.allBombs).toHaveLength(1);
    expect(store.getters.allBombs).toContainEqual(store.state.board[2][2]);
  });

  it('totalBombFreeCells', () => {
    store.dispatch('createBoard', 'test');

    const bombFreeCells = 8;

    expect(store.getters.totalBombFreeCells).toBe(bombFreeCells);
  });

  it('allNonBombsRevealed', () => {
    expect(store.getters.allNonBombsRevealed).toBe(false);

    store.commit('revealCell', [store.state.board[0][0].row, store.state.board[0][0].column]);
    store.dispatch('revealSurroundingCells', store.state.board[0][0].surroundingCellCoordinates);

    expect(store.getters.allNonBombsRevealed).toBe(true);
  });
});
