import axios from 'axios';

export default{
  data(){
    return{
      total:5,
      token: localStorage.getItem('token'),
      info: [],
      myProject: []
    }
  },
  methods:{
    async mixinGetMyProject(page){
      try {
        let res = await axios({
          method: 'post',
          url: `api/project/get/my-project?page=${page}&total=${this.total}`,
          headers: { Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.myProject = data.data
        }
      } catch (error) {
          this.error(error.response.data.message)
      }
    },
    // async mixinGetInfoUser(url){
    //   try {
    //     let res = await axios({
    //       method: 'get',
    //       url: url,
    //       headers: { Authorization: 'Bearer ' + this.token}
    //       });
    //     let data = res.data;
    //     if(data){
    //       this.info = data.data
    //     }
    //   } catch (error) {
    //       this.error(error.response.data.message)
    //   }
    // }
  }
}