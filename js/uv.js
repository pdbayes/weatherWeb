function getUVIndex() {
    function getUvData(){
    $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('x-access-token', 'c6120036c3aa5a4d2b3e6b85aafef0f9');
        },
        url: 'https://api.openuv.io/api/v1/uv?lat=50.443530&lng=-4.420760&alt=100',
        success: function (response) {
            var uvTime = new Date(response.result.uv_max_time);
            var sunrise = new Date(response.result.sun_info.sun_times.sunrise);
            var sunset = new Date(response.result.sun_info.sun_times.sunset);
            var sunriseTime = sunrise.getUTCHours() +1 + ":" + sunrise.getUTCMinutes();
            var sunsetTime = sunset.getUTCHours() +1 + ":" + sunset.getUTCMinutes();
            var sunUpDown = sunriseTime + " / " + sunsetTime;
            var safeExp = ((200 * 4)/(3 * response.result.uv_max)).toFixed(0) + ' mins';
            var uvHours =uvTime.getUTCHours() + 1;
            var uvMins = uvTime.getUTCMinutes();
            var uvMaxTime = uvHours + ':' + uvMins;
            var uvDisplay = response.result.uv_max + ' @ ' + uvMaxTime;
            console.log(response.result.uv_max + ' @ ' + uvMaxTime)
            $('#uvDat').html(uvDisplay);
            $('#expDat').html(safeExp);
            $('#sunupdown').html(sunUpDown);
        },
        error: function (response) {
            // handle error response
        }
    });

}

getUvData();
setInterval(function () {
  getUvData()
},21600000);
}