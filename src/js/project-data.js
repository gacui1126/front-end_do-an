export const projectData = {
  type: "bar",
  data: {
    labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 8", "tháng 9","tháng 10","tháng 11","tháng 12"],
    datasets: [
      {
        label: "Dự án đã nhận",
        data: [10, 20, 1, 2, 79, 82, 27, 14, 27, 14, 27],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      },
      {
        label: "Dự án đã hoàn thành",
        data: [12, 43, 1, 2, 19, 82, 27, 14, 27, 14, 27],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 0
          }
        }
      ]
    }
  }
};

export default projectData;