import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sampleStore from '../../sample-store.js';
import { createTestBoard } from '@/helpers';
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

    store.commit('addBoard', createTestBoard());
    store.commit('setSelectedDifficulty', 'test');

    wrapper = shallowMount(Cell, {
      propsData: {
        gameOver: store.getters.gameOver,
        gameWon: store.getters.gameWon,
        ...store.state.board[0][0]
      },
      store,
      localVue,
    });
    wrapper.vm.workers = [{}];
    cellCover = wrapper.find('.cell__button');
  });

  it('should should have cell properties from board', () => {
    // this is the first cell of the board
    expect(wrapper.props().row).toBe(0);
    expect(wrapper.props().column).toBe(0);
    expect(wrapper.props().isBomb).toBe(false);
    expect(wrapper.props().isRevealed).toBe(false);
    expect(wrapper.props().isDisabled).toBe(false);
    expect(wrapper.props().possibleBomb).toBe(false);
    expect(wrapper.props().notSure).toBe(false);
    expect(wrapper.props().surroundingBombCount).toBe(0);
    expect(wrapper.props().surroundingCellCoordinates).toHaveLength(3);
  });

  it('should reveal what the cell is when clicked and mark as isRevealed as true', () => {
    expect(cellCover.exists()).toBeTruthy();
    expect(wrapper.props().isRevealed).toBeFalsy();

    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeTruthy();
    expect(wrapper.find('.cell__button').exists()).toBeFalsy();
  });

  it('should flag cell as possible bomb or mystery and disable the cell cover button', () => {
    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    expect(cellCover.classes('cell__button--possible-bomb')).toBeTruthy();

    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    expect(cellCover.classes('cell__button--not-sure')).toBeTruthy();

    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    expect(cellCover.classes('cell__button--possible-bomb')).toBeFalsy();
    expect(cellCover.classes('cell__button--not-sure')).toBeFalsy();
  });

  it('should not be able to reveal cell if flagged', () => {
    expect(wrapper.props().isRevealed).toBeFalsy();

    // flagged as possible bomb
    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeFalsy();

    // flagged as not sure
    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeFalsy();

    // not flagged
    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeTruthy();
  });

  it('should have .is-flagged-possible-bomb class if revealed while flagged as possibleBomb', () => {
    expect(wrapper.find('.cell').classes('cell__button--is-flagged-possible-bomb')).toBeFalsy();

    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    store.commit('revealCell', [
      wrapper.props().row,
      wrapper.props().column,
    ]);

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.find('.cell').classes('cell--is-flagged-possible-bomb')).toBeTruthy();
  });

  it('should have .is-flagged-not-sure class if revealed while flagged as notSure', () => {
    expect(wrapper.find('.cell').classes('cell--is-flagged-not-sure')).toBeFalsy();

    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    cellCover.trigger('contextmenu');
    wrapper.setProps({ possibleBomb: store.state.board[0][0].possibleBomb });
    wrapper.setProps({ notSure: store.state.board[0][0].notSure });

    store.commit('revealCell', [
      wrapper.props().row,
      wrapper.props().column,
    ]);

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.find('.cell').classes('cell--is-flagged-not-sure')).toBeTruthy();
  });

  it('clicking cell shows content of cell', () => {
    const cellNearBomb = store.state.board[1][2];
    const cellNotNearBomb = store.state.board[0][0];

    wrapper.setProps(cellNearBomb);
    cellCover.trigger('click');

    expect(wrapper.find('.cell').text()).toBe('1');

    wrapper.setProps(cellNotNearBomb);
    cellCover.trigger('click');

    expect(wrapper.find('.cell').text()).toBe('');
  });

  it('reveals surrounding cells when clicked', () => {
    // surrounding Cells without bombs
    cellCover.trigger('click');
    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    expect(wrapper.props().isRevealed).toBeTruthy();
    expect(store.state.board[0][1].isRevealed).toBeTruthy();
    expect(store.state.board[0][2].isRevealed).toBeTruthy();
    expect(store.state.board[1][0].isRevealed).toBeTruthy();
    expect(store.state.board[1][1].isRevealed).toBeTruthy();
    expect(store.state.board[1][2].isRevealed).toBeTruthy();
    expect(store.state.board[2][0].isRevealed).toBeTruthy();
    expect(store.state.board[2][1].isRevealed).toBeTruthy();
    expect(store.state.board[2][2].isRevealed).toBeFalsy();
  });

  it('reveals only clicked cell is near at least 1 bomb', () => {
    wrapper.setProps(store.state.board[1][1]);

    cellCover.trigger('click');

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    wrapper.props().surroundingCellCoordinates.forEach((cellCoords) => {
      const [row, column] = cellCoords;
      expect(store.state.board[row][column].isRevealed).toBeFalsy();
    });
  });

  it('reveals only clicked cell if is bomb', () => {
    wrapper.setProps(store.state.board[2][2]);

    cellCover.trigger('click');

    wrapper.setProps({ isRevealed: store.state.board[0][0].isRevealed });

    wrapper.props().surroundingCellCoordinates.forEach((cellCoords) => {
      const [row, column] = cellCoords;
      expect(store.state.board[row][column].isRevealed).toBeFalsy();
    });
  });

  it('cellContentClass should return the correct class', () => {
    wrapper.setProps(store.state.board[1][1]);
    expect(wrapper.vm.cellContentClass).toBe('cell__content--1-bomb');

    wrapper.setProps(store.state.board[2][2]);
    expect(wrapper.vm.cellContentClass).toBe('cell__content--is-bomb');
  });

  // if it's the first cell revealed, it starts a game timer
  // if cell is revealed to be a bomb, timer stops and it's game over
});
