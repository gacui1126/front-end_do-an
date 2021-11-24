<template>
  <div class="login__form">
    <div class="row">
      <form class="col-9 mx-auto mt-5" @submit.prevent="login()">
        <div class="center_container">
          <h2>Đăng Nhập</h2>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input v-model="user.email" type="email" name="email" class="form-control" placeholder="Enter email" :class="{'is-invalid' : auth.error.email}">
          <div v-if="auth.error.email" class="invalid-feedback">{{auth.error.email[0]}}</div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Mật khẩu</label>
          <input v-model="user.password" type="password" name="password" class="form-control" placeholder="Password" :class="{'is-invalid' : auth.error.password}">
          <div v-if="auth.error.password" class="invalid-feedback">{{auth.error.password[0]}}</div>
        </div>
        <div class="center_container button">
          <button class="btn btn-warning" type="submit">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Đăng Nhập
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; 
export default{
  data: ()=>({
    user: {
      email: '',
      password: ''
    },
    loading: false,
    error: '',
  }),
  computed: {
    ...mapState(['auth']),
  },
  methods:{
    login(){
      this.$store.dispatch('login',this.user)
      this.loading = true
    }
  }
}
</script>

<style lang="css" scoped>
  .row{
    width: 400px;
    padding: 50px 0;
    border: 1px solid #000;
    border-radius: 10px;
    margin: 50px auto;
    box-shadow: 10px 10px 8px #888888;
  }

  .form-group label{
    margin: 10px 0;
  }
  .button{
    margin-top: 15px;
  }
  .center_container{
    display: flex;
    justify-content: center;
  }
</style>
