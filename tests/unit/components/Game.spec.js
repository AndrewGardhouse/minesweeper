import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createTestBoard } from '@/helpers';
import Game from '@/components/Game';
import Cell from '@/components/Cell';

describe('Game.vue', () => {
  let localVue
  let store
  let wrapper

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store(sampleStore)

    store.commit('addBoard', createTestBoard());
    store.commit('setSelectedDifficulty', 'test');

    wrapper = shallowMount(Game, {
      store,
      localVue,
      sync: false,
    });
  });

  it('can change the game difficulty', () => {
    const selectOptions = wrapper.find('select').findAll('option');

    selectOptions.at(2).setSelected();

    expect(store.state.selectedDifficulty).toBe('medium');
    expect(store.state.board.length).toBe(store.state.gameOptions['medium'].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions['medium'].columns);
  });

  it('has a reset button that starts a new game at the current difficulty', () => {
    const resetButton = wrapper.find('.game__controls__reset');

    store.commit('revealCell', [store.state.board[0][0].row, store.state.board[0][0].column]);
    expect(store.state.board[0][0].isRevealed).toBeTruthy();

    resetButton.trigger('click');

    expect(store.state.board[0][0].isRevealed).toBeFalsy();
  });
});
