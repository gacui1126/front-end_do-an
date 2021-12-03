<template>
  <div class="container table-responsive-sm">
    <div class="title_user">
      <h2>Quản lý team</h2>
    </div>

    <div class="button_create">
      <button class="btn btn-success" type="button" data-toggle="modal" data-target="#createTeamModal">Thêm Team</button>
    </div>

    <CreateTeam />
    <EditTeam />
    <TeamUser />

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Team</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-for="(data,index) in teamManager.data.data" :key="index">
        <tr>
          <th scope="row">{{data.id}}</th>
          <td>{{data.name}}</td>
          <td>
            <button @click.prevent="editTeam(data.id)" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editTeamModal">Sửa</button> |
            <button @click.prevent="deleteTeam(data.id)" type="button" class="btn btn-danger">Xoá</button>  |
            <button @click.prevent="teamUser(data.id)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#TeamUserModal">Xem thành viên</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <Page :total="teamManager.pageInfo.total" 
                :current="teamManager.pageInfo.current_page" 
                :page-size="parseInt(teamManager.pageInfo.total)" 
                @on-change="showTeam"
                v-if="teamManager.pageInfo"
          />
      </div>
    </div>
  </div>
</template>

<script>

import CreateTeam from './CreateTeam'
import EditTeam from './EditTeam'
import TeamUser from './TeamUser'
import { mapState } from 'vuex'

export default {
  data(){
    return {
      data: [],
    }
  },
  computed:{
    ...mapState(['teamManager']),
    // ...mapGetters(['teamManager'])
  },
  components:{ CreateTeam, EditTeam, TeamUser },
  created(){
    this.showTeam()
    this.getAllTeam()
  },
  methods:{
    showTeam(page = 1){
      this.$store.dispatch('getTeam', page);
    },
    editTeam(id){
      this.$store.dispatch('edit', id);
    },
    deleteTeam(id){
      this.$store.dispatch('delete', id);
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
</style>