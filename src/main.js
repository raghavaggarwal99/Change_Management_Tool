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

export const EventBus = new Vue();

Vue.use(GoogleAuth, gauthOption)
Vue.use(VueCookie)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$vue = Vue

//Backend URLS
var url='http://127.0.0.1:1337/'

Vue.prototype.$Profile = url+'profile'
Vue.prototype.$Request = url+'request'

Vue.prototype.$Access = url+'access'

Vue.prototype.$Dashboard = url+'dashboard'

Vue.prototype.$ChangeRequestStatus = url+'changerequeststatus'

Vue.prototype.$ForgotPassword = url+'forgotpassword'

Vue.prototype.$Login = url+'login'

Vue.prototype.$Logs = url+'logs'

Vue.prototype.$SentRequests = url+'sentrequests'

Vue.prototype.$DeleteRequest = url+'deleterequest'

Vue.prototype.$ChangePassword = url+'changepassword'

Vue.prototype.$SignOut = url+'signout'
Vue.prototype.$GoogleSignIn = url+'googlesignin'

Vue.prototype.$SignOut = url+'signout'


/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
