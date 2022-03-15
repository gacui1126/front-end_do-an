// import axios from 'axios';
const state = {
  token: localStorage.getItem('token'),
  onlineUser: []
}
const getters = {

}
const actions = {
  connect(){
    window.Echo.join(`joinChat`)
    .here((users) => {
        state.onlineUser = users;
    })
    .joining((user) => {
      state.onlineUser.push(user);
      window.console.log(state.onlineUser)
    })
    .leaving((user) => {
      state.onlineUser.splice(state.onlineUser.indexOf(user),1)
    })
    .error((error) => {
        window.console.error(error);
    });
  }
  
}  
const mutations = {

}
export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};