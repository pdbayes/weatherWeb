/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
function setWeatherIcon(data) {
  const iconCode = (getWeather(data).icon);
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  console.log(iconUrl);
  const image = document.getElementById('weather_icon');
  image.src = iconUrl;
}

// set the temp
function setTemp(data) {
  const { temp } = getCurrent(data);
  const c = celcius(temp);
  const condition = getWeather(data).description;
  document.getElementById('temp').innerHTML = `The current temperature in the Tregrill Farm area is ${c}&deg;C with ${condition}`;
}

// convert to celcius
function celcius(temp) {
  const c = Math.round(parseFloat(temp) - 273.15);
  return c;
}

function getCurrent(data) {
  return data.current;
}

function getWeather(data) {
  return data.current.weather[0];
}

function getHours(dt) {
  const date = new Date(dt * 1000);
  // Hours part from the timestamp
  const wDay = date.toLocaleString('en-UK', { weekday: 'short' });
  const hour = date.toLocaleString('en-UK', { hour: 'numeric', hour12: true });
  return `${wDay} ${hour}`;
}

// var times = hourly.map(function (e) {
// return getHours(e.dt);
// });
function plotlyJS(hourly, path) {
  switch (path) {
    case 'temp':
      var data = hourly.map((e) => [e.dt * 1000, celcius(e.temp)]);
      break;
    case 'humidity':
      var data = hourly.map((e) => [e.dt * 1000, e.humidity]);
      break;
    case 'pressure':
      var data = hourly.map((e) => [e.dt * 1000, e.pressure]);
      break;
    case 'rain':
      var data = hourly.map((e) => [e.dt * 1000, e.pop * 100]);
      break;
    case 'cloud':
      var data = hourly.map((e) => [e.dt * 1000, e.clouds]);
      break;
    case 'uv':
      var data = hourly.map((e) => [e.dt * 1000, e.uvi]);
  }
  console.log(data);
  return data;
}

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=50.443530&lon=-4.420760&appid=69f05690d85433a9107bc01157de0267';
function getForecast(path) {
  fetch(url, {
    credentials: 'include',
    credentials: 'same-origin',
  })

    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.daily[0].uvi);
      var meas_name = '';
      if (path === 'temp') {
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
      const { hourly } = data;
      const data_a = plotlyJS(hourly, path);

      // var current = data_a[data_a.len - 1][1];
      // console.log('current' + current);
      var meas_name = '';
      let bands = null;
      let tickInt = null;
      if (path === 'temp') {
        var meas_name = 'Temperature';
        var unit = '°C';
        var minScale = -10;
        var maxScale = 30;
        var chartType = 'spline';
        // eslint-disable-next-line vars-on-top
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
      } else if (path === 'humidity') {
        var meas_name = 'Humidity';
        var unit = '%';
        var minScale = 0;
        var maxScale = 100;
        var chartType = 'spline';
        var stopCols = [
          [0.00, 'rgba(0,175,255,0.9)'],
          [1.00, 'rgba(0,175,255,0.4)'],
        ];
      } else if (path === 'cloud') {
        var meas_name = 'Cloud Cover';
        var unit = '%';
        var minScale = 0;
        var maxScale = null;
        var chartType = 'spline';
        var stopCols = [
          [0.00, 'rgba(0,175,255,0.9)'],
          [1.00, 'rgba(0,175,255,0.4)'],
        ];
      } else if (path === 'pressure') {
        var meas_name = 'Pressure HPA';
        var unit = 'hpa';
        var minScale = 950;
        var maxScale = 1050;
        var chartType = 'spline';
        var stopCols = [
          [0.00, 'rgba(0,255,0,1)'],
          [0.4, 'rgba(252,232,3,1)'],
          [0.45, 'rgba(252,232,3,1'],
          [1.00, 'rgba(255,0,0,1)'],
        ];
      } else if (path === 'rain') {
        var meas_name = 'Probability of Rain';
        var unit = '%';
        var minScale = 0;
        var maxScale = null;
        var chartType = 'column';
        var stopCols = [
          [0.00, 'blue'],
          [1.00, 'blue'],
        ];
      } else if (path === 'uv') {
        var meas_name = 'UV Index';
        var unit = '';
        var minScale = 0;
        var maxScale = 11;
        var chartType = 'spline';
        var stopCols = [
          [0, 'rgb(255,255,255)'],
          [1, 'rgb(255,255,255)'],
        ];
        bands = [{ // Low
          from: 0,
          to: 3,
          color: 'rgba(0,128,0,0.3',
          label: {
            text: 'Low',
            style: {
              color: 'white',
            },
          },
        }, { // Light breeze
          from: 3,
          to: 6,
          color: 'rgba(255,255,0,0.3',
          label: {
            text: 'Moderate',
            style: {
              color: 'white',
            },
          },
        }, { // Gentle breeze
          from: 6,
          to: 8,
          color: 'rgba(255,127,0,0.3',
          label: {
            text: 'High',
            style: {
              color: 'white',
            },
          },
        }, { // Moderate breeze
          from: 8,
          to: 10,
          color: 'rgba(255,0,0,0.3)',
          label: {
            text: 'Very High',
            style: {
              color: 'white',
            },
          },
        }, { // Fresh breeze
          from: 10,
          to: 12,
          color: 'rgba(238,130,238,0.3)',
          label: {
            text: 'Extreme',
            style: {
              color: 'white',
            },
          },
        }];
        tickInt = 1;
      } else {
        var meas_name = 'error';
      }
      var div_name = path;

      Highcharts.chart(div_name, {
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

        },

        margin: [0, 0, 0, 0],

        title: {
          text: meas_name,
          style: {
            color: '#fff',
            fontWeight: 'bold',

          },
        },
        subtitle: {
          text: 'Next 48 Hours',
          style: {
            color: '#fff',

          },

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
          plotBands: bands,

        },
        legend: {
          enabled: false,
        },
        tooltip: {

          pointFormat: '{point.y}°C',
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

        series: [{
          type: chartType,
          // name: meas_name,
          data: data_a,
          color: {
            // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            linearGradient: [0, 0, 0, 0],
            stops: stopCols,
          },
          marker: {
            enabled: false,
          },
        }],
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
                  align: 'right',
                  x: -15,
                  y: 0,
                  style: {
                    color: '#f9f9f9',
                  },
                },
                tickInterval: tickInt,
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
