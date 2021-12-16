<template>
  <div class="taskDetail">
    <div
      class="modal fade bd-example-modal-lg"
      id="taskDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="task-name">
              <h5 class="modal-title">
                <Icon type="md-card nav-icon" /> {{ taskCard.name }}
              </h5>
              <!-- <small class="text-muted">With faded secondary text</small> -->
            </div>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="content-left">
                <div
                  class="user-content"
                  v-if="
                    taskCard.users !== undefined && taskCard.users.length > 0
                  "
                >
                  <span class="st-icon-pinboard">
                    <i class="far fa-user"></i>
                    Thành viên
                  </span>
                  <div class="img-avt">
                    <div
                      class="img-link"
                      v-for="(u, i) in taskCard.users"
                      :key="i"
                    >
                      <Tooltip :content="u.name" placement="bottom">
                        <img
                          class="img"
                          :src="path + u.img"
                          @error="
                            $event.target.src =
                              'https://i.stack.imgur.com/gMbrL.jpg'
                          "
                          alt="avt"
                          width="40"
                          height="40"
                        />
                      </Tooltip>
                    </div>
                    <Poptip width="400" placement="bottom">
                      <div class="add-user">
                        <Icon type="ios-add-circle-outline" class="icon-img" />
                      </div>
                      <div slot="title" style="text-align: center">
                        <i>
                          Thành viên
                        </i>
                      </div>
                      <div slot="content">
                        <!-- <small>Thành viên của bảng</small> -->
                        <multiselect
                          class="mul-se"
                          v-model="user"
                          :options="usersOfP"
                          :multiple="true"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :preserve-search="true"
                          placeholder="Thêm thành viên"
                          label="email"
                          track-by="id"
                          :preselect-first="true"
                        >
                        </multiselect>

                        <button
                          @click="addTaskUser()"
                          class="btn btn-info ml-1"
                        >
                          Thêm
                        </button>
                        <div class="dropdown-divider"></div>
                        <span class="as" style="font-weight:600"
                          >Thành viên của bảng</span
                        >
                        <div
                          class="list-user"
                          v-for="(us, i) in taskCard.users"
                          :key="i"
                        >
                          <div class="list" style="padding-left: 10px">
                            {{ us.name }} ( {{ us.email }} )
                          </div>
                          <div
                            @click="deleteUserT(us.id, i)"
                            class="icon-de-user"
                          >
                            <Icon type="md-close" />
                          </div>
                        </div>
                      </div>
                    </Poptip>
                  </div>
                </div>

                <div class="tag-content">
                  <span class="st-icon-pinboard">
                    <i class="fas fa-tags"></i>
                    Nhãn
                  </span>
                  <div class="tag">
                    <div
                      class="tag-color"
                      :style="tagStyle(tag.color)"
                      v-for="(tag, index) in tagTaskDetail"
                      :key="index"
                    ></div>
                    <Poptip class="add-tag" width="300" placement="bottom">
                      <div >
                        <Icon type="ios-add icon-tag" @click="getTagUser(auth.user.id)" />
                          </div>
                          <div slot="title" style="text-align: center">
                          <i>
                            Nhãn
                          </i>
                        </div>
                        <div slot="content">
                          <div class="tag-content">
                            <span class="as" style="font-weight:600; margin-top:0">Nhãn đã tạo</span>
                            <div class="tag-x" v-for="(tag, index) in tagData" :key="index" style="display:flex">
                              <div
                                class="tag-c"
                                :style="tagStyle(tag.color)"
                                @click="addTagTask(tag.id)">
                              </div>
                              <Poptip class="edit-tag" title="Sửa Nhãn" width="200" placement="right-start">
                                <div @click="editColor = tag.color">
                                  <i class="fas fa-pen"></i>
                                </div>
                                <div slot="content">
                                  <div class="edit-tag-f" style="width:100%;">
                                    <div class="select-color-tag mt-2" style="display: flex;width:90%; margin: 0 auto">
                                      <ColorPicker v-model="editColor"  alpha style="cursor: pointer"/>
                                      <div class="ml-1" :style="tagStyle(editColor)" style="border-radius: 3px;width: 100%;height:30px"></div>
                                    </div>
                                    <div class="create-tag mt-0">
                                      <a @click="updateTag(editColor,tag.id,index)" class="btn btn-info" style="width: 90%; height:32px">Sửa</a>
                                    </div>
                                  </div>
                                </div>
                              </Poptip>
                            </div>
                            
                        <div class="dropdown-divider"></div>
                            <div class="select-color-tag mt-2" v-if="creatTagF" style="display: flex;width:90%">
                              <ColorPicker v-model="tagColor" alpha style="cursor: pointer"/>
                              <div class="ml-1" :style="colorCreateTag(tagColor)" style="border-radius: 3px;width: 100%;height:30px"></div>
                            </div>
                            <div class="create-tag mt-0" v-if="creatTagF">
                              <a @click="createTag(tagColor,auth.user.id)" class="btn btn-info" style="width: 90%; height:32px">Tạo</a>
                            </div>
                            
                            <div class="create-tag mt-0" @click="crtag" v-if="ct">
                              <a class="btn btn-info" style="width: 90%; height:32px">Tạo nhãn mới</a>
                            </div>
                            
                          </div>
                        </div>
                    </Poptip>
                  </div>
                </div>

                <div class="deadline-content">
                  <span class="mb">
                    <i class="far fa-clock"></i>
                    Ngày hết hạn
                  </span>
                  <div class="deadline">
                    <div class="deadline-check">
                      <Checkbox v-model="checkDate"></Checkbox>
                    </div>
                    <div class="deadline-time">
                      <VueCtkDateTimePicker
                        v-model="dataEnd"
                        format="DD-MM-YYYY hh:mm:ss"
                        overlay
                      />
                      <div class="date" v-if="checkDate">Đã hoàn thành</div>
                    </div>
                  </div>
                </div>

                <div class="job-content">
                  <div class="header-job">
                    <span>
                      <i class="fas fa-check-double"></i>
                      Việc cần làm
                    </span>
                    <Button type="error" slot="small">Xoá</Button>
                  </div>
                  <div class="job-percent">
                    <Progress
                      :percent="jobPercent()"
                      :stroke-color="['#eb5b46', '#87d068']"
                      :stroke-width="20"
                      text-inside
                    />
                  </div>
                  <div class="job">
                    <div class="job-list" v-for="(job, i) in jobList" :key="i">
                      <div class="job-list-left">
                        <Checkbox v-model="job.check"></Checkbox>
                        <span>{{ job.name }}</span>
                      </div>
                      <div class="job-list-right">
                        <Icon type="ios-close" class="icon-del" />
                      </div>
                    </div>
                    <div class="add-job">
                      <div class="input-add-job" v-if="addJobForm">
                        <Input v-model="jobName" class="input-add" />
                        <div class="button-add">
                          <div class="btn-add-left">
                            <button @click="addJob()" class="btn btn-primary">
                              Thêm
                            </button>
                            <div @click="addJobS" class="icon-de">
                              <Icon type="md-close" class="icon-de" />
                            </div>
                          </div>

                          <div class="btn-add-right">
                            <div class="select-user padding">
                              <Icon type="md-person-add" class="icon-user" />
                              <span>Chỉ định</span>
                            </div>
                            <div class="date-end padding">
                              <Icon
                                type="ios-clock-outline"
                                class="icon-user"
                              />
                              <span>Ngày hết hạn</span>
                            </div>
                            <div class="add-icon">
                              <i class="fas fa-smile"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        @click="addJobFormS()"
                        class="btn btn-secondary"
                        v-if="addJobFormShow"
                      >
                        Thêm một việc
                      </button>
                    </div>
                  </div>
                </div>

                <div class="comment">
                  <div class="header-comment">
                    <i class="far fa-comments mr-2"></i>
                    <span>Bình luận</span>
                  </div>
                  <div class="input-comment">
                    <Input placeholder="Nhập bình luận ..." />
                    <Button type="primary" style="margin-top:5px">Đăng</Button>
                  </div>
                  <div class="comment-content">
                    <div class="avt-cmt" style="display:flex">
                      <img
                        class="img"
                        style="margin-right: 5px;"
                        src="http://localhost:8080/storage/images/l2e3ONsa0iiTF2lpDmnMIpgTYY5jCeDScprdWR49.jpg"
                        alt=""
                        width="30"
                        height="30"
                      />
                      <div class="cmt-name">
                        <a style="font-size:14px">Nguyễn Trường Sơn</a>
                      </div>
                    </div>

                    <div class="cmt-ct" style="margin-left: 35px">
                      <p
                        class="cmt-content"
                        style=" padding: 10px 10px;border-radius: 3px"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Facilis consectetur ipsam sed magnam assumenda
                        unde porro est in nam? Explicabo commodi aliquam cumque
                        ex cupiditate quibusdam! Iure quod doloribus sequi.
                      </p>
                      <a class="link-cmt">Chỉnh sửa</a> -
                      <a class="link-cmt">Xoá</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="content-right ml-2">
                <span class="content-right-header">Thêm vào thẻ</span>
                <div class="bt-clear">
                  <Poptip class="button-link" width="400" placement="bottom">
                    <a>
                      <i class="far fa-user icon"></i>
                      <span>Thành viên</span>
                    </a>
                    <div slot="title" style="text-align: center">
                      <i>
                        Thành viên
                      </i>
                    </div>
                    <div slot="content">
                      <!-- <small>Thành viên của bảng</small> -->
                      <multiselect
                        class="mul-se"
                        v-model="user"
                        :options="usersOfP"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Thêm thành viên"
                        label="email"
                        track-by="id"
                        :preselect-first="true"
                      >
                      </multiselect>

                      <button @click="addTaskUser()" class="btn btn-info ml-1">
                        Thêm
                      </button>
                      <div class="dropdown-divider"></div>
                      <span class="as" style="font-weight:600"
                        >Thành viên của bảng</span
                      >
                      <div
                        class="list-user"
                        v-for="(us, i) in taskCard.users"
                        :key="i"
                      >
                        <div class="list" style="padding-left: 10px">
                          {{ us.name }} ( {{ us.email }} )
                        </div>
                        <div
                          @click="deleteUserT(us.id, i)"
                          class="icon-de-user"
                        >
                          <Icon type="md-close" />
                        </div>
                      </div>
                    </div>
                  </Poptip>

                  <Poptip class="button-link" width="300" placement="bottom">
                    <a @click="getTagUser(auth.user.id)">
                      <i class="fas fa-tags icon"></i>
                      <span>Nhãn</span>
                    </a>
                    <div slot="title" style="text-align: center">
                      <i>
                        Nhãn
                      </i>
                    </div>
                    <div slot="content">
                      <div class="tag-content">
                        <span class="as" style="font-weight:600; margin-top:0">Nhãn đã tạo</span>
                        <div class="tag-x" v-for="(tag, index) in tagData" :key="index" style="display:flex;">
                          <div
                            v-if="tag.tagColorF"
                            class="tag-c"
                            :style="tagStyle(tag.color)"
                            @click="addTagTask(tag.id,index)"
                            style="position: relative;">
                            <div v-if="tag.check" class="icon-check" style="color:white; position: absolute; right: 0%;">
                              <Icon type="md-checkmark" />
                            </div>
                          </div>
                          <Poptip class="edit-tag" width="200" title="Sửa Nhãn" placement="right-start">
                            <div @click="editColor = tag.color">
                              <i class="fas fa-pen"></i>
                            </div>
                            <div slot="content">
                              <div class="edit-tag-f" style="width:100%">
                                <div class="select-color-tag mt-2" style="display: flex;width:90%;margin: 0 auto">
                                  <ColorPicker v-model="editColor"  alpha style="cursor: pointer"/>
                                  <div class="ml-1" :style="tagStyle(editColor)" style="border-radius: 3px;width: 100%;height:30px"></div>
                                </div>
                                <div class="create-tag mt-0">
                                  <a @click="updateTag(editColor,tag.id,index)" class="btn btn-info" style="width: 90%; height:32px">Sửa</a>
                                </div>
                              </div>
                            </div>
                          </Poptip>
                          
                          
                        </div>
                        
                     <div class="dropdown-divider"></div>
                        <div class="select-color-tag mt-2" v-if="creatTagF" style="display: flex;width:90%">
                          <ColorPicker v-model="tagColor" alpha style="cursor: pointer"/>
                          <div class="ml-1" :style="tagStyle(tagColor)" style="border-radius: 3px;width: 100%;height:30px"></div>
                        </div>
                        <div class="create-tag mt-0" v-if="creatTagF">
                          <a @click="createTag(tagColor,auth.user.id)" class="btn btn-info" style="width: 90%; height:32px">Tạo</a>
                        </div>
                        
                        <div class="create-tag mt-0" @click="crtag" v-if="ct">
                          <a class="btn btn-info" style="width: 90%; height:32px">Tạo nhãn mới</a>
                        </div>
                        
                      </div>
                    </div>
                  </Poptip>

                  <Poptip
                    class="button-link"
                    title="Title"
                    content="content"
                    placement="bottom"
                  >
                    <a>
                      <i class="fas fa-check-double icon"></i>
                      <span>Việc cần làm</span>
                    </a>
                    <div slot="title" style="text-align: center">
                      <i>
                        Thêm danh sách công việc
                      </i>
                    </div>
                    <div slot="content">
                      <div class="job-ti">
                        <span>Tiêu đề</span>
                        <Input placeholder="Nhập tiêu đề..." />
                      </div>
                      <Button type="primary" style="margin-top:5px;"
                        >Thêm</Button
                      >
                    </div>
                  </Poptip>

                  <Poptip
                    class="button-link"
                    title="Title"
                    content="content"
                    placement="bottom"
                  >
                    <a>
                      <i class="far fa-clock icon"></i>
                      <span>Thời gian</span>
                    </a>
                    <div slot="title" style="text-align: center">
                      <i>
                        Thời gian
                      </i>
                    </div>
                    <div slot="content">
                      <VueCtkDateTimePicker
                        v-model="dataEnd"
                        format="DD-MM-YYYY hh:mm:ss"
                        overlay
                      />
                    </div>
                  </Poptip>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
        <pre>{{tagTaskDetail}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import taskDetail from "../../../../../mixin/taskDetail";
import { mapState } from "vuex";
import Multiselect from "vue-multiselect";
import message from "../../../../../mixin/message";
import sweetalert from "../../../../../mixin/sweetalert";

export default {
  props: ["taskCard", "userOfTeams", "usersOfP","tagTaskDetail"],
  mixins: [taskDetail, message, sweetalert],
  components: {
    Multiselect,
  },
  data() {
    return {
      ct: true,
      creatTagF: false,
      index: 0,
      tagColor: '',
      editTag:{},
      editColor: '',
      user: [],
      jobName: "",
      addJobForm: false,
      addJobFormShow: true,
      dataEnd: "27-05-2022 04:03:00",
      checkDate: false,
      idTask: 0,
      tagData: [
        // { color: "rgba(1,3,6,1)" },
      ],
      jobList: [],
      per: 0,
      path: "http://localhost:8080/storage/images/",
    };
  },
  computed: {
    ...mapState(["project","auth"]),
  },
  created() {

  },
  methods: {
    getTagUser(userId){
      this.mixinGetTagUser('api/tag/get-tag-user',userId)
    },
    addTagTask(tagId,index){
      this.mixinAddTagTask('api/tag/add-tag-task',tagId,index)
    },
    tagStyle(color) {
      return { background: color };
    },
    addJobFormS() {
      this.addJobForm = !this.addJobForm;
      this.addJobFormShow = !this.addJobFormShow;
    },
    addJobS() {
      this.addJobForm = !this.addJobForm;
      this.addJobFormShow = !this.addJobFormShow;
    },
    addJob() {
      this.jobList.push({ name: this.jobName, check: false });
    },
    crtag(){
      this.creatTagF = !this.creatTagF 
      this.ct = !this.ct
    },
    jobPercent() {
      let per = this.jobList.filter((arrJob) => arrJob.check == true);
      let lenthJob = this.jobList.length;
      if (this.jobList.length == 0) {
        return 0;
      } else {
        return ((per.length / lenthJob) * 10 * 10).toFixed();
      }
    },
    addTaskUser() {
      this.mixinAddTaskUser("api/task-detail/add/user", this.user);
    },
    deleteUserT(id, i) {
      this.swdelete(this.mixindeleteUserT, "api/task-detail/delete/user", id);
      this.index = i;
    },
    createTag(tagColor,userId){
      this.mixinCreateTag("api/tag/create", tagColor,userId);
    },
    editTagForm(id){
      this.mixinEditTag('api/tag/edit',id)
    },
    updateTag(color,id,index){
      this.mixinUpdateTag('api/tag/update',color,id,index)
    }
  },
};
</script>

<style scoped>
.edit-tag{
  cursor: pointer;
  margin: auto;
  margin-left: 5px;
  text-align: center;
  font-size: 13px;
  padding: 5px 0;
}
.edit-tag:hover{
  background: rgba(199, 199, 243, 0.582);
  border-radius: 3px;
  width: 10%;
}
.job-ti {
  display: flex;
  flex-direction: column;
}
.job-ti span {
  font-size: 12px;
  font-weight: 400;
}
.list-user {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgb(241, 241, 241);
  width: 100%;
  padding: 5px 2px;
  margin-top: 5px;
}
.list-user .icon-de-user {
  font-size: 20px;
}
.list-user .icon-de-user:hover {
  cursor: pointer;
  color: rgb(235, 144, 144);
}

.as {
  font-size: 13px;
}
.link-cmt {
  font-size: 13px;
  color: rgb(90, 90, 90);
}
.link-cmt:hover {
  color: black;
  text-decoration-line: underline;
}
.modal-body {
  background: #ffffff;
}
.cmt-content {
  /* border: 1px solid rgb(233, 233, 233); */
  background: rgb(235, 235, 235);
}
.comment-content {
  margin-top: 10px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid rgb(150, 150, 150);
  padding: 20px;
}
.header-comment {
  font-size: 20px;
  padding: 10px 0;
  font-weight: 600;
}
.padding {
  padding: 10px 10px;
  border-radius: 3px;
}
.icon-de {
  width: 40px;
  height: 34px;
  margin: auto auto;
  cursor: pointer;
}
.button-add {
  display: flex;
  justify-content: space-between;
}
.btn-add-left {
  display: flex;
  justify-content: space-between;
}
.btn-add-right {
  font-size: 13px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.btn-add-right div {
  padding: 0 10px;
  margin: auto;
  cursor: pointer;
}
.btn-add-right div:hover {
  background: rgb(241, 241, 241);
}
.icon-user {
  font-size: 15px;
}
.icon-de {
  font-size: 25px;
}
.btn {
  margin-top: 10px;
  padding: 5px 5px;
  font-size: 14px;
  background: rgb(228, 228, 228);
  border: none;
  color: black;
}
.job-content {
  font-size: 18px;
  font-weight: 600;
}
.job {
  margin: 5px 0;
}
.date {
  font-size: 12px;
  background: darkseagreen;
  display: flex;
  justify-content: center;
}
.deadline {
  display: flex;
  margin: 5px 0;
}
.deadline-check {
  margin-top: 10px;
}
.deadline-content {
  font-size: 18px;
  font-weight: 600;
}
.deadline-content {
  margin-top: 10px;
}
.icon-tag {
  font-size: 30px;
  height: 32px;
  width: 40px;
  border: 1px solid #000;
  margin: 0;
  border-radius: 3px;
}
.icon-tag:hover {
  background: rgb(228, 228, 228);
  cursor: pointer;
}
.tag-color:hover {
  opacity: 0.5;
  cursor: pointer;
}
.mb {
  margin-bottom: 10px;
}
.modal-header {
  background: rgb(143, 159, 188);
}
.task-name {
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
}
.content-left {
  flex: 3;
  margin: 10px 0 0 20px;
}
.content-right {
  flex: 1;
  margin-top: 50px;
}
.content-right-header {
  font-size: 13px;
  font-weight: 600;
}
.bt-clear {
  width: 200px;
  display: flex;
  flex-direction: column;
}
.button-link {
  background: rgb(245, 245, 245);
  /* text-decoration: none; */
  color: black;
  font-size: 14px;
  padding: 6px 12px;
  width: 200px;
  border-radius: 3px;
  margin: 5px 0;
}
.icon {
  font-size: 12px;
  padding-right: 8px;
}
.button-link span {
  width: 200px;
}
.button-link:hover {
  background: rgb(228, 228, 228);
}
.img {
  border-radius: 50%;
  cursor: pointer;
}
.user-content {
  font-size: 18px;
  font-weight: 600;
}
.user-content span {
  margin-bottom: 5px;
}
.tag-content {
  font-size: 18px;
  font-weight: 600;
  margin-top: 5px;
}
.tag {
  margin: 5px 0;
}
.img-avt {
  margin: 5px;
  display: flex;
  margin: 0 auto;
  margin-top: 5px;
}
.img-link {
  margin-right: 10px;
}
.icon-img {
  font-size: 45px;
}
.icon-img:hover {
  opacity: 0.5;
  cursor: pointer;
}
.tag {
  display: flex;
}
.tag-color {
  /* background: darkseagreen; */
  width: 40px;
  height: 32px;
  border-radius: 3px;
  margin-right: 5px;
}
.tag-c {
  /* background: darkseagreen; */
  width: 90%;
  height: 32px;
  border-radius: 3px;
  margin-bottom: 5px;
}
.tag-c:hover {
  box-shadow: 5px 10px 18px rgb(172, 117, 117);
  cursor: pointer;
}
.header-job {
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
}
.job-list {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.job-list:hover {
  background: rgb(243, 243, 243);
  cursor: pointer;
}
.icon-del {
  font-size: 30px;
}
.icon-del:hover {
  color: #000;
}
</style>
