<template>
  <div class="team_user">

  <change-team />
    
    <div class="modal fade" id="TeamUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">thành viên team</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-warning">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Tuổi</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody v-for="(data,index) in teamManager.teamUser" :key="index">
                <tr>
                  <th scope="row">{{data.id}}</th>
                  <td>{{data.name}}</td>
                  <td>{{data.age}}</td>
                  <td>
                    <button @click="getIdUser(data.id)" class="btn btn-info" data-toggle="modal" data-target="#ChangeTeamModal" data-dismiss="modal">Đổi team</button> 
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="quantity">
            <span>Số lượng thành viên: {{teamManager.quantityUser}}</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChangeTeam from './ChangeTeam.vue'
export default {
  components: { ChangeTeam },
  data(){
    return{

    }
  },
  computed:{
    ...mapState(["teamManager"])
  },
  methods:{
    getIdUser(id){
      this.$store.dispatch('getIdUser',id)
    }
  }
}
</script>

<style scoped>
  .modal-dialog {
    max-width: 90%;
    height: 90%;
  }

  .modal-content {
    height: auto;
    min-height: 100%;
  }
  .text{
    text-align: center;
  }
  .btn{
    color: #000;
  }
  .quantity{
    text-align: center;
    border: 1px solid #000;
  }
  
</style>