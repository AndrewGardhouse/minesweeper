<template>
  <div class="game">
    <div class="game__timer">Run Time: {{ formattedRunningTime }}</div>
    <div class="game__controls">
      <select class="game__controls__difficulties" @change="changeGameDifficulties">
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
    </div>
    <div class="game__board"
         :class="{
           'game__board--game-over': gameOver,
           'game__board--game-won': gameWon,
         }">
      <div v-for="(row, rowIndex) in board"
           :key="rowIndex"
           class="game__board__row"
           :class="{
             'game__board__row--first': rowIndex === 0,
             'game__board__row--last': rowIndex === board.length - 1,
           }">
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
/* eslint-disable no-unused-vars */
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
      'formattedRunningTime',
      'revealedCells',
    ]),
  },
  watch: {
    revealedCells(newVal, oldVal) {
      if (oldVal === 0 && !this.gameOver) {
        this.startTimer();
      }
    },
    gameWon(newVal, oldVal) {
      if (newVal) {
        this.stopTimer();
      }
    },
    gameOver(newVal, oldVal) {
      if (newVal) {
        this.stopTimer();
      }
    },
  },
  methods: {
    ...mapActions([
      'createBoard',
      'startTimer',
      'stopTimer',
      'resetTimer',
    ]),
    resetGame() {
      this.createBoard(this.selectedDifficulty);
      this.resetTimer();
    },
    changeGameDifficulties(e) {
      this.createBoard(e.target.value);
      this.resetTimer();
    },
  },
};
</script>

<style lang="scss">
.game {
  &__controls {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    &__reset, &__difficulties {
      margin: auto 5px;
    }
  }
  &__timer {
    color: #7ED9C3;
    margin-bottom: 15px;
  }
  &__board {
    display: inline-block;
    // padding: 1.5px;
    border: solid 7px darkgrey;
    transition: border-color 0.3s;
    margin-bottom: 15px;
    &--game-over, &--game-won {
      pointer-events: none;
    }
    &--game-over {
      border-color: #FF3838;
    }
    &--game-won {
      border-color: #7ED9C3;
    }
    &__row {
      display: flex;
      margin-left: 1px;
      margin-right: 1px;
      margin-top: 1px;
      &--first {
        margin-top: 1px;
      }
      &--last {
        margin-bottom: 1px;
      }
    }
  }
  .game__message {
    font-weight: bold;
    &--win {
      color: #7ED9C3;
    }
    &--lose {
      color: #FF3838;
    }
  }
}
</style>
