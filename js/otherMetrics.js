function others(){
function getChill(){
    var url = 'https://weathernode.tregrillfarmcottages.co.uk/wind/chill';
    fetch(url, {
        credentials: "include",
        credentials: 'same-origin'
    })

.then(function (resp) { return resp.json() })
.then(function (data) {
var chill = data.map(function (e) {
        return e.mean;
    });
  console.log('chill ' + chill);

$('#chill').html(parseFloat(chill).toFixed(2));

})
};


getChill()
setInterval(function () {
    //getChill()
  },10000);
}
  