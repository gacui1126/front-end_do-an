import axios from 'axios';

// import moment from 'moment'

export default{
  data(){
    return{
      total: 5,
      data: [],
      pageInfo: [],
      permission: [],
      edit: [],
      token: localStorage.getItem('token')
    }
  },
  methods:{
    async mixinGetRole(page){
      await axios.get(`/api/role/get?page=${page}&total=${this.total}`,{headers: { Authorization: 'Bearer ' + this.token}})
      .then(response =>
        {
          this.data = response.data.data;
          this.pageInfo = response.data;
          // window.console.log(this.data)
        })
      .catch(err =>{
        if(err.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }
      })
    },
    async mixinGetPermission(url){
      await axios.get(url)
      .then(response =>
        {
          this.permission = response.data.data;
          // window.console.log(this.data)
        })
    },
    async mixinCreateRole(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            name: this.roleName,
            // auth_name: this.authName,
            permission: this.permissionSelect
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.$toaster.success('Tạo role Thành công')
          this.addRole = false
          this.mixinGetRole(1)
          this.mixinGetPermission('api/permission/get')
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }else{
          this.errorNotice(error.response.data.message)
        }
      }
    },
    async mixinEditRole(url,id){
      // this.edit.permissions = ''
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.edit = data.data
        }
      } catch (error) {
        this.$toaster.error(' xuất hiện lỗi')
      }
    },
    async mixinUpdateRole(url,id,name){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
            name: name,
            // auth_name: auth_name,
            permission: this.edit.permissions
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.editRoleM = false
          this.mixinGetRole(1)
          this.mixinGetPermission('api/permission/get')
          this.$toaster.success(data.message)
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }else{
          this.errorNotice(error.response.data.message)
        }
      }
    },
    async mixinDeleteRole(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          // data
          // this.data.data.splice(i,1)
          this.mixinGetRole(1)
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }else{
          this.errorNotice(error.response.data.message)
        }
      }
    }
  }
}