<template>
  <div class="container table-responsive-sm">
    <div class="title_user">
      <h2>Dự án</h2>
    </div>
    <!-- CREATE -->
    <div class="button">
      <Button type="success" @click="modalCreateProject = true"><Icon type="ios-add-circle-outline" /> Tạo dự án</Button>
    </div>
    <!-- <div class="form-inline">
      <div class="input-group" data-widget="sidebar-search">
        <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-sidebar">
            <i class="fas fa-search fa-fw"></i>
          </button>
        </div>
      </div>
    </div> -->
    <Modal
        v-model="modalCreateProject"
        title="Tạo dự án"
        :mask-closable="false"
        :closable="false">
        <form>
            <div class="form-group">
              <label>Tên dự án</label>
              <input v-model="value.name" type="text" class="form-control" placeholder="Nhập tên ...">
            </div>
            <div class="form-group">
              <div>
                <label class="typo__label">Chọn team</label>
                <multiselect 
                          v-model="value.team" 
                          :options="project.getAllTeams" 
                          :multiple="true" 
                          :close-on-select="false" 
                          :clear-on-select="false" 
                          :preserve-search="true" 
                          placeholder="Chọn team muốn thêm vào dự án ..." 
                          label="name" 
                          track-by="id" 
                          :preselect-first="true"
                  >
                  
                </multiselect>
              </div>
            </div>

            <div class="form-group">
              <div>
                <label class="typo__label">Chọn user</label>
                <multiselect 
                          v-model="value.user" 
                          :options="project.getAllUsers" 
                          :multiple="true" 
                          :close-on-select="false" 
                          :clear-on-select="false" 
                          :preserve-search="true" 
                          placeholder="Chọn user muốn thêm vào dự án ..." 
                          label="email"
                          track-by="id" 
                          :preselect-first="true"
                  >
                  
                </multiselect>
              </div>

              <div class="form-group">
                <label>Ngày bắt đầu</label>
                <VueCtkDateTimePicker v-model="value.date_start" format="DD-MM-YYYY hh:mm:ss" overlay />
              </div>

              <div class="form-group">
                <label>Ngày kết thúc</label>
                <VueCtkDateTimePicker v-model="value.date_end" format="DD-MM-YYYY hh:mm:ss" overlay />
              </div>
            </div>

          </form>
      <div slot="footer">
        <Button type="primary" @click="createProject(auth.user.id)" :disabled="isCreate" :loading="isCreate">{{isCreate ? 'Đang tạo ...' : 'Tạo'}}</Button>
        <Button type="error" @click="modalCreateProject = false">Huỷ</Button>
      </div>
    </Modal>


    <!-- EDIT -->
    <Modal
        v-model="modalEditProject"
        title="Chỉnh sửa dự án"
        :mask-closable="false"
        :closable="false">
    

        <form>
            <div class="form-group">
              <label>Tên dự án</label>
              <input v-model="editData.projectName" type="text" class="form-control" placeholder="Nhập tên ...">
            </div>
            <div class="form-group">
              <div>
                <label class="typo__label">Chọn team</label>
                <multiselect 
                          v-model="editData.team" 
                          :options="project.getAllTeams" 
                          :multiple="true" 
                          :close-on-select="false" 
                          :clear-on-select="false" 
                          :preserve-search="true" 
                          placeholder="Chọn team muốn thêm vào dự án ..." 
                          label="name" 
                          track-by="id" 
                          :preselect-first="true">
                </multiselect>
              </div>
            </div>

            <div class="form-group">
              <div>
                <label class="typo__label">Chọn user</label>
                <multiselect 
                          v-model="editData.user" 
                          :options="project.getAllUsers" 
                          :multiple="true" 
                          :close-on-select="false" 
                          :clear-on-select="false" 
                          :preserve-search="true" 
                          placeholder="Chọn user muốn thêm vào dự án ..." 
                          label="email"
                          track-by="id" 
                          :preselect-first="true"
                  >
                </multiselect>
              </div>

              <div class="form-group">
                <label>Ngày bắt đầu</label>
                <VueCtkDateTimePicker v-model="editData.dateStart" format="YYYY-MM-DD hh:mm:ss" overlay />
              </div>

              <div class="form-group">
                <label>Ngày kết thúc</label>
                <VueCtkDateTimePicker v-model="editData.dateEnd" format="YYYY-MM-DD hh:mm:ss" overlay />
              </div>
            </div>
          </form>
          
      <div slot="footer">
        <Button type="primary" @click="updateProject(editData.id)" :disabled="isUpdate" :loading="isUpdate">{{isUpdate ? 'Đang update ...' : 'update'}}</Button>
        <Button type="error" @click="modalEditProject = false">Huỷ</Button>
      </div>
    </Modal>

    <!-- DELETE -->
    <!-- <Modal v-model="modalDeleteProject" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>Bạn muốn xoá dữ liệu này???</span>
        </p>
        <div style="text-align:center">
            <p>Dữ liệu sẽ được xoá</p>
            <p>Bạn chắc chắn chứ?</p>
        </div>
        <div slot="footer">
            <Button @click="deleteProject(idDelete)" type="error" size="large" long :disabled="isDelete" :loading="isDelete">{{isDelete ? 'Đang xoá ... ' : 'Xoá'}}</Button>
        </div>
    </Modal> -->
    
    <!-- INFO -->
    <Modal
        v-model="modalInfoProject"
        title="Thông tin dự án"
        :mask-closable="false"
        :closable="false">
        <div class="info">
            <div class="info-detail">
              <label for="">Tên dự án : </label>
              <span class="button"> {{infoProject.project.name}}</span>
            </div>
        </div>

        <div class="info">
            <div class="info-detail">
              <label for="">Người tạo : </label>
              <span class="button"> {{infoProject.userCreate.name}}</span>
            </div>
        </div>

        <div class="info">
            <div class="info-detail">
              <label for="">Team tham gia : </label>
              <Button @click="teamListP()" type="success" size="small" class="button">Nhấn xem</Button>
            </div>
        </div>

        <div class="info">
            <div class="info-detail">
              <label for="">người tham gia : </label>
              <Button @click="userListP()" type="success" size="small" class="button">Nhấn xem</Button>
            </div>
        </div>

        <div class="info">
            <div class="info-detail">
              <label for="">Bắt đầu : </label>
              <span class="button"> {{infoProject.project.start_at}}</span>
            </div>
        </div>

        <div class="info">
            <div class="info-detail">
              <label for="">Kết thúc : </label>
              <span class="button"> {{infoProject.project.end_at}}</span>
            </div>
        </div>
          
      <div slot="footer">
        <Button type="error" @click="modalInfoProject = false">Huỷ</Button>
      </div>
    </Modal>

    <!-- USERLIST -->
    <Modal
        v-model="teamList"
        title="Team trong dự án">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">tt</th>
              <th scope="col">Tên team</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(teams,i) in this.infoProject.project.teams" :key="i">
              <th scope="row">{{i+1}}</th>
              <td>{{teams.name}}</td>
              <td>
                <Button @click="teamDetailP(teams.id)" type="info">Chi tiết</Button>
              </td>
            </tr>
          </tbody>
        </table>
    </Modal>

    <!-- TEAMDETAIL -->
    <Modal
        v-model="teamDetail"
        title="Team">
        <table class="table table-warning table-bordered">
          <thead>
            <tr>
              <th scope="col">tt</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(users,i) in this.teamDetail" :key="i">
              <th scope="row">{{i+1}}</th>
              <td>{{users.name}}</td>
              <td>{{users.email}}</td>
            </tr>
          </tbody>
        </table>
    </Modal>

    <!-- USERLIST -->
    <Modal
        v-model="userList"
        title="Team trong dự án">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">tt</th>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(users,i) in this.infoProject.project.users" :key="i">
            <th scope="row">{{i+1}}</th>
            <td>{{users.name}}</td>
            <td>{{users.email}}</td>
          </tr>
        </tbody>
      </table>
    </Modal>

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">tt</th>
          <th scope="col">Tên</th>
          <th scope="col">Bắt đầu</th>
          <th scope="col">Kết thúc</th>
          <th scope="col">Thời hạn</th>
          <th scope="col">Tiến độ</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(projects,i) in this.data.data" :key="i">
            <th scope="row">{{i + data.from}}</th>
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
              <Button @click="editProject(projects.id, i)" type="primary" size="small">Sửa</Button> |
              <Button @click="deleteProject(projects.id, i)" type="error" size="small">Xoá</Button> |
              <Button @click="infoProjectModal(projects.id)" type="info" size="small" data-toggle="modal" data-target="#infoProjectModal">Xem thông tin</Button> |
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
          <Page :total="this.data.total*this.total" 
                :current="this.data.current_page" 
                :page-size="parseInt(this.data.total)" 
                @on-change="getProject"
                v-if="this.data"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common from '../../../../../mixin/common';
import project from '../../../../../mixin/project';
import Multiselect from 'vue-multiselect';
import sweetalert from "../../../../../mixin/sweetalert";

export default {
  mixins: [common,project,sweetalert],
  components: {
    Multiselect
  },
  data(){
    return{
      teamList: false,
      userList: false,
      teamDetail: false
    }
  },
  created(){
    this.getProject()
    this.getAllDataP()
    this.checkLogin()
  },
  computed:{
    ...mapState(['project','auth'])
  },

  methods:{
    percentProject(taskComplete,taskCount){
      let per =  taskComplete/taskCount;
      if(taskComplete == 0){
        return 0
      }else{
        return parseFloat(per*100).toFixed(0)
      }
    },
    checkLogin(){
      this.$store.dispatch('checkLogin')
    },
    getAllDataP(){
      this.$store.dispatch('getAllDataP')
    },
    getProject(page = 1){
      this.mixinGetProject(page);
      },
    createProject(id){
      this.mixinCreateProject('api/project/create',
        {
          value: this.value,
          id: id
        })
    },
    editProject(id, index){
      this.index = index
      this.mixinEditProject('api/project/edit',{
        value: this.value,
        id: id
      })
    },
    updateProject(id){
      this.mixinUpdateProject('api/project/update',{
        value: this.editData,
        id: id
      })
    },
    deleteProjectModal(id, index){
      this.modalDeleteProject = true,
      this.idDelete = id
      this.index = index
    },
    deleteProject(id,index){
      // this.mixinDeleteProject('api/project/delete', id)
      this.swdelete(this.mixinDeleteProject, "api/project/delete", id);
      this.index = index
    },
    infoProjectModal(id){
      this.mixinInfoProject('api/project/info', id)
    },
    teamListP(){
      this.teamList = true
    },
    userListP(){
      this.userList = true
    },
    teamDetailP(id){
      this.teamDetail = true
      this.mixinTeamDetail('api/project/team/detail',id)
    },
    projectCV(id){
      window.sessionStorage.setItem('idProjectCV', id)
      this.$router.push({ name: 'projectCV'});
    }
  }
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
  .btn{
    margin: 2px;
  }
  .button{
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
  }
  .info{
    padding: 5px;
  }
  .info-detail{
    display: flex;
  }
  .info-detail label{
    width: 150px;
  }
  .button{
    margin-left: 10px;
  }
  .end-project{
    border-radius: 5px;
    background: rgb(199, 89, 89);
    padding: 3px 5px;
    color: white;
    font-size: 14px;
  }
</style>