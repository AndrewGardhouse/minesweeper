<template>
  <div class="cell"
       :class="{
         'is-flagged-possible-bomb': possibleBomb && isRevealed,
         'is-flagged-not-sure': notSure && isRevealed,
       }">
    <button class="cell__cover-button"
         v-if="!isRevealed"
         :class="{
           'possible-bomb': possibleBomb,
           'not-sure': notSure,
         }"
         @click.left="onClick"
         @click.right.prevent="flagCell"
         @click.alt.prevent="flagCell">
    </button>
    {{ cellContent }}
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  props: {
    row: {
      type: Number,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
    isBomb: {
      type: Boolean,
      required: true,
    },
    isRevealed: {
      type: Boolean,
      required: true,
    },
    surroundingBombCount: {
      type: Number,
      required: true,
    },
    surroundingCellCoordinates: {
      type: Array,
      required: true,
    },
    possibleBomb: {
      type: Boolean,
      required: true,
    },
    notSure: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    cellContent() {
      let content = '';
      if (this.surroundingBombCount > 0) {
        content = this.surroundingBombCount;
      }

      if (this.isBomb) {
        content = '●';
      }

      return content;
    },
  },
  methods: {
    ...mapMutations([
      'revealCell',
      'togglePossibleBomb',
      'toggleNotSure',
    ]),
    ...mapActions([
      'revealSurroundingCells',
    ]),
    onClick() {
      if (this.possibleBomb || this.notSure) {
        return;
      }

      this.revealCell([this.row, this.column]);

      if (!this.isBomb && this.surroundingBombCount < 1) {
        this.revealSurroundingCells(this.surroundingCellCoordinates);
      }
    },
    flagCell() {
      if (!this.possibleBomb && !this.notSure) {
        // this.possibleBomb = true;
        this.togglePossibleBomb([this.row, this.column]);
        return;
      }

      if (this.possibleBomb && !this.notSure) {
        // this.possibleBomb = false;
        this.togglePossibleBomb([this.row, this.column]);
        this.toggleNotSure([this.row, this.column]);
        // this.notSure = true;
        return;
      }

      if (this.notSure) {
        // this.notSure = false;
        this.toggleNotSure([this.row, this.column]);
      }
    },
  },
};
</script>

<style lang="scss">
.cell {
  border: 1px solid grey;
  border-radius: 2px;
  width: 22px;
  height: 22px;
  margin: 1px;
  position: relative;
  &.is-flagged-possible-bomb, &.is-flagged-not-sure {
    border-style: dashed;
  }
  &.is-flagged-possible-bomb {
    border-color: green;
  }
  &.is-flagged-not-sure {
    border-color: blue;
  }
  &__cover-button {
    position: absolute;
    left: 0;
    border:none;
    height: 100%;
    width: 100%;
    background-color: grey;
    padding: 0;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &.possible-bomb, &.not-sure {
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 16px;
    }
    &.possible-bomb {
      background-color: green;
      &::after {
        content: '⚑';
      }
    }
    &.not-sure {
      background-color: blue;
      &::after {
        content: '?';
        font-weight: bold;
      }
    }
  }
}
</style>
