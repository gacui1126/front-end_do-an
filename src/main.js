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

Vue.use(Toaster, {timeout: 5000})
Vue.use(ViewUI);

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
