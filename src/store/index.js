import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import isShow from './modules/isShow';
import createUser from './modules/createUser';
import teamManager from './modules/teamManager';
import project from './modules/project';
import message from './modules/message';
import myWork from './modules/myWork';

// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
  modules: {
    auth,
    isShow,
    createUser,
    teamManager,
    project,
    message,
    myWork,
  },
});