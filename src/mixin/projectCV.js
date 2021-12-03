import axios from 'axios';
// import moment from 'moment'
export default{
  data(){
    return{
      date_end: sessionStorage.getItem('getTime'),
      teamsOfP:[],
      usersOfP:[],
      page: 1,
      projects:[],
      data:[],
      dataProjectCV:[],
      value: '',
      team: [],
      user: [],
      id: sessionStorage.getItem('idProjectCV')
    }
  },
  methods:{
    async mixinProjectCV(url,id){
    
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          }
          });
        let data = res.data;
        if(data){
          this.dataProjectCV = data.data
          // window.sessionStorage.setItem('getTime',data.date_end)
        }
      } catch (error) {
        this.dataProjectCV = error.data
      }
    },
    async mixinDataOfProject(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          }
          });
        let data = res.data;
        if(data){
          this.teamsOfP = data.teams
          this.usersOfP = data.users
        }
      } catch (error) {
        this.error = error
      }
    },
    async mixinAddTeamP(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            team: this.team,
            id: id
          }
          });
        let data = res.data;
        if(data){
          this.success(data.message)
          for(let i = 0;i< this.team.length; i++){
            this.teamsOfP.unshift(this.team[i])
          }
        }
      } catch (error) {
        this.error(error.response.data.message)
      }
    },
    async mixinAddUserP(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            user: this.user,
            id: id
          }
          });
        let data = res.data;
        if(data){
          this.success(data.message)
          for(let i = 0;i< this.user.length; i++){
            this.usersOfP.unshift(this.user[i])
          }
        }
      } catch (error) {
        this.error(error.response.data.message)
      }
    },
    async mixinGetTime(url,id){
    
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          }
          });
        let data = res.data;
        if(data){
          window.sessionStorage.setItem('getTime', data.data)
        }
      } catch (error) {
        // commit('getTime', error.data)
      }
    }
  }
}