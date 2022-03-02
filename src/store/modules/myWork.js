import axios from 'axios';
const state = {
  cardUnfinished: [],
  cardCompleted: [],
  token: localStorage.getItem('token'),
  cardReComplete: [],
  msg:'',
  RoleForMe:[]
}
const getters = {

}
const actions = {
  async taskForMe({commit}){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/task-detail/task-for-me',
        headers: { Authorization: 'Bearer ' + state.token}
      });
      let data = res.data;
      if(data){
        let arUn = [];
        let arCom = [];
        for(let i = 0; i< data.data.length; i++){
          if(data.data[i].completed == 0 || data.data[i].completed == null){
            arUn.push(data.data[i]);
          }else{
            arCom.push(data.data[i])
          }
        }
        commit('cardUnfinished',arUn)
        commit('cardCompleted',arCom)
      }
    } catch (error) {
        error
    }
  },
  async requestComplete({commit}){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/task-detail/get-request-complete',
        headers: { Authorization: 'Bearer ' + state.token}
      });
      let data = res.data;
      if(data){
        commit('cardReComplete',data.data);
      }
    } catch (error) {
        error
    }
  },
  async detroyRe({commit},id,i){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/task-detail/get-request-complete/detroy',
        data:{
          id: id,
        },
        headers: { Authorization: 'Bearer ' + state.token}
      });
      let data = res.data;
      if(data){
        state.cardReComplete.splice(i,1)
        commit('msg',data.msg);
      }
    } catch (error) {
        error
    }
  },
  async confirmCom({commit},id,i){
    // window.console.log(id)
    try {
      let res = await axios({
        method: 'post',
        url: 'api/task-detail/manager/complete-confirm',
        data:{
          id: id,
        },
        headers: { Authorization: 'Bearer ' + state.token}
      });
      let data = res.data;
      if(data){
        data
        state.cardReComplete.splice(i,1)
        i
        commit('msg',data.msg);
      }
    } catch (error) {
        error
    }
  },
  async checkRole({commit}){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/role/check-role',
        headers: { Authorization: 'Bearer ' + state.token}
      });
      let data = res.data;
      if(data){
        commit('RoleForMe',data.data);
      }
    } catch (error) {
        error
    }
  }
}  
const mutations = {
  cardUnfinished(state,data){
    state.cardUnfinished = data
  },
  cardCompleted(state,data){
    state.cardCompleted = data
  },
  cardReComplete(state,data){
    state.cardReComplete = data
  },
  msg(state,data){
    state.msg = data
  },
  RoleForMe(state,data){
    state.RoleForMe = data
  }
}
export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};