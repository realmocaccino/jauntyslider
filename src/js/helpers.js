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

exports.getContentWidth = function(element)
{
	return element.clientWidth - (element.style.paddingLeft + element.style.paddingRight);
};

exports.getContentHeight = function(element)
{
	return element.clientHeight- (element.style.paddingTop + element.style.paddingBottom);
};
