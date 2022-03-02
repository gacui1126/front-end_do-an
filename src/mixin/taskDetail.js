import axios from 'axios';
import moment from 'moment'

export default{
  data(){
    return{
      task: [],
      RComment: '',
      token: localStorage.getItem('token'),
      historyChange:[],
      indexDeleteFile: 0
    }
  },
  methods:{
    async mixinAddTaskUser(url,user){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            user: user,
            id: this.$props.taskCard.id
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          for(let i=0 ; i< data.data.length; i++){
            this.$props.taskCard.users.push(data.data[i])
          }
        }
      } catch (error) {
        // this.$toaster.error(error.response.data.message)
        this.$swal('Lỗi!!!', error.response.data.message, 'error')
      }
    },
    async mixindeleteUserT(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            userId: id,
            taskId: this.$props.taskCard.id
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          this.$props.taskCard.users.splice(this.index,1)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinCreateTag(url,tagColor,userId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskId: this.$props.taskCard.id,
            userId: userId,
            tagColor: tagColor
          }
          });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          this.tagData.push(data.data)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinGetTagUser(url,userId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            userId: userId,
          }
          });
        let data = res.data;
        if(data){
          this.tagData = data.data
          for(let i=0;i<this.$props.tagTaskDetail.length;i++){
            for(let j=0;j<this.tagData.length;j++)
            if(this.$props.tagTaskDetail[i].color == this.tagData[j].color){
              this.tagData[j].check = true
            }
          }
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinAddTagUser(url,tagId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            tagId: tagId,
            taskDetailId: this.$props.taskCard.id,
          }
          });
        let data = res.data;
        if(data){
          this.tagData = data.data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinGetTagTask(){
      try {
        let res = await axios({
          method: 'post',
          url: 'api/tag/get-tag-taskdetail',
          data: {
            taskDetailId: this.$props.taskCard.id,
          }
          });
        let data = res.data;
        if(data){
          this.$emit('update:tagTaskDetail', data.data);
          // this.$props.tagTaskDetail = data.data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinGetAllDt(){
      // alert(this.$props.taskCard.id)
      try {
        let res = await axios({
          method: 'post',
          url: 'api/task-detail/get-all-data',
          data: {
            taskDetailId: this.$props.taskCard.id,
          }
          });
        let data = res.data;
        if(data){
          // window.console.log(data.data)
          this.$emit('update:tagTaskDetail', data.tag);
          this.$emit('update:FileInCard', data.file);
          this.$emit('update:getJob', data.tag);
          // this.$props.tagTaskDetail = data.data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinAddTagTask(url,tagId,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            tagId: tagId,
            taskDetailId: this.$props.taskCard.id,
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          this.mixinGetTagTask()
          this.tagData[index].check = !this.tagData[index].check
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinEditTag(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          }
          });
        let data = res.data;
        if(data){
          this.editTag = data.data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinUpdateTag(url,color,id,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
            color: color
          }
          });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          this.tagData[index].color = color
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinSetDeadLine(url, deadline){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: this.$props.taskCard.id,
            deadline: deadline
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          this.$emit('update:deadlineP', moment(String(data.data)).format('DD-MM-YYYY hh:mm a'));
            if(data.dayDeadline < 2880 && data.dayDeadline >0 ){
              this.$emit('update:rOutOftime', true)
              this.$emit('update:outOftime', false)
            }else if(data.dayDeadline == 0){
              this.$emit('update:outOftime', true)
              this.$emit('update:rOutOftime', false)
            }else{
              this.$emit('update:rOutOftime', false)
              this.$emit('update:outOftime', false)
            }
          this.modalDate = false
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleteDeadline(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: this.$props.taskCard.id
          }
          });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          this.$emit('update:deadlineP', 'Invalid date');
          this.modalDate = false
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinCompletedTD(url,checkDate){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: this.$props.taskCard.id,
            checkDate: checkDate
          }
          });
        let data = res.data;
        if(data){
          this.$emit('update:checkDateTD', data.data);
          if(data.data == true){
            this.$emit('update:rOutOftime', false)
            this.$emit('update:outOftime', false)
          }else{
            this.mixinSetDeadLine('api/task-detail/deadline/set',this.deadlineP)
          }
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinCreateJobNameT(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            taskDetailId: this.$props.taskCard.id,
            name: this.jobNameT
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
        this.$toaster.success(data.message)
        // this.$emit('update:getJob', data.data)
        // this.$props.getJob.push(data.data)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleteJobName(url,id,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          data
          index
        // this.$props.getJob.splice(index,1)
        }
      } catch (error) {
        // this.$toaster.error(error.response.data.message)
        this.$swal('Lỗi!!!', error.response.data.message, 'error')
      }
    },
    async mixinAddJob(url,name,jobId,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            name: name,
            jobId: jobId
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
        this.$toaster.success(data.message)
        index
        // this.$props.getJob[index].job_details.push(data.data)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeJobDT(url,id,i,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
        this.$toaster.success(data.message)
        index,i
        // this.$props.getJob[i].job_details.splice(index,1)
        }
      } catch (error) {
        // this.$toaster.error(error.response.data.message)
        this.$swal('Lỗi', error.response.data.message, 'error')
      }
    },
    async mixinCheckJob(url,id,check){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
            check: !check
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
        data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinCommentTD(url,userId){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            userId: userId,
            taskDetailId: this.$props.taskCard.id,
            comment: this.comment
          }
          });
        let data = res.data;
        if(data){
        this.$toaster.success(data.message)
        // this.$props.getCommentTD.push(data.data)
        this.comment = ''
        // window.console.log(this.$props.getCommentTD)

        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleteComment(url,id,i){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          }
          });
        let data = res.data;
        if(data){
        this.$toaster.success(data.message)
        i
        // this.$props.getCommentTD.splice(i,1)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    mixinEditComment(i){
      this.$props.getCommentTD[i].editComment = !this.$props.getCommentTD[i].editComment
      this.$props.getCommentTD[i].showComment = !this.$props.getCommentTD[i].showComment
    },
    async mixinUpdateComment(url,comment,i){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            comment: comment
          }
          });
        let data = res.data;
        if(data){
          data
         this.mixinEditComment(i)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinRepplyComment(url,parent_id,userId,i){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            parent_id: parent_id,
            userId: userId,
            comment: this.RComment,
          }
          });
        let data = res.data;
        if(data){
          data
          this.$props.getCommentTD[i].showRepply = false
          this.RComment = ''
          // this.$props.getCommentTD[i].replies.push(data.data)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleteReplyComment(url,id,i,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          }
          });
        let data = res.data;
        if(data){
          i
          index
          // this.$props.getCommentTD[i].replies.splice(index,1)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinEditRCom(i,index){
      this.$props.getCommentTD[i].replies[index].Edit = !this.$props.getCommentTD[i].replies[index].Edit
      this.$props.getCommentTD[i].replies[index].OEdit = !this.$props.getCommentTD[i].replies[index].OEdit
    },
    async mixinUpdateReCo(url,comment,id,i,index){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
            comment: comment
          }
          });
        let data = res.data;
        if(data){
          data
          this.mixinEditRCom(i,index)
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinDeleteFile(url,id,i){
      
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id,
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          data,i
          // this.FileInCard.splice(i,1);
        }
      } catch (error) {
        // this.$toaster.error(error.response.data.message)
        this.$swal('Lỗi!!!', error.response.data.message, 'error')
      }
    },
    async getFile(){
      try {
        let res = await axios({
          method: 'post',
          url: 'api/file/get-all',
          data: {
            id: this.taskCard.id,
          }
          });
        let data = res.data;
        if(data){
          this.FileInCard = data.data
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
      }
    },
    async mixinFormSubmit(url,e){
      url
      e.preventDefault();
      let data = new FormData();
      data.append('file', this.file);
      data.append('task_detail_id',this.taskCard.id)
      data.append('name',this.NameFile)
      await axios.post(url, data, 
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: 'Bearer ' + this.token
        }
      })
      .then(res => {
        res
        // this.FileInCard.push(res.data.data)
      })
      .catch(err => {
        // if(err.response.status == 422){
        //   this.$toaster.error('Vui lòng nhập tên tài liệu và chọn tài liệu muốn tải lên')
        // }
        this.$swal('Lỗi!!!', err.response.data.message, 'error')
      });
    },
    async mixinChangeFile(url,id,name,i){
      
      // e.preventDefault();
      let data = new FormData();
      data.append('file', this.file);
      data.append('name',name);
      data.append('id',id);
      await axios.post(url, data, 
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: 'Bearer ' + this.token
        }
      })
      .then(res => {
        this.FileInCard[i] = res.data.data
      })
      .catch(err => {
        if(err.response.status == 422){
          this.$toaster.error('Vui lòng nhập tên tài liệu và chọn tài liệu muốn tải lên')
        }
      });
    },
    async mixinCompledteConfi(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: this.taskCard.id,
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          // this.$toaster.success(data.msg)
          this.$swal('Đã gửi yêu cầu', 'Gửi yêu cầu xác nhận thành công', 'success')
        }
      } catch (error) {
          this.$swal('Lỗi',error.response.data.msg, 'error')
        // this.$toaster.error(error.response.data.msg)
      }
    },
    async mixinGetHistoryChange(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: this.taskCard.id
          },
          headers: { Authorization: 'Bearer ' + this.token},
          });
        let data = res.data;
        if(data){
          this.historyChange = data.data
          // window.console.log(this.historyChange)
        }
      } catch (error) {
        // this.$toaster.error(error.response.data.message)
        this.$swal('Lỗi', error.response.data.message, 'error')
      }
    }
  }
}