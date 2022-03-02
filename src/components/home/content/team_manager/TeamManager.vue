<template>
  <div class="container table-responsive-sm">
    <div class="title_user">
      <h2>Quản lý team</h2>
    </div>

    <div class="button_create">
      <button class="btn btn-success" type="button" data-toggle="modal" data-target="#createTeamModal">Thêm Team</button>
    </div>


    <!-- CREATE-TEAM -->
    <div class="modal fade" id="createTeamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header create-team-header">
            <h5 class="modal-title" id="exampleModalLabel">Tạo team</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="row form-group" >
              <div class="col">
                    <label for="">Tên nhóm</label>
                    <input type="text" name="email" v-model="team.name" class="form-control" placeholder="Nhập tên team ..." :class="{'is-invalid' : teamManager.message}"/>
                    <div v-if="teamManager.message" class="invalid-feedback">{{teamManager.message}}</div>
                  </div>
                  <div class="form-group">
                    <label for="">Chọn thành viên</label>
                    <multiselect 
                      v-model="user" 
                      :options="allUser" 
                      :multiple="true" 
                      :close-on-select="false" 
                      :clear-on-select="false" 
                      :preserve-search="true" 
                      placeholder="Chọn thành viên" 
                      label="name"
                      track-by="id" 
                      :preselect-first="true">
                    </multiselect>
                  </div>
                  <div class="btn_team">
                    <button @click.prevent="createTeam()" data-dismiss="modal" type="submit" class="btn btn-success">Tạo</button>
                  </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT-TEAM -->
    <div class="edit_team">
      <div class="modal fade" id="editTeamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Sửa team</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label>Tên Team</label>
                  <input type="text" class="form-control" v-model="teamManager.editData.name" >
                </div>
                <div class="btn_team">
                  <button @click.prevent="updateTeam(teamManager.editData.id,teamManager.editData.name)" data-dismiss="modal" type="submit" class="btn btn-success">Lưu</button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TeamUser />

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">tt</th>
          <th scope="col">Team</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-for="(team,index) in this.data.data" :key="index">
        <tr>
          <th scope="row">{{index+ data.from}}</th>
          <td>{{team.name}}</td>
          <td>
            <Button @click.prevent="editTeam(team.id)" size="small" type="warning" class="btn btn-warning" data-toggle="modal" data-target="#editTeamModal">Sửa</Button> |
            <Button @click.prevent="deleteTeam(team.id)" size="small" type="error" class="btn btn-danger">Xoá</Button>  |
            <Button @click.prevent="teamUser(team.id)" size="small" type="primary" class="btn btn-primary" data-toggle="modal" data-target="#TeamUserModal">Xem thành viên</Button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <Page :total="this.data.total*this.total" 
                :current="this.pageInfo.current_page" 
                :page-size="parseInt(this.data.total)" 
                @on-change="showTeam"
                v-if="this.pageInfo"
          />
          <!-- <Page
                v-if="this.pageInfo"
                @on-change="showTeam" 
                :total="1000"  
                :current="this.pageInfo.current_page" /> -->
      </div>
    </div>
  </div>
</template>

<script>

import TeamUser from './TeamUser'
import { mapState } from 'vuex'
import sweetalert from '../../../../mixin/sweetalert';
import team from '../../../../mixin/team'

export default {
  mixins:[team,sweetalert],
  data(){
    return {
      data: [],
      team: {},
      message : '',
      changeTeam: '',
      idUser: '',
      total: 5,
      pageInfo: null,
      user:[]
    }
  },
  computed:{
    ...mapState(['teamManager']),
  },
  components:{ TeamUser },
  created(){
    this.showTeam()
    this.getAllTeam()
    this.getAllUser()
  },
  methods:{
    getAllUser(){
      this.mixinGetAllUser('api/user/all');
    },
    showTeam(page = 1){
      // this.$store.dispatch('getTeam', page);
      this.mixinGetAllTeam(page)
    },
    editTeam(id){
      this.$store.dispatch('edit', id);
    },
    deleteTeam(id){
      this.swdelete(this.mixinDelateTeam, 'api/team/delete', id);
    },
    createTeam(){
      this.mixinCreateTeam('api/team/create',this.team)
    },
    updateTeam(id,name){
      this.mixinUpdateTeam('api/team/update',id,name)
    },
    teamUser(id){
      this.$store.dispatch('teamUser', id);
    },
    getAllTeam(){
      this.$store.dispatch('getAllTeam')
    }
  }
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
  .btn_team{
    text-align: center;
    margin: 10px;
  }
  .create-team-header{
    background: rgb(125, 150, 101);
  }
</style>