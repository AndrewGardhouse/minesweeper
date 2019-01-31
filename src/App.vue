<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <Game />
    <div class="links">
      <a href="https://chrome.google.com/webstore/detail/minesweeper-extension/mlbddfjjjedjeablobkakcbmenmpkoag?hl=en"
         target="_blank"
         rel="noopener noreferrer">
        <img src="@/assets/chrome.png" alt="Chrome Store">
      </a>
      <a href="https://github.com/AndrewGardhouse/minesweeper"
         target="_blank"
         rel="noopener noreferrer">
        <img src="@/assets/octocat.png" alt="Github Octocat">
      </a>
    </div>
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
  background-color: #393939 !important;
  color: #7ED9C3;
  border-radius: 0px !important;
  text-align: center !important;
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

.links {
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    margin: auto 10px;
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
