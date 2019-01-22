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
    <div class="game__board"
         :class="{
           'game__board--game-over': gameOver,
           'game__board--game-won': gameWon,
         }">
      <div v-for="(row, rowIndex) in board"
           :key="rowIndex"
           class="game__board__row">
        <Cell v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              v-bind="cell" />
      </div>
    </div>
    <transition name="fade">
      <div class="game__message game__message--win" v-if="gameWon">
        You're a Winner!
      </div>
      <div class="game__message game__message--lose" v-if="gameOver">
        Game Over.
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapGetters([
      'gameWon',
      'gameOver',
    ]),
  },
  methods: {
    ...mapActions([
      'createBoard',
    ]),
    resetGame() {
      this.createBoard(this.selectedDifficulty);
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
    border: solid 5px lightslategrey;
    transition: border-color 0.3s;
    margin-bottom: 15px;
    &--game-over, &--game-won {
      pointer-events: none;
    }
    &--game-over {
      border-color: red;
    }
    &--game-won {
      border-color: limegreen;
    }
    &__row {
      display: flex;
    }
  }
  .game__message {
    font-weight: bold;
    &--win {
      color: green;
    }
    &--lose {
      color: red;
    }
  }
}
</style>
