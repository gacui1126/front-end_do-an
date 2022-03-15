export const myChart = {
  type: 'line',
  data: {
      labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9","tháng 10","tháng 11","tháng 12"],
      datasets: [{
        label: "Dự án đã nhận",
        data: [],
        backgroundColor: "#e9e40fad",
        borderColor: "#d52937eb",
        borderWidth: 3
      },
      {
        label: "Dự án đã hoàn thành",
        data: [],
        backgroundColor: "#12caf0",
        borderColor: "#12caf0",
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