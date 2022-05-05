function temp_range() {
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/temp/minmax';
    fetch(url, {
        credentials: "include",
        credentials: 'same-origin'
    })

        .then(function (resp) { 
          return resp.json() })
        .then(function (rData) {
                var data_a = rData;
                console.log(rData);    

            var rangeChart = Highcharts.chart('range', {

                chart: {
                    type: "columnrange",
                    color: {
                        //linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        linearGradient: [0, 0, 0, 0],
                        stops: [
                            [0, 'rgb(213, 62, 79)'],
                            [0.1, 'rgb(244, 109, 67)'],
                            [0.15, 'rgb(253,174,97)'],
                            [0.2, 'rgb(254,224,139)'],
                            [0.25, 'rgb(255, 255, 191)'],
                            [0.3, 'rgb(230, 245, 152)'],
                            [0.4, 'rgb(171, 221, 164)'],
                            [0.45, 'rgb(102, 194, 165)'],
                            [1, 'rgb(50, 136, 189)']
                        ]
                    },
    
                    title: {
                        text: 'Temperature Range',
                        style: {
                            color: '#fff',
                            fontWeight: 'bold',
    
                        }
                    },
                    subtitle: {
                        text: 'Temp Range Over The Year',
                        style: {
                            color: '#fff'
    
                        }
                    } ,
                },

                xAxis: {
                    type: "datetime",
                    tickInterval: 2592000000,
                    labels: {
                      format: "{value: %b}"
                    }
                  },

                  credits: {
                    enabled: false
                  },
                  exporting: {
                    enabled: false
                  },
                  plotOptions: {
                    series: {
                      turboThreshold: 0,
                      showInLegend: false
                    }
                  },
                  chart: {
                    type: "columnrange"
                  },
                  tooltip: {
                    useHTML: true,
                    headerFormat: "<small>{point.x:%d %B, %Y}</small>",
                    pointFormat: "<table>\n  <tr>\n    <th>low</th>\n    <td>{point.low}</td>\n  </tr>\n  <tr>\n    <th>high</th>\n    <td>{point.high}</td>\n  </tr>\n</table>"
                  },
                  xAxis: {
                    type: "datetime",
                    tickInterval: 2592000000,
                    labels: {
                      format: "{value: %b}"
                    }
                  },
                  series: data_a
            });




        })
    };