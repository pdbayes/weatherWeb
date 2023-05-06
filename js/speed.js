/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
function speed() {
  const speed_chart = Highcharts.chart(
    'speed',
    {
      chart: {
        type: 'gauge',
        plotBackgroundColor: 'transparent',
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },

      title: {
        text: 'Wind Speed',
        style: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 15,

        },
      },
      exporting: {
        enabled: false,
      },
      credits: false,

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: {
              x1: 0, y1: 0, x2: 0, y2: 1,
            },
            stops: [
              [0, '#FFF'],
              [1, '#333'],
            ],
          },
          borderWidth: 0,
          outerRadius: '109%',
        }, {
          backgroundColor: {
            linearGradient: {
              x1: 0, y1: 0, x2: 0, y2: 1,
            },
            stops: [
              [0, '#333'],
              [1, '#FFF'],
            ],
          },
          borderWidth: 1,
          outerRadius: '107%',
        }, {
        // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%',
        }],
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: 'MPH',
        },
        plotBands: [{
          from: 0,
          to: 40,
          color: '#55BF3B', // green
        }, {
          from: 40,
          to: 70,
          color: '#DDDF0D', // yellow
        }, {
          from: 70,
          to: 100,
          color: '#DF5353', // red
        }],
      },

      series: [{
        name: 'Speed',
        data: [0],
        tooltip: {
          valueSuffix: ' mph',
        },
      }],

    },
    (chart) => {
      const url = 'https://weathernode.tregrillfarmcottages.co.uk/wind/currentSpeed';
      fetch(url, {
        credentials: 'include',
        credentials: 'same-origin',
      })

        .then((resp) => resp.json())
        .then((data) => {
          var speed = data.map((e) => e.Speed);
          var speed_point = chart.series[0].points[0];
          var speedVal;
          speedVal = speed;
          console.log(speedVal);
          speed_point.update(speedVal);
          return chart;
        })
        .then((chart) => {
          if (!chart.renderer.forExport) {
            setInterval(() => {
              const url = 'https://weathernode.tregrillfarmcottages.co.uk/wind/currentSpeed';
              fetch(url, {
                credentials: 'include',
                credentials: 'same-origin',
              })

                .then((resp) => resp.json())
                .then((data) => {
                  var speed = data.map((e) => e.Speed);
                  var speed_point = chart.series[0].points[0];
                   var speedVal;
                  speedVal = speed;
                  console.log(speedVal);
                  speed_point.update(speedVal);
                });
            }, 10000);
          }
        });
    },
  );
}
