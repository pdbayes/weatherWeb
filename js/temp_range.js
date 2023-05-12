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
      let data_a = rData.map((e) => {
        //console.log(col);
        //return [Date.parse(e.time), e.max, e.min];
        return [e.time, e.max, e.min];
      });
      let data_b = rData.map((e) => {
        //console.log(col);
        return [e.time, (e.max + e.min)/2];
      });
      //data_a.sort(function(a, b){return a - b});
      //data_b.sort(function(a, b){return a - b});
      console.log(data_a);
      console.log(data_b);
      let unit = "C"
      const chart = Highcharts.chart('range2', {
        
        chart: {
          
          zoomType: 'x',
          polar: false,
          borderWidth: 1
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
          
        },
        tooltip: {
          pointFormat: `{point.y} ${unit}`
        },
       
        chart: {
          borderWidth: 1
        },
      
        series: [{
          name: 'Average',
          data: data_b,
          type: 'line',
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
          }
        }, {
          name: 'Temperature Range',
          data: data_a,
          type: 'areasplinerange',
          linewidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[0],
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: true
          }
        }],
      });
      rData=[]
      data_a=[]
      data_b=[]
    });
}
