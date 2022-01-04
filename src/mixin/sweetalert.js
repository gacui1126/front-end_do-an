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
    },
    errorNotice(mess) {
      this.$swal({
        title: mess,
        icon: 'error',
        showCloseButton: true,
        showLoaderOnConfirm: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    },
    successNotice(mess){
      this.$swal({
        title: mess,
        icon: 'success',
        showCloseButton: true,
        showLoaderOnConfirm: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    },
    errorPermission() {
      this.$swal({
        title: 'Bạn không có quyền này',
        icon: 'error',
        showCloseButton: true,
        showLoaderOnConfirm: true,
        // toast: true,
        // position: 'top-end',
        // showConfirmButton: false,
        // timer: 3000,
        // timerProgressBar: true,
      })
    },
  }
}