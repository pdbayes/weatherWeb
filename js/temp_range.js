/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-var */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
function temp_range() {
  var url = 'https://weathernode.tregrillfarmcottages.co.uk/temp/minmax';
  fetch(url, {
    credentials: 'include',
    credentials: 'same-origin',
  })

    .then((resp) => resp.json())
    .then((rData) => {
      console.log(rData)
      var data_a = rData.map((e) => {
        //console.log(col);
        return [Date.parse(e.time), e.max, e.min];
      });
      console.log(data_a);
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
      const chart = Highcharts.chart('range2', {
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
        chart: {
          type: 'arearange',
          zoomType: 'x',
          polar: false,
          borderWidth: 1
      },

        title: {
          text: 'Temperature Range',
          style: {
            color: '#fff',
            fontWeight: 'bold',

          },
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            showInLegend: false

          },
        },
        tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.x:%d %B, %Y}</small>',
          pointFormat: '<table>\n  <tr>\n    <th>low</th>\n    <td>{point.low}</td>\n  </tr>\n  <tr>\n    <th>high</th>\n    <td>{point.high}</td>\n  </tr>\n</table>',
        },

        xAxis: {
          gridLineWidth: 0.5,
          type: 'datetime',
          tickInterval: 2592000000,
          labels: {
            format: '{value: %b}',
          },
        },
        yAxis: {
          max: 40,
          min: -5,
          showFirstLabel: false,
          tickPositions: [0, 5, 10, 20, 25, 30, 35],
        },
       
        series:[{
          name: 'Temperatures',
          data: data_a

        }],
      });
      rData=[]
    });
}
