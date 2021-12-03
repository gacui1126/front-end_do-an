import axios from 'axios';
const state = {
  getAllTeams: [],
  getAllUsers: [],
  dataProjectCV: [],
  getTime: ''
}
const getters = {

}
const actions = {
  async getAllDataP({commit}){
    await axios.get('api/project/get-all-data')
      .then(response =>
        { 
          // console.log(response.data.teams)
          commit('getAllTeams', response.data.teams)
          commit('getAllUsers', response.data.users)
        })
  },
  async getTime({commit},id){
    
    try {
      let res = await axios({
        method: 'post',
        url: 'api/project/get-time',
        data: {
          id: id
        }
        });
      let data = res.data;
      if(data){
        commit('getTime', data.data)
        window.sessionStorage.setItem('getTime', data.data)
      }
    } catch (error) {
      commit('getTime', error.data)
    }
  }
  
}  
const mutations = {
  getAllTeams(state,data){
    state.getAllTeams = data
  },
  getAllUsers(state,data){
    state.getAllUsers = data
  },
  dataProjectCV(state,data){
    state.dataProjectCV = data
  },
  getTime(state,data){
    state.getTime = data
  }
}
export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};