<template>
  <div class="create_team">
    <div class="modal fade" id="createTeamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tạo team</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="row form-group" @submit.prevent="createTeam()">
              <div class="col">
                    <input type="text" name="email" v-model="team.name" class="form-control" placeholder="Nhập tên team ..." :class="{'is-invalid' : teamManager.message}"/>
                    <div v-if="teamManager.message" class="invalid-feedback">{{teamManager.message}}</div>
                  </div>
                  <div class="btn_team">
                    <button type="submit" class="btn btn-success">Tạo</button>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
        team:{
          // name: ''
        }
    }
  },
  computed:{
    ...mapState(['teamManager'])
  },
  methods:{
    createTeam(){
      this.$store.dispatch('create',this.team)
    }
  }
}
</script>

<style scoped>
  .btn_team{
    text-align: center;
    margin-top: 10px;
  }
  
</style>