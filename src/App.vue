<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <Game />
    <v-dialog />
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
  margin-bottom: 15px;
}

.v--modal {
  background-color: #393939;
  color: #7ED9C3;
  border-radius: 0px;
  text-align: center;
  .dialog-c-title {
    font-size: 18px;
  }
  .vue-dialog-buttons {
    border-top-color: darkgrey;
    .vue-dialog-button {
      font-weight: bold;
      font-size: 14px !important;
    }
  }
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
