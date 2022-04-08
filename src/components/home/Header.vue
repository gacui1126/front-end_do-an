<template>
  <div class="header">
    <nav class="main-header navbar navbar-expand navbar-dark navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a  @click="message.allMessUnread = 0" class="notification nav-link" data-toggle="dropdown">
          <i class="far fa-comments" style="font-size: 20px">
            <span class="badge" v-if="message.allMessUnread">
              <p>{{message.allMessUnread > 5 ? '5+' : message.allMessUnread }}</p>
            </span>
          </i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right bf">
          <div class="header-noti" style="text-align:center;padding-bottom:10px;border-bottom: 1px solid #eee;">
            <strong>
              <span>Tin nhắn</span>
            </strong>
          </div>
          <div style="max-height: 500px;overflow-x: hidden; overflow-y: scroll">
            <div style="margin-bottom:1px" v-for="mess in sortedMess" :key="mess.id">
              <a v-if="mess.id !== auth.user.id" @click="openForm(mess)" :style="`${mess.unread ? 'background: #efefef;' : ''}`" class="dropdown-item">
                <div class="media">
                  <img :src="mess.img ? mess.img : 'https://i.stack.imgur.com/gMbrL.jpg'" style="width:50px; height: 50px" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                  <div class="media-body">
                    <h3 class="dropdown-item-title">
                      {{mess.name}}
                    </h3>
                    <span style="text-align:center; width: 20px;background: rgb(202, 127, 117);border-radius:3px; padding: 0 3px;" v-if="mess.unread" class="float-right text-sm text-white">
                      {{mess.unread > 5 ? '5+' : mess.unread}}
                    </span>
                    <p class="text-sm">{{mess.message_re[mess.message_re.length - 1].message}}</p>
                    <p class="text-sm text-muted">
                      <i class="fa fa-circle" :class="`${channel.onlineUser.find(online=>online.id === mess.id)  ? 'online' : 'offline'}`"></i>
                        {{channel.onlineUser.find(online=>online.id === mess.id)  ? 'Online' : 'Offline'}}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <router-link to="/chat-home" style="text-align: center;">
            <div href="#" class="footer-drop">Xem tất cả tin nhắn</div>
          </router-link>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a @click="selectNoti" class="notification nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell" style="font-size: 20px">
            <span class="badge" v-if="message.countUnReadNoti">
              <p>{{message.countUnReadNoti > 5 ? '5+' : message.countUnReadNoti }}</p>
            </span>
          </i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right bf-noti" style="width:400px">
          <div class="header-noti" style="text-align:center;padding-bottom:10px;border-bottom: 1px solid #eee;">
            <strong>
              <span>Thông báo</span>
            </strong>
          </div>
          <div style="max-height: 500px;overflow-x: hidden; overflow-y: scroll">
            <router-link to="/my-work">
              <div 
                
                :style="`${noti.read == 0 ? 'background: #efefef;' : ''}`"
                style="margin-bottom: 3px"
                class="notifications-item"
                  v-for="noti in message.notications" :key="noti.id"> 
                <img src="https://mndaily.com/wp-content/uploads/2019/06/graphics_6.25.19-letterstotheeditor-CMYK-01-900x900.jpeg" alt="img">
                <div class="text" style="display:flex;flex-direction:column;justify-content:center">
                  <p style="color:black">{{noti.content}}</p>
                </div>
              </div>
            </router-link>
          </div>
          
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt" style="font-size: 20px"></i>
        </a>
      </li>
      <li class="nav-item">
        <button class="btn btn-danger" @click="logout" tyle="submit" style="padding:5px;border-radius:5px">
          logout
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from 'lodash';

export default {
  data(){
    return{
      // messages:[],
      token: localStorage.getItem('token'),
      selected: 0,
      // onlineUser: []
    }
  },
  computed: {
    ...mapState(['auth','message','channel']),
    sortedMess(){
      return _.sortBy(this.$store.state.message.messages,[(user)=>{
          if(user == this.selected){
            return Infinity;
          }
          return user.unread
      }]).reverse()
    }
  },
  created(){
    this.checkLogin();
    this.getMess();
    this.getNoti();
    this.connect();
    this.taskForMe();
  },
  methods:{
    ...mapActions(['logout']),

    connect(){
      this.$store.dispatch('connect')
    },
    checkLogin(){
      this.$store.dispatch('checkLogin')
    },
    openForm(user){
      this.$store.dispatch('selectMess',user)
    },
    getMess(){
      this.$store.dispatch('getMess');
    },
    getNoti(){
      this.$store.dispatch('getNoti');
    },
    selectNoti(){
      this.$store.dispatch('selectNoti')
    },
    taskForMe(){
      this.$store.dispatch('taskForMe');
    }
  },
}
</script>

<style scoped>
#c{
  color: rgb(75, 73, 80);
}
.footer-drop{
  font-size: 15px;
  color: black;
  padding: 3px 0;
}
.footer-drop:hover{
  background: rgb(201, 201, 201);
}
.dropdown-item:hover{
  background: #efefef;
}
.notification {
  position: relative;
  display: inline-block;
}

.notification .badge {
  position: absolute;
  top: 0;
  right: -5px;
  padding: 5px 10px;
  width: 15px;
  height: 20px;
  font-size: 10px;
  border-radius: 3px;
  background: red;
  color: white;
  display: flex;
  justify-content: center;
}
.dropdown-item{
  border-bottom: 1px solid #eee;
}
.online {
    color: #86c541
}
.bf::before{
  content: '';
  border-width: 20px 20px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
  position: absolute;
  top: -5%;
	right: 0;
  display: block;
}

.bf-noti::before{
  content: '';
  border-width: 20px 15px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
  position: absolute;
  top: -6%;
	right: 0%;
  display: block;
}
.offline {
    color: #e47297
}
.icon {
    cursor: pointer;
    margin-right: 50px;
    line-height: 60px
}

.icon span {
    background: #f00;
    padding: 7px;
    border-radius: 50%;
    color: #fff;
    vertical-align: top;
    margin-left: -25px
}

.icon img {
    display: inline-block;
    width: 26px;
    margin-top: 4px
}

.icon:hover {
    opacity: .7
}

.logo {
    flex: 1;
    margin-left: 50px;
    color: #eee;
    font-size: 20px;
    font-family: monospace
}

.notifications {
    width: 300px;
    height: 0px;
    opacity: 0;
    position: absolute;
    top: 63px;
    right: 62px;
    border-radius: 5px 0px 5px 5px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.notifications h2 {
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #eee;
    color: #999
}

.notifications h2 span {
    color: #f00
}

.notifications-item {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 6px 9px;
    margin-bottom: 0px;
    cursor: pointer
}

.notifications-item:hover {
    background-color: #eee
}

.notifications-item img {
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 9px;
    border-radius: 50%;
    margin-top: 2px
}

.notifications-item .text h4 {
    color: #777;
    font-size: 16px;
    margin-top: 3px
}

.notifications-item .text p {
    color: #aaa;
    font-size: 12px
}
</style>