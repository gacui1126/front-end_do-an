export const myChart = {
  type: 'line',
  data: {
      labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 8", "tháng 9","tháng 10","tháng 11","tháng 12"],
      datasets: [{
        label: "Dự án đã nhận",
        data: [5, 3, 1, 2, 8, 3, 6, 3, 6, 7, 1],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      },
      {
        label: "Dự án đã hoàn thành",
        data: [2, 3, 4, 1, 6, 4, 6, 4, 8, 2, 5],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
} 
export default myChart;