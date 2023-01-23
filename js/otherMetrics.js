/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
function others() {
  function getChill() {
    const url = 'https://weathernode.tregrillfarmcottages.co.uk/wind/chill';
    fetch(url, {
      credentials: 'include',
      credentials: 'same-origin',
    })

      .then((resp) => resp.json())
      .then((data) => {
        const chill = data.map((e) => e.mean);
        console.log(`chill ${chill}`);

        $('#chill').html(parseFloat(chill).toFixed(2));
      });
  }

  getChill();
  setInterval(() => {
    // getChill()
  }, 10000);
}
