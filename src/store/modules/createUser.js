import axios from 'axios';

const state = {
  inputs: [],
  count: 0,
  errors: {},
  getUser: [],
  pageInfo: null,
  edit: [],
  teamName: '',
  keys: {},
  total: 4
}
const getters = {
  inputs: state => state.inputs
}
const actions = {
  async createUsers({commit},inputs){
    state.count = inputs.length;
    
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/create',
        data: {
          inputs: inputs,
          count: state.count
        }
      });
      let data = res.data;
      if(data){
        // console.log(data)
        commit('err',data.message);
        window.setTimeout(function() {
          window.location.reload();
        }, 1000);
        document.getElementById('notify-create-user-success').innerHTML =
          `<div class="alert alert-success" role="alert">
            Tạo tài khoản thành công thành công
          </div>`
      }
    } catch (error) {
        if(error.response.status == 422){
          commit('err',error.response.data.errors);
          commit('keys',Object.keys(error.response.data.errors));
        }
    }
  },
  async getAllUser({commit},page){
    // console.log(page)
    await axios.get(`/api/user/get-all?page=${page}&total=${state.total}`)
    .then(response => {
      commit('getUser',response.data.data)
      commit('pageInfo',response.data)
      // console.log(response.data.data)
    })
  },
  async editUser({commit}, id){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/edit',
        data: {
          id : id
        }
      });
      let data = res.data;
      if(data){
        // console.log(id)
        commit('edit',data.data);
        commit('teamName',data.data.teams.name)
      }
    } catch (error) {
        commit('edit',error.response);
    }
  },
  async updateUser({commit},id){
    // console.log(state.edit.team_name)
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/update',
        data: {
          id : id,
          email: state.edit.email,
          name: state.edit.name,
          age: state.edit.age,
          address: state.edit.address,
          phone: state.edit.phone,
          teamName: state.teamName
        }
      });
      let data = res.data;
      if(data){
        // console.log(data.data)
        commit('update',data.data);
        window.location.reload();
      }
    } catch (error) {
        commit('update',error.response);
    }
  },
  async deleteUser({commit},id){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/delete',
        data: {
          id : id
        }
      });
      let data = res.data;
      if(data){
        // console.log(data.data)
        commit('delete',data.data);
        window.location.reload();
      }
    } catch (error) {
        commit('delete',error.response);
    }
  },
  async uploadImg({commit},data){
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    await axios.post('api/user/img/upload', data, config )
    .then(function (response) {
      // this.success = response.data.success;
      commit('upload',response)
      console.log(response.data.data)
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error.status)
    });
  }

}  
const mutations = {
  keys(state,data){
    state.keys = data
  },
  err(state,data){
    state.errors = data;
  },
  getUser(state,data){
    state.getUser = data
  },
  edit(state, data){
    state.edit = data
  },
  teamName(state,data){
    state.teamName = data
  },
  update(state,data){
    state.update = data
  },
  delete(state,data){
    state.delete = data
  },
  upload(state,data){
    state.upload = data 
  },
  pageInfo(state,data){
    state.pageInfo = data
  }
}
export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};