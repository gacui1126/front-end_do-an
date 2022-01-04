<template>
  <div class="container table-responsive-sm">

    <div class="title_user">
      <h2>Danh sách vai trò</h2>
    </div>

    <div class="button_create">
        <button @click="addRole = !addRole" type="button" class="btn btn-success" data-toggle="modal" data-target="#createUserModal">
          Thêm vai trò
        </button>
    </div>


    <!-- CREATE-ROLE -->
    <Modal
      v-model="addRole"
      title="Tạo vai trò mới"
      width="700"
      >
      <div class="add-role-content">
        <div class="from-group mb-2">
          <label for="">Tên vai trò</label>
          <Input v-model="roleName" placeholder="Nhập tên vai trò ..." />
        </div>

        <!-- <div class="from-group mb-2">
          <label for="">Mô tả</label>
          <Input type="textarea" v-model="authName" placeholder="Nhập mô tả ..." />
        </div> -->

        <div class="from-group mb-2">
          <label for="">Chọn chức năng cho vai trò</label>
          <multiselect 
            v-model="permissionSelect" 
            :options="permission" 
            :multiple="true" 
            :close-on-select="false" 
            :clear-on-select="false" 
            :preserve-search="true" 
            placeholder="Chọn quyền ..." 
            label="name"
            track-by="id" 
            :preselect-first="true">
          </multiselect>
        </div>

      </div>
      <div slot="footer">
        <Button @click="createRole()" type="primary">Tạo</Button>
        <Button @click="addRole = false" type="error">cancel</Button>
      </div>
    </Modal>


    <!-- EDIT_ROLE -->
    <Modal
      v-model="editRoleM"
      title="Tạo vai trò mới"
      width="700"
      >
      <div class="add-role-content">
        <div class="from-group mb-2">
          <label for="">Tên vai trò</label>
          <Input v-model="edit.name" placeholder="Nhập tên vai trò ..." />
        </div>

        <!-- <div class="from-group mb-2">
          <label for="">Mô tả</label>
          <Input type="textarea" v-model="edit.guard_name" placeholder="Nhập mô tả ..." />
        </div> -->

        <div class="from-group mb-2">
          <label for="">Chọn chức năng cho vai trò</label>
          <multiselect 
            v-model="edit.permissions" 
            :options="permission" 
            :multiple="true" 
            :close-on-select="false" 
            :clear-on-select="false" 
            :preserve-search="true" 
            placeholder="Chọn quyền ..." 
            label="name"
            track-by="id" 
            :preselect-first="true">
          </multiselect>
        </div>

      </div>
      <div slot="footer">
        <Button @click="UpdateRole(edit.id,edit.name)" type="primary">Update</Button>
        <Button @click="editRoleM = false" type="error">cancel</Button>
      </div>
    </Modal>

    <table class="table table-info table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">tt</th>
          <th scope="col">Tên</th>
          <th scope="col">Quyền</th>
          <th scope="col" style="width:150px">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(roles,index) in this.data.data" :key="index">
          <th scope="row">{{index + data.from}}</th>
          <td>{{roles.name}}</td>
          <td>
            <div class="permission">
              <div class="permission-card" v-for="(permissions,i) in roles.permissions" :key="i">
                {{permissions.name}}
              </div>
            </div>
          </td>
          <td>
            <div class="button-action">
              <Button @click="editRole(roles.id)" size="small" type="warning" class="btn btn-warning" data-toggle="modal" data-target="#editUserModal">Sửa</Button> |
              <Button @click="deleteRole(roles.id)" size="small" type="error" class="btn btn-danger">Xoá</Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <Page :total="this.data.total*this.total" 
                :current="this.data.current_page" 
                :page-size="parseInt(this.data.total)" 
                @on-change="getRole"
                v-if="this.data"
          />
      </div>
    </div>
    
  </div>
</template>

<script>
import role from '../../../../mixin/role'
import sweetalert from "../../../../mixin/sweetalert";

export default {
  mixins:[role,sweetalert],
  data(){
    return{
      addRole: false,
      editRoleM: false,
      roleName: '',
      authName: '',
      idPer: [],
      permissionSelect: [],
      permissionEdit: []
    }
  },
  created(){
    this.getRole()
    this.getPermission()
  },
  methods:{
    getRole(page =1){
      this.mixinGetRole(page)
    },
    getPermission(){
      this.mixinGetPermission('api/permission/get')
    },
    checkAll(i){
      this.permission[i].check = !this.permission[i].check
      for(let j = 0; j <this.permission[i].permission_childrent.length; j++){
        this.permission[i].permission_childrent[j].check = this.permission[i].check
      }
    },
    createRole(){
      this.mixinCreateRole('api/role/create')
    },
    editRole(id){
      this.editRoleM = true
      this.mixinEditRole('api/role/edit',id)
    },
    UpdateRole(id,name){
      this.mixinUpdateRole('api/role/update',id,name)
    },
    deleteRole(id,i){
      this.swdelete(this.mixinDeleteRole, "api/role/delete" , id, i)
    }
  }
}
</script>

<style scoped>
  .paginate{
    width: 100%;
    text-align: center;
  }
  .setting-role{
    width: 100%;
    height: 80px;
    border: rgb(180, 180, 180) 1px solid;
    border-radius: 3px;
  }
  .setting-role-header{
    background: rgb(100, 175, 156);
    padding: 5px 20px;
  }
  .setting-role-content{
    padding: 10px 0;
    margin-right: 10px;
  }
  .setting-role-content{
    display: flex;
    justify-content: space-between;
  }
  .permission{
    display: flex;
    flex-wrap: wrap;
  }
  .permission-card{
    border: 0.5px solid rgb(255, 255, 255);
    padding: 0 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    background: rgba(219, 201, 152, 0.822);
    /* color: white; */
  }
  .button-action{
    display: flex;
    justify-content: center;
  }
</style>