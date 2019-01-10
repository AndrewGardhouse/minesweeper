import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import Cell from '@/components/Cell';

describe('Cell.vue', () => {
  let localVue;
  let store;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store(sampleStore)

    store.dispatch('createBoard', 'test');

    wrapper = shallowMount(Cell, {
      propsData: store.state.board[0][0],
      store,
      localVue,
    });
  });

  it('should should have cell properties from board', () => {
    // this is the first cell of the board
    expect(wrapper.vm.row).toBe(0);
    expect(wrapper.vm.column).toBe(0);
    expect(wrapper.vm.isBomb).toBeFalsy();
    expect(wrapper.vm.isRevealed).toBeFalsy();
    expect(wrapper.vm.surroundingBombCount).toBe(0);
    expect(wrapper.vm.surroundingCellCoordinates).toHaveLength(3);
  });
  // clicking a cell reveals what the cell is
    // if it's the first cell revealed, it starts a game timer
    // if cell is revealed to be a bomb, timer stops and it's game over
    // if a cell is not in proximity to any bombs, it will reveal the surrounding cells
  // right-clicking flags cell as bomb and disable it from being revealed,
  // right-clicking again flags cell as mystery and disable it from being revealed,
  // right-clicking once more will make the cell revealable again
});
