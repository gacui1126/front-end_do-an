<template>
  <div class="projectt-cv">
    <div class="header" style="text-align: center">
      <h2>
        {{dataProjectCV.name}}
      </h2>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light" >
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <!-- <a class="navbar-brand">{{dataProjectCV.name}}</a> -->
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          
          <li class="nav-item active mr-1">
            <Button class="nav-link" >
              <Dropdown trigger="click" style="margin-left: 20px">
                <a href="javascript:void(0)">
                    Chuyển dự án
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>JavaScript quiz game</DropdownItem>
                    <DropdownItem>XYZ</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Button>
          </li>
          <li class="nav-item mr-1">
            <Button class="nav-link" >
              <Dropdown trigger="click" style="margin-left: 20px">
                  <i class="fas fa-users"></i>
                    Teams
                  <Icon type="ios-arrow-down"></Icon>

                <DropdownMenu slot="list">
                    <DropdownItem>
                      <div class="add-team form-group">
                        <div class="mul-se">
                          <multiselect 
                            v-model="team" 
                            :options="teamManager.getAllTeam" 
                            :multiple="true" 
                            :close-on-select="false" 
                            :clear-on-select="false" 
                            :preserve-search="true" 
                            placeholder="Thêm team" 
                            label="name"
                            track-by="id" 
                            :preselect-first="true">
                          </multiselect>
                        </div>

                        <button @click="addTeamP()" class="btn btn-info ml-1">Thêm</button>
                      </div>
                    </DropdownItem>
                    <div class="sp" style="text-align:center; background: #dee2e6">
                      <span class="" >Team trong dự án</span>
                    </div>
                    <DropdownItem v-for="(team,index) in teamsOfP" :key="index">
                      {{team.name}}
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Button>
          </li>
          <li class="nav-item">
            <Button class="nav-link">
              <Dropdown trigger="click" style="margin-left: 20px">
                  <i class="fas fa-user-plus"></i>
                    Thành viên
                  <Icon type="ios-arrow-down"></Icon>

                <DropdownMenu slot="list">
                    <DropdownItem>
                      <div class="add-team form-group">
                      <multiselect 
                          class="mul-se"
                          v-model="user" 
                          :options="project.getAllUsers" 
                          :multiple="true" 
                          :close-on-select="false" 
                          :clear-on-select="false" 
                          :preserve-search="true" 
                          placeholder="Thêm thành viên" 
                          label="email"
                          track-by="id" 
                          :preselect-first="true">
                      </multiselect>

                        <button @click="addUserP()" class="btn btn-info ml-1">Thêm</button>
                      </div>
                    </DropdownItem>
                    <div class="dropdown-divider"></div>
                    <div class="sp" style="text-align:center; background: #dee2e6">
                      <span class="" >Thành viên trong dự án</span>
                    </div>
                     <div class="dropdown-divider"></div>

                    <DropdownItem v-for="(user,index) in usersOfP" :key="index">
                      {{user.name}}
                    </DropdownItem>
                  
                </DropdownMenu>
              </Dropdown>
            </Button>
          </li>

          <li class="nav-item">
            <Button type="warning" class="nav-link ml-1" style="color: #fff">
              thêm task
            </Button>
          </li>
        </ul>
      </div>
      <div class="form-inline">
            <Countdown :end="date_end"></Countdown>
      </div>
    </nav>

    <!-- TASK -->
    
    <div class="task">
      <div class="task_detail">
        <div class="task_name">
          <div class="task_name_header">
            <strong>Khởi tạo</strong>
          </div>
          <div class="task_name_icon">
            <div class="icon_setting">
              <Icon type="ios-options" />
            </div>
            <div class="setting_name">
              <Button class="button">Chỉnh sửa</Button>
              <Button class="button">Xoá</Button>
            </div>
          </div>

        </div>

        <div class="content" v-for="(input,i) in inputs" :key="i">
           <Input v-if="inputs" v-model="input.task_card" maxlength="100" show-word-limit type="textarea" placeholder="Nhập tiêu đề ..." style="width: 90%" />
          <!-- <div class="task_detail_list">

          </div> -->
        </div>

        <div class="task_footer">
          <Button @click="createFormCard" id="createFormCard" type="info" class="add_card" >
            <Icon type="md-add" />
              Thêm thẻ
          </Button>

          <Button @click="createCard" id="createCard" type="success" class="add_card hidden">
            <Icon type="md-add" />
              Tạo
          </Button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import projectCV from '../../../../../mixin/projectCV'
import common from '../../../../../mixin/common'
import Countdown from 'vuejs-countdown'

export default {
  mixins:[projectCV, common],
  components: { Countdown },

  data(){
    return {
      inputs: [
        
      ]
    }
  },  
  computed:{
    ...mapState(['teamManager','project'])
  },
  created() {
    this.getData(),
    this.getAllTeam(),
    this.teamOfProject(),
    this.allUser(),
    this.getTime()
  },
  methods:{
    getData(){
      this.mixinProjectCV('api/project/go',this.id)
    },
    getAllTeam(){
      this.$store.dispatch('getAllTeam')
    },
    teamOfProject(){
      this.mixinDataOfProject('/api/project/info', this.id)
    },
    allUser(){
      this.$store.dispatch('getAllDataP')
    },
    addTeamP(){
      this.mixinAddTeamP('api/project/add-team', this.id)
    },
    addUserP(){
      this.mixinAddUserP('api/project/add-user', this.id)
    },
    getTime(){
      this.mixinGetTime('api/project/get-time', this.id)
    },
    createFormCard(){
      this.inputs.push({task_card: ''})
      var createFormCard = document.getElementById("createFormCard");
      createFormCard.classList.add("hidden");

      var createCard = document.getElementById("createCard");
      createCard.classList.remove("hidden");
    },
    createCard(){
      var createFormCard = document.getElementById("createFormCard");
      createFormCard.classList.remove("hidden");

      var createCard = document.getElementById("createCard");
      createCard.classList.add("hidden");
    }

  }
}
</script>

<style scoped>
  .add-team{
    display: flex;
  }
  .header{
    padding: 10px;
  }
  .task_detail{
    text-align: center;
    border-radius: 5px;
    margin: 0 20px;
    width: 250px;
    /* height: 500px; */
    background: rgb(235,236,240);
    padding: 0 0 10px 0;
  }
  .task_name{
    height: 30px;
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding-top: 5px;
    justify-content: space-between;
    cursor: pointer;
  }
  .task_name:hover .icon_setting{
    display: block;
  }
  .task_name_icon{
    position: relative;
  }
  .icon_setting{
    display: none;
  }
  .content{
    width: 100%;
  }
  .setting_name{
    width: 100px;
    background: rgb(255, 255, 255);
    position: absolute;
    display: none;
    /* right: 0;   */
  }
  .icon_setting:focus ~ .setting_name{
    display: block;
  }
  .task_detail_list{
    background: #fff;
    border-radius: 5px;
    width: 90%;
    height: 100px;
    margin: 0 auto;
  }
  .task_card{
    width: 90%;
  }
  .add_card{
    margin-top: 5px;
    width: 90%;
  }
  .hidden{
    display: none;
  }
  .button{
    width: 100%;
  }
</style>