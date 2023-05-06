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
      function colRange(tempMin, tempMax) {
        var tempC = (tempMin + (tempMax)) / 2;

        mid = 17;
        b = 0;

        if (tempC <= mid) {
          tempC = (tempMin + (tempMax * 2)) / 2;
          // green to yellow
          r = Math.floor(255 * (tempC / mid));
          g = 255;
        } else {
          // yellow to red
          r = 255;
          g = Math.floor(255 * ((mid - (tempC - 1) % mid) / mid));
        }

        return `RGB(${r},${g},${b})`;
      }
      // eslint-disable-next-line vars-on-top
      var data_a = rData.map((e) => {
        //console.log(col);
        return [Date.parse(e.time), e.max, e.min];
      });
      console.log(data_a);

      const chart = Highcharts.chart('range2', {

        chart: {
          type: 'arearange',
          zoomType: 'x',
          scrollablePlotArea: {
              minWidth: 600,
              scrollPositionX: 1
          }
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
            showInLegend: false,
            turboThreshold: 0,
            stacking: 'normal',

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
    });
}
