export const addSecondSymbol = function(value)
{
	if(!isNaN(value) || value.slice(-1) != 's') return value + 's';
	
	return value;
};

export const checkString = function(value)
{
	if(['true', 'false'].indexOf(value) != '-1')
		return (value === 'true');
	
	else if(!isNaN(value))
		return Number(value);
	
	return value.toLowerCase();
};

export const getPositions = function(slides, sliderWidth, listWidth)
{
	let slidesPositions = [];
	let onGoingWidth = 0;
	var sliderWidth = sliderWidth.toString().replace('px', '');
	
	slides.every((slide, index) => {
		if((listWidth - onGoingWidth) < sliderWidth) {
			let alreadyShown = sliderWidth - slides[index - 1].offsetWidth;
			let leftToShow = listWidth - (onGoingWidth + alreadyShown);
			let lastPosition = slidesPositions[index - 1] + leftToShow;
			
			for(let i = index; i <= (slides.length - 1); i++) slidesPositions.push(lastPosition);
			
			return false;
		} else {
			slidesPositions.push(onGoingWidth);
			onGoingWidth += slide.offsetWidth;
			
			return true;
		}
	});
	
	return slidesPositions;
};

export const getOptions = function(element)
{
	let options = {};
	const data_options = element.dataset.jauntyslider.replace(/['"\s]+/g, '').split(';');
	
	data_options.forEach(option => {
		if(option) {
			const [property, value] = option.split(':');
			let propertyInitialLowercase = property.charAt(0).toLowerCase() + property.slice(1);
			
			options[propertyInitialLowercase] = checkString(value);
		}
	});
	
	return options;
};

export const hasUnit = function(value)
{
	const units = ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'vm'];
	
	let valueWithoutDigits = value.toString().replace(/[.,\d]+/g, '');
	
	return (units.indexOf(valueWithoutDigits) != '-1');
};

export const removeSecondSymbol = function(value)
{
	if(!isNaN(value)) return value;
	
	if(value.slice(-1) == 's') return value.slice(0, -1);
	
	return value;
};

export const wrap = function(wrapperElement, wrappedElement)
{
	wrappedElement.parentNode.insertBefore(wrapperElement, wrappedElement);
	wrapperElement.appendChild(wrappedElement);
};
