import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

export default {
  state: {
    ...state,
    gameOptions: {
      test: {
        columns: 3,
        rows: 3,
        bombs: 0,
        optionText: 'Test (3x3, Add your own bombs)',
      },
      ...state.gameOptions,
    },
  },
  actions,
  mutations,
}
