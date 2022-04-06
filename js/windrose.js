function windrose() {
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/wind/rose';
    fetch(url, {
        credentials: "include",
        credentials: 'same-origin'
    })

        .then(function (resp) { return resp.json() })
        .then(function (jData) {
            function dir_arr(min, max, gust = 'mean') {
                if (gust == 'mean') {
                    var max_dat = (jData.filter(function (item) {
                        return item.mean <= max;
                    }));
                    var min_dat = (jData.filter(function (item) {
                        return item.mean > min;
                    }));
                }
                else {
                    var max_dat = (jData.filter(function (item) {
                        return item.max <= max;
                    }));
                    var min_dat = (jData.filter(function (item) {
                        return item.max > min;
                    }));
                }
                var array = new Array(16).fill(0);
                if (gust == 'mean') {
                    var data_a = min_dat.map(function (e) {
                        return [e.mode, e.mean];
                    })
                }
                else {
                    var data_a = min_dat.map(function (e) {
                        return [e.mode, e.max];
                    })
                }
                for (const x of data_a) {
                    array[x[0]] += 1;
                }
                return array;
            };
            var a = dir_arr(0, 2);
            //console.log('a = ' + a);
            var b = dir_arr(3, 5);
            //console.log('b = ' + b);
            var c = dir_arr(6, 10);
            //console.log('c = ' + c);
            var d = dir_arr(11, 20);
            // console.log('d = ' + d);
            var e = dir_arr(21, 30);
            //console.log('e = ' + e);
            var f = dir_arr(31, 40);
            var g = dir_arr(41, 50);
            var h = dir_arr(51, 60);
            var i = dir_arr(61, 70);
            var j = dir_arr(71, 100);

            var chartBench = Highcharts.chart('windrose', {
                exporting: {
                    buttons: {
                      contextButton: {
                        menuItems: [{
                          text: 'Average',
                          onclick: function() {
                                                //chartBench.series[0].setData([110, 100, 120, 130]);
                    var a = dir_arr(0, 2);
                    //console.log('a = ' + a);
                    var b = dir_arr(3, 5);
                    //console.log('b = ' + b);
                    var c = dir_arr(6, 10);
                    //console.log('c = ' + c);
                    var d = dir_arr(11, 20);
                    // console.log('d = ' + d);
                    var e = dir_arr(21, 30);
                    //console.log('e = ' + e);
                    var f = dir_arr(31, 40);
                    var g = dir_arr(41, 50);
                    var h = dir_arr(51, 60);
                    var i = dir_arr(61, 70);
                    var j = dir_arr(71, 100);
                    chartBench.series[0].update({
                        data: a
                    });
                    chartBench.series[1].update({
                        data: b
                    });
                    chartBench.series[2].update({
                        data: c
                    });
                    chartBench.series[3].update({
                        data: d
                    });
                    chartBench.series[4].update({
                        data: e
                    });
                    chartBench.series[5].update({
                        data: f
                    });
                    chartBench.series[6].update({
                        data: g
                    });
                    chartBench.series[7].update({
                        data: h
                    });
                    chartBench.series[8].update({
                        data: i
                    });
                    chartBench.series[9].update({
                        data: j
                    });

                    chartBench.redraw();
                          }
                        }, {
                          text: 'Gusts',
                          onclick: function() {
                            var a = dir_arr(0, 2, 'gust');
                            //console.log('a = ' + a);
                            var b = dir_arr(3, 5, 'gust');
                            //console.log('b = ' + b);
                            var c = dir_arr(6, 10, 'gust');
                            //console.log('c = ' + c);
                            var d = dir_arr(11, 20, 'gust');
                            // console.log('d = ' + d);
                            var e = dir_arr(21, 30, 'gust');
                            //console.log('e = ' + e);
                            var f = dir_arr(31, 40, 'gust');
                            var g = dir_arr(41, 50, 'gust') ;
                            var h = dir_arr(51, 60, 'gust');
                            var i = dir_arr(61, 70, 'gust');
                            var j = dir_arr(71, 100, 'gust');
        
                            chartBench.series[0].update({
                                data: a
                            });
                            chartBench.series[1].update({
                                data: b
                            });
                            chartBench.series[2].update({
                                data: c
                            });
                            chartBench.series[3].update({
                                data: d
                            });
                            chartBench.series[4].update({
                                data: e
                            });
                            chartBench.series[5].update({
                                data: f
                            });
                            chartBench.series[6].update({
                                data: g
                            });
                            chartBench.series[7].update({
                                data: h
                            });
                            chartBench.series[8].update({
                                data: i
                            });
                            chartBench.series[9].update({
                                data: j
                            });
                            chartBench.redraw(); // redraw only after add all series
                          }
                        }]
                      }
                    }
                  },
                series: [
                    {
                        name: '0-2 mph',
                        data: a
                    },
                    {
                        name: '3-5 mph',
                        data: b
                    },
                    {
                        name: '6-10 mph',
                        data: c
                    },
                    {
                        name: '11-20 mph',
                        data: d
                    },
                    {
                        name: '21-30 mph',
                        data: e
                    },
                    {
                        name: '31-40 mph',
                        data: f
                    },
                    {
                        name: '41-50 mph',
                        data: g
                    },
                    {
                        name: '51-60 mph',
                        data: h
                    },
                    {
                        name: '61-70 mph',
                        data: i
                    },
                    {
                        name: '71-100 mph',
                        data: j
                    }
                ],

                chart: {
                    polar: true,
                    type: 'column',
                    borderWidth: 1
                },

                title: {
                    text: 'Wind rose',
                    style: {
                        color: '#fff',
                        fontWeight: 'bold',

                    }
                },
                subtitle: {
                    text: 'Change between ave and gusts using the menu',
                    style: {
                        color: '#fff'

                    }
                } ,

                pane: {
                    size: '90%'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 100,
                    layout: 'vertical'
                },

                xAxis: {
                    tickmarkPlacement: 'on',
                    categories: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
                },

                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    title: {
                        text: 'Frequency (%)'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        }
                    },
                    reversedStacks: false
                },

                tooltip: {
                    valueSuffix: '%'
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                        shadow: false,
                        groupPadding: 0,
                        pointPlacement: 'on'
                    }
                }
            });




        });
}