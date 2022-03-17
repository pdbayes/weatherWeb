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
        userName : 'user1',
	    password : '*64992Bayesp',
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
    var url = 'http://weathernode.tregrillfarmcottages.co.uk/' + path;
    fetch(url, {
       credentials: "include",
       credentials: 'same-origin'
    })
    
       .then(function (resp) { return resp.json() })
       .then(function (data) {
          var meas_name = '';
          if(path === 'temp'){
          var meas_name= 'Temperature';
          }
          else if(path === 'humidity'){
          var meas_name = 'Humidity';
          }
          else{
             var meas_name = 'error';
          }
          console.log(path);
       plotlyJS(data, meas_name, path);
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
        yaxis: { title: '' , titlefont: { color: 'rgb(0,0,0)' },
        tickfont: { color: 'rgb(0,0,0)' },
        overlaying: 'y'}
      };

      var config = { responsive: true }
      Plotly.newPlot(div_id, data, layout, config);
}
