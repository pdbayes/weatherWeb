// beteljuice.com - near enough Zambretti Algorhithm 
// Giugno 2008 - v1.0
// tweak added so decision # can be output

/* Negretti and Zambras 'slide rule' is supposed to be better than 90% accurate 
for a local forecast upto 12 hrs, it is most accurate in the temperate zones and about 09:00  hrs local solar time.
I hope I have been able to 'tweak it' a little better ;-)	

This code is free to use and redistribute as long as NO CHARGE is EVER made for its use or output
*/


// usage:   forecast = betel_cast( z_hpa, z_month, z_wind, z_trend [, z_where] [, z_Barometro_top] [, z_Barometro_bottom])[0];

// z_hpa is Sea Level Adjusted (Relative) Barometro in hPa or mB
// z_month is current month as a number between 1 to 12
// z_wind is English windrose cardinal eg. N, NNW, NW etc.
// NB. if calm a 'nonsense' value should be sent as z_wind (direction) eg. 1 or calm !
// z_trend is Barometrometer trend: 0 = no change, 1= rise, 2 = fall
// z_where - OPTIONAL for posting with form
// z_Barometro_top - OPTIONAL for posting with form
// z_Barometro_bottom - OPTIONAL for posting with form
// [0] a short forecast text is returned
// [1] zambretti severity number (0 - 25) is returned ie. betel_cast() returns a two deep array
function degToCompass(num) {
	let val = ((num / 22.5) + .5)
	let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	return arr[(val % 16).toFixed()];
};
function trend(cRate) {
	if (cRate > 2) { return 1 }
	else if (cRate < -2) { return 2 }
	else { return 0 }
}
var z_forecast = new Array("Settled fine", "Fine weather", "Becoming fine", "Fine, becoming less settled", "Fine, possible showers", "Fairly fine, improving", "Fairly fine, possible showers early", "Fairly fine, showery later", "Showery early, improving", "Changeable, mending", "Fairly fine, showers likely", "Rather unsettled clearing later", "Unsettled, probably improving", "Showery, bright intervals", "Showery, becoming less settled", "Changeable, some rain", "Unsettled, short fine intervals", "Unsettled, rain later", "Unsettled, some rain", "Mostly very unsettled", "Occasional rain, worsening", "Rain at times, very unsettled", "Rain at frequent intervals", "Rain, very unsettled", "Stormy, may improve", "Stormy, much rain");
var z_icons = new Array("images/day_clear.svg", "images/day_clear.svg", "images/day_partial_cloud.svg", "images/day_partial_cloud.svg", "images/angry_clouds.svg", "images/day_partial_cloud.svg", "day_partial_cloud.svg", "day_partial_cloud.svg", "day_partial_cloud.svg", "day_partial_cloud.svg", "day_partial_cloud.svg", "day_partial_cloud.svg", "day_partial_cloud.svg", "rain.svg", "rain.svg", "rain.svg", "day_partial_cloud.svg", "angry_clouds.svg", "angry_clouds.svg", "angry_clouds.svg", "angry_clouds.svg", "rain.svg", "rain.svg", "rain.svg", "thunder.svg", "thunder.svg");
// equivalents of Zambretti 'dial window' letters A - Z
var rise_options = new Array(25, 25, 25, 24, 24, 19, 16, 12, 11, 9, 8, 6, 5, 2, 1, 1, 0, 0, 0, 0, 0, 0);
var steady_options = new Array(25, 25, 25, 25, 25, 25, 23, 23, 22, 18, 15, 13, 10, 4, 1, 1, 0, 0, 0, 0, 0, 0);
var fall_options = new Array(25, 25, 25, 25, 25, 25, 25, 25, 23, 23, 21, 20, 17, 14, 7, 3, 1, 1, 1, 0, 0, 0);

var z_test = new Array();

// ---- MAIN FUNCTION --------------------------------------------------
function betel_cast(z_hpa, z_month, z_wind, z_trend, z_upper, z_lower) {

	z_range = z_upper - z_lower;
	z_constant = (z_range / 22).toFixed(3);

	z_season = (z_month >= 4 && z_month <= 9); 	// true if 'Summer'
	console.log(z_season ==1);

	if (z_wind == "N") {
		z_hpa += 6 / 100 * z_range;
	} else if (z_wind == "NNE") {
		z_hpa += 5 / 100 * z_range;
	} else if (z_wind == "NE") {
		//			z_hpa += 4 ;  
		z_hpa += 5 / 100 * z_range;
	} else if (z_wind == "ENE") {
		z_hpa += 2 / 100 * z_range;
	} else if (z_wind == "E") {
		z_hpa -= 0.5 / 100 * z_range;
	} else if (z_wind == "ESE") {
		//			z_hpa -= 3 ;  
		z_hpa -= 2 / 100 * z_range;
	} else if (z_wind == "SE") {
		z_hpa -= 5 / 100 * z_range;
	} else if (z_wind == "SSE") {
		z_hpa -= 8.5 / 100 * z_range;
	} else if (z_wind == "S") {
		//			z_hpa -= 11 ;  
		z_hpa -= 12 / 100 * z_range;
	} else if (z_wind == "SSW") {
		z_hpa -= 10 / 100 * z_range;  //
	} else if (z_wind == "SW") {
		z_hpa -= 6 / 100 * z_range;
	} else if (z_wind == "WSW") {
		z_hpa -= 4.5 / 100 * z_range;  //
	} else if (z_wind == "W") {
		z_hpa -= 3 / 100 * z_range;
	} else if (z_wind == "WNW") {
		z_hpa -= 0.5 / 100 * z_range;
	} else if (z_wind == "NW") {
		z_hpa += 1.5 / 100 * z_range;
	} else if (z_wind == "NNW") {
		z_hpa += 3 / 100 * z_range;
	}
	console.log(z_hpa)
	if (z_season == 1) {  	// if Summer
		if (z_trend == 1) {  	// Miglioramento
			z_hpa += 7 / 100 * z_range;
		} else if (z_trend == 2) {  //	falling
			z_hpa -= 7 / 100 * z_range;
		}
	}

	if (z_hpa == z_upper) z_hpa = z_upper - 1;
	z_option = Math.floor((z_hpa - z_lower) / z_constant);
	z_output = "";
	if (z_option < 0) {
		z_option = 0;
		z_output = "Exceptional Weather, ";
	}
	if (z_option > 21) {
		z_option = 21;
		z_output = "Exceptional Weather, ";
	}

	if (z_trend == 1) { 	// Miglioramento
		z_output += z_forecast[rise_options[z_option]];
		z_test[1] = rise_options[z_option];
	} else if (z_trend == 2) { 	// falling
		z_output += z_forecast[fall_options[z_option]];
		z_test[1] = fall_options[z_option];
	} else { 	// must be 'Stabile'
		z_output += z_forecast[steady_options[z_option]];
		z_test[1] = steady_options[z_option];
	}
	//	return z_output ; 
	z_test[0] = z_output;
	return z_test;
}	// END function   


const pUrl = 'https://weathernode.tregrillfarmcottages.co.uk/pressure/current';
const tUrl = 'https://weathernode.tregrillfarmcottages.co.uk/pressure/change';
const wUrl = 'https://weathernode.tregrillfarmcottages.co.uk/wind/holtDir';
async function get_forecast() {
	pressureNow = await fetch(pUrl, {
		credentials: 'include',
		credentials: 'same-origin',
	})

		.then((resp) => resp.json())
		.then((data) => {
			const press = data.map((e) => e.pressure + 13);
			let pressVal;
			pressVal = press[press.length - 1];
			console.log(pressVal);
			return pressVal
		});





	let pTrend = await fetch(tUrl, {
		credentials: 'include',
		credentials: 'same-origin',
	})

		.then((resp) => resp.json())
		.then((data) => {
			const pressureChange = data.map((e) => e.pressure);
			let tVal;
			tVal = (pressureChange[0] - pressureChange[pressureChange.length - 1]);
			console.log(trend(tVal));
			return trend(tVal)
		});


	let windNow = await fetch(wUrl, {
		credentials: 'include',
		credentials: 'same-origin',
	})

		.then((resp) => resp.json())
		.then((data) => {
			const wind = data.map((e) => e.quadrant);
			console.log(wind[0])
			let windVal;
			windVal = degToCompass(wind[0]);
			console.log(windVal);
			return windVal
		});

	let d = new Date
	let month = d.getMonth()
	let forecast = betel_cast(pressureNow, month, windNow, pTrend, 1050, 950);
	console.log(forecast);
	let background_image = z_icons[forecast[1]];
	$('#z_forecast').html(forecast[0]);
	$("z_forecast").css("background-image", "url(background_image)")
	return forecast
};

let z_out = get_forecast()
console.log(z_out);

let icon

// determine the forecast and return an emoji representing it
function _zambretti_rising(current_pressure) {
	let letter = '';
	if (current_pressure > 1025) letter = "☀️";    // A: Settled Weather 
	else if (current_pressure > 1016) letter = "☀️";    // B: Fine Weather 
	else if (current_pressure > 1009) letter = "☀️";    // C: Becoming Fine 
	else if (current_pressure > 1011) letter = "🌤️";    // E: Fine, Possible Showers 
	else if (current_pressure > 1003) letter = "🌤️";    // F: Fairly Fine, Improv 
	else if (current_pressure > 997) letter = "⛅";     // G: Fairly Fine, Possible Showers Early 
	else if (current_pressure > 992) letter = "⛅";     // I: Showers Early, Improving  
	else if (current_pressure > 986) letter = "⛅";     // J: Changeable, Mending 
	else if (current_pressure > 980) letter = "⛅";     // L: Rather Unsettled, Clearing Later 
	else if (current_pressure > 973) letter = "⛅";     // M: Unsettled, Probably Improving 
	else if (current_pressure > 967) letter = "☁️";     // Q: Unsettled, Short Fine Intervals 
	else if (current_pressure > 961) letter = "☁️";     // T: Very Unsettled, Finer At Times 
	else if (current_pressure > 953) letter = "🌧️";     // Y: Stormy, Possibly Improving 
	else letter = "🌧️";                                 //Z: Stormy, Much Rain 

	return letter;
}

// determine the forecast and return an emoji representing it
function _zambretti_falling(current_pressure) {
	let letter = '';
	if (current_pressure > 1028) letter = "☀️";    // A: Settled Weather 
	else if (current_pressure > 1017) letter = "☀️";    // B: Fine Weather 
	else if (current_pressure > 1011) letter = "🌤️";    // E: Fine, Possible Showers 
	else if (current_pressure > 1003) letter = "⛅";    // K: Fairly Fine, Showers Likely 
	else if (current_pressure > 996) letter = "⛅";     // N: Showery, Bright Intervals 
	else if (current_pressure > 991) letter = "☁️";     // P: Changeable, Some Rain 
	else if (current_pressure > 984) letter = "☁️";     // S: Unsettled, Rain At Times 
	else if (current_pressure > 978) letter = "🌧️";     // W: Rain At Frequent Intervals 
	else if (current_pressure > 966) letter = "🌧️";     // X: Very Unsettled, Rain 
	else letter = "🌧️";                                 // Z: Stormy, Much Rain 

	return letter;
}

function _zambretti_steady(current_pressure) {
	let letter = '';
	if (current_pressure > 1028) letter = "☀️";    // A: Settled Weather 
	else if (current_pressure > 1017) letter = "☀️";    // B: Fine Weather 
	else if (current_pressure > 1011) letter = "🌤️";    // E: Fine, Possible Showers 
	else if (current_pressure > 1003) letter = "⛅";    // K: Fairly Fine, Showers Likely 
	else if (current_pressure > 996) letter = "⛅";     // N: Showery, Bright Intervals 
	else if (current_pressure > 991) letter = "☁️";     // P: Changeable, Some Rain 
	else if (current_pressure > 984) letter = "☁️";     // S: Unsettled, Rain At Times 
	else if (current_pressure > 978) letter = "🌧️";     // W: Rain At Frequent Intervals 
	else if (current_pressure > 966) letter = "🌧️";     // X: Very Unsettled, Rain 
	else letter = "🌧️";                                 // Z: Stormy, Much Rain 

	return letter;
}
/*
if (pTrend == 1){
	let icon = _zambretti_rising(pressureNow)
}
	else if (pTrend == 2){
		let icon = _zambretti_falling(pressureNow)
	}
	else {
		let icon = _zambretti_steady(pressureNow)
	}
console.log(icon)
*/