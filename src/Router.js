import Login from './components/Login'
// import Register from './components/Register'
import Home from './components/home/Home'
import UserManager from './components/home/content/user_manager/UserManager'
import TeamManager from './components/home/content/team_manager/TeamManager'
import Overview from './components/home/content/Overview/Overview'
import Info from './components/home/content/user_info/Info'
import allProjectManager from './components/home/content/project/allProject/allProjectManager'
import myProjectManager from './components/home/content/project/myProject/myProjectManager'
import ProjectCV from './components/home/content/project/allProject/ProjectCV'
import RoleManager from './components/home/content/roles/RoleManager'
import Permission from './components/home/content/roles/Permission'
import ChatHome from './components/home/content/messages/ChatHome.vue'
import Page404 from './components/Page404'
import myWork from './components/home/content/myWork/myWork'
import InfoFriend from './components/home/content/user_info/InfoFriend'

export const routes = [
  { path: '/', component: Login , name: 'login'},
  // { path: '/register', component: Register , name: 'resgiter'},
  { path: '/home', component: Home , name: 'home', children: [
    {
      path:'/user-manager',
      component: UserManager , 
      name: 'usermanager',
    },
    {
      path:'/team-manager', component: TeamManager , name: 'teammanager'
    },
    {
      path:'/overview', component: Overview , name: 'overview'
    },
    {
      path:'/info', component: Info , name: 'info'
    },
    {
      path:'/all-project', component: allProjectManager , name: 'allProject'
    },
    {
      path:'/my-project', component: myProjectManager , name: 'myProject'
    },
    {
      path:'/project-go', component: ProjectCV , name: 'projectCV', props: true
    },
    {
      path:'/roles', component: RoleManager , name: 'roles', props: true
    },
    {
      path:'/permissions', component: Permission , name: 'permissions', props: true
    },
    {
      path:'/my-work', component: myWork , name: 'myWork', props: true
    },
    {
      path:'/info-member', component: InfoFriend , name: 'infoFriend', props: true
    }
  ]},
  {
    path:'/chat-home', component: ChatHome , name: 'chat-home', props: true
  },
  {
    path:'/page-404', component: Page404 , name: 'page404', props: true
  }
]