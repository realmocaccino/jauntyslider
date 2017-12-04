/*
 * Jaunty Slider v2.0 - http://jauntyslider.luizgustavoweb.com
 * The quickest way to slide a HTML list
 *
 * Open source under the MIT License
 * © 2017 Luiz Gustavo Martins
 */
 
const helpers = require('./helpers.js');

module.exports = function(user_options)
{
	this.userOptions = user_options;
	
	this.options = {
		direction: 'forward',
		duration: 'normal',
		easing: 'ease',
		height: null,
		initial: 1,
		interval: 5,
		loop: false,
		navigation: true,
		slideshow: false,
		step: 1,
		width: null
	};
	
	this.elements = {
		list: this
	};
	
	this.auxiliaries = {
		animationName: 'jauntyslider-move',
		animationRunning: false,
		defaultUnit: 'px',
		firstSlide: 0,
		labelActive: 'active'
	};

	this.init = function() {
		this.overrideOptions();
		this.build();
		this.setWidth();
		this.setHeight();
		this.setInitialSlide();
		this.treatDuration();
		this.setAnimationProperties();
		this.setSlidesPositions();
		this.setup();
		this.actions();
		
		if(this.options.slideshow) {
			this.treatDirection();
			this.treatInterval();
			this.startSlideshow();
		}
	};
	
	this.overrideOptions = function() {
		for(let option in this.userOptions) {
			if(this.options.hasOwnProperty(option)) {
				this.options[option] = this.userOptions[option];
			}
		}
	};
	
	this.build = function() {
		this.elements.slides = Array.from(this.elements.list.children);
		
		this.auxiliaries.totalSlides = this.elements.slides.length;
		this.auxiliaries.lastSlide = this.elements.slides.length - 1;
		
		this.elements.wrapper = document.createElement('div');
		this.elements.wrapper.classList.add('jauntyslider-wrapper');
		helpers.wrap(this.elements.wrapper, this.elements.list);
		
		this.elements.previousArrow = document.createElement('a');
		this.elements.previousArrow.classList.add('jauntyslider-previous');
		this.elements.previousArrow.setAttribute('title', 'Previous');
		
		this.elements.nextArrow = document.createElement('a');
		this.elements.nextArrow.classList.add('jauntyslider-next');
		this.elements.nextArrow.setAttribute('title', 'Next');
		
		this.elements.wrapper.insertBefore(this.elements.previousArrow, this.elements.list);
		this.elements.wrapper.appendChild(this.elements.nextArrow);
		
		if(this.options.navigation) {
		
			this.elements.navigation = document.createElement('ul');
			this.elements.navigation.classList.add('jauntyslider-navigation');
		
			this.elements.slides.forEach(() => this.elements.navigation.appendChild(document.createElement('li')));
			this.elements.navigationItems = this.elements.navigation.querySelectorAll('li');
			
			this.elements.wrapper.appendChild(this.elements.navigation);
			
		}
		
		this.elements.styleSheet = document.createElement('style');
		this.elements.wrapper.appendChild(this.elements.styleSheet);
	};
	
	this.setWidth = function() {
		if(!this.userOptions.width) this.options.width = this.elements.list.offsetWidth;
	};
	
	this.setHeight = function() {
		if(!this.userOptions.height) this.options.height = this.elements.list.offsetHeight;
	};
	
	this.setInitialSlide = function() {
		this.auxiliaries.currentSlide = this.options.initial - 1;
		this.auxiliaries.previousSlide = null;
	};

	this.treatDuration = function() {
		switch(this.options.duration) {
			case 'slow':
				this.options.duration = '1.2s';
			break;
			case 'normal':
				this.options.duration = '0.7s';
			break;
			case 'fast':
				this.options.duration = '0.3s';
			break;
			default:
				this.options.duration = helpers.addSecondSymbol(this.options.duration);
			break;
		}
	};
	
	this.setAnimationProperties = function() {
		this.elements.list.style.animationDuration = this.options.duration;
		this.elements.list.style.animationTimingFunction = this.options.easing;
		this.elements.list.style.animationFillMode = 'forwards';
	};
	
	this.setSlidesPositions = function() {
		this.auxiliaries.listWidth = 0;
		this.auxiliaries.slidesPositions = [];
		
		this.elements.slides.forEach(slide => {
			this.auxiliaries.slidesPositions.push(this.auxiliaries.listWidth);
			this.auxiliaries.listWidth += slide.offsetWidth;
		});
	};

	this.setup = function() {
		this.elements.list.removeAttribute('data-jauntyslider');
		
		this.elements.wrapper.style.setProperty('width', this.concatenateUnit(this.options.width));
		this.elements.wrapper.style.setProperty('height', this.concatenateUnit(this.options.height));
		
		this.elements.list.style.setProperty('width', this.concatenateUnit(this.auxiliaries.listWidth), 'important');
		
		this.move(true);
		
		if(this.options.loop && this.auxiliaries.totalSlides > 1) {
			this.elements.nextArrow.style.display = 'block';
			this.elements.previousArrow.style.display = 'block';
		}
		
		if(this.options.navigation) {
			this.elements.navigation.style.marginLeft = this.concatenateUnit('-' + (this.elements.navigation.offsetWidth / 2));
		}
	};
	
	this.actions = function() {
		this.elements.previousArrow.addEventListener('click', event => {
			event.preventDefault();
			
			this.goBackward();
			if(this.options.slideshow) this.restartSlideshow();
		});
		
		this.elements.nextArrow.addEventListener('click', event => {
			event.preventDefault();
			
			this.goForward();
			if(this.options.slideshow) this.restartSlideshow();
		});
		
		if(this.options.navigation) {
			this.elements.navigationItems.forEach((item, index) => {
				item.addEventListener('click', event => {
					event.preventDefault();
				
					this.navigate(index);
					if(this.options.slideshow) this.restartSlideshow();
				});
			});
		}
		
		this.elements.list.addEventListener('animationstart', event => {
			this.auxiliaries.animationRunning = true;
		});
		
		this.elements.list.addEventListener('animationend', event => {
			this.auxiliaries.animationRunning = false;
		});
	};

	this.goBackward = function() {
		if(this.canGoBackward()) {
			if(this.mustGoToTheEnd()) {
				this.updateCurrentSlide(this.auxiliaries.lastSlide);
				this.move(true);
			} else {
				this.incrementCurrentSlide(-this.options.step);
				this.move();
			}
		} else if(this.options.slideshow) {
			this.stopSlideshow();
		}
	};

	this.goForward = function() {
		if(this.canGoForward()) {
			if(this.mustGoToTheBeggining()) {
				this.updateCurrentSlide(this.auxiliaries.firstSlide);
				this.move(true);
			} else {
				this.incrementCurrentSlide(this.options.step);
				this.move();
			}
		} else if(this.options.slideshow) {
			this.stopSlideshow();
		}
	};
	
	this.navigate = function(index) {
		this.updateCurrentSlide(index);
		this.move();
	};

	this.move = function(no_animation = false) {
		this.updateArrows();
		if(this.options.navigation) this.updateCurrentNavigationItem();
	
		if(no_animation) {
			this.removeStyleSheetRule();
			this.setListPosition('-' + this.getPosition(this.auxiliaries.currentSlide));
		} else {
			const animation_name = helpers.getUniqueName(this.auxiliaries.animationName);
			const origin = this.concatenateUnit((this.auxiliaries.animationRunning ? Math.abs(this.getListPosition()) : this.getPosition(this.auxiliaries.previousSlide)));
			const destination = this.concatenateUnit(this.getPosition(this.auxiliaries.currentSlide));

			this.removeStyleSheetRule();
			this.insertStyleSheetRule(helpers.createKeyframes(animation_name, origin, destination));
			this.setAnimationNameProperty(animation_name);
		}
	};
	
	this.canGoBackward = function() {
		return (this.options.loop || (this.auxiliaries.currentSlide - this.options.step) >= this.auxiliaries.firstSlide);
	};
	
	this.canGoForward = function() {
		return (this.options.loop || (this.auxiliaries.currentSlide + this.options.step) <= this.auxiliaries.lastSlide);
	};
	
	this.mustGoToTheEnd = function() {
		return (this.options.loop && (this.auxiliaries.currentSlide - this.options.step) < this.auxiliaries.firstSlide);
	};
	
	this.mustGoToTheBeggining = function() {
		return (this.options.loop && (this.auxiliaries.currentSlide + this.options.step) > this.auxiliaries.lastSlide);
	};
	
	this.incrementCurrentSlide = function(increment) {
		this.updatePreviousSlide();
		this.auxiliaries.currentSlide += increment;
	};
	
	this.updateCurrentSlide = function(index) {
		this.updatePreviousSlide();
		this.auxiliaries.currentSlide = index;
	};
	
	this.updatePreviousSlide = function() {
		this.auxiliaries.previousSlide = this.auxiliaries.currentSlide;
	};

	this.updateArrows = function() {
		if(this.auxiliaries.currentSlide != this.auxiliaries.firstSlide) {
			this.elements.previousArrow.style.display = 'block';
		} else if(!this.options.loop && this.auxiliaries.currentSlide == this.auxiliaries.firstSlide) {
			this.elements.previousArrow.style.display = 'none';
		}
		
		if(this.auxiliaries.currentSlide != this.auxiliaries.lastSlide) {
			this.elements.nextArrow.style.display = 'block';
		} else if(!this.options.loop && this.auxiliaries.currentSlide == this.auxiliaries.lastSlide) {
			this.elements.nextArrow.style.display = 'none';
		}
	};
	
	this.updateCurrentNavigationItem = function() {
		const active_navigation_item = this.elements.navigation.querySelector('.' + this.auxiliaries.labelActive);
		
		if(active_navigation_item) active_navigation_item.classList.remove(this.auxiliaries.labelActive);
		this.elements.navigationItems.item(this.auxiliaries.currentSlide).classList.add(this.auxiliaries.labelActive);
	};
	
	this.getPosition = function(index) {
		return this.auxiliaries.slidesPositions[index];
	};
	
	this.getListPosition = function() {
		return this.elements.list.offsetLeft;
	};
	
	this.setListPosition = function(position) {
		this.elements.list.style.marginLeft = this.concatenateUnit(position);
	};
	
	this.insertStyleSheetRule = function(rule) {
		this.elements.styleSheet.sheet.insertRule(rule, 0);
	};
	
	this.removeStyleSheetRule = function() {
		if(this.elements.styleSheet.sheet.cssRules.length) this.elements.styleSheet.sheet.deleteRule(0);
	};
	
	this.setAnimationNameProperty = function(animation_name) {
		this.elements.list.style.animationName = animation_name;
	};
	
	this.concatenateUnit = function(value) {
		return value + this.auxiliaries.defaultUnit;
	};
	
	this.treatDirection = function() {
		switch(this.options.direction) {
			case 'forward':
				this.auxiliaries.slideshowMethod = this.goForward.bind(this);
			break;
			case 'backward':
				this.auxiliaries.slideshowMethod = this.goBackward.bind(this);
			break;
			default:
				this.auxiliaries.slideshowMethod = this.goForward.bind(this);
			break;
		}
	};
	
	this.treatInterval = function() {
		this.options.interval = helpers.removeSecondSymbol(this.options.interval) * 1000;
	};
	
	this.startSlideshow = function() {
		this.auxiliaries.slideshowProgress = setInterval(() => {
			this.auxiliaries.slideshowMethod();
		}, this.options.interval);
	};

	this.stopSlideshow = function() {
		clearInterval(this.auxiliaries.slideshowProgress);
	};

	this.restartSlideshow = function() {
		this.stopSlideshow();
		this.startSlideshow();
	};
	
	this.preloadImages = function() {
		const images = this.elements.list.querySelectorAll('img');
		const total_images = images.length;
		let loaded_images = 0;
			
		images.forEach(image => {
			const new_image = new Image();
			new_image.onload = () => {
				if(++loaded_images == total_images) this.init();
			};
			new_image.src = image.getAttribute('src');
		});
	};
	
	this.preloadImages();
	
	return this;
};
