function mainDisplay () {
    setInterval(() => {
      let urlT = 'http://192.168.0.74:8080/test/current';
      let urlH = 'http://192.168.0.74:8080/humidity/current';
      let urlP = 'http://192.168.0.74:8080/pressure/current';
      let urlW = 'http://192.168.0.74:8080/wind/current';
      $.getJSON(urlT, (json) => {
        console.log(json);
        let tempc = (Math.round(json[0].temperature * 100) / 100).toFixed(2);
        let text = tempc.toString().padStart(5, '0');
        document.getElementById("temperature").innerHTML = text + "<span style=\"font-size:30px;\">°c</span>";
        
      });
      $.getJSON(urlH, (json) => {
        console.log(json);
        let humid = (Math.round(json[0].humidity * 100) / 100).toFixed(2);
        let text = humid.toString();
        document.getElementById("humidity").innerHTML = text + "<span style=\"font-size:30px;\">%</span>";
      });
      $.getJSON(urlW, (json) => {
        console.log(json);
        let speed = (Math.round(json[0].Speed * 100) / 100).toFixed(2);
        let direction = (Math.round(json[0].quadrant * 100) / 100).toFixed(0);
        let text = speed.toString().padStart(5, '0');
        let textd = direction.toString();
        document.getElementById("speed").innerHTML = text + "<span style=\"font-size:30px;\">MPH</span>";
        document.getElementById("direction").innerHTML = textd;
  
      });
      $.getJSON(urlP, (json) => {
        console.log(json);
        let press = (Math.round(json[0].pressure * 100) / 100).toFixed(2);
        let text = press.toString().padStart(7, '0');
        document.getElementById("pressure").innerHTML = text + "<span style=\"font-size:30px;\">hpa</span>";
      });
    }, 500);
  }
  