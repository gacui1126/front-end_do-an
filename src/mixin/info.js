// import axios from 'axios';

// // import moment from 'moment'

// export default{
//   data(){
//     return{
//       token: localStorage.getItem('token')
//     }
//   },
//   methods:{
//     async editUser(url, id){
//       try {
//         let res = await axios({
//           method: 'post',
//           url: url,
//           data: {
//             id : id
//           }
//         });
//         let data = res.data;
//         if(data){
//           // console.log(id)
//           commit('edit',data.data);
//           commit('teamName',data.data.teams.name)
//         }
//       } catch (error) {
//           commit('edit',error.response);
//       }
//     }
//   }
// }