<template>
  <div class="cell">
    <button class="cell__cover-button"
         v-if="!isRevealed"
         :class="{
           'possible-bomb': possibleBomb,
           'not-sure': notSure,
         }"
         @click.left="revealCell({ row, column })"
         @click.right.prevent="flagCell"
         @click.alt.prevent="flagCell">
    </button>
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
  methods: {
    ...mapMutations([
      'revealCell',
    ]),
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
        return;
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
    &.possible-bomb::after {
      content: '⚑';
    }
    &.not-sure::after {
      content: '?';
      font-weight: bold;
    }
  }
}
</style>
