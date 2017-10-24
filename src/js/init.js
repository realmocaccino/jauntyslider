window.Object.prototype.jauntyslider = require('./jauntyslider.js');
const helpers = require('./helpers.js');

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('ul[data-jauntyslider]').forEach(function(list, index){
		list.jauntyslider(helpers.getOptions(list));
	});
});
