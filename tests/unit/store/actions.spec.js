import Vue from 'vue';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';

Vue.use(Vuex);

describe('actions', () => {
  let store;
  const getBombCount = (board) => {
    return [].concat.apply([], board).filter(cell => cell.isBomb).length;
  };

  beforeEach(() => {
    store = new Vuex.Store(sampleStore);
  });

  it('createBoard with easy difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'easy';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('createBoard with medium difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'medium';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('createBoard with hard difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'hard';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });

  it('createBoard with veryHard difficulty', () => {
    // creates a game board based on difficulty provided
    const difficulty = 'veryHard';
    store.dispatch('createBoard', difficulty);

    const bombCount = getBombCount(store.state.board);

    expect(store.state.board.length).toBe(store.state.gameOptions[difficulty].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions[difficulty].columns);
    expect(bombCount).toBe(store.state.gameOptions[difficulty].bombs);
  });
});
