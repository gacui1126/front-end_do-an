<template>
  <div class="aside">
    <aside class="main-sidebar sidebar-dark-teal elevation-4">
    <!-- Brand Logo -->
    <div class="logo">
      <router-link to="overview" href="" class="brand-link link-none">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">QLDA</span>
      </router-link>
    </div>
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="dist/img/user.jpeg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link to="info" class="d-block link-none">{{auth.user.name}}</router-link>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          
          <li class="nav-item">
            <router-link class="nav-link" to="overview">              
              <i class="nav-icon fas fa-th"></i>
              <p>Tổng Quan</p>
            </router-link>
          </li>
          <li class="nav-item menu-open">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                  Quản lý Chung
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link class="nav-link" to="team-manager">
                  <i class="fas fa-user-friends nav-icon"></i>
                  <p>Quản lý team</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="user-manager">
                  <i class="fas fa-user-plus nav-icon"></i>
                  <p>Quản lý nhân viên</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item menu-open">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                  Quản lý dự án
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link class="nav-link" to="team-manager">
                  <i class="fas fa-tasks nav-icon"></i>
                  <p>Dự án</p>
                </router-link>
              </li>
              
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed:{
    ...mapState(['auth'])
  }
}
</script>

<style scoped>
  .link-none{
    text-decoration: none;
  }
  .logo{
    display: flex;
    justify-content: center;
  }
</style>