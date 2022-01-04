<template>
  <div class="container table-responsive-sm">
    <pre>{{info.id}}</pre>
    <div class="title_user">
      <h2>Dự án của tôi</h2>
    </div>

    <div class="button_create">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#createProjectModal">
          Thêm dự án
        </button>
    </div>
    

    <table class="table table-success table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên</th>
          <th scope="col">Ngày khởi tạo</th>
          <th scope="col">Kết thúc</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-for="(projects,i) in this.myProject" :key="i">
        <tr>
          <th scope="row">{{projects.id}}</th>
          <td>{{projects.name}}</td>
          <td>{{projects.start_at}}</td>
          <td>{{projects.end_at}}</td>
          <td>
            <Button @click="projectCV(projects.id)"
                      type="warning" size="small" 
                      data-toggle="modal" 
                      data-target="#infoProjectModal">
                <Icon type="ios-arrow-forward" />
                Vào dự án
            </Button> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginate">
      <div class="paginate_list">
          <!-- <Page :total="createUser.pageInfo.total" 
                :current="createUser.pageInfo.current_page" 
                :page-size="parseInt(createUser.pageInfo.total)" 
                @on-change="paginate"
                v-if="createUser.pageInfo"
          /> -->
      </div>
    </div>
  </div>
</template>

<script>
import myProject from '../../../../../mixin/myProject'

export default {
  mixins:[myProject],
  data(){
    return {
      list_user: {},
    }
  },
  created(){
    this.getMyProject(this.info.id)
  },
  methods:{ 
    // getInfoUser(){
    //   this.mixinGetInfoUser('api/user/info')
    // },
    getMyProject(page = 1){
      this.mixinGetMyProject(page)
    },
    projectCV(id){
      window.sessionStorage.setItem('idProjectCV', id)
      this.$router.push({ name: 'projectCV'});
    }
  },
  
  
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
  
</style>