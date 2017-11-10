exports.getOptions = function(element)
{
	let options = {};
	const data_options = element.dataset.jauntyslider.replace(/\s+/g, '').split(';');
	
	data_options.forEach(option => {
		if(option) {
			const [property, value] = option.split(':');
			options[property.toLowerCase()] = value.toLowerCase();
		}
	});
	
	return options;
};

exports.wrap = function(wrapperElement, wrappedElement)
{
	wrappedElement.parentNode.insertBefore(wrapperElement, wrappedElement);
	wrapperElement.appendChild(wrappedElement);
};

exports.checkBoolean = function(value)
{
	const matches = ['true', 'false'];
	
	if(matches.indexOf(value) != '-1') {
		return (value === 'true');
	}

	return value;
};
