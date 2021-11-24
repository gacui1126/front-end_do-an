<template>
  <div class="change_team">
    <div class="modal fade" id="ChangeTeamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Đổi team</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="notify-change-team"></div>
            
            <form @submit.prevent="updateTeam(teamManager.idUser)">
              <div class="form-group">
                <label>Team muốn đổi</label>
                    <select class="form-select" v-model="team.name">
                      <option value="" disabled selected>Chọn team</option>
                      <option v-for="(data,index) in teamManager.data" :key="index"> {{data.name}}</option>
                    </select>
              </div>
              <div class="btn_team">
                <button type="submit" class="btn btn-success">Lưu</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      team:{
        name:''
      }
    }
  },
  computed: {
    ...mapState(['teamManager','createUser','auth'])
  },
  methods:{
    updateTeam(id){
      this.$store.dispatch('changeTeam', { id:id, name:this.team.name })
    }
  }
}
</script>

<style scoped>
  .btn_team{
    text-align: center;
  }
  
</style>