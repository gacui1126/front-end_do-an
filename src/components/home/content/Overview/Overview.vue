<template>
  <div class="over-view">
    <Spin size="large" fix v-if="loaded">
      <div class="loadingio-spinner-spinner-tvws38y65vg"><div class="ldio-bes5d1wian7">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div></div>
    </Spin>
    <section class="content" style="padding-top: 20px">
      <div class="container-fluid">
        <div class="row" style="padding: 0 10px">
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"
                ><i class="fas fa-project-diagram"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Dự án</span>
                <span class="info-box-number">
                  {{Projects.length}}
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"
                ><i class="fas fa-users"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Thành viên</span>
                <span class="info-box-number">{{Users.length}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"
                ><i class="fas fa-plug"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Thành viên online</span>
                <span class="info-box-number">{{channel.onlineUser.length}}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-secondary elevation-1"
                ><i class="fas fa-briefcase"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Chưa hoàn thành</span>
                <span class="info-box-number">{{myWork.cardUnfinished.length}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
        </div>
        
      </div>
    </section>
    <div class="row" style="display:flex;justify-content: center;margin:0">
      <div class="col-md-12" style="width:98%;">
        <div class="card">
          <div class="card-header" style="display:flex;justify-content:center">
            <h5 class="card-title" style="font-weight:600">Biểu đồ dự án</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- <div class="col-md-8"> -->
                
                <div class="startDate">
                  <p class="text-center" style="display:flex;justify-content:center;padding-bottom: 10px;">
                    <label style="margin-right: 5px">Chọn năm :</label>
                  
                  <datepicker 
                    v-model="defaultDate"
                    :format="DatePickerFormat"
                    minimum-view="year"              
                    name="datepicker"
                    id="input-id"
                    input-class="input-class"
                    :class="{'stDate': bootstrapStyling }"
                    >
                  </datepicker>
                  </p>
                </div>
                
                <div class="chart">
                  <canvas
                    id="myChart"
                    height="180"
                    style="height: 180px;"
                  ></canvas>
                </div>
              <!-- </div> -->
              <!-- <div class="col-md-4">
                <p class="text-center">
                  <strong>Mục tiêu</strong>
                </p>

                <div class="progress-group">
                  Add Products to Cart
                  <span class="float-right"><b>160</b>/200</span>
                  <div class="progress progress-sm">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 80%"
                    ></div>
                  </div>
                </div>

                <div class="progress-group">
                  Complete Purchase
                  <span class="float-right"><b>310</b>/400</span>
                  <div class="progress progress-sm">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 75%"
                    ></div>
                  </div>
                </div>
                <div class="progress-group">
                  <span class="progress-text">Visit Premium Page</span>
                  <span class="float-right"><b>480</b>/800</span>
                  <div class="progress progress-sm">
                    <div
                      class="progress-bar bg-success"
                      style="width: 60%"
                    ></div>
                  </div>
                </div>
                <div class="progress-group">
                  Send Inquiries
                  <span class="float-right"><b>250</b>/500</span>
                  <div class="progress progress-sm">
                    <div
                      class="progress-bar bg-warning"
                      style="width: 50%"
                    ></div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <!-- <div class="card-footer">
            <div class="row">
              <div class="col-sm-3 col-6">
                <div class="description-block border-right">
                  <span class="description-percentage text-success"
                    ><i class="fas fa-caret-up"></i> 17%</span
                  >
                  <h5 class="description-header">$35,210.43</h5>
                  <span class="description-text">TOTAL REVENUE</span>
                </div>
              </div>
              <div class="col-sm-3 col-6">
                <div class="description-block border-right">
                  <span class="description-percentage text-warning"
                    ><i class="fas fa-caret-left"></i> 0%</span
                  >
                  <h5 class="description-header">$10,390.90</h5>
                  <span class="description-text">TOTAL COST</span>
                </div>
              </div>
              <div class="col-sm-3 col-6">
                <div class="description-block border-right">
                  <span class="description-percentage text-success"
                    ><i class="fas fa-caret-up"></i> 20%</span
                  >
                  <h5 class="description-header">$24,813.53</h5>
                  <span class="description-text">TOTAL PROFIT</span>
                </div>
              </div>
              <div class="col-sm-3 col-6">
                <div class="description-block">
                  <span class="description-percentage text-danger"
                    ><i class="fas fa-caret-down"></i> 18%</span
                  >
                  <h5 class="description-header">1200</h5>
                  <span class="description-text">GOAL COMPLETIONS</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import myChart from "../../../../js/myChart";
import overview from "../../../../mixin/overview"
import Datepicker from 'vuejs-datepicker';
import { mapState } from "vuex";

export default {
  mixins:[overview],
  data() {
    return {
      myChart: myChart,
      defaultDate: '0',
      DatePickerFormat: 'yyyy',
      bootstrapStyling: true,
      loaded: true
    };
  },
  computed: {
    ...mapState(['channel','myWork']),
  },
  created(){
    this.getProject()
  },
  components: {
    Datepicker
  },
  mounted() {
    this.checkLogin();
    this.getUser();
    this.currentDate();
    this.chartProject();
    this.loaded = true
  },
  methods: {
    chart(){
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, this.myChart);
    },
    checkLogin() {
      this.$store.dispatch("checkLogin");
    },
    currentDate() {
      const current = new Date();
      const year = `${current.getFullYear()}`;
      this.defaultDate = year;
    },
    getProject(){
      this.mixinGetProject('api/overview/get/data/project');
    },
    getUser(){
      this.mixinGetUser('api/overview/get/data/user');
      
    },
    chartProject(){
      this.mixinChartProject('api/overview/chart-project-data')

    }
  },
  watch:{
    defaultDate: function(){
      this.mixinChartProject('api/overview/chart-project-data')
      // this.chart()
    }
  }
};
</script>

<style scoped>
.project {
  padding: 30px;
  text-align: center;
  width: 100%;
}
.project_chart {
  width: 100%;
  display: flex;
  justify-content: center;
}
.project_chart_flex {
  width: 80%;
}
.staff {
  width: 300px;
  height: 300px;
  border: 2px solid #fefefe;
  border-radius: 50%;
  /* background: conic-gradient(
      #925e5e 0 30%,
      #a09b54 0 70%,
      #252121 0 100%
    ); */
}
.staff_chart {
  display: flex;
  justify-content: space-around;
  
}

.br-test{
  height: 100px;
  width: 100px;
  background: sienna;
}

.vdp-datepicker * {
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  width: 53px;
}

.startDate >>> input {
  text-align: center;
  cursor: pointer;
  width: 60px;
}

@keyframes ldio-bes5d1wian7 {
  0% { opacity: 1 }
  100% { opacity: 0 }
}
.ldio-bes5d1wian7 div {
  left: 94px;
  top: 48px;
  position: absolute;
  animation: ldio-bes5d1wian7 linear 1s infinite;
  background: #eb7f19;
  width: 12px;
  height: 24px;
  border-radius: 4.8px / 4.8px;
  transform-origin: 6px 52px;
}.ldio-bes5d1wian7 div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.9166666666666666s;
  background: #eb7f19;
}.ldio-bes5d1wian7 div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -0.8333333333333334s;
  background: #dfa950;
}.ldio-bes5d1wian7 div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.75s;
  background: #94733c;
}.ldio-bes5d1wian7 div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.6666666666666666s;
  background: #f4edd8;
}.ldio-bes5d1wian7 div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.5833333333333334s;
  background: #fae127;
}.ldio-bes5d1wian7 div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.5s;
  background: #189ad2;
}.ldio-bes5d1wian7 div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.4166666666666667s;
  background: #a5b5bc;
}.ldio-bes5d1wian7 div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.3333333333333333s;
  background: #53697e;
}.ldio-bes5d1wian7 div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.25s;
  background: #2d2a2e;
}.ldio-bes5d1wian7 div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.16666666666666666s;
  background: #eb7f19;
}.ldio-bes5d1wian7 div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.08333333333333333s;
  background: #dfa950;
}.ldio-bes5d1wian7 div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
  background: #94733c;
}
.loadingio-spinner-spinner-tvws38y65vg {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-bes5d1wian7 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-bes5d1wian7 div { box-sizing: content-box; }
</style>
