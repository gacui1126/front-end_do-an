export default{
  methods:{
    success(message) {
      this.$Message.success(message);
    },
    warning(message) {
      this.$Message.warning(message);
    },
    error(message) {
      this.$Message.error(message);
    }
  }
}