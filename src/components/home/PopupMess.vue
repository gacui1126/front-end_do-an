<template>
  <div class="chat">
    <!-- <button class="open-button" @click="openForm()">
      <Icon type="ios-text-outline icon-mess" />
    </button> -->
    <div id="myForm" class="page-content page-container">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-md-6">
            <div class="box box-warning direct-chat direct-chat-warning">
              <div class="box-header with-border">
                <h3 class="box-title">{{message.friend.name}}</h3>
                <div class="box-tools pull-right">
                  <button
                    type="button"
                    class="btn btn-box-tool"
                    data-widget="remove"
                  >
                    <i @click="closeForm()" class="fa fa-times icon-hidden"></i>
                  </button>
                </div>
              </div>
              <div class="box-body">
                
                <div class="direct-chat-messages" v-chat-scroll="{always: false, scrollonremoved:true}">
                  <div :class="`${mess.user_id == message.friend.id ? '' : 'right' }`" class="direct-chat-msg" v-for="mess in message.data" :key="mess.id">
                    
                    <div style="text-align:center" class="direct-chat-info clearfix">
                      <span :style="`${mess.user_id == message.friend.id ? 'float:left' : 'float:right' }`" class="direct-chat-timestamp"
                        >{{mess.created_at}}</span
                      >
                    </div>

                    <img
                      data-toggle="tooltip" 
                      :title="mess.user.name"
                      style="cursor:pointer"
                      class="direct-chat-img"
                      :src="mess.user.img ? mess.user.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                      alt="message user image"
                    />

                    <div class="direct-chat-text">
                      {{mess.message}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="box-footer">
                <form @submit.prevent="sendMess">
                  <div class="input-group">
                    <div style="margin-right:10px;position:relative;margin-top:5px">
                        <div @click="toggleEmo" style="cursor:pointer;">
                        <i class="far fa-smile" style="font-size:25px"></i>
                      </div>
                      <picker :style="{ position: 'absolute', bottom: '20px', right: '24px',}" v-if="emoStatus" set="facebook" @select="onInput" />
                    </div>
                    <input
                      style="width:auto"
                      v-model="inputMess"
                      type="text"
                      placeholder="Viết tin nhắn ..."
                      class="form-control"
                    />
                    <span class="input-group-btn">
                      <button @click="sendMess" type="button" class="btn btn-success btn-flat">
                        <Icon type="md-send" />
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
// import axios from 'axios'
import { Picker } from 'emoji-mart-vue'
import {mapState} from 'vuex'
export default {
  components:{Picker},
  data() {
    return {
      inputMess:'',
      emoStatus: false,
    };
  },
  mounted(){
    this.connectChannel()
  },
  computed:{
    ...mapState(['message'])
  },
  watch:{
      activeFriend(){
      this.fetchMessages()
      }
  },
  methods: {
    closeForm() {
      document.getElementById("myForm").style.display = "none";
    },
    connectChannel(){
      this.$store.dispatch('connectChannel')
    },
    sendMess(){
      if(!this.inputMess){
        return alert('tin nhắn rỗng')
      }
      this.$store.dispatch('sendMess',this.inputMess)
      this.inputMess = null
    },
    onInput(e){
        if(!e){
            return false;
        }
        if(!this.inputMess){
            this.inputMess = e.native;
        }else{
            this.inputMess = this.inputMess + e.native;
        }
    },
    toggleEmo(){
        this.emoStatus = !this.emoStatus
    },
  },
};
</script>

<style scoped>
.stretch-card > .card {
  width: 100%;
  min-width: 100%;
}

body {
  background-color: #f9f9fa;
}

.flex {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

@media (max-width: 991.98px) {
  .padding {
    padding: 1.5rem;
  }
}

@media (max-width: 767.98px) {
  .padding {
    padding: 1rem;
  }
}
.icon-hidden{
  font-size: 20px;
}
.padding {
  padding: 3rem;
}

.box.box-warning {
  border-top-color: #74c28c;
}
.icon-mess {
  font-size: 30px;
  font-weight: 600;
}
.box {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #d2d6de;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 5px 10px 18px #888888;
}

.box-header.with-border {
  border-bottom: 1px solid #f4f4f4;
}

.box-header.with-border {
  border-bottom: 1px solid #f4f4f4;
}

.box-header {
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
}
.open-button {
  background-color: rgb(96, 132, 156);
  color: white;
  padding: 10px 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 1;
  position: fixed;
  bottom: 23px;
  right: 28px;
}
.open-button:hover {
  opacity: 0.8;
}
.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
  content: "";
  display: table;
}
.page-content {
  display: none;
  position: fixed;
  bottom: -8%;
  right: -19%;
  z-index: 9;
  width: 900px;
}
.box-header {
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
}

.box-header > .fa,
.box-header > .glyphicon,
.box-header > .ion,
.box-header .box-title {
  display: inline-block;
  font-size: 18px;
  margin: 0;
  line-height: 1;
}

.box-header > .box-tools {
  position: absolute;
  right: 10px;
  top: 5px;
}

.box-header > .box-tools [data-toggle="tooltip"] {
  position: relative;
}

.bg-yellow,
.callout.callout-warning,
.alert-warning,
.label-warning,
.modal-warning .modal-body {
  background-color: #74c28c !important;
}

.bg-yellow {
  color: #fff !important;
}

.btn {
  border-radius: 3px;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid transparent;
}

.btn-box-tool {
  padding: 5px;
  font-size: 12px;
  background: transparent;
  color: #97a0b3;
}

.direct-chat .box-body {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
  overflow-x: hidden;
  padding: 0;
}

.box-body {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
}

.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
  content: "";
  display: table;
}

.direct-chat-messages {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
  padding: 10px;
  height: 300px;
  overflow: auto;
}

.direct-chat-messages,
.direct-chat-contacts {
  -webkit-transition: -webkit-transform 0.5s ease-in-out;
  -moz-transition: -moz-transform 0.5s ease-in-out;
  -o-transition: -o-transform 0.5s ease-in-out;
  transition: transform 0.5s ease-in-out;
}

.direct-chat-msg {
  margin-bottom: 10px;
}

.direct-chat-msg,
.direct-chat-text {
  display: block;
}

.direct-chat-info {
  display: block;
  margin-bottom: 2px;
  font-size: 12px;
}

.direct-chat-timestamp {
  color: #999;
}

.btn-group-vertical > .btn-group:after,
.btn-group-vertical > .btn-group:before,
.btn-toolbar:after,
.btn-toolbar:before,
.clearfix:after,
.clearfix:before,
.container-fluid:after,
.container-fluid:before,
.container:after,
.container:before,
.dl-horizontal dd:after,
.dl-horizontal dd:before,
.form-horizontal .form-group:after,
.form-horizontal .form-group:before,
.modal-footer:after,
.modal-footer:before,
.modal-header:after,
.modal-header:before,
.nav:after,
.nav:before,
.navbar-collapse:after,
.navbar-collapse:before,
.navbar-header:after,
.navbar-header:before,
.navbar:after,
.navbar:before,
.pager:after,
.pager:before,
.panel-body:after,
.panel-body:before,
.row:after,
.row:before {
  display: table;
  content: "";
}

.direct-chat-img {
  border-radius: 50%;
  float: left;
  width: 40px;
  height: 40px;
}

.direct-chat-text {
  border-radius: 5px;
  position: relative;
  padding: 5px 10px;
  background: #d2d6de;
  border: 1px solid #d2d6de;
  margin: 5px 0 0 50px;
  color: #444;
}

.direct-chat-msg,
.direct-chat-text {
  display: block;
}

.direct-chat-text:before {
  border-width: 6px;
  margin-top: -6px;
}

.direct-chat-text:after,
.direct-chat-text:before {
  position: absolute;
  right: 100%;
  top: 15px;
  border: solid transparent;
  border-right-color: #d2ded2;
  content: " ";
  height: 0;
  width: 0;
  pointer-events: none;
}

.direct-chat-text:after {
  border-width: 5px;
  margin-top: -5px;
}

.direct-chat-text:after,
.direct-chat-text:before {
  position: absolute;
  right: 100%;
  top: 15px;
  border: solid transparent;
  /* border-right-color: #4263a7; */
  content: " ";
  height: 0;
  width: 0;
  pointer-events: none;
}

:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.direct-chat-msg:after {
  clear: both;
}

.direct-chat-msg:after {
  content: "";
  display: table;
}

.direct-chat-info {
  display: block;
  margin-bottom: 2px;
  font-size: 12px;
}

.right .direct-chat-img {
  float: right;
}

.direct-chat-warning .right > .direct-chat-text {
  background: #74c28c;
  border-color: #74c28c;
  color: #fff;
}

.right .direct-chat-text {
  margin-right: 50px;
  margin-left: 0;
}
.direct-chat-warning .right>.direct-chat-text::after, .direct-chat-warning .right>.direct-chat-text::before {
    border-left-color: #ffffff00;
}
.box-footer {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #f4f4f4;
  padding: 10px;
  background-color: #fff;
}

.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
  content: "";
  display: table;
}

.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap;
}

.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group {
  z-index: 2;
  margin-left: -1px;
}


</style>
