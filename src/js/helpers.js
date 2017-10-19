exports.get_options = function(element) {
	var options = {};
	var data = element.dataset.jauntyslider.replace(/\s+/g, '').split(';');
	
	for(let i of data) {
		if(data[i]) {
			options[data[i].split(':')[0].toLowerCase()] = data[i].split(':')[1].toLowerCase();
		}
	}
	
	return options;
}
