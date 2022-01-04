import axios from 'axios';
const state = {
  data: [],
  team: {},
  message : '',
  editData: [],
  updateTeam: [],
  deleteData: [],
  teamUser: [],
  quantityUser: [],
  changeTeam: '',
  idUser: '',
  total: 4,
  pageInfo: null,
  getAllTeam: [],
  token: localStorage.getItem('token')

}
const getters = {
  data: state => state.data
}
const actions = {
  async getTeam({commit},page){
    await axios.get(`/api/team/show?page=${page}&total=${state.total}`)
    .then(response =>
      { 
        commit('setTeam', response.data.data)
        commit('pageInfo',response.data)
      })
  },
  async getAllTeam({commit}){
    await axios.get('/api/team/get-all-team',{headers: { Authorization: 'Bearer ' + state.token}})
    .then(response =>
      { 
        commit('getAllTeam', response.data.data)
      })
  },
  async create({commit},team){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/team/create',
        data: {
          name: team.name,
        }
      });
      let data = res.data;
      // console.log(data.message);
      commit('setMessage',data.message);
      actions.getTeam(1);
      // window.location.reload();
    } catch (error) {
      commit('setMessage',error.response.data.message);
    }
  },
  async edit({commit},id){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/team/edit',
        data: {
          id: id,
        },
        headers: { Authorization: 'Bearer ' + state.token}
      });
      let data = res.data;
      // console.log(data.message);
      commit('editData',data.data);
      // console.log(data.data)
    } catch (error) {
      commit('setMessage',error.response.data.message);
    }
  },
  async update({commit},id){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/team/update',
        data: {
          id: id,
          name: state.editData.name
        }
      });
      let data = res.data;
      window.location.reload();
      commit('updateData',data.data);
      // console.log(data.data)
    } catch (error) {
      commit('updateData',error.response);
    }
  },
  async delete({commit},id){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/team/delete',
        data: {
          id: id
        }
      });
      let data = res.data;
      window.location.reload();
      commit('deleteData',data.data);
      // console.log(data.data)
    } catch (error) {
      commit('deleteData',error.response);
    }
  },
  async teamUser({commit},id){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/team/teamuser',
        data: {
          id: id
        }
      });
      let data = res.data;
      commit('teamUser',data.data);
      commit('quantityUser',data.data.length);
      // console.log(data.data)
    } catch (error) {
      commit('teamUser',error.response);
    }
  },
  getIdUser({commit},id){
    commit('idUser',id)
  },
  async changeTeam({commit},data_change){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/team/change-team',
        data: {
          id: data_change.id,
          name: data_change.name
        }
      });
      let data = res.data;
      window.setTimeout(function() {
        window.location.reload();
      }, 1000);
      commit('changeTeam',data.message);
      // console.log(data.data.message)
      document.getElementById('notify-change-team').innerHTML =
        `<div class="alert alert-success" role="alert">
          ${state.changeTeam}
      </div>`
      
    } catch (error) {
      commit('changeTeam',error.response);
    }
  }
}  
const mutations = {
  setTeam(state,data){
    state.data = data
  },
  setMessage(state,data){
    state.message = data
  },
  editData(state,data){
    state.editData = data
  },
  updateData(state,data){
    state.updateTeam = data
  },
  deleteData(state, data){
    state.deleteData = data
  },
  teamUser(state, data){
    state.teamUser = data
  },
  quantityUser(state, data){
    state.quantityUser = data
  },
  changeTeam(state,data){
    state.changeTeam = data
  },
  idUser(state,data){
    state.idUser = data
  },
  pageInfo(state,data){
    state.pageInfo = data
  },
  getAllTeam(state,data){
    state.getAllTeam = data
  }
}
export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};