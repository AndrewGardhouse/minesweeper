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
})