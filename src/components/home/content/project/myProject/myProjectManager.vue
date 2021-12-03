<template>
  <div class="container table-responsive-sm">
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
          <th scope="col">Người tạo</th>
          <th scope="col">Ngày khởi tạo</th>
          <th scope="col">Kết thúc</th>
          <th scope="col">Số lượng TV</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Product landing page</td>
          <td>Nguyễn Trường Sơn</td>
          <td>20/11/2021</td>
          <td>20/3/2020</td>
          <td>15</td>
          <td>
            <button type="button" class="btn btn-warning">Sửa</button> |
            <button type="button" class="btn btn-danger">Xoá</button> | 
            <button type="button" class="btn btn-primary">Xem thông tin</button> 
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

export default {
  data(){
    return {
      list_user: {},
    }
  },
  
  components: {},
  computed: {

  },
  created(){

  },
  methods:{ 
    
  },
  
  
}
</script>

<style scoped>
  .paginate_list{
    text-align: center;
  }
  
</style>