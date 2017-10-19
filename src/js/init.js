window.jauntyslider = require('./jauntyslider.js');
const helpers = require('./helpers.js');

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('ul[data-jauntyslider]').forEach(function(list, index){
		new jauntyslider(list, helpers.get_options(list));
	});
});
