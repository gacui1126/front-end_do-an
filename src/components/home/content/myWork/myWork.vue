<template>
  <div class="my-work">
    <div class="my-task">
      <div class="my-task-header">
        <h3>Thẻ chưa hoàn thành</h3>
      </div>
      <div style="display: flex; justify-content: center;">
        <table class="table-scroll small-first-col" style="width:98%;border-radius:10px">
          <thead style="border-radius:10px">
            <tr>
            <th>tt</th>
            <th>Thẻ</th>
            <th>Dự án</th>
            <th>Deadline</th>
            <th>Thời hạn</th>
            <th>Hành động</th>
            </tr>
          </thead>
          <tbody class="body-half-screen">
            <tr v-for="(card,i) in myWork.cardUnfinished" :key="i">
              <td>{{i+1}}</td>
              <td>{{card.name}}</td>
              <td>
                <span class="project-name">
                  {{card.projects.name}}
                </span>
              </td>
              <td>{{card.deadline ? card.deadline : 'Chưa có deadline'}}</td>
              <td>
                <span :class="card.remainingTime ? 'deadlineTaskGreen' : 'deadlineTaskRed'">
                  {{card.remainingTime ? card.remainingTime + ' Ngày' : 'Hết hạn'}}
                </span>
              </td>
              <td>
                <Button @click="goProject(card.projects.id)" type="primary">Nhấn để vào dự án</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="my-task-header">
        <h3>Thẻ đã hoàn thành</h3>
      </div>
      <div style="display: flex; justify-content: center;">
        <table class="table-scroll small-first-col" style="width:98%;border-radius:10px">
          <thead style="border-radius:10px">
            <tr>
            <th>tt</th>
            <th>Thẻ</th>
            <th>Dự án</th>
            <th>Deadline</th>
            <!-- <th>Thời hạn</th> -->
            <th>Hành động</th>
            </tr>
          </thead>
          <tbody class="body-half-screen">
            <tr v-for="(card,i) in myWork.cardCompleted" :key="i">
              <td>{{i+1}}</td>
              <td>{{card.name}}</td>
              <td>
                <span class="project-name">
                  {{card.projects.name}}
                </span>
              </td>
              <td>{{card.deadline ? card.deadline : 'Chưa có deadline'}}</td>
              <!-- <td>
                <span :class="card.remainingTime ? 'deadlineTaskGreen' : 'deadlineTaskRed'">
                  {{card.remainingTime ? card.remainingTime + ' Ngày' : 'Hết hạn'}}
                </span>
              </td> -->
              <td>
                <Button @click="goProject(card.projects.id)" type="primary">Nhấn để vào dự án</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <div v-if="checkShow(myWork.RoleForMe)">
        <div class="my-task-header">
          <h3>Yêu cầu xác nhận</h3>
        </div>
        <div style="display: flex; justify-content: center;margin-bottom: 50px">
          <table class="table-scroll small-first-col" style="width:98%;border-radius:10px">
            <thead style="border-radius:10px">
              <tr>
              <th>tt</th>
              <th>Thẻ</th>
              <th>Dự án</th>
              <th>Người gửi</th>
              <th>Thời gian</th>
              <th>Hành động</th>
              </tr>
            </thead>
            <tbody class="body-half-screen">
              <tr v-for="(card,i) in myWork.cardReComplete" :key="i">
                <td>{{i+1}}</td>
                <td>{{card.task_detail.name}}</td>
                <td>
                  <span class="project-name">
                    {{card.task_detail.projects.name}}
                  </span>
                </td>
                <td>{{card.sender.name}}</td>
                <td>
                  {{card.created | moment}}
                </td>
                <td style="text-align: center">
                  <Button size="small" @click="goProject(card.task_detail.projects.id)" type="primary">Vào dự án</Button> |
                  <Button @click="confirmCom(card.task_detail.id,i)" size="small" type="warning">Xác nhận</Button>
                  <Button @click="detroyRe(card.task_detail.id,i)" size="small" type="error">Huỷ yêu cầu</Button>
                </td>
              </tr>
              <div v-if="!myWork.cardReComplete.length" style="padding:10px 0;background:#fff;width:100%;text-align:center">
                <span>Không có yêu cầu nào</span>
              </div>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
import sweetalert from '../../../../mixin/sweetalert'

export default {
  mixins:[sweetalert],
  data(){
    return{
      
    }
  },
  computed:{
    ...mapState(['myWork']),
    
  },
  methods:{
    taskForMe(){
      this.$store.dispatch('taskForMe');
    },
    goProject(id){
      window.sessionStorage.setItem('idProjectCV', id)
      this.$router.push({ name: 'projectCV'});
    },
    requestComplete(){
      this.$store.dispatch('requestComplete');
    },
    detroyRe(id,i){
      this.swDetroy(this.$store.dispatch,'detroyRe',id,i);
      // this.$store.dispatch('detroyRe',id,i);
    },
    confirmCom(id,i){
      this.swComplete(this.$store.dispatch,'confirmCom',id,i);
      // this.$store.dispatch('confirmCom',id,i);
    },
    checkRole(){
      this.$store.dispatch('checkRole')
    },
    checkShow(role){
      for(let i = 0; i < role.length; i++){
        if(role[i] == 'Admin' || role[i] == 'manager'){
          return true
        }
      }
      return false
    }
    
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  created(){
    this.taskForMe()
    this.requestComplete()
    this.checkRole()
  }
}
</script>

<style scoped>
.my-task-header{
  text-align: center;
  padding-top: 60px;
  padding-bottom: 20px;
}
.container{
  padding: 1rem;
  margin: 1rem;
}

.table-scroll{
  /*width:100%; */
  display: block;
  empty-cells: show;
  
  /* Decoration */
  border-spacing: 0;
  border: 1px solid;
}

.table-scroll thead{
  background-color: #f1f1f1;  
  position:relative;
  display: block;
  width:100%;
  overflow-y: scroll;
}

.table-scroll tbody{
  /* Position */
  display: block; position:relative;
  width:100%; overflow-y:scroll;
  /* Decoration */
  border-top: 1px solid rgba(0,0,0,0.2);
}

.table-scroll tr{
  width: 100%;
  display:flex;
}

.table-scroll td,.table-scroll th{
  flex-basis:100%;
  flex-grow:2;
  display: block;
  padding: 1rem;
  text-align:left;
}

/* Other options */

.table-scroll.small-first-col td:first-child,
.table-scroll.small-first-col th:first-child{
  flex-basis:20%;
  flex-grow:1;
}

.table-scroll tbody tr:nth-child(2n){
  background-color: rgba(130,130,170,0.1);
}

.body-half-screen{
  max-height: 250px;
}

.small-col{flex-basis:10%;}

.deadlineTaskRed{
  background: rgb(194, 104, 104);
  padding: 3px 5px;
  border-radius: 3px;
  color: white;
}

.deadlineTaskGreen{
  background: rgb(130, 194, 104);
  padding: 3px 5px;
  border-radius: 3px;
  color: rgb(255, 255, 255);
}
.project-name{
  display: inline-block;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.project-name:hover{
  overflow: visible; 
  white-space: normal;
  height:auto;
}
</style>