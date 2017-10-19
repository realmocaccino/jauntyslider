const jauntyslider = require('./jauntyslider.js');
const helpers = require('./helpers.js');

jQuery.extend(jQuery.easing, {
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	}
});

$(document).ready(function(){
	$('ul[data-jauntyslider]').each(function(index, element){
		new jauntyslider(element).preloadImages();
	});
});
