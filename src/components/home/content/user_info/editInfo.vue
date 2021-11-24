<template>
  <div class="edit_info">
    <div class="modal fade" id="editInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa thông tin</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="notify-update-info">
                
              </div>
            <form @submit.prevent="updateUserInfo(auth.editUser.id)">
              <div class="form-group">
                <label>Tên</label>
                <input v-model="auth.editUser.name" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label>số điện thoại</label>
                <input v-model="auth.editUser.phone" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label>tuổi</label>
                <input v-model="auth.editUser.age" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label>địa chỉ</label>
                <input v-model="auth.editUser.address" type="text" class="form-control">
              </div>
              <div class="button">
                <button type="submit" class="btn btn-info">Update</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['auth'])
  },
  methods:{
    updateUserInfo(id){
      this.$store.dispatch('updateUserInfo', id)
    }
  }
}
</script>

<style scoped>
  .button{
    text-align: center;
  }
</style>