$(function () {
    $('#container').highcharts(
        {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: true,
            },

            title: {
                text: 'Kompas',
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
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
                        borderWidth: 1,
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
                    lineColor: '#',
                    offset: -0,
                    tickInterval: 50,
                    tickWidth: 4,
                    tickPosition: 'outside',
                    tickLength: 10,
                    tickColor: '#333',
                    minorTickInterval: 10,
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
                    categories: ['Rain', 'Change', 'Sunny'],
                    min: 0,
                    max: 3,
                    lineColor: '#ddd',
                    offset: -40,
                    tickInterval: 1,
                    tickWidth: 0,
                    tickPosition: 'outside',
                    tickLength: 30, // =50-10
                    tickColor: '#ddd',
                    minorTickInterval: 1,
                    minorTickWidth: 1,
                    minorTickLength: 5,
                    minorTickPosition: 'inside',
                    minorTickColor: '#0f0',
                    labels: {
                        step: 1,
                        distance: 1,
                        rotation: 'auto',
                    },
                    endOnTick: false,
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
                    max: 6,
                    lineColor: '#ddd',
                    offset: -40,
                    tickInterval: 90,
                    tickWidth: 5,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#ddd',
                    minorTickWidth: 4,
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
        // Add some life
        function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0];
                    var newVal;
                    var inc = Math.round((Math.random() - 0.5) * 60);
                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 360) {
                        newVal = point.y - inc;
                    }
                    console.log(newVal);
                    point.update(newVal);
                    var point2 = chart.series[1].points[0];
                    point2.update(newVal);
                }, 1000);
            }
        }
    );
});
