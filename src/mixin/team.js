import axios from 'axios';

// import moment from 'moment'

export default{
  data(){
    return{
      token: localStorage.getItem('token')
    }
  },
  methods:{
    async mixinGetAllTeam(page){
      await axios.get(`/api/team/show?page=${page}&total=${this.total}`,{headers: { Authorization: 'Bearer ' + this.token}})
      .then(response =>
        { 
          this.data = response.data.data
          this.pageInfo = response.data
        })
      .catch(err =>{
        if(err.response.status == 403){
          this.errorPermission()
        }
      })
    },
    async mixinCreateTeam(url,team){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            name: team.name,
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.successNotice('Tạo team thành công')
          this.mixinGetAllTeam(1)
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
        }else{
          this.errorNotice(error.response.data.message)
        }
      }
    },
    async mixinUpdateTeam(url,id,name){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
            name: name
          },
          headers: { Authorization: 'Bearer ' + this.token}
        });
        let data = res.data;
        if(data){
          this.$toaster.success('Update Thành công')
          this.mixinGetAllTeam(1)
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
        }else{
          this.errorNotice(error.response.data.message)
        }
      }
    },
    async mixinDelateTeam(url,id){
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
          this.$toaster.success('Update Thành công')
          this.mixinGetAllTeam(1)
        }
      } catch (error) {
        if(error.response.status == 403){
          this.errorPermission()
        }else{
          this.errorNotice(error.response.data.message)
        }
      }
    }
  }
}