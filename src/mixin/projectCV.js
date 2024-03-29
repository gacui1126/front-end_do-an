import axios from 'axios';
import moment from 'moment'
export default{
  data(){
    return{
      date_end: sessionStorage.getItem('getTime'),
      teamsOfP:[],
      usersOfP:[],
      userT:[],
      userCreate: null,
      page: 1,
      projects:[],
      data:[],
      dataProjectCV:[],
      value: '',
      team: [],
      user: [],
      id: sessionStorage.getItem('idProjectCV'),
      editT: [],
      deadlineP: "",
      outOftime: false,
      checkDateTD: false,
      rOutOftime: false,
      
      getCommentTD:[],
      token: localStorage.getItem('token'),
      switchPro: [],
      moreProFetched: false,
      morePro: [],
      oldPro:[],
      FileInCard:[]
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
          },
          headers: { Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.dataProjectCV = data.data
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
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.teamsOfP = data.teams
          this.usersOfP = data.users
          for(let i = 0 ; i < this.teamsOfP.length ; i++){
            for(let j = 0 ; j < this.teamsOfP[i].users.length ; j++){
              this.usersOfP.push(this.teamsOfP[i].users[j]);
            }
          }
          this.userCreate = data.userCreate
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
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.successNotice(data.message)
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
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.successNotice(data.message)
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
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          window.sessionStorage.setItem('getTime', data.data)
        }
      } catch (error) {
        // commit('getTime', error.data)
      }
    },
    async mixinCreateTask(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            project_id: this.id,
            user_id: id,
            name: this.taskName
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.successNotice(data.message)
          this.mixinGetTask('api/task/get-all', this.id)
          this.addTask = false
        }
      } catch (error) {
        // this.error(error.message)
        this.addTask = false
        this.$swal('Lỗi', error.response.data.message, 'error')
      }
    },
    async mixinGetTask(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.Task = data.data
          // window.console.log(this.Task)
          for(let i=0; i< data.data.length;i++){
            for(let j=0; j<data.data[i].task_details.length; j++){
              this.Task[i].task_details[j].deadline = moment(String(data.data[i].task_details[j].deadline)).format('DD-MM-YYYY')
              
              this.Task[i].task_details[j].count_comment += this.Task[i].task_details[j].comments.length 
              this.Task[i].task_details[j].count_user = this.Task[i].task_details[j].users.length
              for(let z = 0; z < data.data[i].task_details[j].comments.length; z++){
                this.Task[i].task_details[j].count_comment += this.Task[i].task_details[j].comments[z].replies.length
              }
              for(let h = 0; h < data.data[i].task_details[j].jobs.length; h++){
                this.Task[i].task_details[j].count_job = this.Task[i].task_details[j].jobs[h].job_details.length
                for(let g = 0; g < data.data[i].task_details[j].jobs[h].job_details.length; g++){
                  if(data.data[i].task_details[j].jobs[h].job_details[g].check == 1){
                    this.Task[i].task_details[j].count_job_completed += 1;
                  }
                }   
              }
            }
          }
        }
      } catch (error) {
        this.error(error)
      }
    },
    async mixinCreateCard(url, id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            cardName: this.cardName,
            taskId: this.id_task,
            userId: id,
            project_id: this.id,
            deadline: this.deadlineCard,
            user: this.userSe
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.successNotice(data.message)
          this.mixinGetTask('api/task/get-all',this.id)
          this.createTaskList= false
        }
      } catch (error) {
        if(error.response.status == 422){
          this.error(error.response.data.message)
        }
      }
    },
    async mixinEditTaskName(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.editT = data.data;
        }
      } catch (error) {
        if(error.response.status == 422){
          this.error(error.response.data.message)
        }
      }
    },
    async mixinUpdateTaskName(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
            name: this.editT.name
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.successNotice(data.message)
          this.mixinGetTask('api/task/get-all', this.id)  
          this.editTaskNameModal = false;
        }
      } catch (error) {
        if(error.response.status == 422){
          this.error(error.response.data.message)
        }
      }
    },
    async mixinDeleteTask(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.successNotice(data.message)
          this.mixinGetTask('api/task/get-all', this.id)  
          this.deleteT = false;
        }
      } catch (error) {
        this.error(error.response.data.message)
      }
    },
    async mixinGetUserTaskDetail(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.taskCard = data.data
          
        }
      } catch (error) {
        // this.$toaster.error('Không thể lấy dữ liệu user')
        error
      }
    },
    async mixinGetUserOfTeam(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            team: this.teamsOfP
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.userT = this.usersOfP
          for(let i=0; i<data.data.length;i++){
            if(data.data[i].isArray){
              for(let j=0; j<data.data[i].length;j++){
                this.userT = this.usersOfP.concat(data.data[i][j])
              }
            }else{
              this.userT = this.usersOfP.concat(data.data[i])
            }
            this.userT = Array.from(new Set(this.usersOfP[i]));
          } 
        }
      } catch (error) {
        error
      }
    },
    async mixinTagTaskDetail(url,taskDetailId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: taskDetailId,
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.tagTaskDetail = data.data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeadlineTaskDetail(url,taskDetailId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: taskDetailId,
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.deadlineP = moment(String(data.data)).format('DD-MM-YYYY hh:mm a') 
          if(data.dayDeadline < 2880 && data.dayDeadline >0 ){
            this.rOutOftime = true
            this.outOftime = false
          }else if(data.dayDeadline == 0){
            this.outOftime = true
            this.rOutOftime = false
          }else{
            this.outOftime = false
            this.rOutOftime = false
          }
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinCompletedTaskDetail(url,taskDetailId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: taskDetailId,
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          if(data.data == 0){
            this.checkDateTD = false
          }else{
            this.checkDateTD = true
            this.outOftime = false
            this.rOutOftime = false
          }
          
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinGetJob(url,taskDetailId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: taskDetailId,
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.getJob = data.data
          for(let i=0; i<this.getJob.length; i++){
            for(let j=0;j<this.getJob[i].job_details.length; j++){
              if(this.getJob[i].job_details[j].check == 0 || this.getJob[i].job_details[j].check == null){
                this.getJob[i].job_details[j].check = false
              }else{
                this.getJob[i].job_details[j].check = true
              }
            }
          }
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinGetComment(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.getCommentTD = data.data
          
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleteTaskD(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          },
          headers:{Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.mixinGetTask('api/task/get-all',this.id)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinSwitchProject(url){
      if(!this.moreProFetched){
        try {
          let res = await axios({
            method: 'get',
            url: url,
            headers: { Authorization: 'Bearer ' + this.token}
            });
          let data = res.data;
          if(data){
            this.switchPro = data.data
            // this.switchPro = this.morePro.splice(0,5)
            // this.moreProFetched = true;
          }
          } catch (error) {
              this.error(error.response.data.message)
          }
        }else{
          var nextPro = this.morePro.splice(0,5)
            nextPro.forEach(element => this.switchPro.push(element))
        }
      },
      async mixinGetFile(url,id){
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
            this.FileInCard = data.data
          }
        } catch (error) {
          this.$toaster.error(error.response.data.message)
      }
    }
  }
}