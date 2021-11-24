<template>
  <div class="footer">
    <aside class="control-sidebar control-sidebar-dark">

      <div class="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
      </div>
    </aside>

    <footer class="main-footer">
      <div class="text-footer">
        <strong class="strong-footer">Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a></strong>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .main-footer{
    padding: 0;
    height: 20px;
    background-color: rgb(10, 12, 11);
    font-size: 10px;
    text-align: center;
  }
  .text-footer a{
    text-decoration: none;
    color: chartreuse;
  }
  .text-footer strong{
    color: rgb(255, 255, 255);
  }
</style>