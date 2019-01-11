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
    wrapper.vm.workers = [{}];
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

  it('should reveal what the cell is when clicked and mark as isRevealed as true', () => {
    const cellCover = wrapper.find('.cell__cover-button');

    expect(cellCover.exists()).toBeTruthy();
    expect(wrapper.props().isRevealed).toBeFalsy();

    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeTruthy();
    expect(wrapper.find('.cell__cover-button').exists()).toBeFalsy();
  });

  it('should flag cell as possible bomb or mystery and disable the cell cover button', () => {
    const cellCover = wrapper.find('.cell__cover-button');

    cellCover.trigger('contextmenu');

    expect(cellCover.classes('possible-bomb')).toBeTruthy();

    cellCover.trigger('contextmenu');

    expect(cellCover.classes('not-sure')).toBeTruthy();

    cellCover.trigger('contextmenu');

    expect(cellCover.classes('possible-bomb')).toBeFalsy();
    expect(cellCover.classes('not-sure')).toBeFalsy();
  });
  // clicking a cell reveals what the cell is
    // if it's the first cell revealed, it starts a game timer
    // if cell is revealed to be a bomb, timer stops and it's game over
    // if a cell is not in proximity to any bombs, it will reveal the surrounding cells
  // right-clicking flags cell as bomb and disable it from being revealed,
  // right-clicking again flags cell as mystery and disable it from being revealed,
  // right-clicking once more will make the cell revealable again
});
