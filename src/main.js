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
Vue.use(VueCookie)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$vue = Vue

Vue.prototype.$Profile = 'http://127.0.0.1:1337/profile'
Vue.prototype.$Request = 'http://127.0.0.1:1337/request'

Vue.prototype.$Access = 'http://127.0.0.1:1337/access'

Vue.prototype.$Dashboard = 'http://127.0.0.1:1337/dashboard'

Vue.prototype.$ChangeRequestStatus = 'http://127.0.0.1:1337/changerequeststatus'

Vue.prototype.$ForgotPassword = 'http://127.0.0.1:1337/forgotpassword'

Vue.prototype.$Login = 'http://127.0.0.1:1337/login'

Vue.prototype.$Logs = 'http://127.0.0.1:1337/logs'

Vue.prototype.$SentRequests = 'http://127.0.0.1:1337/sentrequests'

Vue.prototype.$DeleteRequest = 'http://127.0.0.1:1337/deleterequest'

Vue.prototype.$ChangePassword = 'http://127.0.0.1:1337/changepassword'

Vue.prototype.$SignOut = 'http://127.0.0.1:1337/signout'
Vue.prototype.$GoogleSignIn = 'http://127.0.0.1:1337/googlesignin'

Vue.prototype.$SignOut = 'http://127.0.0.1:1337/signout'


/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
