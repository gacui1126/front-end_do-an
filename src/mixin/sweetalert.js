export default {
  data(){
    return{

    }
  },
  methods:{
    swdelete(mixin,url,data,index,i){
      this.$swal({
        title: 'Bạn chắc chứ?',
        text: 'Dữ liệu sẽ bị xoá!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vâng tôi xoá!',
        cancelButtonText: 'Không!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          mixin(url, data,index,i)
          this.$swal('Đã xoá', 'Xoá dữ liệu thành công', 'success')
        } else {
          this.$swal('Huỷ thao tác', 'Dữ liệu vẫn được giữ lại', 'info')
        }
      })
    }
  }
}