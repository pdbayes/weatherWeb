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

      const chart = Highcharts.chart('range2', {

        chart: {
          type: 'arearange',
          zoomType: 'x'
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
        exporting: {
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
          data: data_a,

          color: {
            linearGradient: { cx: 0, cy: 0.5, r: 1 },
            stops: [
              [0, 'blue'],
              [1, 'red'],
            ],
          },

        }],
      });
      rData=[]
    });
}
