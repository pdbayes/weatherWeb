


function pressure() {

    let pressure_chart = Highcharts.chart('pressure', {
        
            chart: {
                type: 'gauge',
                //plotBackgroundImage: 'images/baro.png',
                plotBorderWidth: 0,
                plotShadow: false,
            height: 500,
            width:500,
            spacingTop: 15,
            spacingRight: 15,
            spacingBottom: 15,
            spacingLeft: 15,
            },

            title: null,
            credits: {
                enabled: false
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: null
            },
            // the value axis
            yAxis: [
                {
                    title: {
                        text: '',
                    },
                    min: 950,
                    max: 1055,
                    lineColor: '#fff',
                    lineWidth: 0,
                    offset: 0,
                    tickInterval: 0,
                    tickWidth: 0,
                    tickPosition: 'outside',
                    tickLength: 0,
                    tickColor: '#333',
                    minorTickInterval: 0,
                    minorTickWidth: 0,
                    minorTickLength: 0,
                    minorTickPosition: 'outside',
                    minorTickColor: '#666',
                }
                
            ],

            series: [
                
                {
                    name: 'Barometer',
                    dataLabels: {
                        enabled: false
                   },
                    yAxis: 0,
                    data: [950],
                    dial: {
                        radius: '78%',
                        baseWidth: 10,
                        baseLength: '0%',
                        rearLength: 10,
                        borderWidth: 1,
                        borderColor: '#9A0000',
                        backgroundColor: 'gold',
                    },
                    tooltip: {
                        valueSuffix: 'hpa',
                    },
                },
                
            ],
        },

        function (chart) {
            var url = 'https://weathernode.tregrillfarmcottages.co.uk/pressure/current';
            fetch(url, {
                credentials: "include",
                credentials: 'same-origin'
            })

                .then(function (resp) { return resp.json() })
                .then(function (data) {

                    var speed = data.map(function (e) {
                        return e.pressureHpa;
                    })
                    var speed_point = chart.series[0].points[0];
                    var speedVal;
                    speedVal = speed;
                    console.log(speedVal);
                    speed_point.update(speedVal);
                    chart.renderer.image('images/newbaro.png', chart.plotLeft, chart.plotTop, chart.plotWidth, chart.plotHeight)
            .add();
                    return chart;

                })
                .then(function (chart) {


                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var url = 'https://weathernode.tregrillfarmcottages.co.uk/pressure/current';
                            fetch(url, {
                                credentials: "include",
                                credentials: 'same-origin'
                            })

                                .then(function (resp) { return resp.json() })
                                .then(function (data) {

                                    var speed = data.map(function (e) {
                                        return e.pressureHpa;
                                    })
                                    var speed_point = chart.series[0].points[0];
                                    var speedVal;
                                    speedVal = speed;
                                    console.log(speedVal);
                                    speed_point.update(speedVal);
                                    chart.renderer.image('images/newbaro.png', chart.plotLeft, chart.plotTop, chart.plotWidth, chart.plotHeight)
            .add();
                                    return chart;

                                })
                        }, 10000);
                    }

                })
            }
)
};
