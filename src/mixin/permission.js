import axios from 'axios';

export default{
  data(){
    return{
      user: [],
      permission: [],
      role: [],
      checkUserData:{
        user: {
          name: ''
        },
        role: [],
        permission: []
      },
      teams:{},
      token: localStorage.getItem('token')
    }
  },
  methods:{
    async mixinGetUserPer(url){
      await axios.get(url,
        {
          headers: { Authorization: 'Bearer ' + this.token}
        }
      )
      .then(response =>
        {
          this.user = response.data.data;
        })
    },
    async mixinGetPermission(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.permission = data.data
        }
      } catch (error) {
        this.$toaster.error('lỗi')
      }
    },
    async mixinGetRole(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.role = data.data
        }
      } catch (error) {
        this.$toaster.error('lỗi')
      }
    },
    async mixinPerUser(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data:{
            user: this.userReq,
            role: this.roleReq,
            permission: this.permissionReq
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
        // window.console.log(error.response.data.message)
      }
    },
    async mixinCheckPer(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data:{
            user: this.userReq,
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.checkPerModal = true
          this.checkUserData.user = data.user,
          this.checkUserData.role = data.role,
          this.checkUserData.permission = data.permission
          if(data.team){
            this.teams = data.team
          }else{
            this.teams = []
          }
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleleRoleUser(url,roleName,i){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data:{
            roleName: roleName,
            userId: this.checkUserData.user.id
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.checkUserData.role.splice(i,1)
          this.successNotice(data.message)
        }
      } catch (error) {
        this.errorNotice(error.response.data.message)
      }
    },
    async mixinDeletePerUser(url,perName,i){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data:{
            perName: perName,
            userId: this.checkUserData.user.id
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.checkUserData.permission.splice(i,1)
          this.successNotice(data.message)
        }
      } catch (error) {
        this.errorNotice(error.response.data.message)
      }
    }
  }
}