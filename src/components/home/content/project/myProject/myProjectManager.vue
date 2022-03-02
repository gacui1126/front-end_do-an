<template>
  <div class="container table-responsive-sm">
    <pre>{{info.id}}</pre>
    <div class="title_user" style="margin-bottom: 10px">
      <h2>Dự án tham gia</h2>
    </div>

    <!-- <div class="button_create">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#createProjectModal">
          Thêm dự án
        </button>
    </div> -->
    

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên</th>
          <th scope="col">Bắt đầu</th>
          <th scope="col">Kết thúc</th>
          <th scope="col">Thời hạn</th>
          <th scope="col">Tiến độ</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-for="(projects,i) in this.myProject" :key="i">
        <tr>
          <th scope="row">{{projects.id}}</th>
          <td>{{projects.name}}</td>
          <td>{{projects.start_at}}</td>
          <td>{{projects.end_at}}</td>
          <td v-if="projects.deadline != 0" >{{projects.deadline}} Ngày</td>
            <td v-if="projects.deadline == 0" >
              <span class="end-project">
                Kết thúc
              </span>
            </td>
          <td>
            <span style="background:rgb(115, 199, 89);padding:2px 5px;border-radius:5px;color:#fff">
              {{percentProject(projects.countComplete,projects.countTaskDetail)}}%
            </span>
            </td>
          <td>
            <Button @click="projectCV(projects.id)"
                      type="warning" size="small" 
                      data-toggle="modal" 
                      data-target="#infoProjectModal">
                <Icon type="ios-arrow-forward" />
                Vào dự án
            </Button> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <!-- <Page :total="createUser.pageInfo.total" 
                :current="createUser.pageInfo.current_page" 
                :page-size="parseInt(createUser.pageInfo.total)" 
                @on-change="paginate"
                v-if="createUser.pageInfo"
          /> -->
      </div>
    </div>
  </div>
</template>

<script>
import myProject from '../../../../../mixin/myProject'

export default {
  mixins:[myProject],
  data(){
    return {
      list_user: {},
    }
  },
  created(){
    this.getMyProject(this.info.id)
  },
  methods:{ 
    // getInfoUser(){
    //   this.mixinGetInfoUser('api/user/info')
    // },
    getMyProject(page = 1){
      this.mixinGetMyProject(page)
    },
    projectCV(id){
      window.sessionStorage.setItem('idProjectCV', id)
      this.$router.push({ name: 'projectCV'});
    },
    percentProject(taskComplete,taskCount){
      let per =  taskComplete/taskCount;
      if(taskComplete == 0){
        return 0
      }else{
        return per*100
      }
    },
  },
  
  
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
  .end-project{
    border-radius: 5px;
    background: rgb(199, 89, 89);
    padding: 3px 5px;
    color: white;
    font-size: 14px;
  }
  
</style>