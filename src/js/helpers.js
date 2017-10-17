exports.get_options = function(element) {
	var data = $(element).data('jauntyslider').replace(/\s+/g, '').split(';');
	for(i in data) {
		if(data[i]) {
			this[data[i].split(':')[0].toLowerCase()] = data[i].split(':')[1].toLowerCase();
		}
	}
}
