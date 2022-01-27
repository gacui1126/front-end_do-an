<template>
    <div class="chat-hme">

        <chat :user="auth.user"/>

    </div>
</template>

<script>
import Chat from './Chat.vue';
import { mapState } from 'vuex'

export default {
  components: { Chat },
    computed: {
    ...mapState(['auth']),
    },
    created(){
    this.checkLogin();
    },
    mounted(){
    this.checkLogin();
    },
    methods:{
    checkLogin(){
      this.$store.dispatch('checkLogin')
    }
  },
}
</script>

<style scoped>

</style>