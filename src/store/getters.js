/* eslint-disable prefer-spread */

export default {
  allBombs(state) {
    return [].concat.apply([], state.board).filter(cell => cell.isBomb);
  },
};
