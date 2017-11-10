Object.defineProperty(Object.prototype, 'jauntyslider', {
	enumerable: false,
	value: require('./jauntyslider.js')
});
const helpers = require('./helpers.js');

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('ul[data-jauntyslider]').forEach(list => {
		list.jauntyslider(helpers.getOptions(list));
	});
});
