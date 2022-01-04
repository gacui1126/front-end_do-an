import axios from 'axios';

export default{
  data(){
    return{
      // hasAccess: false
    }
  },
  methods:{
    async mixinCheckPer(permissionName){
    let token = localStorage.getItem('token')
    let hasAccess
      await axios.get(`api/permission/${permissionName}`,
      
        {headers: { Authorization: 'Bearer ' + token}}
      )
      .then(() =>
        {
          hasAccess = true
        })
      .catch(()=>
        {
          hasAccess = false
        })
        return hasAccess
    }
  }
}