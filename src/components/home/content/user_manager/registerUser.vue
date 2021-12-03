<template>
  <div class="register_user">
        <!-- Modal -->
        <form action="" @submit.prevent="createUsers()">

        <div class="modal fade" id="createUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tạo User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div id="notify-create-user-success">
                
              </div>
                <div class="add_form">
                  <button class="btn btn-success ml-1" @click.prevent="add()">
                    <i class="fas fa-plus-circle">thêm form</i>
                  </button>
                </div>
                
                <form class="row form-group border-user" v-for="(input,index) in inputs" :key="index">
                  
                  <div class="col">
                    <input type="text" name="name" v-model="input.name" class="form-control" placeholder="Tên..."/>
                  </div>
                  <div class="col">
                    <input type="email" name="email" v-model="input.email" class="form-control" placeholder="Email..."/>
                    <!-- <div v-if="createUser.errors" class="invalid-feedback">{{createUser.errors[createUser.keys[index]]}}</div> -->
                  </div>
                  <div class="col">
                    <input type="password" name="password" v-model="input.password" class="form-control" placeholder="Mật khẩu..."/>
                    <!-- <div v-if="createUser.errors" class="invalid-feedback">{{createUser.errors[createUser.keys[index]]}}</div> -->
                  </div>
                  <div class="col">
                    <select class="form-select" v-model="input.team">
                      <option value="" disabled selected>Team</option>
                       <option v-for="(data,index) in teamManager.getAllTeam" :key="index"> {{data.name}}</option>
                    </select>
                  </div>
                  <div class="col">
                    <button class="btn btn-danger" @click.prevent="remove(index)" v-show="index || ( !index && inputs.length > 1)">
                      <i class="fas fa-minus-circle">xoá</i>
                    </button>       
                  </div>
                  <div :class="{'alert-danger' : createUser.errors}" role="alert" style="margin-top: 10px;">
                    <div v-if="createUser.errors">{{createUser.errors[createUser.keys[index]]}}</div>
                  </div>
                </form>                         
                  <div class="col button_submit">
                    <button type="submit" class="btn btn-primary">Thêm</button>
                  </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Huỷ</button>
                <!-- <button type="button" class="btn btn-primary">Lưu</button> -->
              </div>
            </div>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
        inputs: [{
          name: '',
          email: '',
          password: '',
          team: ''
        }]
    }
  },
  computed: {
    ...mapState(['createUser','teamManager'])
  },
  mounted(){
    this.showTeam()
  },
  methods:{
    showTeam(){
      this.$store.dispatch('getTeam')
    },
    createUsers(){
      this.$store.dispatch('createUsers',this.inputs)
    },
    add() {
      this.inputs.push({
        name: '',
        email: '',
        password: '',
        team: ''
      })
    },
    remove(index) {
      // this.$store.dispatch('removeform',index)
      this.inputs.splice(index, 1);
    },
  }
}
</script>

<style scoped>
  /* .modal-content{
    border-radius: 10px;
  } */
  .modal-dialog {
    max-width: 90%;
    height: 90%;
  }

  .modal-content {
    height: auto;
    min-height: 100%;
  }

  .button_submit{
    text-align: center;
    margin-top: 10px;
  }
  .border-user{
    width: 100%;
    margin-left: 0px;
    margin-bottom: 0;
    border: 1px solid #000;
    padding: 20px;
  }
  .add_form{
    padding: 10px 20px 10px 0;
    text-align: right;
  }
  .modal-header{
    background: #8bd695;
  }
</style>