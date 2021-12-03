<template>
  <div class="Reset-pass">
    <div class="modal fade" id="ResetPassModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Thay đổi mật khẩu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="notify-reset-password-info">
                
              </div>
            <form @submit.prevent="resetPass()">
              <div class="form-group">
                <label>Mật khẩu cũ</label>
                <input v-model="reset_pass.password_old" type="password" name="password_old" class="form-control" :class="{'is-invalid' : auth.errorResetPass.password_old}">
                <div v-if="auth.errorResetPass.password_old" class="invalid-feedback">{{auth.errorResetPass.password_old[0]}}</div>
              </div>
              <div class="form-group">
                <label>Mật khẩu mới</label>
                <input v-model="reset_pass.password_new" type="password" name="password_new" class="form-control" :class="{'is-invalid' : auth.errorResetPass.password_new}">
                <div v-if="auth.errorResetPass.password_new" class="invalid-feedback">{{auth.errorResetPass.password_new[0]}}</div>
              </div>
              <div class="form-group">
                <label>Nhập lại mật khẩu mới</label>
                <input v-model="reset_pass.password_re" type="password" name="password_re" class="form-control" :class="{'is-invalid' : auth.errorResetPass.password_re}">
                <div v-if="auth.errorResetPass.password_re" class="invalid-feedback">{{auth.errorResetPass.password_re[0]}}</div>
              </div>
              <div class="button">
                <button type="submit" class="btn btn-success">Đổi</button>
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
  data(){
    return{
      reset_pass:{
        password_old:'',
        password_new:'',
        password_re: ''
      }
    }
  },
  computed:{
    ...mapState(['auth'])
  },
  methods:{
    resetPass(){
      this.$store.dispatch('resetPass', this.reset_pass)
    }
  }
}
</script>

<style scoped>
  .button{
    text-align: center;
  }
  .modal-header{
    background: #d6c58b;
  }
</style>