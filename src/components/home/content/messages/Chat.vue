<template>
  <div class="chat-form">
    <Header>
        <div class="logo" style="display:flex;justify-content:center">
            <router-link to="overview" href="" class="brand-link link-none">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
                <span class="font-weight-light">QLDA</span>
            </router-link>
        </div>
    </Header>
    <div class="container">
      <div class="row clearfix">
          <div class="col-lg-12">
              <div class="card chat-app">

                  <div id="plist" class="people-list">
                      <div class="input-group">
                          <input v-model="search" type="text" class="form-control" placeholder="Tìm kiếm ...">
                          <!-- <div class="input-group-prepend" style="cursor:pointer">
                              <span class="input-group-text"><i class="fa fa-search"></i></span>
                          </div> -->
                      </div>
                      <div class="create-group" style="text-align: center">
                      </div>
                      <ul class="list-unstyled chat-list mt-2 mb-0" style="height:420px;overflow-y:scroll;overflow-x: hidden;">
                          <li 
                            style="margin-bottom: 1px"
                            :class="{'selected': user == selected}"
                            class="clearfix" v-for="user in filteredList" :key="user.id"
                            @click="selectedUser(user)">

                              <img :src="user.img ? user.img : 'https://i.stack.imgur.com/gMbrL.jpg'" alt="avatar">
                              <div class="about center-right">
                                    <p class="name">{{user.name}}</p>
                                    <div class="status">
                                        <i class="fa fa-circle" 
                                        :class="`${onlineUser.find(online=>online.id === user.id)  ? 'online' : 'offline'}`">
                                        </i>
                                            {{onlineUser.find(online=>online.id === user.id)  ? 'Online' : 'Offline'}} 
                                    </div>                                
                              </div>
                              <span class="unread" v-if="user.unread">{{user.unread > 5 ? '5+' : user.unread}}</span>
                          </li>
                      </ul>
                  </div>
                <div class="chat">
                    <div class="chat-header clearfix">
                        <div class="row">
                            <div v-if="friend.name" class="col-lg-6" style="display:flex">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img :src="friend.img ? friend.img : 'https://i.stack.imgur.com/gMbrL.jpg'" alt="avatar">
                                </a>
                                <div class="chat-about">
                                    <h6 class="m-b-0">{{friend.name}}</h6>
                                    <small>Last seen: 2 hours ago</small>
                                </div>
                            </div>
                            <div class="col-lg-6 hidden-sm text-right">
                                <!-- <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
                                <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a> -->
                            </div>
                        </div>
                    </div>
                    <div id="scroll" class="chat-history" >
                        <ul class="m-b-0 message-1" v-chat-scroll style="height: 400px">
                            <li class="clearfix" v-for="(message,i) in messages" :key="i">
                                <div class="message-data" :class="`${message.user_id == activeFriend ? '' : 'text-right'}`">
                                    <small class="message-data-time">{{message.created_at}}</small>
                                    <img class="avt-chat"
                                        :class="`${message.user_id == activeFriend ? 'float-left' : 'float-right'}`"
                                        :src="message.user.img ? message.user.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                                        >
                                </div>
                                <div style="margin-top:10px" class="message " :class="`${message.user_id == activeFriend ? 'my-message' : 'other-message float-right'}`"> {{message.message}} </div>
                            </li>
                        </ul>
                        <p v-if="typingFriend.name">{{typingFriend.name}} đang nhập .... </p>
                    </div>
                    <div class="chat-message clearfix">
                        <div v-if="friend.name" class="input-group mb-0">
                                
                            <div style="margin-right:10px;position:relative;display: flex;flex-direction: column;justify-content: center;" >
                                <div @click="toggleEmo" style="cursor:pointer;">
                                    <i class="far fa-smile" style="font-size:30px"></i>
                                </div>
                                <picker :style="{ position: 'absolute', bottom: '50px', left: '20px',}" v-if="emoStatus" set="facebook" @select="onInput" />
                            </div>
                            <form @submit.prevent="sendMess" style="width:90%">
                                <input @keydown="onTyping" v-model="inputMess" type="text" class="form-control" placeholder="Viết tin nhắn ...">  
                            </form>
                            <button @click="sendMess" class="btn btn-primary">
                                <Icon type="md-send" />  
                            </button> 
                            
                            
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import chat from '../../../../mixin/chat'
import moment from 'moment'
import { mapState } from 'vuex'
import _ from 'lodash';
import { Picker } from 'emoji-mart-vue'

import axios from 'axios'
export default {
mixins:[chat],
components:{Picker},
props:{
    user:{
        type:Object
    }
},
data(){
    return{
        friend: [],
        typingFriend:{},
        u:{},
        search: '',
        selected: 0,
        onlineUser: [],
        emoStatus: false,
    }
},
computed:{
    ...mapState(['auth']),
    filteredList() {
        return this.sortedUser.filter(users => {
            return users.name.toLowerCase().includes(this.search.toLowerCase())
        })
    },
    sortedUser(){
        return _.sortBy(this.users,[(user)=>{
            if(user == this.selected){
                return Infinity;
            }
            return user.unread;
        }]).reverse();
    },
},
watch:{
    activeFriend(){
        this.fetchMessages()
    }
},
methods:{
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
    selectedUser(user){
        this.selected = user;
        this.activeFriend = user.id;
        this.$emit('selected',user);
    },
    onTyping(){
        // window.console.log(this.activeFriend)
        window.Echo.private(`privateChat.${this.activeFriend}`)
        .whisper('typing',{
            user:this.u,
        })
    },
    hanleIncoming(message){
        // window.console.log(message.user_id,this.activeFriend)
        if(message.user_id == this.activeFriend){
            // let mess = message
            message.created_at = moment(String(message.created_at)).format('DD-MM-YYYY hh:mm:ss A');
            this.messages.push(message);
            this.activeFriend = message.user_id;
        }else{
            this.$swal({
            html:  
            `   <div style="display:flex;">
                    <img src="${message.user.img}" width="40" height="40"/>
                    <div style="text-align: left; margin-left: 10px">
                        <strong>${message.user.name}</strong><br>
                        ${message.message}
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
        
        this.updateUnreadCount(message.from_contact,false)
    },
    async sendMess(){
        if(!this.inputMess){
            return alert('tin nhắn rỗng')
        }
        if(!this.activeFriend){
            return alert('Chon user')
        }
        axios.post('api/chat/messages/'+this.activeFriend,{message:this.inputMess},
        {
            headers: { 
                Authorization: 'Bearer ' + this.token,
                'Content-type': 'application/json'
            }
        })
        .then(response =>{
            this.inputMess = null
            let mess = response.data
            mess.created_at = moment(String(mess.created_at)).format('DD-MM-YYYY hh:mm:ss A')
            this.messages.push(mess)
        })
    //   this.mixinSubmitChat('api/chat/messages/'+this.activeFriend)
    },
    async fetchMessages(){
        this.updateUnreadCount(this.selected,true)
        axios.get('api/chat/messages/'+this.selected.id,
        {
            headers: { 
                Authorization: 'Bearer ' + this.token
            }
        })
        .then(response =>{
            this.messages =  response.data.message
            this.friend = response.data.user
            for(let i=0; i<this.messages.length; i++){
                this.messages[i].created_at = moment(String(this.messages[i].created_at)).format('DD-MM-YYYY hh:mm:ss A')
            }
        })
    //   this.mixinFetchMessages('api/chat/messages/'+receiverId)
    },
    getAllUser(){
      this.mixinGetAllUser('api/chat/user')
    },
    async connectChannel(){
        await axios.get('/api/user/info',{
        headers: { Authorization: 'Bearer ' + this.token}
        })
        .then(response =>
        { 
            this.u = response.data.data
            // window.console.log(this.u.id)
            window.Echo.private(`privateChat.${this.u.id}`)
            .listen('ChatEvent', (e)=>{
                this.hanleIncoming(e.message);
            })
            .listenForWhisper('typing',(e)=>{
                this.typingFriend = e.user;
                window.console.log('dang nhap')
            })
        })
    },
    updateUnreadCount(user,reset){
        this.users = this.users.map((single)=>{
            // window.console.log(single,user,reset)
            if(single.id !== user.id){
                return single
            }
            if(reset)
                single.unread = 0
            else
                single.unread += 1
            return single;
        })
    }
},
created(){
    window.Echo.join(`joinChat`)
    .here((users) => {
        this.onlineUser = users;
    })
    .joining((user) => {
        this.onlineUser.push(user);
    })
    .leaving((user) => {
        this.onlineUser.splice(this.onlineUser.indexOf(user),1)
    })
    .error((error) => {
        window.console.error(error);
    });
},
mounted(){
    this.getAllUser()
    this.connectChannel()
},
}
</script>

<style scoped>
.icon-center {
  position: absolute !important;
  top: 50%;
  margin-top: -20px !important;
}

.left-gap {
  margin-left: 4em !important;
}
.my-toast {
  max-width: 350px !important;
  max-height: 100px !important;
}
.message-1{
  overflow-x: hidden;
}
.selected{
    background: #efefef;
    
}
.unread{
    /* border: solid 1px #000; */
    background: rgb(202, 127, 117);
    height: 18px;
    border-radius: 3px;
    width: 18px;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    color: rgb(255, 255, 255);
}
.name-date{
    display: flex;
    flex-direction: column;
}

.chat-form{
    background-color: #f4f7f6;
    height: 100%;
    /* margin-top:20px; */
}

.card {
    background: #fff;
    transition: .5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: .55rem;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
    width: 280px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    z-index: 7
}

.chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea
    
}
.img-notication{
    display: flex;
}

.people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
}
.center-right{
    float: right;
  }
.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px;
    display: flex;
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer
}

.people-list .chat-list li.active {
    background: #efefef
}

.people-list .chat-list li .name {
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    width: 120px;
    text-overflow: ellipsis; 
}
.people-list .chat-list li .name:hover{
  color: black;
}

.people-list .chat-list img {
    width: 45px;
    height: 45px;
    border-radius: 50%
}

.people-list img {
    float: left;
    border-radius: 50%
}

.people-list .about {
    float: left;
    padding-left: 8px
}

.people-list .status {
    color: #999;
    font-size: 13px
}

.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6
}

.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px
}
.avt-chat{
    cursor: pointer;
}
/* .avt-chat:hover{

} */
.chat .chat-history {
    padding: 20px;
    border-bottom: 2px solid #fff
}

.chat .chat-history ul {
    padding: 0
}

.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
    margin-bottom: 0px
}

.chat .chat-history .message-data {
    margin-bottom: 15px
}

.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px
}

.chat .chat-history .message-data-time {
    color: #434651;
    padding: 6px;
}

.chat .chat-history .message {
    color: #444;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    display: inline-block;
    position: relative;
}

.chat .chat-history .message:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .my-message {
    background: #efefef
}

/* .chat .chat-history .my-message:after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #efefef;
    border-width: 10px;
    margin-left: -10px
} */

.chat .chat-history .other-message {
    background: #e8f1f3;
    text-align: right
}

/* .chat .chat-history .other-message:after {
    border-bottom-color: #e8f1f3;
    left: 78%
} */

.chat .chat-message {
    padding: 20px
}

.online,
.offline,
.me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle
}

.online {
    color: #86c541
}

.offline {
    color: #e47297
}

.me {
    color: #1d8ecd
}

.float-right {
    float: right
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
}

@media only screen and (max-width: 767px) {
    .chat-app .people-list {
        height: 465px;
        width: 100%;
        overflow-x: auto;
        background: #fff;
        left: -400px;
        display: none
    }
    .chat-app .people-list.open {
        left: 0
    }
    .chat-app .chat {
        margin: 0
    }
    .chat-app .chat .chat-header {
        border-radius: 0.55rem 0.55rem 0 0
    }
    .chat-app .chat-history {
        height: 300px;
        overflow-x: auto
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .chat-app .chat-list {
        height: 650px;
        overflow-x: auto
    }
    .chat-app .chat-history {
        height: 600px;
        overflow-x: auto
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    .chat-app .chat-list {
        height: 480px;
        overflow-x: auto
    }
    .chat-app .chat-history {
        height: calc(100vh - 350px);
        overflow-x: auto
    }
}
</style>