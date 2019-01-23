<template>
  <div class="cell"
       :class="{
         'cell--is-flagged-possible-bomb': possibleBomb && isRevealed,
         'cell--is-flagged-not-sure': notSure && isRevealed,
         'cell--is-trigger': isTrigger && isRevealed,
       }">
    <transition name="fade">
      <button class="cell__button"
           v-if="!isRevealed"
           :class="{
             'cell__button--possible-bomb': possibleBomb,
             'cell__button--not-sure': notSure,
           }"
           @click.left="onClick"
           @click.right.prevent="flagCell"
           @click.alt.prevent="flagCell">
      </button>
    </transition>
    <span class="cell__content"
          :class="cellContentClass"
          v-if="cellContent">
      {{ cellContent }}
    </span>
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
    isDisabled: {
      type: Boolean,
      required: true,
    },
    surroundingBombCount: {
      type: Number,
      required: false,
    },
    surroundingCellCoordinates: {
      type: Array,
      required: false,
    },
    possibleBomb: {
      type: Boolean,
      required: true,
    },
    notSure: {
      type: Boolean,
      required: true,
    },
    isTrigger: {
      type: Boolean,
      required: true,
    },
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
    cellContentClass() {
      let contentClass = 'cell__content--is-bomb';

      if (this.surroundingBombCount > 0) {
        if (this.surroundingBombCount == 1) {
          contentClass = 'cell__content--1-bomb';
        } else {
          contentClass = `cell__content--${this.surroundingBombCount}-bombs`;
        }
      }

      return contentClass;
    },
  },
  methods: {
    ...mapMutations([
      'revealCell',
      'togglePossibleBomb',
      'toggleNotSure',
      'toggleIsTrigger',
    ]),
    ...mapActions([
      'revealSurroundingCells',
      'revealAllBombs',
    ]),
    onClick() {
      if (this.possibleBomb || this.notSure) {
        return;
      }

      this.revealCell([this.row, this.column]);

      if (this.isBomb) {
        this.toggleIsTrigger([this.row, this.column]);
        this.revealAllBombs();
        return;
      }

      if (!this.isBomb && this.surroundingBombCount < 1) {
        this.revealSurroundingCells(this.surroundingCellCoordinates);
      }
    },
    flagCell() {
      if (!this.possibleBomb && !this.notSure) {
        this.togglePossibleBomb([this.row, this.column]);
        return;
      }

      if (this.possibleBomb && !this.notSure) {
        this.togglePossibleBomb([this.row, this.column]);
        this.toggleNotSure([this.row, this.column]);
        return;
      }

      if (this.notSure) {
        this.toggleNotSure([this.row, this.column]);
      }
    },
  },
};
</script>

<style lang="scss">
.cell {
  border: 1px solid lightslategrey;
  border-radius: 2px;
  width: 22px;
  height: 22px;
  margin: 1px;
  padding: 1px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  &--is-trigger {
    background-color: red;
    border-color: red;
    color: white;
  }
  &--is-flagged-bomb-game-over {
    background-color: green;
    color: white;
  }
  &--is-flagged-possible-bomb, &--is-flagged-not-sure {
    border-width: 2px;
    padding: 0;
  }
  &--is-flagged-possible-bomb {
    border-color: green;
  }
  &--is-flagged-not-sure {
    border-color: blue;
  }
  &__content {
    &--is-bomb {
      font-size: 18px;
    }
    &--1-bomb {
      color: royalblue;
    }
    &--2-bombs {
      color: forestgreen;
    }
    &--3-bombs {
      color: orangered;
    }
    &--4-bombs {
      color: darkblue;
    }
    &--5-bombs {
      color: saddlebrown;
    }
    &--6-bombs {
      color: darkcyan;
    }
    &--7-bombs {
      color: black;
    }
    &--8-bombs {
      color: slategrey;
    }
  }
  &__button {
    position: absolute;
    left: 0;
    border:none;
    height: 100%;
    width: 100%;
    background-color: lightslategrey;
    padding: 0;
    color: white;
    transition: background-color 0.2s;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #8f9dab;
    }
    &--possible-bomb, &--not-sure {
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 16px;
    }
    &--possible-bomb {
      background-color: green;
      &::after {
        content: '⚑';
      }
    }
    &--not-sure {
      background-color: blue;
      &::after {
        content: '?';
        font-weight: bold;
      }
    }
  }
}
</style>
