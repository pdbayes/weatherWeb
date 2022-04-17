$(function () {
    $('#container').highcharts(
        {
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
            plotOptions: {
                gauge: {
                    pivot: {
                        radius: 18,
                        borderWidth: 1,
                        borderColor: 'gray',
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                            stops: [
                                [0, 'white'],
                                [1, 'gray']
                            ]
                        }
                    }
                }
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
                
            ],
        },
        
        // Add some life
        function (chart) {
            if (!chart.renderer.forExport) {
                //var diffW = chart.chartWidth - chart.plotWidth;
                //var diffH = chart.chartHeight - chart.plotHeight;
                
               var img = new Image();   // Create new img element
                img.onload = function(){
                    console.log('loading image');
                chart.renderer.image('images/newbaro.png', chart.plotLeft, chart.plotTop, chart.plotWidth, chart.plotHeight)
            .add();
                }
                img.src = 'images/newbaro.png'; // Set source path
                setInterval(function () {
                    //var point = chart.series[0].points[0];
                    //var newVal;
                    //var inc = Math.round((Math.random() - 0.5) * 60);
                   // newVal = point.y + inc;
                   // if (newVal < 950 || newVal > 1050) {
                   //     newVal = point.y - inc;
                   // }
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
                           return chart;
                        })
                    //console.log(newVal);
                    //point.update(newVal);
                }, 7000);
            }
        }
        
    );
});