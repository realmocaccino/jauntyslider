import * as helpers from './helpers.js';
import { jauntyslider } from './jauntyslider.js';

// From querySelector
HTMLElement.prototype.jauntyslider = jauntyslider;

// From querySelectorAll
NodeList.prototype.jauntyslider = function(options) {
	Array.from(this).forEach(list => list.jauntyslider(options));
};

// From data-jauntyslider
document.addEventListener('DOMContentLoaded', () => {
	Array.from(document.querySelectorAll('[data-jauntyslider]')).forEach(list => {
		list.jauntyslider(helpers.getOptionsFromDataAttribute(list));
	});
});
