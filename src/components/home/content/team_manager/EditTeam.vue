<template>
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
                <button @click.prevent="updateTeam(teamManager.editData.id)" type="submit" class="btn btn-success">Lưu</button>
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
        
    }
  },
  computed: {
    ...mapState(['teamManager'])
  },
  methods:{
    updateTeam(id){
      this.$store.dispatch('update', id);
    }
  }
}
</script>

<style scoped>
  .btn_team{
    text-align: center;
  }
  .modal-header{
    background: #908bd6;
  }
</style>