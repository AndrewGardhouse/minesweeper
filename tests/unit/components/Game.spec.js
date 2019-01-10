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

  it('can change the game difficulty', () => {
    const selectOptions = wrapper.findAll('option');

    expect(store.state.selectedDifficulty).toBe('easy');

    console.log(selectOptions.at(1).html());
    selectOptions.at(1).trigger('change');

    expect(store.state.selectedDifficulty).toBe('medium');
  });
});
