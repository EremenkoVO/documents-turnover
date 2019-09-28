import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './route';
import store from './store';
import * as fb from 'firebase'; 

Vue.config.productionTip = false;

new Vue({
  vuetify, router, store,
  render: h => h(App),
  created () {
    // Конфиг для инициализции firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDAKHRa3riX47AIfPO0n8Ro1HLRFWhrRfE",
      authDomain: "documents-turnover.firebaseapp.com",
      databaseURL: "https://documents-turnover.firebaseio.com",
      projectId: "documents-turnover",
      storageBucket: "documents-turnover.appspot.com",
      messagingSenderId: "227151566424",
      appId: "1:227151566424:web:59bf1aff5a8180d3e05c2d"
    };

    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
  },
}).$mount('#app');
