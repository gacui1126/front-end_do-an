<template>
  <div class="update_image">
    <div class="modal fade" id="updateImageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-side modal-bottom-right modal-notify modal-info" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Thay đổi hình đại diện</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="" @submit.prevent="uploadImg(auth.user.id)">
              <div class="avt">
                <div class="img">
                  <img class="img-avt" v-bind:src="imagePreview" width="150" height="200" v-show="showPreview"/> 
                </div>
                  <label class="form-label" for="customFile">Thay đổi hình đại diện</label>
              </div>       
              <input @change="handleOnchange" name="image" type="file" class="form-control" id="customFile" />
              <div class="button_update">
                <button class="btn btn-info">
                  update
                </button>
              </div>   
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      image : null,
      imagePreview: null,
      showPreview: false,
    }
  },
  computed:{
    ...mapState(['auth'])
  },
  methods:{
    handleOnchange(e){
      this.image = e.target.files[0]
      let reader  = new FileReader();
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);
      if( this.image ){
        if ( /\.(jpe?g|png|gif)$/i.test( this.image.name ) ) {
            reader.readAsDataURL( this.image );
        }
      }
    },
    uploadImg(id) {
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('id', id);
      this.$store.dispatch('uploadImg', formData)                
    }
  }
}
</script>

<style scoped>
  .button_update{
    margin-top: 10px;
    text-align: center;
  }
  .avt{
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
  }
  .img{
    padding-bottom: 10px;
  }
  .img-avt{
    border: seagreen solid 1px;
    border-radius: 10px;
    box-shadow: 10px 10px 5px #aaaaaa;
  }
  .modal-header{
    background: #d6b88b;
  }
</style>