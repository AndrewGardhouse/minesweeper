import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import Game from '@/components/Game';

describe('Game.vue', () => {
  let localVue
  let store
  let wrapper

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store(sampleStore)

    wrapper = shallowMount(Game, {
      store,
      localVue
    });
  });

  it('sets the board on mounted', () => {
    expect(store.state.selectedDifficulty).toBe('easy');

    // rows
    expect(store.state.board.length).toBe(store.state.gameOptions['easy'].rows);

    // columns
    expect(store.state.board[0].length).toBe(store.state.gameOptions['easy'].columns);
  });

  it('can change the game difficulty', () => {
    const selectOptions = wrapper.findAll('option');

    expect(store.state.selectedDifficulty).toBe('easy');
    expect(store.state.board.length).toBe(store.state.gameOptions['easy'].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions['easy'].columns);

    selectOptions.at(1).trigger('change');

    expect(store.state.selectedDifficulty).toBe('medium');
    expect(store.state.board.length).toBe(store.state.gameOptions['medium'].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions['medium'].columns);
  });
});
