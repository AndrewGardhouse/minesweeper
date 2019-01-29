<template>
  <div class="game">
    <div class="game__controls">
      <button type="button"
              name="modal-button"
              class="game__controls__modal-button"
              @click="openModal"> Fastest Times</button>
      <select class="game__controls__difficulties" @change="changeGameDifficulties">
        <option v-for="(value, key, index) in gameOptions"
                :key="index"
                :value="key"
                :selected="key === selectedDifficulty"
                v-once>{{ value.optionText }}</option>
      </select>
      <button type="button"
              name="reset-button"
              class="game__controls__reset"
              @click="resetGame">Reset</button>
      <div class="game__controls__timer">{{ formattedRunningTime(runningTime) }}</div>
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
    if (this.board.length > 0 && this.revealedCells > 0 && !this.gameWon && !this.gameOver) {
      this.startTimer();
      return;
    }
    this.resetGame();
  },
  computed: {
    ...mapState([
      'gameOptions',
      'board',
      'selectedDifficulty',
      'fastestTimes',
      'runningTime',
    ]),
    ...mapGetters([
      'gameWon',
      'gameOver',
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
        this.setFastestTime();
      }
    },
  },
  methods: {
    ...mapActions([
      'createBoard',
      'startTimer',
      'stopTimer',
      'resetTimer',
      'setFastestTime',
    ]),
    resetGame() {
      this.createBoard(this.selectedDifficulty);
      this.resetTimer();
    },
    changeGameDifficulties(e) {
      this.createBoard(e.target.value);
      this.resetTimer();
    },
    formattedRunningTime(time = 0) {
      const minutes = `0${Math.floor((time / 60) % 60)}`;
      const seconds = `0${Math.floor(time % 60)}`;
      return `${minutes.slice(-2)}:${seconds.slice(-2)}`;
    },
    openModal() {
      const easyFastest = this.fastestTimes.easy ? this.formattedRunningTime(this.fastestTimes.easy) : 'N/A';
      const mediumFastest = this.fastestTimes.medium ? this.formattedRunningTime(this.fastestTimes.medium) : 'N/A';
      const hardFastest = this.fastestTimes.hard ? this.formattedRunningTime(this.fastestTimes.hard) : 'N/A';
      const veryHardFastest = this.fastestTimes.veryHard ? this.formattedRunningTime(this.fastestTimes.veryHard) : 'N/A';

      this.$modal.show('dialog', {
        title: 'Fastest Times',
        text: `
          <strong>Easy</strong>: ${easyFastest} <br>
          <strong>Medium</strong>: ${mediumFastest} <br>
          <strong>Hard</strong>: ${hardFastest} <br>
          <strong>Very Hard</strong>: ${veryHardFastest}
        `,
        buttons: [{ title: 'Close' }],
      });
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
    &__reset, &__difficulties, &__modal-button, &__timer {
      margin: auto 5px;
    }
    &__timer {
      color: #7ED9C3;
      line-height: 1;
      font-size: 16px;
    }
  }
  &__board {
    display: inline-block;
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
    font-size: 15px;
    &--win {
      color: #7ED9C3;
    }
    &--lose {
      color: #FF3838;
    }
  }
}
</style>
