// import swal from 'sweetalert2';
import Vue from 'vue';
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
    swComplete(dispatch,url,data,i){
      this.$swal({
        title: 'Bạn muốn xác nhận yêu cầu này?',
        text: 'Yêu cầu này sẽ được xác nhận',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận!',
        cancelButtonText: 'Không!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          // window.console.log(task_detail_id)
          dispatch(url,data,i)
          this.$swal('Xác nhận thành công', 'Đã xác nhận yêu cầu', 'success')
        } else {
          this.$swal('Huỷ thao tác', 'Xác nhận này vẫn được giữ lại', 'info')
        }
      })
    },
    swDetroy(dispatch,url,data,index,i){
      this.$swal({
        title: 'Bạn muốn huỷ yêu cầu này?',
        text: 'Yêu cầu này sẽ bị huỷ!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vâng tôi huỷ!',
        cancelButtonText: 'Không!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          dispatch(url,data,i)
          this.$swal('Đã huỷ', 'Yêu cầu đã huỷ thành công', 'success')
        } else {
          this.$swal('Huỷ thao tác', 'Yêu cầu này vẫn được giữ lại', 'info')
        }
      })
    },
    swNoti(mixin,url,data){
      this.$swal({
        title: 'Bạn muốn gửi yêu cầu xác nhận chứ?',
        text: 'Yêu cầu sẽ được gửi đến người quản lý dự án!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Gửi yêu cầu!',
        cancelButtonText: 'Không!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          mixin(url, data)
          // this.$swal('Đã gửi yêu cầu', 'Gửi yêu cầu xác nhận thành công', 'success')
        } else {
          // this.$swal('Huỷ thao tác', '', 'info')
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
    chatNotication(img,name,message){
      Vue.swal({
        html:  
        `   <div style="display:flex;">
                <img src="${img ? img : 'https://i.stack.imgur.com/gMbrL.jpg'}" width="40" height="40"/>
                <div style="text-align: left; margin-left: 10px">
                    <strong>${name}</strong><br>
                    ${message}
                </div>
            </div>
        `,
        showCloseButton: true,
        showLoaderOnConfirm: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        })
    }
  }
}