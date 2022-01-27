import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store';
import axios from 'axios';
import VueRouter from 'vue-router'
import {routes} from './Router';
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Multiselect from 'vue-multiselect';
import locale from 'view-design/dist/locale/en-US';

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

import vueAwesomeCountdown from 'vue-awesome-countdown';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import VueAutosizer from 'vue-autosizer'
import 'vue-autosizer/dist/vue-autosizer.min.css'
import VueElElements from 'vue-el-element'
import vueSmoothScroll from 'vue-smooth-scroll'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')
window.Laravel = {'csrfToken': '{{csrf_token()}}'}
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'local',
  authEndpoint: 'http://localhost:8080/api/broadcasting/auth',
  cluster: 'ap1',
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
})


Vue.use(vueSmoothScroll)
 
Vue.use(VueElElements)
 
Vue.use(VueAutosizer)
Vue.use(VueSweetalert2);
Vue.use(vueAwesomeCountdown, 'vac');



Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);


Vue.use(ViewUI, { locale });

Vue.component('multiselect', Multiselect)

Vue.use(Toaster, {timeout: 2000})

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueRouter)

axios.defaults.baseURL = 'http://localhost:8080/';

import '../node_modules/bootstrap/dist/css/bootstrap.css'

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
