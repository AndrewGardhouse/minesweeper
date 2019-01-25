<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <Game />
  </div>
</template>

<script>
import Game from '@/components/Game.vue';

export default {
  name: 'app',
  components: {
    Game,
  },
};
</script>

<style lang="scss">
body {
  // background-color: #f7f7f7;
  background-color: #393939;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1 {
  color: #7ED9C3;
}

.fade-enter-active {
  transition: none;
}
.fade-leave-active {
  transition: opacity .2s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
