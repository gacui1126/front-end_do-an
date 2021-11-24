export const teamData = {
  type: "bar",
  data: {
    labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 8", "tháng 9","tháng 10","tháng 11","tháng 12"],
    datasets: [
      {
        label: "Number of Moons",
        data: [0, 0, 1, 2, 79, 82, 27, 14],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      },
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
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
            padding: 25
          }
        }
      ]
    }
  }
};

export default teamData;