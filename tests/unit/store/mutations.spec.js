import Vue from 'vue';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createBoard } from '@/helpers';

Vue.use(Vuex);

describe('mutations', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store(sampleStore);
    store.state.timerInterval = null;
    store.state.runningTime = 0;
    jest.clearAllTimers();
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

  it('toggleIsTrigger', () => {
    store.commit('setSelectedDifficulty', 'test');

    expect(store.state.board[2][2].isTrigger).toBe(false);

    store.commit('toggleIsTrigger', [
      store.state.board[2][2].row,
      store.state.board[2][2].column,
    ]);

    expect(store.state.board[2][2].isTrigger).toBe(true);
  });

  it('setTimerInterval', () => {
    expect(store.state.timerInterval).toBeNull();

    const timerInterval = setInterval(() => {
      console.log('hi');
    }, 1000);

    store.commit('setTimerInterval', timerInterval);

    expect(store.state.timerInterval).not.toBeNull();
  });

  it('increaseRunningTime', () => {
    expect(store.state.runningTime).toBe(0);

    store.commit('increaseRunningTime');

    expect(store.state.runningTime).toBe(1);

    store.commit('increaseRunningTime');

    expect(store.state.runningTime).toBe(2);
  });

  it('clearTimerInterval', () => {
    expect(store.state.timerInterval).toBeNull();

    const timerInterval = setInterval(() => {
      console.log('hi');
    }, 1000);

    store.commit('setTimerInterval', timerInterval);

    expect(store.state.timerInterval).not.toBeNull();

    store.commit('clearTimerInterval');

    expect(store.state.timerInterval).toBeNull();
  });

  it('resetRunningTime', () => {
    store.commit('increaseRunningTime');
    store.commit('increaseRunningTime');

    expect(store.state.runningTime).toBe(2);

    store.commit('resetRunningTime');

    expect(store.state.runningTime).toBe(0);
  });
})
