<template>
  <div id="home" class="home">
    <Header />
    <Aside/>
  <div class="content-wrapper">
    <router-view></router-view>
  </div>
    <Footer />

</div>

</template>

<script>
import Aside from './Aside';
import Footer from './Footer.vue';
import Header from './Header.vue';

export default {
  data(){
    return {
      
    }
  },
  components: { Header, Aside, Footer}
}
</script>

<style>

  .sidebar-dark-teal{
    background-color: rgb(72, 121, 117);
  }
  .display{
    display: none;
  }
  .container{
    padding-top: 6rem;
  }
  .table-bordered{
    border: 1px solid #000;
    border-radius: 8px;
    overflow:hidden;
  }
  .table{
    text-align: center;
  }
  .button_create{
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
  }
  .title_user{
    color: rgb(102, 102, 102);
    text-align: center;
  }
@import'~bootstrap/dist/css/bootstrap.css'


</style>
