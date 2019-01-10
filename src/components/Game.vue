<template>
  <div class="game">
    <div class="game__controls">
      <select class="game__controls__difficulties">
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
  mounted() {
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
  },
};
</script>

<style lang="scss">
.game {
  &__controls {}
}
</style>
