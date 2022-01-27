<template>
  <div class="over-view">
    <section class="content" style="margin-top: 20px">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"
                ><i class="fas fa-cog"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">CPU Traffic</span>
                <span class="info-box-number">
                  10
                  <small>%</small>
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"
                ><i class="fas fa-thumbs-up"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Likes</span>
                <span class="info-box-number">41,410</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-3" style="padding-right:10px">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"
                ><i class="fas fa-shopping-cart"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Sales</span>
                <span class="info-box-number">760</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"
                ><i class="fas fa-users"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">New Members</span>
                <span class="info-box-number">2,000</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
        </div>
      </div>
    </section>
    <div class="row" style="display:flex;justify-content: center;margin:0">
      <div class="col-md-12" style="width:98%;">
        <div class="card">
          <div class="card-header" style="display:flex;justify-content:center">
            <h5 class="card-title">Biểu đồ dự án</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <p class="text-center">
                  <strong>{{currentDate()}}</strong>
                </p>

                <div class="chart">
                  <canvas
                    id="myChart"
                    height="180"
                    style="height: 180px;"
                  ></canvas>
                </div>
              </div>
              <div class="col-md-4">
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
              </div>
            </div>
          </div>
          <div class="card-footer">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import myChart from "../../../../js/myChart";

export default {
  data() {
    return {
      myChart: myChart,
    };
  },
  computed: {},
  mounted() {
    // const st = document.getElementById('project-data');
    // new Chart(st, this.projectData);

    // const tt = document.getElementById('team-data');
    // new Chart(tt, this.teamData);

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, this.myChart);
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.$store.dispatch("checkLogin");
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  },
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
</style>
