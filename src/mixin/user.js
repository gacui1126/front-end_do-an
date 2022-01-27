import axios from 'axios';

// import moment from 'moment'

export default{
  data(){
    return{
      count: 0,
      data: [],
      pageInfo: null,
      list_user: {},
      total: 10,
      teamName: '',
      edit: [],
      token: localStorage.getItem('token')
    }
  },
  methods:{
    async mixinGetAllUser(page){
      let token = localStorage.getItem('token');
      await axios.get(`/api/user/get-all?page=${page}&total=${this.total}`,{headers: { Authorization: 'Bearer ' + token}})
      .then(response =>
        {
          this.data = response.data.data;
          this.pageInfo = response.data;
          // window.console.log(this.data.data)
        })
      .catch(err =>{
        if(err.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }
      })
    },
    async mixinCreateUser(url,inputs){
      this.count = inputs.length;
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            inputs: inputs,
            count: this.count
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.spinShow = false
          this.$toaster.success('Tạo user thành công')
          this.mixinGetAllUser(1)
        }
      }catch (error) {
        // this.$toaster.error(error.response.data.message)
        if(error.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }
        this.spinShow = false
      }
    },
    async mixinDeleteUser(url,id){
      let token = localStorage.getItem('token');
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id : id
          },
          headers: { Authorization: 'Bearer ' + token}
        });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          this.mixinGetAllUser(1)
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
          this.$router.push('/page-404')
        }
          // this.$swal(error.response.data.message)
      }
    },
    async mixinEditUser(url, id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id : id
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.edit = data.data
          this.teamName = data.data
        }
      } catch (error) {
          error
      }
    },
    async mixinUpdateUser(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id : id,
            email: this.edit.email,
            name:  this.edit.name,
            age:  this.edit.age,
            address:  this.edit.address,
            phone:  this.edit.phone,
            teamName:  this.teamName
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          // this.$toaster.success('Update thành công')
          this.successNotice('Update thành công')
          this.mixinGetAllUser(1)
        }
      } catch (error) {
          // this.$toaster.error('Update lỗi')
          if(error.response.status == 403){
            this.errorPermission()
            this.$router.push('/page-404')
          }
      }
    }
  }
}