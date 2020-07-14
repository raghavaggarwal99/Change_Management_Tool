import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
import axios from 'axios'
import GoogleAuth from '@/config/google_oAuth.js'
import VueCookie from 'vue-cookie'

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);


const gauthOption = {
  clientId: '347183469368-jqn8u16tg5rkivjapvpp8lpcl394190f.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GoogleAuth, gauthOption)
Vue.use(VueCookie )

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$vue = Vue

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
