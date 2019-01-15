import Vue from 'vue';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createBoard } from '@/helpers';

Vue.use(Vuex);

describe('mutations', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store(sampleStore);
  });

  it('addBoard', () => {
    const rows = 9;
    const columns = 9;
    const bombs = 10;

    const board = createBoard(rows, columns, bombs);
    store.commit('addBoard', board);

    expect(store.state.board).toMatchObject(board);
  });

  it('setSelectedDifficulty', () => {
    const difficulty = 'hard';

    store.commit('setSelectedDifficulty', difficulty);

    expect(store.state.selectedDifficulty).toBe(difficulty);
  });

  it('revealCell', () => {
    store.commit('setSelectedDifficulty', 'test');

    expect(store.state.board[0][0].isRevealed).toBeFalsy();

    store.commit('revealCell', [
      store.state.board[0][0].row,
      store.state.board[0][0].column,
    ]);

    expect(store.state.board[0][0].isRevealed).toBeTruthy();
  });

  it('togglePossibleBomb', () => {
    store.commit('setSelectedDifficulty', 'test');

    expect(store.state.board[0][0].possibleBomb).toBeFalsy();

    store.commit('togglePossibleBomb', [
      store.state.board[0][0].row,
      store.state.board[0][0].column,
    ]);

    expect(store.state.board[0][0].possibleBomb).toBeTruthy();
  });

  it('toggleNotSure', () => {
    store.commit('setSelectedDifficulty', 'test');

    expect(store.state.board[0][0].notSure).toBeFalsy();

    store.commit('toggleNotSure', [
      store.state.board[0][0].row,
      store.state.board[0][0].column,
    ]);

    expect(store.state.board[0][0].notSure).toBeTruthy();
  });

  it('toggleGameOver', () => {
    expect(store.state.gameOver).toBe(false);

    store.commit('toggleGameOver', true);

    expect(store.state.gameOver).toBe(true);
  });
})
