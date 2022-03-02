<template>
  <div class="container table-responsive-sm">

    <div class="title_user">
      <h2>Quản lý nhân viên</h2>
    </div>

    <div class="button_create">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#createUserModal">
          Thêm nhân viên
        </button>

      <!-- CREATE_USER -->
      <form action="" @submit.prevent="">

        <div class="modal fade" id="createUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog dialog-create" role="document">
            <div class="modal-content content-create">
              <div class="modal-header create-header">
                <h5 class="modal-title" id="exampleModalLabel">Tạo User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div id="notify-create-user-success">
                
              </div>
                <div class="add_form">
                  <button class="btn btn-success ml-1" @click.prevent="add()">
                    <i class="fas fa-plus-circle mr-1"></i>thêm form
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
                    <button class="btn btn-danger" @click.prevent="remove(index)" v-show="index || ( !index && inputs.length!== undefined && inputs.length > 1)">
                      <i class="fas fa-minus-circle">xoá</i>
                    </button>       
                  </div>
                  <div :class="{'alert-danger' : createUser.errors}" role="alert" style="margin-top: 10px;">
                    <div v-if="createUser.errors">{{createUser.errors[createUser.keys[index]]}}</div>
                  </div>
                </form>                         
                  <div class="col button_submit">
                    <button @click="createUsers()" type="submit" class="btn btn-primary" data-dismiss="modal">Thêm</button>
                  </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Huỷ</button>
                <!-- <button type="button" class="btn btn-primary">Lưu</button> -->
              </div>
            </div>
          </div>
        </div>
      </form>
      <Spin size="large" fix v-if="spinShow"></Spin>


      <!-- UPDATE-USER -->
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

                <div class="form-group">
                  <label>Email</label>
                  <input v-model="edit.email" type="email" class="form-control" placeholder="email...">
                </div>
                <div class="form-group">
                  <label>Tên</label>
                  <input v-model="edit.name" type="text" class="form-control" placeholder="Tên...">
                </div>
                <div class="form-group">
                  <label>Tuổi</label>
                  <input v-model="edit.age" type="text" class="form-control" placeholder="Tuổi...">
                </div>
                <div class="form-group">
                  <label>Team</label>
                  <select class="custom-select" v-model="teamName">
                      <option disabled selected>chọn team</option>
                      <option v-for="(data,index) in teamManager.getAllTeam" :key="index"> {{data.name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>địa chỉ</label>
                  <input v-model="edit.address" type="text" class="form-control" placeholder="Địa chỉ...">
                </div>
                <div class="form-group">
                  <label>SĐT</label>
                  <input v-model="edit.phone" type="text" class="form-control" placeholder="Số điện thoại...">
                </div>
                <div class="btn-up">
                  <button @click.prevent="update(edit.id)" data-dismiss="modal" type="submit" class="btn btn-primary">Update</button>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <InfoUser />


    </div>
    

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">tt</th>
          <th scope="col">Tên</th>
          <th scope="col">Tuổi</th>
          <th scope="col">Email</th>
          <!-- <th scope="col">Địa chỉ</th> -->
          <th scope="col">số điện thoại</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-for="(users,index) in this.data.data" :key="index">
        <tr>
          <th scope="row">{{index + data.from}}</th>
          <td>{{users.name}}</td>
          <td>{{users.age}}</td>
          <td>{{users.email}}</td>
          <!-- <td>{{users.address}}</td> -->
          <td>{{users.phone}}</td>
          <td>
            <Button @click.prevent="editUser(users.id,index)" size="small" type="warning" class="btn btn-warning" data-toggle="modal" data-target="#editUserModal">Sửa</Button> |
            <Button @click.prevent="deleteUser(users.id)" size="small" type="error" class="btn btn-danger">Xoá</Button> | 
            <Button type="primary" size="small" class="btn btn-primary" data-toggle="modal" data-target="#InfoUserModal">Xem thông tin</Button> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <Page :total="this.data.total*this.total" 
                :current="this.data.current_page" 
                :page-size="parseInt(this.data.total)" 
                @on-change="paginate"
                v-if="this.data"
          />
      </div>
    </div>
    
  </div>
</template>

<script>

import { mapState } from 'vuex'
import InfoUser from './InfoUser'
import user from '../../../../mixin/user';
import message from '../../../../mixin/message'
import sweetalert from '../../../../mixin/sweetalert';

// import { ElButton } from 'vue-el-element'

export default {
  name: 'UserManager',
  mixins:[user,message,sweetalert],
  data(){
    return {
      inputs: [{
          name: '',
          email: '',
          password: '',
          team: ''
        }],
        spinShow: false
    }
  },
  
  components: { InfoUser},
  computed: {
    ...mapState(['createUser','teamManager','auth'])
  },
  created(){
    this.paginate()
    // this.showUser()
    this.showTeam()
    // this.checkPer('list')
  },
  mounted(){
    this.checkLogin()
  },
  methods:{ 
    
    checkLogin(){
      this.$store.dispatch('checkLogin')
    },
    editUser(id){
      this.mixinEditUser('api/user/edit',id)
    },
    deleteUser(id,i){
      this.swdelete(this.mixinDeleteUser, 'api/user/delete', id,i);
    },
    paginate(page = 1){
      this.mixinGetAllUser(page)
      // window.console.log(window.__user__)
    },
    // showUser(){
    //   this.$store.dispatch('getAllUser');
    // },
    update(id){
      this.mixinUpdateUser('api/user/update',id)
    },
    showTeam(){
      this.$store.dispatch('getAllTeam');
    },
    createUsers(){
      this.spinShow = true
      this.mixinCreateUser('api/user/create',this.inputs)
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
    }
  },
  
  
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
  .btn-up{
    text-align: center;
  }
  .modal-header{
    background: #8ba9d6;
  }
  .dialog-create {
    max-width: 90%;
    height: 90%;
  }

  .content-create {
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
  .create-header{
    background: #8bd695;
  }
</style>