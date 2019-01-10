<template>
  <div class="game">
    <div class="game__controls">
      <select class="game__controls__difficulties" @change="onChange" v-model="difficulty">
        <option v-for="(value, key, index) in gameOptions"
                :key="index"
                :value="key"
                v-once>{{ value.optionText }}</option>
      </select>
      <!-- reset button -->
      <!-- game timer -->
    </div>
    <div class="game__board">
      <div v-for="(row, rowIndex) in board"
           :key="rowIndex"
           :style="{
             gridTemplateColumns: `repeat(${gameOptions[selectedDifficulty].columns}, 1fr)`
            }"
           class="game__board__row">
        <Cell v-for="(cell, cellIndex) in row" :key="cellIndex" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Cell from '@/components/Cell.vue';

export default {
  components: {
    Cell,
  },
  data() {
    return {
      difficulty: '',
    };
  },
  mounted() {
    this.difficulty = this.selectedDifficulty;
    this.createBoard(this.selectedDifficulty);
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
    onChange() {
      this.createBoard(this.difficulty);
    },
  },
};
</script>

<style lang="scss">
.game {
  &__controls {}
  &__board {
    &__row {
      display: grid;
    }
  }
}
</style>
