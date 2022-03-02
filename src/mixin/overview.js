import axios from 'axios';

export default{
  data(){
    return{
      Projects:[],
      Users:[],
      chartProjectData:[]
    }
  },
  methods:{
    async mixinGetProject(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.Projects = data.data
        }
      } catch (error) {
          this.error(error.response.data.message)
      }
    },
    async mixinGetUser(url){
      try {
        let res = await axios({
          method: 'get',
          url: url,
          headers: { Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          this.Users = data.data
        }
      } catch (error) {
          this.error(error.response.data.message)
      }
    },
    async mixinChartProject(url){
      try {
        let res = await axios({
          method: 'post',
          url: url,
          data:{
            date: this.defaultDate
          },
          headers: { Authorization: 'Bearer ' + this.token}
          });
        let data = res.data;
        if(data){
          var result = Object.keys(data.data).map((key) => [data.data[key]]);
          var resultcom = Object.keys(data.data).map((key) => [data.data[key]]);
          let count = [0,0,0,0,0,0,0,0,0,0,0,0];
          // let x = 0;
          for(let i = 0; i < result.length ; i++){
            result[i] = result[i][0].length
            for(let j = 0; j < resultcom[i][0].length ; j++){
              if(resultcom[i]){
                if(resultcom[i][0][j].projectComplete == 1){
                  count[i] = count[i] + 1;
                }
              }
            }
          }
          // window.console.log(count)
          this.myChart.data.datasets[0].data = result
          this.myChart.data.datasets[1].data = count
          this.chart()
        }
      } catch (error) {
          this.error(error.response.data)
      }
    }
  }
}