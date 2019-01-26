import Vue from 'vue';
import VModal from 'vue-js-modal'
import App from '@/App.vue';
import store from '@/store';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VModal, { dialog: true });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
