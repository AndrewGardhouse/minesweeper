import Vue from 'vue';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createTestBoard } from '@/helpers';

Vue.use(Vuex);

describe('actions', () => {
  let store;
  const getBombCount = (board) => {
    return [].concat.apply([], board).filter(cell => cell.isBomb).length;
  };

  beforeEach(() => {
    store = new Vuex.Store(sampleStore);
    store.state.timerInterval = null;
    store.state.runningTime = 0;
    jest.clearAllTimers();
  });

  it('createBoard with easy difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'easy';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.selectedDifficulty).toBe(difficulty);
    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('createBoard with medium difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'medium';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.selectedDifficulty).toBe(difficulty);
    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('createBoard with hard difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'hard';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.selectedDifficulty).toBe(difficulty);
    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('createBoard with veryHard difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'veryHard';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.selectedDifficulty).toBe(difficulty);
    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('revealSurroundingCells', () => {
    store.commit('addBoard', createTestBoard());

    store.dispatch('revealSurroundingCells', store.state.board[0][0].surroundingCellCoordinates);

    expect(store.state.board[0][1].isRevealed).toBeTruthy();
    expect(store.state.board[0][2].isRevealed).toBeTruthy();
    expect(store.state.board[1][0].isRevealed).toBeTruthy();
    expect(store.state.board[1][1].isRevealed).toBeTruthy();
    expect(store.state.board[1][2].isRevealed).toBeTruthy();
    expect(store.state.board[2][0].isRevealed).toBeTruthy();
    expect(store.state.board[2][1].isRevealed).toBeTruthy();
    expect(store.state.board[2][2].isRevealed).toBeFalsy();
  });

  it('revealAllBombs', () => {
    store.commit('addBoard', createTestBoard());

    store.dispatch('revealAllBombs');

    expect(store.state.board[0][0].isRevealed).toBeFalsy();
    expect(store.state.board[0][1].isRevealed).toBeFalsy();
    expect(store.state.board[0][2].isRevealed).toBeFalsy();
    expect(store.state.board[1][0].isRevealed).toBeFalsy();
    expect(store.state.board[1][1].isRevealed).toBeFalsy();
    expect(store.state.board[1][2].isRevealed).toBeFalsy();
    expect(store.state.board[2][0].isRevealed).toBeFalsy();
    expect(store.state.board[2][1].isRevealed).toBeFalsy();
    expect(store.state.board[2][2].isRevealed).toBeTruthy();
  });

  it('startTimer', () => {
    expect(store.state.timerInterval).toBeNull();
    expect(store.state.runningTime).toBe(0);

    store.dispatch('startTimer');

    expect(store.state.timerInterval).not.toBeNull();
    jest.runTimersToTime(5000);
    expect(store.state.runningTime).toBe(5);
  });

  it('stopTimer', () => {
    expect(store.state.timerInterval).toBeNull();
    expect(store.state.runningTime).toBe(0);

    store.dispatch('startTimer');

    expect(store.state.timerInterval).not.toBeNull();
    jest.runTimersToTime(5000);
    expect(store.state.runningTime).toBe(5);

    store.dispatch('stopTimer');

    expect(store.state.timerInterval).toBeNull();
    expect(store.state.runningTime).toBe(5);
  });

  it('resetTimer', () => {
    expect(store.state.timerInterval).toBeNull();
    expect(store.state.runningTime).toBe(0);

    store.dispatch('startTimer');

    expect(store.state.timerInterval).not.toBeNull();
    jest.runTimersToTime(5000);
    expect(store.state.runningTime).toBe(5);

    store.dispatch('resetTimer');

    expect(store.state.timerInterval).toBeNull();
    expect(store.state.runningTime).toBe(0);
  });
});
