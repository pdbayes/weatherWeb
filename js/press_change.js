
function get_change(){
function change() {

    fetch('https://weathernode.tregrillfarmcottages.co.uk/pressure/change', {
        credentials: "include",
        credentials: 'same-origin'
    })
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            var press_change = data.map(function (e) {
                return e.moving_average;
            });
            var trend_val;
            const trend = ['Storm Approaching', 'Worsening', 'Settled', 'Improving', 'Improving Fast']
            switch (true) {
                case (press_change < -1):
                    trend_val = trend[0];
                    break;
                case (press_change < 0):
                    trend_val = trend[1];
                    break;
                case (press_change < 0.1):
                    trend_val = trend[2];
                    break;
                case (press_change < 2):
                    trend_val = trend[3];
                    break;
                case (press_change < -1):
                    trend_val = trend[4];
                    break;
                default:
                    trend_val = 'error'
                    break;

            }
            console.log('Trend = ' + trend_val);
            $('#p_change').html(trend_val);
        })
}
change()
setInterval(change, 360000);
}