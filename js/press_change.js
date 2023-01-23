/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-duplicate-case */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-dupe-keys */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
function get_change() {
  function change() {
    fetch('https://weathernode.tregrillfarmcottages.co.uk/pressure/change', {
      credentials: 'include',
      credentials: 'same-origin',
    })
      .then((resp) => resp.json())
      .then((data) => {
        const press_change = data.map((e) => e.moving_average);
        let trend_val;
        const trend = ['Storm Approaching', 'Worsening', 'Settled', 'Improving', 'Improving Fast'];
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
            trend_val = 'error';
            break;
        }
        console.log(`Trend = ${trend_val}`);
        $('#p_change').html(trend_val);
      });
  }
  change();
  setInterval(change, 360000);
}
