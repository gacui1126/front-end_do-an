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
                          :src="u.img ? u.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                          
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

                <div class="tag-content" v-if="tagTaskDetail !== undefined && tagTaskDetail.length > 0">
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
                                @click="addTagTask(tag.id)"
                                style="position: relative;">
                                <div v-if="tag.check" class="icon-check" style="color:white; position: absolute; right: 0%;">
                                  <Icon type="md-checkmark" />
                                </div>
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
                  </div>
                </div>

                <div class="deadline-content" v-if="deadlineP !== undefined && deadlineP !== 'Invalid date'">
                  <span class="mb">
                    <i class="far fa-clock"></i>
                    Ngày hết hạn
                  </span>
                  <div class="deadline">
                    <div @click="completedTD(!checkDateTD)" class="deadline-check">
                      <Checkbox v-model="checkDateTD"></Checkbox>
                    </div>
                    <div class="deadline-time">
                      
                      <div class="date-t" style="border:1px solid rgb(204,204,204);border-radius:3px;padding: 5px 10px;">
                        {{deadlineP}}
                      </div>
                      <div class="date" v-if="checkDateTD">Đã hoàn thành</div>
                      <div class="end" v-if="outOftime">Hết hạn</div>
                      <div class="s-end" v-if="rOutOftime">Gần hết hạn</div>
                    </div>
                  </div>
                </div>

                <div class="job-content" v-for="(j,i) in getJob" :key="i">
                  <div class="header-job">
                    <span>
                      <i class="fas fa-check-double"></i>
                      {{j.name}}
                    </span>
                    <Button @click="deleteJobName(j.id,i)" type="error" slot="small">Xoá</Button>
                  </div>
                  <div class="job-percent">
                    <Progress
                      :percent="jobPercent(i)"
                      :stroke-color="['#eb5b46', '#87d068']"
                      :stroke-width="20"
                      text-inside
                      status="active"
                    />
                  </div>
                  <div class="job">
                    <div class="job-list" v-for="(job, index) in j.job_details" :key="index">
                      <div class="job-list-left" style="display: flex;">
                        <div @click="checkJob(job.id,job.check)" class="check-job">
                          <Checkbox v-model="job.check"></Checkbox>
                        </div>
                        <span :class="{'text-line' : job.check}">{{ job.name }}</span>
                      </div>
                      <div @click="deJobDT(job.id,i,index)" class="job-list-right">
                        <Icon type="ios-close" class="icon-del" />
                      </div>
                    </div>
                    <div class="add-job">
                      <div class="input-add-job" v-if="j.addJobForm">
                        <Input v-model="jobName" class="input-add" />
                        <div class="button-add">
                          <div class="btn-add-left">
                            <button @click="addJob(j.id,i)" class="btn btn-primary">
                              Thêm
                            </button>
                            <div @click="addJobS(i)" class="icon-de">
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
                          </div>
                        </div>
                      </div>
                      <button
                        @click="addJobFormS(i)"
                        class="btn btn-secondary"
                        v-if="j.addJobFormShow"
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
                    <Input :autosize="{minRows: 1,maxRows: 5}" type="textarea" height="auto" v-model="comment" maxlength="255" show-word-limit placeholder="Nhập bình luận..." />
                    <Button @click="commentTD(auth.user.id)" type="primary" style="margin-top:5px">Đăng</Button>
                  </div>
                  <div class="comment-content" v-if="getCommentTD.length >0 ">
                    <div v-for="(c,i) in getCommentTD" :key="i" style="margin-bottom: 5px">
                      <div class="avt-cmt" style="display:flex">
                        <img
                          class="img"
                          style="margin-right: 5px;object-fit: cover;"
                          :src="c.user.img ? c.user.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                         
                          alt=""
                          width="30"
                          height="30"
                        />
                        <div class="cmt-name" style="font-weight:600">
                          <a style="font-size:14px">{{c.user.name}}</a>
                        </div>
                      </div>

                      <div v-if="c.showComment" class="cmt-ct" style="margin-left: 35px">
                        <p
                          class="cmt-content"
                          style=" padding: 5px 10px;border-radius: 3px; font-size:14px"
                        >
                          {{c.content}}
                        </p>
                        <a @click="c.showRepply = !c.showRepply" class="link-cmt">Trả lời</a> -
                        <a @click="editComment(i)" class="link-cmt">Chỉnh sửa</a> -
                        <a @click="deleteComment(c.id,i)" class="link-cmt">Xoá</a>
                      </div>

                      <div v-if="c.editComment" class="cmt-ct" style="margin-left: 35px">
                        <Input 
                          v-model="c.content" 
                          name="comment" 
                          class="cmt-content" 
                          :autosize="{minRows: 1,maxRows: 5}" 
                          type="textarea"
                          maxlength="255" 
                          placeholder="Nhập bình luận..." 
                        />
                        <Button @click="updateComment(c.id,c.content,i)" type="primary" size="small">Sửa</Button> -
                        <!-- <a @click="editComment(i)" class="link-cmt">Huỷ</a> - -->
                        <a @click="deleteComment(c.id,i)" class="link-cmt">Xoá</a>
                      </div>

                      <div v-if="c.showRepply" class="cmt-ct" style="margin-left: 35px;display:flex">
                        <img
                          class="img"
                          style="margin-right: 5px;object-fit: cover;"
                          :src="auth.user.img ? auth.user.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                          
                          alt=""
                          width="33"
                          height="30"
                        />
                        <Input 
                          v-model="RComment"
                          @keyup.enter.native="repplyComment(c.id,auth.user.id,i)"
                          name="comment" 
                          class="cmt-content" 
                          maxlength="255" 
                          placeholder="Nhập bình luận..." 
                          style="margin-bottom: 10px"
                        />
                      </div>

                      <div 
                        class="cmt-ct" 
                        style="margin-left: 35px;"
                        v-for="(reply,index) in c.replies" :key="index">
                        <div v-if="reply.OEdit">
                          <div class="cmt-ct" style="display:flex;">
                            <img
                              class="img"
                              style="margin-right: 5px;object-fit: cover;"
                              :src="reply.user.img ? reply.user.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                              
                              alt=""
                              width="33"
                              height="30"
                            />
                            <p
                              class="cmt-content"
                              style=" padding: 5px 10px;border-radius: 3px; font-size:14px;flex:1"
                            >
                              {{reply.content}}
                            </p>
                          </div>
                          <div style="margin-left: 40px;">
                            <a @click="editRCom(i,index)" class="link-cmt">Chỉnh sửa</a> -
                            <a @click="deleteReplyComment(reply.id,i,index)" class="link-cmt">Xoá</a>
                          </div>
                        </div>

                        <div v-if="reply.Edit" class="edit-re">
                          <div class="cmt-ct" style="display:flex;">
                            <img
                              class="img"
                              style="margin-right: 5px;object-fit: cover;"
                              :src="reply.user.img ? reply.user.img : 'https://i.stack.imgur.com/gMbrL.jpg'"
                              
                              alt=""
                              width="33"
                              height="30"
                            />
                            <Input 
                            v-model="reply.content"
                            @keyup.enter.native="repplyComment(c.id,auth.user.id,i)"
                            name="comment" 
                            maxlength="255" 
                            placeholder="Nhập bình luận..." 
                            style="margin-bottom: 10px"
                          />
                          </div>
                          <div style="margin-left: 40px;    margin-top: -10px;">
                            <Button size="small" @click="UpdateReCo(reply.content,reply.id,i,index)" class="link-cmt">Sửa</Button> -
                            <a @click="deleteReplyComment(reply.id,i,index)" class="link-cmt">Xoá</a>
                          </div>
                        </div>
                      </div>
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
                    <div slot="content" style="height: 200px">
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

                  <div class="date-p">
                    <div @click.prevent="modalDate =! modalDate" class="button-link">
                      <a>
                        <i class="far fa-clock icon"></i>
                        <span>Thời gian</span>
                      </a>
                    </div>
                    <div v-if="modalDate" class="date-picker" style="text-align:center">
                      <span style="font-weight:600">Thời gian</span>
                      <div class="dropdown-divider"></div>
                      <VueCtkDateTimePicker
                        v-model="deadline"
                        format="DD-MM-YYYY hh:mm a"
                      />
                      <div class="save-date">
                        <button @click="setDeadLine()" type="button" class="btn btn-primary" style="width:100%">Lưu</button>
                      </div>
                      <div class="de-date">
                        <button @click="deleteDeadline()" width="100%" class="btn btn-danger" style="width:100%">Gở bỏ</button>
                      </div>
                    </div>
                  </div>

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
                        <Input v-model="jobNameT" placeholder="Nhập tiêu đề..." />
                      </div>
                      <Button @click="createJobNameT()" type="primary" style="margin-top:5px;"
                        >Thêm</Button
                      >
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
  props: [
    "taskCard",
    "userOfTeams",
    "usersOfP",
    "tagTaskDetail",
    "deadlineP",
    "rOutOftime",
    "outOftime",
    "checkDateTD",
    "getJob",
    "getCommentTD",
  ],
  mixins: [taskDetail, message, sweetalert],
  components: {
    Multiselect,
  },
  data() {
    return {
      comment:'',
      jobNameT: '',
      modalDate: false,
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
      deadline: "",
      idTask: 0,
      tagData: [],
      jobList: [],
      per: 0,
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
    addJobFormS(i) {
      this.$props.getJob[i].addJobForm = !this.$props.getJob[i].addJobForm;
      this.$props.getJob[i].addJobFormShow = !this.$props.getJob[i].addJobFormShow;
    },
    addJobS(i) {
      this.$props.getJob[i].addJobForm = !this.$props.getJob[i].addJobForm;
      this.$props.getJob[i].addJobFormShow = !this.$props.getJob[i].addJobFormShow;
    },
    addJob(jobId,index) {
      this.mixinAddJob('api/job/job-detail/create',this.jobName,jobId,index)
    },
    deJobDT(id,i,index){
      this.mixinDeJobDT('api/job/job-detail/delete',id,i,index)
    },
    crtag(){
      this.creatTagF = !this.creatTagF 
      this.ct = !this.ct
    },
    jobPercent(i) {
      let per = this.$props.getJob[i].job_details.filter((arrJob) => arrJob.check == true);
      let lenthJob = this.$props.getJob[i].job_details.length;
      if (this.$props.getJob[i].job_details.length == 0) {
        return 0;
      } else {
        return parseFloat(((per.length / lenthJob) * 10 * 10).toFixed(2));
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
    },
    setDeadLine(){
      this.mixinSetDeadLine('api/task-detail/deadline/set')
    },
    deleteDeadline(){
      this.mixinDeleteDeadline('api/task-detail/deadline/delete')
    },
    completedTD(checkDate){
      this.mixinCompletedTD('api/task-detail/completed',checkDate)
    },
    createJobNameT(){
      this.mixinCreateJobNameT('api/job/create')
    },
    deleteJobName(id,i){
      this.swdelete(this.mixinDeleteJobName, "api/job/delete", id,i);
    },
    checkJob(id,check){
      this.mixinCheckJob('api/job/job-detail/check',id,check)
    },
    commentTD(userId){
      this.mixinCommentTD('api/comment/create',userId)
    },
    deleteComment(id,i){
      this.swdelete(this.mixinDeleteComment, "api/comment/delete", id,i);
    },
    editComment(i){
      this.mixinEditComment(i)
    },
    updateComment(id,comment,i){
      this.mixinUpdateComment(`api/comment/update?id=${id}`,comment,i)
    },
    repplyComment(parent_id,userId,i){
      this.mixinRepplyComment('api/comment/repply',parent_id,userId,i)
    },
    deleteReplyComment(id,i,index){
      this.swdelete(this.mixinDeleteReplyComment,'api/comment/reply/delete',id,i,index)
    },
    editRCom(i,index){
      this.mixinEditRCom(i,index)
    },
    UpdateReCo(comment,id,i,index){
      this.mixinUpdateReCo('api/comment/reply/update',comment,id,i,index)
    }
  },
};
</script>

<style scoped>
.text-line{
  text-decoration-line: line-through;
  color: #929292;
}
.date-picker{
  width: 100%;
  height: 180px;
  padding: 10px;
  /* border: solid 1px #000; */
  background: #ffffff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  right: 104%;
  box-shadow: 2px 2px 2px 2px #c7c7c7;
}
.date-p{
  position: relative;
}
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
  border: 1px solid rgb(216, 215, 215);
  margin: 2px 0;
  padding: 5px;
  border-radius: 3px;
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
.end{
  font-size: 12px;
  background: rgb(180, 116, 116);
  display: flex;
  justify-content: center;
}
.s-end{
  font-size: 12px;
  background: rgb(209, 200, 151);
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
