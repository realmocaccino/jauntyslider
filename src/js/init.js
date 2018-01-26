const helpers = require('./helpers.js');
const jauntyslider = require('./jauntyslider.js');

HTMLElement.prototype.jauntyslider = jauntyslider;

document.addEventListener('DOMContentLoaded', () => {
	Array.from(document.querySelectorAll('ul[data-jauntyslider]')).forEach(list => {
		list.jauntyslider(helpers.getOptions(list));
	});
});
