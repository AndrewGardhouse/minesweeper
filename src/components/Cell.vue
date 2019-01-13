<template>
  <div class="cell"
       :class="{
         'is-flagged': (possibleBomb || notSure) && isRevealed
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
    <!-- bomb: &#x25CF; -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

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
  },
  data() {
    return {
      possibleBomb: false,
      notSure: false,
    };
  },
  computed: {
    cellContent() {
      if (this.isBomb) {
        return '●';
      }

      if (this.surroundingBombCount > 0) {
        return this.surroundingBombCount;
      } else {
        return '';
      }
    },
  },
  methods: {
    ...mapMutations([
      'revealCell',
    ]),
    onClick() {
      if (this.possibleBomb || this.notSure) {
        return;
      }
      const [row, column] = [this.row, this.column];

      this.revealCell({ row, column });
    },
    flagCell() {
      if (!this.possibleBomb && !this.notSure) {
        this.possibleBomb = true;
        return;
      }

      if (this.possibleBomb && !this.notSure) {
        this.possibleBomb = false;
        this.notSure = true;
        return;
      }

      if (this.notSure) {
        this.notSure = false;
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
  &.is-flagged {
    border-style: dashed;
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
