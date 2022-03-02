<template>
  <div class="over-view">
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
                <span class="info-box-number">21</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-secondary elevation-1"
                ><i class="fas fa-briefcase"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Công việc đã nhận</span>
                <span class="info-box-number">760</span>
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

export default {
  mixins:[overview],
  data() {
    return {
      myChart: myChart,
      defaultDate: '0',
      DatePickerFormat: 'yyyy',
      bootstrapStyling: true,
    };
  },
  computed: {},
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
    // this.chart()
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

</style>
