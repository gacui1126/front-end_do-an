
const state = {
  isShowUser: false,
  isShowTeam: true,
  isShowOverView: false
}
const getters = {
  isShowUser: state => state.isShowUser,
  isShowTeam: state => state.isShowTeam,
  isShowOverView: state => state.isShowOverView
}
const actions = {
  isShowOverView(){
    if(state.isShowUser){
      state.isShowUser = !state.isShowUser
      return state.isShowOverView = !state.isShowOverView
    }else if(state.isShowTeam){
      state.isShowTeam = !state.isShowTeam
      return state.isShowOverView = !state.isShowOverView
    }else if(state.isShowOverView){
      return state.isShowOverView
    }else{
      return state.isShowOverView = !state.isShowOverView
    }
  },
  isShowTeam(){
    if(state.isShowOverView){
      state.isShowOverView = !state.isShowOverView
      return state.isShowTeam = !state.isShowTeam
    }else if(state.isShowUser){
      state.isShowUser = !state.isShowUser
      return state.isShowTeam = !state.isShowTeam
    }else if(state.isShowTeam){
      return state.isShowTeam
    }else{
      return state.isShowTeam = !state.isShowTeam
    }
  },
  isShowUser(){
    if(state.isShowTeam){
      state.isShowTeam = !state.isShowTeam
      return state.isShowUser = !state.isShowUser
    }else if(state.isShowOverView){
      state.isShowOverView = !state.isShowOverView
      return state.isShowUser =!state.isShowUser
    }else if(state.isShowUser){
      return state.isShowUser
    }else{
      return state.isShowUser =!state.isShowUser
    }
  }
}
const mutations = {
  setIsShowTeam(state,data){
    state.isShowTeam = data
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};