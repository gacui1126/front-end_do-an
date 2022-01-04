<template>
  <div class="permission container table-responsive-sm">
    <div class="title_user">
      <h2>Phân quyền</h2>
    </div>
    <div class="content">
      <div class="form-group" style="margin-top: 50px;">
        <label for="">Chọn user</label>
        <div class="inline" style="display: flex;">
          <multiselect 
            v-model="userReq" 
            :options="user"
            :clear-on-select="false" 
            :preserve-search="true" 
            placeholder="Chọn user ..." 
            label="email"
            track-by="id" 
            :preselect-first="true"
            style="cursor:pointer">
          </multiselect>
          <div class="btn-checkper" style="margin: auto 10px">
            <Button @click="checkPer()" type="warning">
              <Icon type="ios-search" />
              Check quyền
            </Button>

            <Modal
              title="Thông tin"
              v-model="checkPerModal"
              class-name="vertical-center-modal">
              <!-- <pre>{{checkUserData}}</pre> -->
              <div class="form-group">
                <label for="">Tên : </label> &nbsp;
                <span>{{checkUserData.user.name}}</span>
              </div>
              <div class="form-group">
                <label for="">Team : </label>&nbsp;
                <span>{{ teams.name }}</span>
              </div>
              <div class="form-group">
                <label for="">Email : </label>&nbsp;
                <span>{{ checkUserData.user.email}}</span>
              </div>
              <div class="form-group">
                <label for="">vai trò : </label>&nbsp;
                <span 
                  v-for="(roles,i) in checkUserData.role" 
                  :key="i" 
                  class="card-per">
                  {{ roles }}

                  <Icon @click="deleteRoleUser(roles,i)" type="ios-close" style="font-weight: 600;cursor: pointer"/>
                </span>
              </div>
              <div class="form-group">
                <label for="">quyền : </label>&nbsp;
                <span
                  v-for="(permissions,i) in checkUserData.permission" 
                  :key="i" 
                  class="card-per"
                  >
                  {{permissions}}

                  <Icon @click=deletePerUser(permissions,i) type="ios-close" style="font-weight: 600;cursor: pointer" />
                </span>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      

      <div class="form-group" >
        <label for="">Chọn vai trò</label>
        <multiselect 
          v-model="roleReq" 
          :options="role"
          :multiple="true" 
          :close-on-select="false" 
          :clear-on-select="false" 
          :preserve-search="true" 
          placeholder="Chọn vai trò ..." 
          label="name"
          track-by="id" 
          :preselect-first="true"
          style="cursor:pointer">
        </multiselect>
      </div>

      <div class="form-group" >
        <label for="">Chọn quyền cho user</label>
        <multiselect 
          v-model="permissionReq" 
          :options="permission"
          :multiple="true" 
          :close-on-select="false" 
          :clear-on-select="false" 
          :preserve-search="true" 
          placeholder="Chọn quyền ..." 
          label="name"
          track-by="id" 
          :preselect-first="true"
          style="cursor:pointer">
        </multiselect>
      </div>
      <div class="button-sub">
        <Button @click="permissionUser()" size="large" type="primary" style="margin-top:20px">Xác nhận</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sweetalert from '../../../../mixin/sweetalert'
import permission from '../../../../mixin/permission'

export default {
  data(){
    return{
      userReq: [],
      permissionReq: [],
      roleReq: [],
      checkPerModal: false
    }
  },
  mixins:[permission,sweetalert],
  computed:{
    ...mapState(['auth'])
  }, 
  created(){
    this.getUserPer()
    this.getPermission()
    this.getRole()
  },
  methods:{
    getUserPer(){
      this.mixinGetUserPer('api/user/all')
    },
    getPermission(){
      this.mixinGetPermission('api/permission/get')
    },
    getRole(){
      this.mixinGetRole('api/role/all')
    },
    permissionUser(){
      this.mixinPerUser('api/role/user-per')
    },
    checkPer(){
      this.mixinCheckPer('api/user/check-per')
    },
    deleteRoleUser(roleName,i){
      // alert(this.checkUserData.user.id)
      this.mixinDeleleRoleUser('api/role/delete-role-user',roleName,i)
    },
    deletePerUser(perName,i){
      this.mixinDeletePerUser('api/permission/delete-per-user',perName,i)
    }
  }

}
</script>

<style scoped>
  .permission{
    width: 100%;
  }
  .content{
    width: 60%;
    margin: 0 auto;
  }
  .button-sub{
    text-align: center;
  }
  .card-per{
    border: 1px solid rgb(252, 252, 252);
    border-radius: 3px; 
    padding: 2px 5px; 
    margin-right: 4px;
    background: rgb(224, 224, 175);
  }
</style>