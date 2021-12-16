export default {
  data(){
    return{

    }
  },
  methods:{
    swdelete(mixin,url,data){
      this.$swal({
        title: 'Bạn chắc chứ?',
        text: 'user sẽ bị xoá khỏi thẻ!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vâng tôi xoá!',
        cancelButtonText: 'Không!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          mixin(url, data)
          this.$swal('Đã xoá', 'Xoá thành viên khỏi thẻ thành công', 'success')
        } else {
          this.$swal('Huỷ thao tác', 'Thành viên vẫn được giữ lại trong thẻ', 'info')
        }
      })
    }
  }
}