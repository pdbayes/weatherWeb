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
      console.log('rdata: ' + rData)
      var range = []
      range=rData.map((e) => {
        //console.log(col);
        return [Date.parse(e.time), e.max, e.min];
      });
      var average = []
      average=rData.map((e) => {
        //console.log(col);
        return [Date.parse(e.time), (e.max + e.min)/2];
      });
     // range.sort(function(a, b){return a - b});
     // average.sort(function(a, b){return a - b});
      
      console.log('ave: ' + average);
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

            chart.load({
              color: {
              // linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                linearGradient: [0, yMin, 0, yMax],
                stops: stopCols,
              },
            });
          },
        },
        chart: {
          type: 'areasplinerange',
          zoomType: 'x',
          polar: false,
          borderWidth: 1
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
          min: -5,
          max: 35,
          gridLineColor: '#666666',
          gridLineWidth: 0.5,
          title: {
            text: null,
          },
        },
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
            showInLegend: true

          },
        },
        tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.x:%d %B, %Y}</small>',
          pointFormat: '<table>\n  <tr>\n    <th>low</th>\n    <td>{point.low}</td>\n  </tr>\n  <tr>\n    <th>high</th>\n    <td>{point.high}</td>\n  </tr>\n</table>',
        },
       
        chart: {
          borderRadius: 10,
          spacingBottom: 30,
          spacingTop: 30,
          spacingLeft: 30,
          spacingRight: 30
        },
      
        series: [{
          name: 'Average',
          data: average,
          type: 'line',
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
          }
        }, {
          name: 'Temperature Range',
          data: range,
          type: 'areasplinerange',
          linewidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[0],
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: false
          }
        }],
      });
      rData=[]
      range=[]
      average=[]
    });
}
