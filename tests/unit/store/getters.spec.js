import Vue from 'vue';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createTestBoard } from '@/helpers';

Vue.use(Vuex);

describe('getters', () => {
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

  it('gameWon', () => {
    expect(store.getters.gameWon).toBe(false);

    store.commit('revealCell', [store.state.board[0][0].row, store.state.board[0][0].column]);
    store.dispatch('revealSurroundingCells', store.state.board[0][0].surroundingCellCoordinates);

    expect(store.getters.gameWon).toBe(true);
  });

  it('gameOver', () => {
    expect(store.getters.gameOver).toBe(false);

    store.commit('revealCell', [store.state.board[2][2].row, store.state.board[2][2].column]);

    expect(store.getters.gameOver).toBe(true);
  });

  it('formattedRunningTime', () => {
    expect(store.getters.formattedRunningTime).toBe('00:00');

    store.state.runningTime = 127;

    expect(store.getters.formattedRunningTime).toBe('02:07');

    store.state.runningTime = 3;

    expect(store.getters.formattedRunningTime).toBe('00:03');
  })
});
