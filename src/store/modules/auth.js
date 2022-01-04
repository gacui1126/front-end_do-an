import axios from 'axios'

const state = {
  user: {},
  error: {
    email: '',
    password: ''
  },
  editUser: {},
  updateUser: '',
  errorResetPass: {}
}
const getters = {
  user: state => state.user,
  error: state => state.error,
}
const actions = {
  async checkLogin({commit}){
    let token = localStorage.getItem('token');
    await axios.get('/api/user/info',{
      headers: { Authorization: 'Bearer ' + token}
    })
    .then(response =>
      { 
      // console.log(response.data.data.id)
      commit('setUser', response.data.data)

    })
    .catch(() =>{
      window.location.replace('/');
    })
  },
  async login({commit},user) {
    try {
      let res = await axios({
        method: 'post',
        url: 'api/login',
        data: {
          email: user.email,
          password: user.password
        }
      });
      let data = res.data;
      // console.log(data.message);
      if(data.data.token){
        localStorage.setItem('token',data.data.token);
        window.location.replace('/overview');
      }
      commit('setLogin',data.message);
    } catch (error) {
      if(error.response.status == 422){
        commit('loginFailValidate',error.response.data.errors);
      }else{
        commit('loginFailMessage',error.response.data.message);
      } 
    }
  
  },
  async logout({commit}){
    commit('logout', localStorage.setItem('token',null))
    window.location.replace('/')
  },
  async editInfo({commit},id){
    let token = localStorage.getItem('token')
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/edit',
        data: {
          id: id
        },
        headers:{Authorization: 'Bearer ' + token}
      });
      let data = res.data;
      commit('editUser',data.data);
    } catch (error) {
      commit('error',error.data);
    }
  },
  async updateUserInfo({commit},id){
    let token = localStorage.getItem('token')
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/info/update',
        data: {
          id: id,
          name: state.editUser.name,
          age: state.editUser.age,
          address: state.editUser.address,
          phone: state.editUser.phone
        },
        headers:{Authorization: 'Bearer ' + token}
      });
      let data = res.data;
      commit('updateUser',data.success);
      window.setTimeout(function() {
        window.location.reload();
      }, 1000);
      document.getElementById('notify-update-info').innerHTML =
        `<div class="alert alert-success" role="alert">
          Thay đổi thông tin thành công
        </div>`
    } catch (error) {
      commit('error',error.data);
      document.getElementById('notify-update-info').innerHTML =
        `<div class="alert alert-danger" role="alert">
          Thay đổi thông tin thất bại
        </div>`
    }
  },
  async resetPass({commit},pass){
    let token = localStorage.getItem('token')
    try {
      let res = await axios({
        method: 'post',
        url: 'api/user/info/reset-pass',
        data: {
          id: state.editUser.id,
          password_old: pass.password_old,
          password_new: pass.password_new,
          password_re: pass.password_re
        },
        headers:{Authorization: 'Bearer ' + token}
      });
      let data = res.data;
      commit('updateUser',data.message);
      window.setTimeout(function() {
        window.location.reload();
      }, 1000);
      document.getElementById('notify-reset-password-info').innerHTML =
        `<div class="alert alert-success" role="alert">
          Thay đổi password thành công ${state.updateUser}
        </div>`
    } catch (error) {
      commit('error',error.data);
      if(error.response.status == 422){
        commit('errorResetPass',error.response.data.errors)
      }else{
        // console.log(error.response.data.message)
        commit('errorResetPass',error.response.data.message)

        document.getElementById('notify-reset-password-info').innerHTML =
        `<div class="alert alert-danger" role="alert">
          ${state.errorResetPass}
        </div>`
      }
    }
  }
}
const mutations = {
  setUser(state,data){
    state.user = data
  },
  setLogin(state,data){
    state.user = data
  },
  loginFailValidate(state,data){
    state.error = data
  },
  loginFailMessage(state,data){
    state.error.email=[data],
    state.error.password=[data]
  },
  LogOut(state,data){
    state.user = data
  },
  editUser(state,data){
    state.editUser = data
  },
  error(state,data){
    state.date = data
  },
  updateUser(state,data){
    state.updateUser = data
  },
  errorResetPass(state,data){
    state.errorResetPass = data
  }

  
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};