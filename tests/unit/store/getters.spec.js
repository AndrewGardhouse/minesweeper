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
});
