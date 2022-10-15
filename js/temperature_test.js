/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
function temperature() {
  const temp_chart = Highcharts.chart('temperature', {
    chart: {
      type: 'gauge',
      plotBackgroundColor: 'transparent',
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },

    title: {
      text: 'Temperature',
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
      min: -10,
      max: 35,

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
        text: '°C',
      },
      plotBands: [{
        from: -10,
        to: 0,
        color: 'rgb(50, 136, 189)', // green
      }, {
        from: 0,
        to: 5,
        color: 'rgb(102, 194, 165)', // yellow
      }, {
        from: 5,
        to: 10,
        color: 'rgb(171, 221, 164)', // red
      }, {
        from: 10,
        to: 15,
        color: 'rgb(230, 245, 152)', // red
      }, {
        from: 15,
        to: 20,
        color: 'rgb(255, 255, 191)', // red
      }, {
        from: 20,
        to: 25,
        color: 'rgb(254,224,139)', // red
      }, {
        from: 25,
        to: 30,
        color: 'rgb(253,174,97)', // red
      }, {
        from: 30,
        to: 35,
        color: 'rgb(244, 109, 67)', // red
      },
      ],
    },

    series: [{
      name: 'Speed',
      data: [0],
      tooltip: {
        valueSuffix: '°C',
      },
    }],

  }, (chart) => {
    const url = 'https://weathernode.tregrillfarmcottages.co.uk/test/current';
    fetch(url, {
      credentials: 'include',
      credentials: 'same-origin',
    })

      .then((resp) => resp.json())
      .then((data) => {
        const speed = data.map((e) => e.temperatureInC);
        const speed_point = chart.series[0].points[0];
        let speedVal;
        speedVal = speed;
        console.log(speedVal);
        speed_point.update(speedVal);
        return chart;
      })
      .then((chart) => {
        if (!chart.renderer.forExport) {
          setInterval(() => {
            const url = 'https://weathernode.tregrillfarmcottages.co.uk/test';
            fetch(url, {
              credentials: 'include',
              credentials: 'same-origin',
            })

              .then((resp) => resp.json())
              .then((data) => {
                const speed = data.map((e) => e.temperatureInC);
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
  });
}
