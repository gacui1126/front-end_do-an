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
