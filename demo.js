// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    host = '309a494abbc841e0b30b8c2e9e0ec0e1.s2.eu.hivemq.cloud';
    port = '8884';

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
        userName: 'user1',
        password: '*64992Bayesp',
        useSSL: true
    });
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = 'weather/data';

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe(topic);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function gauge(divId, source, text) {
    document.getElementById(divId).innerHTML = "";
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: source,
            type: "indicator",
            mode: "gauge+number",
            title: text
        }
    ];
    var config = { responsive: true }
    var layout = { autosize: true, align: "center" };
    Plotly.newPlot(divId, data, layout, config);
};
function onMessageArrived(message) {
    $("#messages").hide()
    console.log("onMessageArrived: " + message.payloadString);
    var data = JSON.parse(message.payloadString);
    var tempC = data.temperatureInC;
    var humidity = data.humidityPercentage;
    var pressure = data.pressureHpa;
    var dew = data.dewPoint1;
    var cloudbase = data.cloudase1;
    gauge('tempDiv', tempC, 'Measuered Current Temp C');
    gauge('humDiv', humidity, "Measuered Current Humidity %");
    //gauge('pressDiv', pressure, "Pressure");

    updateScroll(); // Scroll to bottom of window
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

// Updates #messages div to auto-scroll
function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}

function getData(path) {
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/' + path;
    fetch(url, {
        credentials: "include",
        credentials: 'same-origin'
    })

        .then(function (resp) { return resp.json() })
        .then(function (data) {
            var meas_name = '';
            if (path === 'temp') {
                var meas_name = 'Temperature';
            }
            else if (path === 'humidity') {
                var meas_name = 'Humidity';
            }
            else {
                var meas_name = 'error';
            }
            // console.log(path);
            return data
        })
        .then(function (data) {
            var data_a = data.map(function (e) {
                if (path === 'rain') {
                    return [Date.parse(e.time), e.sum];
                }
                else {
                    return [Date.parse(e.time), e.mean];
                }
            });

            //var current = data_a[data_a.len - 1][1];
            // console.log('current' + current);
            console.log(data_a.length + ' ' + data_a[data_a.length - 1][1]);
            var meas_name = '';
            if (path === 'temp') {
                var meas_name = 'Temperature';
                var unit = '°C';
                var minScale = -10;
                var maxScale = 30;
                var chartType = 'spline';
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
            }
            else if (path === 'humidity') {
                var meas_name = 'Humidity';
                var unit = '%'
                var minScale = 0;
                var maxScale = 100;
                var chartType = 'areaspline';
                var stopCols = [
                    [0.00, 'rgba(0,0,255,0.2)'],
                    [1.00, 'White']
                ]
            }
            else if (path === 'pressure') {
                var meas_name = 'Pressure HPA';
                var unit = 'hpa'
                var minScale = 950;
                var maxScale = 1050;
                var chartType = 'areaspline';
                var stopCols = [
                    [0.00, 'rgba(0,255,0,0.5)'],
                    [0.4, 'rgba(252,232,3,0.5)'],
                    [0.45, 'rgba(252,232,3,0.5'],
                    [1.00, 'rgba(255,0,0,0.5)']
                ]
            }
            else if (path === 'rain') {
                var meas_name = 'Rain';
                var unit = 'mm'
                var minScale = 0;
                var maxScale = 10;
                var chartType = 'column';
                var stopCols = [
                    [0.00, 'blue'],
                    [1.00, 'blue']
                ]
            }
            else {
                var meas_name = 'error';
            }
            div_name = path;

            Highcharts.chart(div_name, {
                chart: {
                    events: {
                        load: function () {
                            var chart = this;
                            var extremes = chart.plotBox.y;
                            var yMin = chart.plotBox.y;
                            var yMax = chart.plotBox.y + chart.plotBox.height;
                            console.log('yAxis max/min' + yMax + '/' + yMin);
                            console.log(chart.plotBox.y);
                            console.log(chart.plotBox.height);
                            chart.series[0].update({
                                color: {
                                    //linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                                    linearGradient: [0, yMin, 0, yMax],
                                    stops: stopCols
                                }
                            })
                        },
                        update: function () {
                            var chart = this;
                            var extremes = chart.yAxis[0].getExtremes();
                            var yMax = chart.yAxis[0].toPixels(extremes.max);
                            var yMin = chart.yAxis[0].toPixels(extremes.min);
                            console.log('yAxis max/min' + yMax + '/' + yMin);
                            chart.series[0].color = {
                                //linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                                linearGradient: [0, yMin, 0, yMax],
                                stops: stopCols
                            }
                        }
                    },
                    type: chartType,
                    borderWidth: 3

                },

                margin: [0, 0, 0, 0],

                title: {
                    text: meas_name
                },
                subtitle: {
                    text: 'Last 7 days'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    labels: {
                        format: '{value}' + unit
                    },
                    lineWidth: 2,
                    min: minScale,
                    max: maxScale
                },
                legend: {
                    enabled: false
                },
                tooltip: {

                    pointFormat: '{point.y}°C'
                },
                plotOptions: {

                    series: {

                        threshold: minScale,
                        connectNulls: true
                    },

                },
                series: [{
                    type: chartType,
                    //name: meas_name,
                    data: data_a,
                    color: {
                        //linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        linearGradient: [0, 0, 0, 0],
                        stops: stopCols
                    }
                }]
            });
        })
        .catch(function () {
            // catch any errors
        });
}

function plotlyJS(vals, measurement, div_id) {
    // Bar chart
    // create chart data
    console.log(vals);
    var times = vals.map(function (e) {
        return e.time;
    });
    var temps = vals.map(function (e) {
        return e.mean;
    });
    var trace1 = {
        x: times,
        y: temps,
        name: measurement,
        line: { shape: 'spline' },
        type: 'line'
    };
    var data = [trace1];
    var layout = {
        title: measurement + ' Last 7 Days',
        paper_bgcolor: "rgba(200,200,200,.2)",
        yaxis: {
            title: '', titlefont: { color: 'rgb(0,0,0)' },
            tickfont: { color: 'rgb(0,0,0)' },
            overlaying: 'y'
        }
    };

    var config = { responsive: true }
    Plotly.newPlot(div_id, data, layout, config);
}
