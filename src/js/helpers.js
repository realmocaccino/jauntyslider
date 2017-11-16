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

exports.checkString = function(value)
{
	if(['true', 'false'].indexOf(value) != '-1')
		return (value === 'true');
	
	else if(!isNaN(value))
		return parseInt(value);

	return value;
};
