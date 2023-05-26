/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
function humidity() {
  const hum_chart = Highcharts.chart(
    'humidity',
    {
      chart: {
        type: 'gauge',
        plotBackgroundColor: 'transparent',
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },

      title: {
        text: 'Humidity',
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
          text: '%z',
        },
        plotBands: [{
          from: 0,
          to: 40,
          color: 'rgba(0,0,218,0.2)', // green
        }, {
          from: 40,
          to: 70,
          color: 'rgba(0,0,218,0.5)', // yellow
        }, {
          from: 70,
          to: 100,
          color: 'rgba(0,0,218,1)', // red
        }],
      },

      series: [{
        name: 'Humidity',
        data: [0],
        tooltip: {
          valueSuffix: ' %',
        },
      }],

    },
    (chart) => {
      const url = 'https://weathernode.tregrillfarmcottages.co.uk/humidity/current';
      fetch(url, {
        credentials: 'include',
        credentials: 'same-origin',
      })

        .then((resp) => resp.json())
        .then((data) => {
          const speed = data.map((e) => e.parseInt(humidity).toFixed());
          const speed_point = chart.series[0].points[0];
          let speedVal;
          speedVal = speed;
          // eslint-disable-next-line no-console
          console.log(speedVal);
          speed_point.update(speedVal);
          return chart;
        })
        .then((chart) => {
          if (!chart.renderer.forExport) {
            setInterval(() => {
              const url = 'https://weathernode.tregrillfarmcottages.co.uk/humidity/current';
              fetch(url, {
                credentials: 'include',
                credentials: 'same-origin',
              })

                .then((resp) => resp.json())
                .then((data) => {
                  const speed = data.map((e) => e.humidity.toFixed());
                  const speed_point = chart.series[0].points[0];
                  let speedVal;
                  speedVal = speed;
                  // eslint-disable-next-line no-console
                  console.log(speedVal);
                  speed_point.update(speedVal);
                });
            }, 10000);
          }
        });
    },
  );
}
