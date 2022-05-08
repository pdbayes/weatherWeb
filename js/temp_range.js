function temp_range() {
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/temp/minmax';
    fetch(url, {
        credentials: "include",
        credentials: 'same-origin'
    })

        .then(function (resp) { 
          return resp.json() })
        .then(function (rData) {
                
                var data_a = rData.map(function (e) {
                  
                  
                      return [Date.parse(e.time), e.max, e.min];
                  
              });
              var stopCols = [
                [0, 'rgb(213, 62, 79)'],
                [0.1, 'rgb(244, 109, 67)'],
                [0.15, 'rgb(253,174,97)'],
                [0.2, 'rgb(254,224,139)'],
                [0.25, 'rgb(255, 255, 191)'],
                [0.3, 'rgb(230, 245, 152)'],
                [0.4, 'rgb(171, 221, 164)'],
                [0.45, 'rgb(102, 194, 165)'],
                [1, 'rgb(50, 136, 189)']
            ];
        

            let chart = Highcharts.chart('range2', {

                chart: {
                    type: "columnrange",
                    polar: true,
                    events: {
                      load: function () {
                          var chart = this;
                          var extremes = chart.plotBox.y;
                          var yMin = chart.plotBox.y;
                          var yMax = chart.plotBox.y + chart.plotBox.height;
                          
                          chart.series[0].update({
                              color: {
                                  //linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                                  linearGradient: [0, yMin, 0, yMax],
                                  stops: stopCols
                              }
                          })
                      }
                  },
                  
                    
    
                    
                },

                title: {
                  text: 'Temperature Range',
                  style: {
                      color: '#fff',
                      fontWeight: 'bold',

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
                      showInLegend: false,
                      turboThreshold: 0,
                      stacking: "normal",
                      
                      
                    }
                  },
                  tooltip: {
                    useHTML: true,
                    headerFormat: "<small>{point.x:%d %B, %Y}</small>",
                    pointFormat: "<table>\n  <tr>\n    <th>low</th>\n    <td>{point.low}</td>\n  </tr>\n  <tr>\n    <th>high</th>\n    <td>{point.high}</td>\n  </tr>\n</table>"
                  },
                  
                  xAxis: {
                    gridLineWidth: 0.5,
      type: "datetime",
      tickInterval: 2592000000,
      labels: {
        format: "{value: %b}"
      }
                  },
                  yAxis:{
                    max: 35,
                    min: -5,
                    showFirstLabel: false,
                    tickPositions: [0, 10, 20, 30],
                  },
                  series:[{
                          data: data_a,
                          color:{
                            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                            stops: [
                                [1, 'rgb(255, 0, 0)'],
                                //[0.8, 'rgb(244, 109, 67)'],
                                //[0.6, 'rgb(253,174,97)'],
                                //[0.5, 'rgb(254,224,139)'],
                                //[0.4, 'rgb(255, 255, 191)'],
                                //[0.3, 'rgb(230, 245, 152)'],
                                //[0.2, 'rgb(171, 221, 164)'],
                                //[0.1, 'rgb(102, 194, 165)'],
                                [0, 'rgb(0, 10, 255)']
                            ]
                        },
                  
                }]
            });




        })
    };