import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import Cell from '@/components/Cell';

describe('Cell.vue', () => {
  let localVue;
  let store;
  let wrapper;
  let cellCover;

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
    cellCover = wrapper.find('.cell__cover-button');
  });

  it('should should have cell properties from board', () => {
    // this is the first cell of the board
    expect(wrapper.vm.row).toBe(0);
    expect(wrapper.vm.column).toBe(0);
    expect(typeof wrapper.vm.isBomb).toBe('boolean');
    expect(wrapper.vm.isRevealed).toBeFalsy();
    expect(typeof wrapper.vm.surroundingBombCount).toBe('number');
    expect(wrapper.vm.surroundingCellCoordinates).toHaveLength(3);
  });

  it('should reveal what the cell is when clicked and mark as isRevealed as true', () => {
    expect(cellCover.exists()).toBeTruthy();
    expect(wrapper.props().isRevealed).toBeFalsy();

    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeTruthy();
    expect(wrapper.find('.cell__cover-button').exists()).toBeFalsy();
  });

  it('should flag cell as possible bomb or mystery and disable the cell cover button', () => {
    cellCover.trigger('contextmenu');

    expect(cellCover.classes('possible-bomb')).toBeTruthy();

    cellCover.trigger('contextmenu');

    expect(cellCover.classes('not-sure')).toBeTruthy();

    cellCover.trigger('contextmenu');

    expect(cellCover.classes('possible-bomb')).toBeFalsy();
    expect(cellCover.classes('not-sure')).toBeFalsy();
  });

  it('should not be able to reveal cell if flagged', () => {
    expect(wrapper.props().isRevealed).toBeFalsy();

    // flagged as possible bomb
    cellCover.trigger('contextmenu');
    cellCover.trigger('click');

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeFalsy();

    // flagged as not sure
    cellCover.trigger('contextmenu');
    cellCover.trigger('click');

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeFalsy();

    // not flagged
    cellCover.trigger('contextmenu');
    cellCover.trigger('click');

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeTruthy();
  });

  it('should have .is-flagged class if revealed while flagged', () => {
    expect(wrapper.find('.cell').classes('is-flagged')).toBeFalsy();

    cellCover.trigger('contextmenu');

    store.commit('revealCell', {
      row: wrapper.props().row,
      column: wrapper.props().column,
    });

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.find('.cell').classes('is-flagged')).toBeTruthy();
  });

  it('clicking cell shows content of cell', () => {
    const flattenedBoard = [].concat.apply([], store.state.board);
    const firstBomb = flattenedBoard.find((cell) => cell.isBomb);
    const firstCellNearBomb = flattenedBoard.find((cell) => cell.surroundingBombCount > 0);
    const firstCellNotNearBomb = flattenedBoard.find((cell) => cell.surroundingBombCount < 1);

    wrapper.setProps(firstBomb);
    cellCover.trigger('click');

    expect(wrapper.find('.cell').text()).toBe('●');

    wrapper.setProps(firstCellNearBomb);
    cellCover.trigger('click');

    expect(wrapper.find('.cell').text()).toBe('1');

    wrapper.setProps(firstCellNotNearBomb);
    cellCover.trigger('click');

    expect(wrapper.find('.cell').text()).toBe('');
  });
  // clicking a cell reveals what the cell is
    // if it's the first cell revealed, it starts a game timer
    // if cell is revealed to be a bomb, timer stops and it's game over
    // if a cell is not in proximity to any bombs, it will reveal the surrounding cells
  // right-clicking flags cell as bomb and disable it from being revealed,
  // right-clicking again flags cell as mystery and disable it from being revealed,
  // right-clicking once more will make the cell revealable again
});
