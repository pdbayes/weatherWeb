/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-dupe-keys */
/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
function getData(path) {
  if (path == 'range') {
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/temp/minmax';
  } else {
    var url = `https://weathernode.tregrillfarmcottages.co.uk/${path}`;
  }
  fetch(url, {
    credentials: 'include',
    credentials: 'same-origin',
  })

    .then((resp) => resp.json())
    .then((data) => {
      var meas_name = '';
      if (path === 'temp/7d') {
        var meas_name = 'Temperature';
      } else if (path === 'humidity') {
        var meas_name = 'Humidity';
      } else {
        var meas_name = 'error';
      }
      // console.log(path);
      return data;
    })
    .then((data) => {
      const data_a = data.map((e) => {
        console.log(path);
        if (path === 'rain') {
          return [Date.parse(e.time), e.sum];
        } if (path === 'wind') {
          return [Date.parse(e.time), e.mean, e.max];
        }
        if (path === 'temp/7d') {
          return [Date.parse(e.time), e.mean, e.mean_1];
        }
        if (path === 'range') {
          return [Date.parse(e.time), e.max, e.min];
        }
        return [Date.parse(e.time), e.mean];
      });

      // var current = data_a[data_a.len - 1][1];
      // console.log('current' + current);
      var meas_name = '';
      let legend = false;
      let chartType = 'spline';
      let chartType_b = 'column';
      const div_name = path;
      const invert = false;
      let polar = false;
      if (path === 'temp/7d') {
        var data_b = [];
        for (let i = 0; i < data_a.length; i++) {
          data_b.push([data_a[i][0], data_a[i][2]]);
        }
        legend = {
          align: 'bottom',
          verticalAlign: 'top',
          layout: 'horizontal',
          itemStyle: {
            color: '#fff',
            fontWeight: 'light',
          },
        };
        var meas_name = 'Temperature';
        var unit = '°C';
        var minScale = -10;
        var maxScale = 30;
        var stopCols = [
          [0, 'rgb(255, 0, 0)'],
          [0.3, 'rgb(255, 80, 0'],
          [0.5, 'rgb(255, 165, 0'],
          [0.7, 'rgb(0, 255, 0)'],
          [1, 'rgb(0, 0, 255)'],
        ];
      } else if (path === 'humidity') {
        var meas_name = 'Humidity';
        var unit = '%';
        var minScale = 0;
        var maxScale = 100;
        var stopCols = [
          [0.00, 'rgba(0,175,255,0.9)'],
          [1.00, 'rgba(0,175,255,0.4)'],
        ];
      } else if (path === 'pressure') {
        var meas_name = 'Pressure HPA';
        var unit = 'hpa';
        var minScale = 950;
        var maxScale = 1050;
        var stopCols = [
          [0.00, 'rgba(0,255,0,1)'],
          [0.4, 'rgba(252,232,3,1)'],
          [0.45, 'rgba(252,232,3,1'],
          [1.00, 'rgba(255,0,0,1)'],
        ];
      } else if (path === 'rain') {
        var meas_name = 'Rain';
        var unit = 'mm';
        var minScale = 0;
        var maxScale = 10;
        chartType = 'column';
        chartType_b = 'spline';
        var stopCols = [
          [0.00, 'blue'],
          [1.00, 'blue'],
        ];
      } else if (path === 'wind') {
        var data_b = [];
        for (let i = 0; i < data_a.length; i++) {
          data_b.push([data_a[i][0], data_a[i][2]]);
        }
        legend = {
          align: 'bottom',
          verticalAlign: 'top',
          layout: 'horizontal',
          itemStyle: {
            color: '#fff',
            fontWeight: 'bold',
          },
        };
        var meas_name = 'windspeed';
        var unit = 'mph';
        var minScale = 0;
        var maxScale = null;
        var stopCols = [
          [0, 'rgb(213, 62, 79)'],
          [0.1, 'rgb(244, 109, 67)'],
          [0.15, 'rgb(253,174,97)'],
          [0.2, 'rgb(254,224,139)'],
          [0.25, 'rgb(255, 255, 191)'],
          [0.3, 'rgb(230, 245, 152)'],
          [0.4, 'rgb(171, 221, 164)'],
          [0.45, 'rgb(102, 194, 165)'],
          [1, 'rgb(50, 136, 189)'],
        ];
      } else if (path === 'range') {
        var data_b = [];
        polar = true;
        legend = {
          align: 'bottom',
          verticalAlign: 'top',
          layout: 'horizontal',
          itemStyle: {
            color: '#fff',
            fontWeight: 'bold',
          },
        };
        var meas_name = 'yearly_temp_range';
        chartType = 'columnrange';
        var unit = '°C';
        var minScale = -5;
        var maxScale = 40;
        var stopCols = [
          [0, 'rgb(213, 62, 79)'],
          [0.1, 'rgb(244, 109, 67)'],
          [0.15, 'rgb(253,174,97)'],
          [0.2, 'rgb(254,224,139)'],
          [0.25, 'rgb(255, 255, 191)'],
          [0.3, 'rgb(230, 245, 152)'],
          [0.4, 'rgb(171, 221, 164)'],
          [0.45, 'rgb(102, 194, 165)'],
          [1, 'rgb(50, 136, 189)'],
        ];
      } else {
        var meas_name = 'error';
      }

      const chart_id = `${path}ChartId`;
      let series_opt = {
        type: chartType,
        polar: false,
        // name: meas_name,
        data: data_a,
        color: {
          // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          linearGradient: [0, 0, 0, 0],
          stops: stopCols,
        },
      };
      let series_opt_b = {
        type: chartType,
        // name: meas_name,
        data: [],
      };
      if (path === 'wind') {
        series_opt = {
          type: chartType,
          name: 'Ave',
          // name: meas_name,
          data: data_a,
          color: {
            // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            linearGradient: [0, 0, 0, 0],
            stops: stopCols,
          },
        };
        series_opt_b = {
          type: chartType,
          name: 'Gust',
          // name: meas_name,
          data: data_b,
          color: {
            // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            linearGradient: [0, 0, 0, 0],
            stops: stopCols,
          },
        };
      }
      if (path === 'temp/7d') {
        series_opt = {
          type: chartType,
          name: 'Station',
          // name: meas_name,
          data: data_a,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            // linearGradient: [0, 0, 0, 0],
            stops: stopCols,
          },
        };
        series_opt_b = {
          type: chartType,
          name: 'Porch',
          // name: meas_name,
          data: data_b,
          color: {
            // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            linearGradient: [0, 0, 0, 0],
            stops: stopCols,
          },
        };
      }
      if (path === 'range') {
        series_opt = {
          type: chartType,
          name: 'Min',
          // name: meas_name,
          data: data_a,
          color: {
            // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            linearGradient: [0, 0, 0, 0],
            stops: stopCols,
          },
        };
        console.log(`range: ${data_a}`);
        series_opt_b = {
          type: chartType,
          // name: meas_name,
          data: [],
        };
      }

      const chart = Highcharts.chart(div_name, {

        chart: {
          events: {
            load() {
              const chart = this;
              const extremes = chart.plotBox.y;
              const yMin = chart.plotBox.y;
              const yMax = chart.plotBox.y + chart.plotBox.height;

              chart.series[0].update({
                color: {
                  // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                  linearGradient: [0, yMin, 0, yMax],
                  stops: stopCols,
                },
              });
            },
          },
          type: chartType,
          borderWidth: 1,
          zoomType: 'x',
          polar,

        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: [{
                text: 'Original',
                onclick() {
                  chart.update({
                    chart: {
                      inverted: false,
                      polar: false,
                    },
                  });
                  chart.series[0].update({
                    type: chartType,
                  });
                  chart.series[1].update({
                    type: chartType,
                  });
                },
              }, {
                text: 'Bar',
                onclick() {
                  chart.update({
                    chart: {
                      inverted: false,
                      polar: false,
                      type: chartType_b,
                    },
                  });
                  chart.series[0].update({
                    type: chartType_b,

                  });
                  chart.series[1].update({
                    type: chartType_b,

                  });
                },
              }, {
                text: 'Polar',
                onclick() {
                  chart.update({
                    chart: {
                      inverted: false,
                      polar: true,
                    },
                  });
                },
              }],
            },
          },
        },
        legend,

        margin: [0, 0, 0, 0],

        title: {
          text: meas_name,
          style: {
            color: '#fff',
            fontWeight: 'bold',

          },
        },
        subtitle: {
          text: `Current ${meas_name} is ${data_a[data_a.length - 1][1].toFixed(2)}${unit}`,
        },
        xAxis: {
          type: 'datetime',
          gridLineColor: '#666666',
          gridLineWidth: 0.5,
          labels: {
            style: {
              color: '#f9f9f9',
            },
          },
        },
        yAxis: {
          labels: {
            format: `{value}${unit}`,
            align: 'left',
            x: 0,
            y: -2,
            style: {
              color: '#f9f9f9',
            },
          },
          lineWidth: 1,
          min: minScale,
          max: maxScale,
          gridLineColor: '#666666',
          gridLineWidth: 0.5,
          title: {
            text: null,
          },
        },
        tooltip: {

          pointFormat: `{point.y} ${unit}`,
        },
        plotOptions: {

          series: {

            threshold: minScale,
            connectNulls: true,
          },

        },
        credits: {
          enabled: false,
        },

        series: [series_opt, series_opt_b],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500,
            },
            // Make the labels less space demanding on mobile
            chartOptions: {
              xAxis: {
                type: 'datetime',
                gridLineColor: '#666666',
                gridLineWidth: 0.5,
                labels: {
                  style: {
                    color: '#f9f9f9',
                  },
                },
              },
              yAxis: {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -2,
                },
                title: {
                  text: null,
                  style: {
                    color: '#f9f9f9',
                  },
                },
                lineWidth: 1,
                min: minScale,
                max: maxScale,
                gridLineColor: '#666666',
                gridLineWidth: 0.5,
                title: {
                  text: null,
                },
              },
            },
          }, {
            condition: {
              minWidth: 501,
            },
            chartOptions: {
              xAxis: [{
                id: '0',

                type: 'datetime',
                gridLineColor: '#666666',
                gridLineWidth: 0.5,
                labels: {
                  style: {
                    color: '#f9f9f9',
                  },
                },
              }, {
                id: '1',
                type: 'datetime',
                visible: false,
                linkedTo: '0',
              }],
              yAxis: {
                labels: {
                  align: 'right',
                  x: -15,
                  y: 0,
                  style: {
                    color: '#f9f9f9',
                  },
                },
                title: {
                  text: null,
                },
                lineWidth: 1,
                min: minScale,
                max: maxScale,
                gridLineColor: '#666666',
                gridLineWidth: 0.5,
                title: {
                  text: null,
                },
              },
            },
          }],
        },
      });
    })
    .catch(() => {
      // catch any errors
    });
}
