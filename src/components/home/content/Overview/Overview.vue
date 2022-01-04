<template>
  <div class="over-view">
    <div class="project">
      <h2>Biểu đồ dự án</h2>
      <div class="project_chart">
        <div class="project_chart_flex">
          <canvas id="project-data"></canvas>
        </div>
      </div>
    </div>
    <!-- <div class="team">
      <canvas id="team-data"></canvas>
    </div> -->

    <div class="staff_chart">
      <div class="staff" :style="staffStyle"></div>
      <div class="staff" :style="staffStyle"></div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import projectData from '../../../../js/project-data'
import teamData from '../../../../js/team-data'

export default {
  data() {
    return {
      projectData: projectData,
      teamData: teamData,
      staffData: [
        {color: "#925e5e", value: 30},
        {color: "#a09b54", value: 40},
        {color: "#252121", value: 30}
      ]
    }
  },
  computed:{
    staffStyle(){
      let sum = 0;
      let styles = this.staffData.map(
        staffPart => `${staffPart.color} 0 ${sum += staffPart.value}%`
      );
      return {background: 'conic-gradient('+ styles.join(",") +')'}
    }
  },
  mounted() {
    const st = document.getElementById('project-data');
    new Chart(st, this.projectData);

    const tt = document.getElementById('team-data');
    new Chart(tt, this.teamData);
    this.checkLogin()
  },
  methods:{
    checkLogin(){
      this.$store.dispatch('checkLogin')
    },
  }
}
</script>

<style scoped>
  .project{
    padding: 30px;
    text-align: center;
    width: 100%;
  }
  .project_chart{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .project_chart_flex{
    width: 80%;
  }
  .staff{
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
  .staff_chart{
    display: flex;
    justify-content: space-around;
  }
</style>