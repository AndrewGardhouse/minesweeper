<template>
  <div class="cell">
    <div class="cell__cover"></div>
  </div>
</template>

<script>
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
  &__cover {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: grey;
    cursor: pointer;
  }
}
</style>
