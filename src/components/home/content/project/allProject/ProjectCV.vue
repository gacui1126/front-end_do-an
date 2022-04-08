<template>
  <div class="projectt-cv">

    <TaskDetail 
      :rOutOftime.sync="rOutOftime" 
      :outOftime.sync="outOftime" 
      :taskCard="taskCard" 
      :usersOfP="userT" 
      :tagTaskDetail.sync="tagTaskDetail" 
      :deadlineP.sync="deadlineP"
      :checkDateTD.sync="checkDateTD"
      :getJob.sync="getJob"
      :getCommentTD.sync="getCommentTD"
      :FileInCard.sync="FileInCard"
      :taskCardId.sync="taskCardId"
    />
    <!-- EDIT TASK -->
    <Modal
      v-model="editTaskNameModal"
      title="Sửa tên task"
      width="300">
      <Input v-model="editT.name"/>
      <div slot="footer">
        <Button @click="updateTaskName(editT.id)" type="primary">update</Button>
        <Button @click="editTaskNameModal = false" type="error">Huỷ</Button>
      </div>
    </Modal>

    <!-- DELETE TASK -->
    <Modal v-model="deleteT" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>Bạn muỗn xoá task?</span>
        </p>
        <div style="text-align:center">
            <p>Task này sẽ bị xoá</p>
            <p>Bạn vẫn muốn xoá chứ?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="deleteTask()">Delete</Button>
        </div>
    </Modal>

    <div class="header" style="text-align: center">
      <h2>
        {{dataProjectCV.name}}
      </h2>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light" >
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <!-- <a class="navbar-brand">{{dataProjectCV.name}}</a> -->
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          
          <li class="nav-item active mr-1">
            <Poptip title="Chuyển dự án" placement="bottom" style="text-align: center">
              <Button>
                Chuyển dự án
                <Icon type="ios-arrow-down"></Icon>
                </Button>
                <div slot="content" style="height: 400px">
                  <div @click="projectGO(project.id)" class="pro" v-for="(project,i) in this.switchPro" :key="i">
                    {{project.name}}
                  </div>
                  <!-- <Button @click="switchProject()">Xem thêm
                    <Icon type="ios-arrow-down"></Icon>
                  </Button> -->
                </div>
            </Poptip>
          </li>
          <li class="nav-item mr-1">
            <Button class="nav-link" >
              <Dropdown trigger="click" style="margin-left: 20px">
                  <i class="fas fa-users"></i>
                    Teams
                  <Icon type="ios-arrow-down"></Icon>

                <DropdownMenu slot="list">
                    <DropdownItem>
                      <div class="add-team form-group">
                        <div class="mul-se">
                          <multiselect 
                            v-model="team" 
                            :options="teamManager.getAllTeam" 
                            :multiple="true" 
                            :close-on-select="false" 
                            :clear-on-select="false" 
                            :preserve-search="true" 
                            placeholder="Thêm team" 
                            label="name"
                            track-by="id" 
                            :preselect-first="true">
                          </multiselect>
                        </div>

                        <button @click="addTeamP()" class="btn btn-info ml-1">Thêm</button>
                      </div>
                    </DropdownItem>
                    <div class="sp" style="text-align:center; background: #dee2e6">
                      <span class="" >Team trong dự án</span>
                    </div>
                    <DropdownItem v-for="(team,index) in teamsOfP" :key="index">
                      {{team.name}}
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Button>
          </li>
          <li class="nav-item">
            <Button class="nav-link">
              <Dropdown trigger="click" style="margin-left: 20px">
                  <i class="fas fa-user-plus"></i>
                    Thành viên
                  <Icon type="ios-arrow-down"></Icon>

                <DropdownMenu slot="list">
                    <DropdownItem>
                      <div class="add-team form-group">
                      <multiselect 
                          class="mul-se"
                          v-model="user" 
                          :options="project.getAllUsers" 
                          :multiple="true" 
                          :close-on-select="false" 
                          :clear-on-select="false" 
                          :preserve-search="true" 
                          placeholder="Thêm thành viên" 
                          label="email"
                          track-by="id" 
                          :preselect-first="true">
                      </multiselect>

                        <button @click="addUserP()" class="btn btn-info ml-1">Thêm</button>
                      </div>
                    </DropdownItem>
                    <div class="dropdown-divider"></div>
                    <div class="sp" style="text-align:center; background: #dee2e6">
                      <span class="" >Người quản lí dự án</span>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="manager-project">
                      {{userCreate.name}}
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="sp" style="text-align:center; background: #dee2e6">
                      <span class="" >Thành viên trong dự án</span>
                    </div>
                     <div class="dropdown-divider"></div>

                    <DropdownItem v-for="(user,index) in usersOfP" :key="index">
                      {{user.name}} ({{user.email}})
                    </DropdownItem>
                  
                </DropdownMenu>
              </Dropdown>
            </Button>
          </li>

          <li class="nav-item">
            <Button
             @click="addTask = true" type="warning" class="nav-link ml-1" style="color: #fff">
              thêm giai đoạn
            </Button>

            <!-- ADD TASK -->
            <Modal
              v-model="addTask"
              title="Tạo giai đoạn"
              width="300">
              <Input v-model=taskName placeholder="Tên task ..."/>
              <div slot="footer">
                <Button @click="createTask(auth.user.id)" type="primary">Tạo</Button>
                <Button @click="addTask = false" type="error">Huỷ</Button>
              </div>
            </Modal>

            <!-- FORM TASK LIST -->
            <Modal
              v-model="createTaskList"
              title="Tạo thẻ"
              width="350">
              <Input v-model="cardName" name="name" placeholder="Tên thẻ ..."/>
              <label style="margin-top:10px;margin-bottom: 0">Deadline</label>
              <VueCtkDateTimePicker
                v-model="deadlineCard"
                format="DD-MM-YYYY hh:mm a"
              />
              <label style="margin-top:10px;margin-bottom: 0">Phân công</label>
              <multiselect 
                class="mul-se"
                v-model="userSe" 
                :options="usersOfP" 
                :multiple="true" 
                :close-on-select="false" 
                :clear-on-select="false" 
                :preserve-search="true" 
                placeholder="Thêm thành viên" 
                label="email"
                track-by="id" 
                :preselect-first="true">
              </multiselect>
              <div slot="footer">
                <Button @click="createCard(auth.user.id)" type="primary">Tạo</Button>
                <Button @click="createTaskList = false" type="error">Huỷ</Button>
                </div>
            </Modal>

          </li>
        </ul>
      </div>
      <div class="form-inline">
            <Countdown :end="date_end"></Countdown>
      </div>
    </nav>

    <!-- TASK -->

    <div class="task_list">
      <draggable style="display:flex;flex-wrap: wrap;" @change="log">
      <div class="list-group task" id="task" v-for="(task,i) in this.Task" :key="i">
        
        <div class="task_detail">
          <div class="task_name">
            <div class="task_name_header">
              <strong>{{task.name}}</strong>
            </div>
            <div class="task_name_icon">
              <div class="icon_setting">
                <Icon @click="task.show = !task.show" type="ios-options" />

              </div>
              <div ref="setting" class="setting_name" v-if="task.show">
                <a @click="editTaskName(task.id)" class="edit-name">Sửa tên</a>
                <a @click="deteleTaskForm(task.id)" class="delete-task">Xoá</a>
              </div>
            </div>
 
          </div>

          <div class="content" v-for="(taskCard,index) in task.task_details" :key="index">
            <!-- <Input v-model="taskCard.task_card" maxlength="100" show-word-limit type="textarea" placeholder="Nhập tiêu đề ..." style="width: 90%" /> -->
            <button @click.prevent="taskDetail(taskCard,taskCard.tags)" class="btn task-detail" data-toggle="modal" data-target="#taskDetailModal">
              <div class="task-detail-header">
                <div class="tag-color" :style="Style(tag.color)" v-for="(tag,index) in taskCard.tags" :key="index"></div>
              </div>

              <div class="task-detail-top">
                <div class="task-detail-name" type="button" style="margin: auto 0">
                  {{taskCard.name}}
                </div>
                <div @click.stop="deleteTaskD(taskCard.id)" class="task-detail-icon">
                  <i class="fas fa-times-circle"></i>
                </div>
              </div>
              <div class="task-detail-bot">
                <div v-if="taskCard.deadline !== undefined && taskCard.deadline !== 'Invalid date'"
                    class="time mr-2 mt-1"
                    :class="checkCom(taskCard)">
                  <i class="fas fa-clock"> </i>
                  <span> {{taskCard.deadline}}</span>
                </div>
                <div v-if="taskCard.comments !== undefined && taskCard.comments.length>0" class="comment mr-2 mt-1">
                  <i class="far fa-comments"> {{taskCard.count_comment}}</i>
                </div>
                <div v-if="taskCard.jobs !== undefined && taskCard.jobs.length>0" class="job-list mr-2 mt-1">
                  <i class="fas fa-check-double"> {{taskCard.count_job_completed}}/{{taskCard.count_job}}</i>
                </div>
                <div v-if="taskCard.users !== undefined && taskCard.users.length>0" class="quantily-user mr-2 mt-1">
                  <i class="far fa-user"> {{taskCard.count_user}}</i>
                </div>
              </div>
              
            </button>
          </div>

          <div class="task_footer">
            <Button @click="formCard(task.id)" id="createFormCard" type="info" class="add_card" >
              <Icon type="md-add" />
                Thêm thẻ
            </Button>

          </div>
      </div>
    </div>
    </draggable>
    </div>       
  </div>
</template>

<script>
import { mapState } from 'vuex'
import projectCV from '../../../../../mixin/projectCV'
import common from '../../../../../mixin/common'
import Countdown from 'vuejs-countdown'
import TaskDetail from '../allProject/TaskDetail'
import draggable from "vuedraggable";
import sweetalert from "../../../../../mixin/sweetalert";


export default {
  mixins:[projectCV, common,sweetalert],
  components: { Countdown, TaskDetail ,draggable},

  data(){
    return {
      taskCard: [],
      deleteT: false,
      Task:[],
      cardName: '',
      id_task: 0,
      addTask: false,
      createTaskList: false,
      editTaskNameModal: false,
      taskName: '',
      inputs: [],
      tagTaskDetail:[],
      dayDeadline: 0,
      deadlineCard: '',
      getJob:[],
      taskCardId: 0,
      userSe: [],
    }
  },  
  computed:{
    ...mapState(['teamManager','project','auth'])
  },
  mounted() {
    this.getData(),
    this.getAllTeam(),
    this.teamOfProject(),
    this.allUser(),
    this.getTime()
    this.getTask()
    this.checkLogin()
    this.switchProject()

  },
  created(){
    // this.taskParameter()
    
  },
  methods:{
    checkLogin(){
      this.$store.dispatch('checkLogin')
    },
    checkCom(taskCard){
      if(taskCard.completed == 1){
        return 'task-completed'
      }
      if(taskCard.diff < 2880 && taskCard.diff > 0){
        return 'task-time-out'
      }
      if(taskCard.diff > 2880){
        return 0
      }else{
        return 'task-end'
      }
    },
    log: function(evt) {
      window.console.log(evt);
    },
    Style(color){
      return {background: color}
    },
    getData(){
      this.mixinProjectCV('api/project/go',this.id)
    },
    getAllTeam(){
      this.$store.dispatch('getAllTeam')
    },
    teamOfProject(){
      this.mixinDataOfProject('/api/project/info', this.id)
    },
    allUser(){
      this.$store.dispatch('getAllDataP')
    },
    addTeamP(){
      this.mixinAddTeamP('api/project/add-team', this.id)
    },
    addUserP(){
      this.mixinAddUserP('api/project/add-user', this.id)
    },
    getTime(){
      this.mixinGetTime('api/project/get-time', this.id)
    },
    formCard(id){
      this.createTaskList = true
      this.id_task = id
    },
    createCard(id){
      this.mixinCreateCard('api/task-detail/create', id)
    },
    createTask(id){
      this.mixinCreateTask('api/task/create',id)
    },
    getTask(){
      this.mixinGetTask('api/task/get-all', this.id)
    },
    editTaskName(id){
      this.editTaskNameModal = true;
      this.mixinEditTaskName('api/task/edit-name', id)
    },
    updateTaskName(id){
      this.mixinUpdateTaskName('api/task/update/name', id)
    },
    deteleTaskForm(id){
      this.deleteT = true
      this.idTask = id
    },
    deleteTask(){
      this.mixinDeleteTask('api/task/delete',this.idTask)
    },
    deleteTaskD(id){
      this.swdelete(this.mixinDeleteTaskD, "api/task-detail/delete", id);
    },
    taskDetail(taskCard,tags){
      
      this.mixinGetUserOfTeam('api/task-detail/get/user-of-team')
      this.mixinGetUserTaskDetail('api/task-detail/get/user', taskCard.id)
      // this.mixinTagTaskDetail('api/tag/get-tag-taskdetail',taskCard.id)
      this.tagTaskDetail = tags
      this.mixinDeadlineTaskDetail('api/task-detail/deadline/get',taskCard.id)
      this.mixinCompletedTaskDetail('api/task-detail/completed/get',taskCard.id)
      this.mixinGetJob('api/job/get',taskCard.id)
      this.mixinGetComment('api/comment/get',taskCard.id)
      this.mixinGetFile('api/file/get-file',taskCard.id)
      window.sessionStorage.setItem('taskDetail', taskCard.id)
      this.taskCardId = taskCard.id
    },
    switchProject(){
      this.mixinSwitchProject('api/project/switch-pro')
    },
    projectGO(id){
      window.sessionStorage.setItem('idProjectCV', id)
      window.location.reload();
      // this.$router.push({ name: 'projectCV'});
    },
    connectChannelCard(){
      window.Echo.private(`taskdetail.${this.taskCardId}`)
      .listen('TagEvent', (e)=>{
        for(let i =0; i < this.tagTaskDetail.length; i++){
          if(this.tagTaskDetail[i].id == e.tag.id){
            return this.tagTaskDetail.splice(i,1)
          }
        }
        this.tagTaskDetail.push(e.tag)
      })
      .listen('jobEvent', (e)=>{
        if(e.event == 'createJob'){
          return this.getJob.push(e.job)
        }
        if(e.event == 'deleteJob'){
          for(let i = 0; i < this.getJob.length ; i++){
            this.getJob.splice(i,1)
          }
        }
      })
      .listen('JobListEvent', (e)=>{
        if(e.event == 'createJobDetail'){
          for(let i = 0; i < this.getJob.length ; i++){
            if(this.getJob[i].id == e.jobDetail.job_id){
              return this.getJob[i].job_details.push(e.jobDetail)
            }
          }
        }
        if(e.event =='deleteJobDetail'){
          for(let i = 0; i < this.getJob.length ; i++){
            for(let j = 0; j < this.getJob[i].job_details.length; j++){
              if(this.getJob[i].job_details[j].id == e.jobDetail.id){
                return this.getJob[i].job_details.splice(j,1)
              }
              // window.console.log(this.getJob[j].job_details)
            }
          }
        }
        if(e.event =='checkJobD'){
          for(let i = 0; i < this.getJob.length ; i++){
            for(let j = 0; j < this.getJob[i].job_details.length; j++){
              if(this.getJob[i].job_details[j].id == e.jobDetail.id){
                return this.getJob[i].job_details[j].check = !this.getJob[i].job_details[j].check
              }
            }
            // window.console.log(this.getJob[j].job_details)
          }
          // window.console.log(this.getJob)
        }
      })
      .listen('FileEvent', (e)=>{
        for(let i = 0; i < this.FileInCard.length ; i++){
          if(this.FileInCard[i].id == e.file.id){
            return this.FileInCard.splice(i,1);
          }
        }
        this.FileInCard.push(e.file)
      })
      .listen('commentEvent', (e)=>{
        // window.console.log(e)
        for(let i = 0; i < this.getCommentTD.length ; i++){
          if(this.getCommentTD[i].id == e.comment.id){
            // return this.getCommentTD.splice(i,1);
            if(this.getCommentTD[i].content == e.comment.content){
              return this.getCommentTD.splice(i,1);
            }else{
              return this.getCommentTD[i].content = e.comment.content
            }
          }
        }
        this.getCommentTD.push(e.comment)
      })
      .listen('ReplyCommentEvent', (e)=>{
        if(e.event == 'replyComment'){
          for(let i = 0; i < this.getCommentTD.length ; i++){
            if(this.getCommentTD[i].id == e.comment.parent_id){
              return this.getCommentTD[i].replies.push(e.comment)
            }
          }
        }
        if(e.event == 'deleteComment'){
          for(let i = 0; i < this.getCommentTD.length ; i++){
            for(let j = 0; j < this.getCommentTD[i].replies.length ; j++){
              if(this.getCommentTD[i].replies[j].id == e.comment.id){
                return this.getCommentTD[i].replies.splice(j,1)
                // window.console.log(this.getCommentTD)
              }
            }
          }
        }
      })
    },
    disconnectChannelCard(cardId){
      window.Echo.leave(`taskdetail.${cardId}`)
    }
  },
  watch: {
    tagTaskDetail: function(){
      this.getTask()
    },
    deadlineP: function(){
      this.getTask()
    },
    getCommentTD: function(){
      this.getTask()
    },
    getJob: function(){
      this.getTask()
    },
    usersOfP: function(){
      this.getTask()
    },
    taskCardId(val,oldVal){
      if(oldVal){
        this.disconnectChannelCard(oldVal)
      }
      this.connectChannelCard()
    }
  },
}
</script>

<style scoped>
  .task-detail-header{
    margin-top: 10px;
    display: flex;
  }
  .tag-color{
    width: 30px;
    height: 10px;
    border-radius: 5px;
    margin-right: 2px;
  }
  .task-detail-bot{
    display: flex;
    /* justify-content: space-between; */
    font-size: 12px;
    color: rgba(0, 0, 0, 0.596);
  }

  .list-group-item {
    display: flex;
    justify-content: row;
    background: none;
    flex-wrap: wrap;
    padding: 0;
    border: none;
  }
  .add-team{
    display: flex;
  }
  .header{
    padding: 10px;
  }
  .task_detail{
    text-align: center;
    border-radius: 5px;
    margin: 0 20px;
    width: 240px;
    background: rgb(235,236,240);
    padding: 0 0 10px 0;
    box-shadow: 5px 10px 18px #888888;
  }
  .task_name{
    height: 30px;
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding-top: 5px;
    justify-content: space-between;
    cursor: pointer;
  }
  .task_name_header{
    position: relative;

  }
  .content{
    width: 100%;
  }
  .setting_name{
    width: 100px;
    background: rgb(255, 255, 255);
    position: absolute;
    display: flex;
    flex-direction: column;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 5px 10px 18px #888888;
  }
  .setting_name a{
    padding: 2px 0;
    color: rgb(112, 112, 112);
    /* border-bottom: solid 0.5px; */
  }
  .setting_name a:hover{
    background: rgb(238, 238, 238);
    border-radius: 5px;

  }
  .task_detail_list{
    background: #fff;
    border-radius: 5px;
    width: 90%;
    height: 100px;
    margin: 0 auto;
  }
  .task_card{
    width: 90%;
  }
  .add_card{
    margin-top: 5px;
    width: 90%;
  }
  .hidden{
    display: none;
  }
  .button{
    width: 100%;
  }
  .task_list{
    display: flex;
    flex-wrap: wrap;
  }
  .task{
    margin: 10px 0;
  }
  .task-detail{
    padding: 0 10px;
    /* display: flex;
    justify-content: space-between; */
    width: 90%;
    background: #fff;
    margin: 5px auto;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 2px 2px #aaaaaa;

  }
  .task-detail-top{
    display: flex;
    justify-content: space-between;
  }
  .task-detail:hover{
    background: rgb(206, 206, 206);
  }
  .task-detail-icon{
    display: none;
  }
  .task-detail-icon i{
    color: rgb(156, 156, 156);
  }
  .task-detail-icon i:hover{
    color: rgb(17, 17, 17);
  }
  .task-detail:hover .task-detail-icon{
    display: block;
    color: rgb(94, 94, 94);
  }
  .task-detail-name{
    margin: auto 0;
  }
  .task-completed{
    border: 0.5px solid rgb(174, 211, 131);
    padding: 0px 3px;
    border-radius: 5px;
    background: rgb(174, 211, 131);
  }
  .task-end{
    border: 0.5px solid rgb(211, 131, 131);
    padding: 0px 3px;
    border-radius: 5px;
    background: rgb(211, 131, 131);
  }
  .task-time-out{
    border: 0.5px solid rgb(210, 211, 131);
    padding: 0px 3px;
    border-radius: 5px;
    background: rgb(210, 211, 131);
  }
  .pro{
    cursor: pointer;
    width: 100%;
    padding: 3px 5px;
  }
  .pro:hover{
    background: rgb(230, 230, 230);
    border-radius: 3px;
    width: 100%;
  }
  /* .edit-name{
    background: #888888;
  } */
</style>