<template>
  <div class="edit_user">
    <div class="modal fade" id="InfoUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Info User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
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
  computed:{
    ...mapState(['createUser','teamManager'])
  },
  methods:{
    
  }
}
</script>

<style scoped>
  .btn-up{
    text-align: center;
  }
  .modal-header{
    background: #d6ad8b;
  }
</style>