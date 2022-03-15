import axios from 'axios'
import moment from 'moment'
import sweetalert from '../../mixin/sweetalert'
import Vue from 'vue';
// import router from './router'


const state = {
  data: [],
  token: localStorage.getItem('token'),
  friend: {},
  userConnect: [],
  messages: [],
  allMessUnread: 0,
  notications: [],
  countUnReadNoti: 0,
}
const getters = {
  
}
const actions = {
  async selectMess({commit},user){
    actions.updateUnreadCount(user,true)
    try {
      let res = await axios({
        method: 'get',
        url: 'api/chat/messages/'+user.id,
        headers: { Authorization: 'Bearer ' + state.token}
        });
      let data = res.data;
      if(data){
        
        commit('friend',data.user)
        for(let i=0; i<data.message.length; i++){
          data.message[i].created_at = moment(String(data.message[i].created_at)).format('DD-MM-YYYY hh:mm:ss A')
        }
        commit('data', data.message)
        document.getElementById("myForm").style.display = "block";
      }
    } catch (error) {
      commit('data', error.data)
    }
  },
  async connectChannel({commit}){
    await axios.get('/api/user/info',
      {
      headers: { Authorization: 'Bearer ' + state.token}
      })
      .then(response =>
      { 
        // this.u = response.data.data
        commit('userConnect', response.data.data)
        window.Echo.private(`privateChat.${state.userConnect.id}`)
        .listen('ChatEvent', (e)=>{
            actions.hanleIncoming(e.message);
            state.allMessUnread += 1;
            // window.console.log(e.message)
            // dispatch('selectMess',e.message.user)
        })
        .listenForWhisper('typing',(e)=>{
            this.typingFriend = e.user;
            // window.console.log('dang nhap')
        })

        window.Echo.private(`notication.${state.userConnect.id}`)
        .listen('NoticationEvent', (e)=>{
          state.notications.unshift(e.notication);
          state.countUnReadNoti++;
            // window.console.log(e)
        })
        .listen('SendRQCompleteCardEvent', (e)=>{
          e
          Vue.swal({
            title: 'bạn có yêu cầu xác nhận thẻ!!!',
            text: 'Vui lòng vào trang công việc để xử lý',
            type: 'warning',
            showCancelButton: true,
            // confirmButtonText: 'Đến trang!',
            cancelButtonText: 'Đóng!',
            showCloseButton: true,
            showLoaderOnConfirm: true
          }).then((result) => {
            if(result.value) {
              // window.location.replace('/my-work')
            } else {
              // this.$swal('Huỷ thao tác', 'Xác nhận này vẫn được giữ lại', 'info')
            }
          })
        })
    })
  },
  hanleIncoming(message){
    if(message.user_id == state.friend.id){
        // let mess = message
        message.created_at = moment(String(message.created_at)).format('DD-MM-YYYY hh:mm:ss A')
        state.data.push(message)
        state.friend.id = message.user_id
    }else{
      sweetalert.methods.chatNotication(message.user.img,message.user.name,message.message)
      
    }
    actions.updateUnreadCount(message.from_contact,false) 
  },
  async sendMess({commit},inputMess){
    axios.post('api/chat/messages/'+state.friend.id,{message: inputMess},
    {
        headers: { 
            Authorization: 'Bearer ' + state.token,
            'Content-type': 'application/json'
        }
    })
    .then(response =>{
        commit
        let mess = response.data
        mess.created_at = moment(String(mess.created_at)).format('DD-MM-YYYY hh:mm:ss A')
        state.data.push(mess)
    })
  },
  updateUnreadCount(user,reset){
    state.messages = state.messages.map((single)=>{
        // window.console.log(single,user,reset)
        if(single.id !== user.id){
            return single
        }
        if(reset)
            single.unread = 0
        else
            single.unread += 1
        return single;
    })
  },
  async getMess({commit}){
    axios.get('api/chat/get-mess',
      {
        headers: { 
          Authorization: 'Bearer ' + state.token,
        }
      })
      .then(response =>{
        response.data = Object.values(response.data)
        let count = 0;
        for(let i = 0; i < response.data.length; i++){
          count += response.data[i].unread;
          commit('allMessUnread', count)
        }
        // window.console.log(state.allMessUnread)
        commit('messages',response.data);
      })
  },
  async getNoti({commit}){
    try {
      let res = await axios({
        method: 'post',
        url: 'api/notications/get-noti',
        headers: { Authorization: 'Bearer ' + state.token}
        });
      let data = res.data;
      if(data){
        commit('notications', data.data.reverse());
        commit('countUnReadNoti', data.countNoti);
      }
    } catch (error) {
      commit('error', error.data)
    }
  },
  async selectNoti({commit}){
    state.countUnReadNoti = 0;
    try {
      let res = await axios({
        method: 'post',
        url: 'api/notications/select-noti',
        headers: { Authorization: 'Bearer ' + state.token}
        });
      let data = res.data;
      if(data){
        data
      }
    } catch (error) {
      commit('error', error.data)
    }
  }
}
const mutations = {
  data(state,data){
    state.data = data
  },
  friend(state,data){
    state.friend = data
  },
  userConnect(state,data){
    state.userConnect = data
  },
  messages(state,data){
    state.messages = data
  },
  allMessUnread(state,data){
    state.allMessUnread = data
  },
  notications(state,data){
    state.notications = data
  },
  countUnReadNoti(state,data){
    state.countUnReadNoti = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};