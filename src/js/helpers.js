exports.checkString = function(value)
{
	if(['true', 'false'].indexOf(value) != '-1')
		return (value === 'true');
	
	else if(!isNaN(value))
		return parseInt(value);

	return value;
};

exports.createKeyframes = function(animation_name, current_position, next_position)
{
	return '@keyframes ' + animation_name + ' {\
				0% {\
					margin-left: -' + current_position + ';\
				}\
				100% {\
					margin-left: -' + next_position + ';\
				}\
			}';
};

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

exports.handleSecondString = function(value, handle)
{
	const check = value.toString().indexOf('s');
	
	switch(handle) {
		case 'add':
			if(check == '-1') return value + 's';
		break;
		
		case 'remove':
			if(check != '-1') return value.replace('s', '');
		break;
	}
	
	return value;
};

exports.wrap = function(wrapper_element, wrapped_element)
{
	wrapped_element.parentNode.insertBefore(wrapper_element, wrapped_element);
	wrapper_element.appendChild(wrapped_element);
};
