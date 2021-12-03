export default{
  data(){
    return{

    }
  },
  methods:{
    info(desc, title = "Hey") {
      this.$Notice.info({
          title: title,
          desc: desc
      });
    },
    success(desc, title = "Great!") {
        this.$Notice.success({
            title: title,
            desc: desc
        });
    },
    warning(desc, title = "Oop!!!") {
        this.$Notice.warning({
          title: title,
          desc: desc
        });
    },
    error(desc, title = "Osp!!!") {
        this.$Notice.error({
          title: title,
          desc: desc
        });
    },
    swr(desc = 'Xảy ra lỗi! vui lòng thử lại', title="Osp!!!") {
      this.$Notice.error({
        title: title,
        desc: desc
      });
    }
  }
}