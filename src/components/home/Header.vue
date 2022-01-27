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
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
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
                      <i class="fa fa-circle" :class="`${onlineUser.find(online=>online.id === mess.id)  ? 'online' : 'offline'}`"></i>
                        {{onlineUser.find(online=>online.id === mess.id)  ? 'Online' : 'Offline'}}
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
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell" style="font-size: 20px"></i>
          <!-- <span class="badge badge-warning navbar-badge">15</span> -->
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
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
      onlineUser: []
    }
  },
  computed: {
    ...mapState(['auth','message']),
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
  methods:{
    ...mapActions(['logout']),
    checkLogin(){
      this.$store.dispatch('checkLogin')
    },
    openForm(user){
      this.$store.dispatch('selectMess',user)
    },
    getMess(){
      this.$store.dispatch('getMess');
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
.online {
    color: #86c541
}

.offline {
    color: #e47297
}
</style>