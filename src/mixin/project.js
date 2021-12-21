import axios from 'axios';
import moment from 'moment'
export default{
  data(){
    return{
      value: {
        name : '',
        team: [],
        user: [],
        date_start: null,
        date_end: null
      },
      editData: {
        dateStart: null,
        dateEnd: null,
      },
      isCreate: false,
      isUpdate: false,
      isDelete: false,
      data:{},
      total: 6,
      pageInfo: null,
      modalCreateProject: false,
      modalEditProject: false,
      modalDeleteProject: false,
      idDelete: null,
      index: -1,
      modalInfoProject: false,
      infoProject: {
        project: {},
        userCreate: {},
        teams: {},
        users: {}
      },
      teamDetail: {}
    }
  },
  methods:{
    async mixinGetProject(page){
      await axios.post(`/api/project/all?page=${page}&total=${this.total}`)
      .then(response =>
        {
          
          this.data = response.data.data;
          this.data.userCreate = response.data.userCreate
          this.pageInfo = response.data;
          for(let i=0; i<this.data.data.length; i++){
            this.data.data[i].start_at = moment(String(response.data.data.data[i].start_at)).format('DD-MM-YYYY hh:mm:ss') 
            this.data.data[i].end_at = moment(String(response.data.data.data[i].end_at)).format('DD-MM-YYYY hh:mm:ss') 
          }
        })
    },
    async mixinCreateProject(url,value){
      this.isCreate = true;
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: value
          });
        let data = res.data;
        if(data){
          this.modalCreateProject = false
          this.success(data.message)
          this.mixinGetProject(1);

          // this.data.data.unshift(data.data)
          this.isCreate = false;
        }
      } catch (error) {
          this.error(error.response.data.message)
          this.isCreate = false;
      }
    },
    async mixinEditProject(url,value){
      this.modalEditProject = true
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: value
          });
        let data = res.data;
        if(data){
          this.editData.id = data.id
          this.editData.projectName = data.projectName
          this.editData.team = data.team
          this.editData.user = data.user
          this.editData.dateStart = moment(String(data.dateStart)).format('YYYY-MM-DD')
          this.editData.dateEnd = moment(String(data.dateEnd)).format('YYYY-MM-DD')
          
        }
      } catch (error) {
          this.error(error.response.data.message)
      }
    },
    async mixinUpdateProject(url,value){
      this.isUpdate = true;
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: value
          });
        let data = res.data;
        if(data){
          // this.data.data[this.index].name = this.editData.projectName
          this.mixinGetProject(1) //Call get dữ liệu phân trang

          this.modalEditProject = false
          this.success(data.message)
          this.isUpdate = false;
        }
      } catch (error) {
          this.error(error.response.data.message)
          this.isUpdate = false;
      }
    },
    async mixinDeleteProject(url,id){
      this.isDelete = true;
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          }
          });
        let data = res.data;
        if(data){
          // this.data.data.splice(this.index,1)
          this.mixinGetProject(1) //Call get dữ liệu phân trang

          this.modalDeleteProject = false
          this.success(data.message)
          this.isDelete = false;
        }
      } catch (error) {
          this.error(error.response.data.message)
          this.isDelete = false;
      }
    },
    async mixinInfoProject(url, id){
      this.modalInfoProject = true
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          }
          });
        let data = res.data;
        if(data){
          this.infoProject.project = data.project
          this.infoProject.userCreate = data.userCreate
          this.infoProject.teams = data.project
          this.infoProject.infoProject = data.project

        }
      } catch (error) {
          this.error(error.response.data.message)
      }
    },
    async mixinTeamDetail(url,id){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data: {
            id: id
          }
          });
        let data = res.data;
        if(data){
          this.teamDetail = data.data
        }
      } catch (error) {
          this.error(error.response.data.message)
      }
    }
  }
}