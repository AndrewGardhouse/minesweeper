<template>
  <div class="game">
    <div class="game__controls">
      <select class="game__controls__difficulties" @change="createBoard($event.target.value)">
        <option v-for="(value, key, index) in gameOptions"
                :key="index"
                :value="key"
                :selected="key === selectedDifficulty"
                v-once>{{ value.optionText }}</option>
      </select>
      <button type="button"
              name="button"
              class="game__controls__reset"
              @click="resetGame">Reset</button>
      <!-- game timer -->
    </div>
    <div class="game__board">
      <div v-for="(row, rowIndex) in board"
           :key="rowIndex"
           class="game__board__row">
        <Cell v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              v-bind="cell" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Cell from '@/components/Cell.vue';

export default {
  components: {
    Cell,
  },
  mounted() {
    this.resetGame();
  },
  computed: {
    ...mapState([
      'gameOptions',
      'board',
      'selectedDifficulty',
    ]),
  },
  methods: {
    ...mapActions([
      'createBoard',
    ]),
    ...mapMutations([
      'toggleGameOver',
    ]),
    resetGame() {
      this.createBoard(this.selectedDifficulty);
      this.toggleGameOver(false);
    },
  },
};
</script>

<style lang="scss">
.game {
  &__controls {
    margin-bottom: 15px;
  }
  &__board {
    display: inline-block;
    padding: 1.5px;
    border: solid 3px dimgray;
    &__row {
      display: flex;
    }
  }
}
</style>
