<template>
  <div class="edit_user">
    <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Email</label>
                <input v-model="createUser.edit.email" type="email" class="form-control" placeholder="email...">
              </div>
              <div class="form-group">
                <label>Tên</label>
                <input v-model="createUser.edit.name" type="text" class="form-control" placeholder="Tên...">
              </div>
              <div class="form-group">
                <label>Tuổi</label>
                <input v-model="createUser.edit.age" type="text" class="form-control" placeholder="Tuổi...">
              </div>
              <div class="form-group">
                <label>Team</label>
                <select class="custom-select" v-model="createUser.teamName">
                    <!-- <option value="0" disabled selected>Chọn team</option> -->
                    <option v-for="(data,index) in teamManager.getAllTeam" :key="index"> {{data.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>địa chỉ</label>
                <input v-model="createUser.edit.address" type="text" class="form-control" placeholder="Địa chỉ...">
              </div>
              <div class="form-group">
                <label>SĐT</label>
                <input v-model="createUser.edit.phone" type="text" class="form-control" placeholder="Số điện thoại...">
              </div>
              <div class="btn-up">
                <button @click.prevent="update(createUser.edit.id)" type="submit" class="btn btn-primary">Update</button>
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
  computed:{
    ...mapState(['createUser','teamManager'])
  },
  mounted(){
    this.showUser()
    this.showTeam()
  },
  methods:{
    showUser(){
      this.$store.dispatch('getAllUser');
    },
    update(id){
      this.$store.dispatch('updateUser',id)
    },
    showTeam(){
      this.$store.dispatch('getAllTeam');
    }
  }
}
</script>

<style scoped>
  .btn-up{
    text-align: center;
  }
  .modal-header{
    background: #8ba9d6;
  }
</style>