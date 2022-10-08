export const OptionsChart = {
  Top: {
    maintainAspectRatio: false,
    barThickness: 20,
    scales: {
      xAxes: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      yAxes: {
        display: false,

        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    datalabels: {
      display: true,
    },
    responsive: true,
    layouts: {
      padding: 20,
    },
    tooltip: {
      position: "average",
    },
    plugins: {
      legend: {
        //label of chart
        position: "bottom",
        display: false, //display label of chart
        labels: {
          color: "yellow",
        },
      },
      title: {
        display: true,
      },

      subtitle: {
        display: true,
      },
    },
  },
  Middle: {
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      yAxes: {
        display: true,

        grid: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
    },
    datalabels: {
      display: true,
    },
    responsive: true,
    layouts: {
      padding: 20,
    },
    tooltip: {
      position: "average",
    },
    plugins: {
      legend: {
        //label of chart
        position: "bottom",
        display: false, //display label of chart
        labels: {
          color: "yellow",
        },
      },
      title: {
        display: true,
      },

      subtitle: {
        display: true,
      },
    },
  },
  Bottom: {
    barThickness: 20,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            display: true,
          },
        },
      ],
      yAxes: {
        display: true,

        grid: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
    },
    datalabels: {
      display: true,
    },
    responsive: true,
    layouts: {
      padding: 20,
    },
    tooltip: {
      position: "average",
    },
    plugins: {
      legend: {
        //label of chart
        position: "bottom",
        display: false, //display label of chart
        labels: {
          color: "yellow",
        },
      },
      title: {
        display: true,
      },

      subtitle: {
        display: true,
      },
    },
  },
};
