import axios from 'axios';


export default{
  data(){
    return{
      messForMe: [],
      messForFre: [],
      CreateGPModal: false,
      messages: [],
      inputMess: '',
      token: localStorage.getItem('token'),
      users: [],
      selectUser: [],
      groupName: '',
      allGroup: [],
      group: [],
      userClick: [],
      activeFriend: null,
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }
  },
  methods:{
    async mixinGetMess(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          // this.messages = data
          for(let i = 0; i< data.length; i++){
            this.messages.push({
                user:{},
                message:{}
            })
            this.messages[i].message = data[i]
            this.messages[i].user = data[i].user
          
          }
        }
      } catch (error) {
          error
      }
    },
    async mixinSubmitChat(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            message: this.inputMess,
            group_id: this.group.id
          },
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          this.messages.push(data.message)
          // this.messages.user.push(data.user)
          // window.console.log(data.message)
          this.inputMess = ''
        }
      } catch (error) {
          error
      }
    },
    async mixinGetAllUser(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          data: {
            message: this.inputMess
          },
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          this.users = data.data
        }
      } catch (error) {
          error
      }
    },
    async mixinCreateGroup(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            user: this.selectUser,
            name: this.groupName
          },
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          this.allGroup.push(data.data) 
        }
      } catch (error) {
          error
      }
    },
    async mixinGetGroupChat(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          this.allGroup = data.data.reverse()
        }
      } catch (error) {
          error
      }
    },
    async mixinSelectGroupChat(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data:{
            id: id
          },
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          this.group = data.data
        }
      } catch (error) {
          error
      }
    },
    async mixinFetchMessages(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { 
            Authorization: 'Bearer ' + this.token,
            'Content-type': 'application/json'
            }
          });
        let data = res.data;
        if(data){
          this.messages = data.message,
          this.userClick = data.user
          // this.$emit('update:user', data.user);
          // for(let i = 0; i< data.message.length; i++){
          //   this.messages.push({
          //       user:{},
          //       message:{}
          //   })
          //   this.messages[i].message = data[i]
          //   this.messages[i].user = data[i].user
          
          // }
        }
      } catch (error) {
          error
      }
    }
  }
}