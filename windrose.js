function windrose() {
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/wind/rose';
    fetch(url, {
        credentials: "include",
        credentials: 'same-origin'
    })

        .then(function (resp) { return resp.json() })
        .then(function (jData) {
            function dir_arr(min, max) {
                var max_dat = (jData.filter(function (item) {
                    return item.mean <= max;
                }));
                var min_dat = (jData.filter(function (item) {
                    return item.mean > min;
                }));
                var array = new Array(16).fill(0);
                var data_a = min_dat.map(function (e) {
                    return [e.mode, e.mean];
                })
                for (const x of data_a) {
                    array[x[0]] += 1;
                }
                return array;
            };
            let a = dir_arr(0, 2);
            //console.log('a = ' + a);
            let b = dir_arr(2, 5);
            //console.log('b = ' + b);
            let c = dir_arr(5, 8);
            //console.log('c = ' + c);
            let d = dir_arr(8, 10);
           // console.log('d = ' + d);
            let e = dir_arr(10, 70);
            //console.log('e = ' + e);
            Highcharts.chart('windrose', {
                series: [
                    {
                        name: '0-2 mph',
                        data: a
                    },
                    {
                        name: '2-5 mph',
                        data: b
                    },
                    {
                        name: '5-8 mph',
                        data: c
                    },
                    {
                        name: '8-10 mph',
                        data: d
                    },
                    {
                        name: '10-70 mph',
                        data: e
                    }
                ],

                chart: {
                    polar: true,
                    type: 'column'
                },

                title: {
                    text: 'Wind rose'
                },

                pane: {
                    size: '85%'
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