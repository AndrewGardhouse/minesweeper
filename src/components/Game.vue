<template>
  <div class="game">
    <div class="game__options">
      <select class="game__options__dropdown">
        <option v-for="(value, key, index) in gameOptions"
                :key="index"
                :value="key"
                @change="createBoard(key)"
                v-once>{{ value.optionText }}</option>
      </select>
      <!-- reset button -->
      <!-- game timer -->
    </div>
    <div class="game__board">
      <!-- cells -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'gameOptions',
    ]),
  },
  methods: {
    ...mapActions([
      'createBoard',
    ]),
  },
};
</script>

<style lang="scss">
.game {
  &__options {

  }
}
</style>
