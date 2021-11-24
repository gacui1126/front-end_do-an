import Login from './components/Login'
// import Register from './components/Register'
import Home from './components/home/Home'
import UserManager from './components/home/content/user_manager/UserManager'
import TeamManager from './components/home/content/team_manager/TeamManager'
import Overview from './components/home/content/Overview/Overview'
import Info from './components/home/content/user_info/Info'

export const routes = [
  { path: '/', component: Login , name: 'login'},
  // { path: '/register', component: Register , name: 'resgiter'},
  { path: '/home', component: Home , name: 'home', children: [
    {
      path:'/user-manager', component: UserManager , name: 'usermanager'
    },
    {
      path:'/team-manager', component: TeamManager , name: 'teammanager'
    },
    {
      path:'/overview', component: Overview , name: 'overview'
    },
    {
      path:'/info', component: Info , name: 'info'
    }
  ]},
]