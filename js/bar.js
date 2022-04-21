function windowWidth() {
    if (window.innerWidth < 500) {
        var vpw = window.innerWidth;
    }
    else {
        var vpw = 500;
    }
    console.log('resizing ' + vpw);

    return vpw;
};


$(function () {


    var vpWidth = windowWidth();

    
    $('#container').highcharts(
        {
            chart: {
                type: 'gauge',
                //plotBackgroundImage: 'images/baro.png',
                plotBorderWidth: 0,
                plotShadow: false,
                height: vpWidth,
                width: vpWidth,
                spacingTop: 15,
                spacingRight: 15,
                spacingBottom: 15,
                spacingLeft: 15,
            },

            title: null,
            credits: {
                enabled: false
            },

            pane: [{
                startAngle: -150,
                endAngle: 170,
                background: null
            },
            {
                size: '15%',
                center: ['36.5%', '68%'],
                startAngle: -150,
                endAngle: 150,
                background: null
            }, {
                size: '15%',
                center: ['63.3%', '68.5%'],
                startAngle: -150,
                endAngle: 150,
                background: null
            }
            ],


            // the value axis
            yAxis: [
                {
                    labels: {
                        enabled: false,
                        distance: 15
                    },
                    title: {
                        text: '',
                    },
                    min: 975,
                    max: 1055,
                    lineColor: '#fff',
                    lineWidth: 0,
                    offset: 0,
                    tickInterval: 100,
                    tickWidth: 0,
                    tickPosition: 'outside',
                    tickLength: 0,
                    tickColor: '#333',
                    minorTickInterval: 100,
                    minorTickWidth: 0,
                    minorTickLength: 0,
                    minorTickPosition: 'outside',
                    minorTickColor: '#666',
                    pane: 0
                },
                {
                    labels: {
                        enabled: true,
                        distance: 15
                    },
                    title: {
                        text: '',
                    },
                    lineColor: '#000',
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    minorTickWidth: 1,
                    minorTickLength: 3,
                    minorTickInterval: 5,
                    tickWidth: 2,
                    tickLength: 5,
                    tickInterval: 10,
                    minorTickPosition: 'outside',
                    minorTickColor: '#000',
                    tickPosition: 'outside',
                    tickColor: '#000',
                    pane: 1
                }, {
                    labels: {
                        enabled: true,
                        distance: 15
                    },
                    title: {
                        text: '',
                    },
                    min: -10,
                    max: 30,
                    lineWidth: 0,
                    minorTickWidth: 1,
                    minorTickLength: 3,
                    minorTickInterval: 1,
                    tickWidth: 2,
                    tickLength: 5,
                    tickInterval: 5,
                    minorTickPosition: 'outside',
                    minorTickColor: '#000',
                    tickPosition: 'outside',
                    tickColor: '#000',
                    pane: 2
                }

            ],

            series: [

                {
                    name: 'Barometer',
                    dataLabels: {
                        enabled: false
                    },
                    yAxis: 0,
                    data: [1050],
                    dial: {
                        radius: '85%',
                        baseWidth: 5,
                        baseLength: '0%',
                        rearLength: 30,
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: 'darkgrey',
                    },
                    tooltip: {
                        valueSuffix: 'hpa',
                    },
                },
                {
                    animation: false,
                    dataLabels: {
                        enabled: false
                    },
                    yAxis: 1,
                    data: [0]
                }, {
                    animation: false,
                    dataLabels: {
                        enabled: false
                    },
                    yAxis: 2,
                    data: [-25]
                }

            ],
        },

        // Add some life



        function (chart) {
            if (!chart.renderer.forExport) {

                        function refresh(){
                            
                            Promise.all([
                                fetch('https://weathernode.tregrillfarmcottages.co.uk/pressure/current', {
                                    credentials: "include",
                                    credentials: 'same-origin'
                                }),
        
                                fetch('https://weathernode.tregrillfarmcottages.co.uk/temp/current', {
                                    credentials: "include",
                                    credentials: 'same-origin'
                                }),
        
                                fetch('https://weathernode.tregrillfarmcottages.co.uk/humidity/current', {
                                    credentials: "include",
                                    credentials: 'same-origin'
                                })
                            ]).then(function (responses) {
                                // Get a JSON object from each of the responses
                                return Promise.all(responses.map(function (response) {
                                    return response.json();
                                }));
                            })
                                .then(function (data) {
                                    if(typeof img != "undefined"){
                                        img.destroy()}
                                    var img = chart.renderer.image('images/newbaro.png', chart.plotLeft, chart.plotTop, chart.plotWidth, chart.plotHeight).add();
        
                                    //var img = chart.renderer.image('images/newbaro.png', chart.plotLeft, chart.plotTop, chart.plotWidth, chart.plotHeight).add();
                                    var speed = data[0].map(function (e) {
                                        return e.pressureHpa;
                                    })
                                    var speed_point = chart.series[0].points[0];
                                    var speedVal;
                                    speedVal = speed;
                                    console.log(speedVal);
                                    speed_point.update(speedVal);
        
                                    var temp = data[1].map(function (e) {
                                        return e.temperatureInC;
                                    })
                                    var temp_point = chart.series[2].points[0];
                                    var tempVal;
                                    tempVal = temp;
                                    console.log(tempVal);
                                    temp_point.update(tempVal);
        
                                    var hum = data[2].map(function (e) {
                                        return e.humidityPercentage;
                                    })
                                    var hum_point = chart.series[1].points[0];
                                    var humVal;
                                    humVal = hum;
                                    console.log(humVal);
                                    hum_point.update(humVal);
                                    chart.setSize(windowWidth(), windowWidth(), doAnimation= true);
                                    img.destroy();
                                    var img = chart.renderer.image('images/newbaro.png', chart.plotLeft, chart.plotTop, chart.plotWidth, chart.plotHeight).add();
        
                                    return chart;
                                })
                        }
                        refresh();
                        setInterval(refresh, 7000);
            }
        }

    );
});