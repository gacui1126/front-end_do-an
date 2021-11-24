<template>
  <div class="container table-responsive-sm">
    <div class="title_user">
      <h2>Quản lý nhân viên</h2>
    </div>

    <div class="button_create">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#createUserModal">
          Thêm nhân viên
        </button>

      <registerUser />
      <editUser />
      <InfoUser />


    </div>
    

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên</th>
          <th scope="col">Tuổi</th>
          <th scope="col">Email</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">số điện thoại</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-for="(users,index) in createUser.getUser.data" :key="index">
        <tr>
          <th scope="row">{{users.id}}</th>
          <td>{{users.name}}</td>
          <td>{{users.age}}</td>
          <td>{{users.email}}</td>
          <td>{{users.address}}</td>
          <td>{{users.phone}}</td>
          <td>
            <button @click.prevent="editUser(users.id)" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editUserModal">Sửa</button> |
            <button @click.prevent="deleteUser(users.id)" type="button" class="btn btn-danger">Xoá</button> | 
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#InfoUserModal">Xem thông tin</button> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <Page :total="createUser.pageInfo.total" 
                :current="createUser.pageInfo.current_page" 
                :page-size="parseInt(createUser.pageInfo.total)" 
                @on-change="paginate"
                v-if="createUser.pageInfo"
          />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import registerUser from './registerUser.vue'
import editUser from './editUser'
import InfoUser from './InfoUser'
export default {
  data(){
    return {
      list_user: {},
    }
  },
  
  components: { registerUser, editUser, InfoUser },
  computed: {
    ...mapState(['createUser','teamManager'])
  },
  created(){
    this.paginate()
  },
  methods:{ 
    editUser(id){
      this.$store.dispatch('editUser', id);
    },
    deleteUser(id){
      this.$store.dispatch('deleteUser', id);
    },
    paginate(page = 1){
      this.$store.dispatch('getAllUser', page )
    }
  },
  
  
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
</style>