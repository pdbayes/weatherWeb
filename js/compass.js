function compass() {
    let comp_chart = Highcharts.chart(
        'compass',
        {
            chart: {
                type: 'gauge',
                plotBackgroundColor: 'transparent',
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: true,
            },

            title: {
                text: 'Wind Direction',
                style: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15
                },
            },
            exporting: {
                enabled: false,
            },
            credits: false,

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [
                    {
                        borderWidth: 1,
                        outerRadius: '50%',
                    },
                    {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1,
                            },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333'],
                            ],
                        },
                        borderWidth: 4,
                        outerRadius: '110%',
                    },
                    {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1,
                            },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF'],
                            ],
                        },
                        borderWidth: 4,
                        outerRadius: '10%',
                    },
                    {
                        // default background
                    },
                    {
                        backgroundColor: '#DDD',
                        borderWidth: 4,
                        outerRadius: '105%',
                        innerRadius: '100%',
                    },
                ],
            },
            // the value axis
            yAxis: [
                {
                    title: {
                        text: '',
                    },
                    min: 0,
                    max: 360,
                    lineColor: '#333',
                    offset: -10,
                    tickInterval: 20,
                    tickWidth: 2,
                    tickPosition: 'outside',
                    tickLength: 10,
                    tickColor: '#333',
                    minorTickInterval: 5,
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'outside',
                    minorTickColor: '#666',
                    labels: {
                        step: 1,
                        distance: -12,
                        rotation: 'auto',
                    },
                },
                {
                    title: {
                        text: '',
                    },
                    type: 'category',
                    categories: [
                        'N',
                        'NE',
                        'E',
                        'SE',
                        'S',
                        'SW',
                        'W',
                        'NW',
                        'N',
                    ],
                    min: 0,
                    max: 8,
                    lineColor: '#ddd',
                    offset: -50,
                    tickInterval: 1,
                    tickWidth: 1,
                    tickPosition: 'outside',
                    tickLength: 40, // =50-10
                    tickColor: '#ddd',
                    minorTickInterval: 1,
                    minorTickWidth: 0,
                    minorTickLength: 50,
                    minorTickPosition: 'inside',
                    minorTickColor: '#0f0',
                    labels: {
                        step: 1,
                        distance: 2,
                        rotation: 'auto',
                    },
                    endOnTick: true,
                },
                {
                    type: 'number',
                    title: {
                        text: '',
                    },
                    labels: {
                        enabled: false,
                    },
                    min: 0,
                    max: 12,
                    lineColor: '#ddd',
                    offset: -50,
                    tickInterval: 10,
                    tickWidth: 1,
                    tickPosition: 'inside',
                    tickLength: 45,
                    tickColor: '#ddd',
                    minorTickWidth: 0,
                    endOnTick: false,
                },
            ],

            series: [
                {
                    name: 'Kompass',
                    yAxis: 0,
                    data: [0],
                    dial: {
                        radius: '88%',
                        baseWidth: 10,
                        baseLength: '0%',
                        rearLength: 0,
                        borderWidth: 1,
                        borderColor: '#9A0000',
                        backgroundColor: '#CC0000',
                    },
                    tooltip: {
                        valueSuffix: '°',
                    },
                },
                {
                    data: [0],
                    yAxis: 0,
                    dial: {
                        radius: '-88%',
                        baseWidth: 10,
                        baseLength: '0%',
                        rearLength: 0,
                        borderWidth: 1,
                        borderColor: '#1B4684',
                        backgroundColor: '#3465A4',
                    },
                },
            ],
        },

        function (chart) {
            var url =
                'https://weathernode.tregrillfarmcottages.co.uk/wind/current';
            fetch(url, {
                credentials: 'include',
                credentials: 'same-origin',
            })
                .then(function (resp) {
                    return resp.json();
                })
                .then(function (data) {
                    var data_a = data.map(function (e) {
                        return e.quadrant;
                    });
                    var point = chart.series[0].points[0];
                    var newVal;
                    newVal = data_a;
                    console.log(newVal);
                    point.update(newVal);
                    var point2 = chart.series[1].points[0];
                    point2.update(newVal);
                    return chart;
                })
                .then(function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var url =
                                'https://weathernode.tregrillfarmcottages.co.uk/wind/current';
                            fetch(url, {
                                credentials: 'include',
                                credentials: 'same-origin',
                            })
                                .then(function (resp) {
                                    return resp.json();
                                })
                                .then(function (data) {
                                    var data_a = data.map(function (e) {
                                        return e.quadrant;
                                    });
                                    var point = chart.series[0].points[0];
                                    var newVal;
                                    newVal = data_a;
                                    console.log(newVal);
                                    point.update(newVal);
                                    var point2 = chart.series[1].points[0];
                                    point2.update(newVal);
                                });
                        }, 10000);
                    }
                });
        }
    );
}
