import axios from 'axios';
export default{
  data(){
    return{
      task: [],
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
          }
          });
        let data = res.data;
        if(data){
          this.$toaster.success(data.message)
          for(let i=0 ; i< data.data.length; i++){
            this.$props.taskCard.users.push(data.data[i])
          }
        }
      } catch (error) {
        this.$toaster.error(error.response.data.message)
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
          }
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
    async mixinAddTagTask(url,tagId,index){
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
    }
  }
}