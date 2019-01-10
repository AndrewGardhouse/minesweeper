import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
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

    wrapper = shallowMount(Game, {
      store,
      localVue
    });
  });

  it('sets the board on mounted', () => {
    expect(store.state.selectedDifficulty).toBe('easy');

    expect(store.state.board.length).toBe(store.state.gameOptions['easy'].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions['easy'].columns);
  });

  it('can change the game difficulty', () => {
    const selectOptions = wrapper.find('select').findAll('option');

    expect(store.state.selectedDifficulty).toBe('easy');
    expect(store.state.board.length).toBe(store.state.gameOptions['easy'].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions['easy'].columns);

    selectOptions.at(2).setSelected();

    expect(store.state.selectedDifficulty).toBe('medium');
    expect(store.state.board.length).toBe(store.state.gameOptions['medium'].rows);
    expect(store.state.board[0].length).toBe(store.state.gameOptions['medium'].columns);
  });

  it('should have the correct amount of Cells', () => {
    const selectOptions = wrapper.find('select').findAll('option');
    let cells = wrapper.findAll(Cell);
    let totalCellCount = store.state.gameOptions[store.state.selectedDifficulty].columns *store.state.gameOptions[store.state.selectedDifficulty].rows;

    selectOptions.at(2).setSelected();

    totalCellCount = store.state.gameOptions[store.state.selectedDifficulty].columns *store.state.gameOptions[store.state.selectedDifficulty].rows;

    expect(cells.length).toBe(totalCellCount);
  });
});