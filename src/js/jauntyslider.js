/*
 * Jaunty Slider v1.0 - http://jauntyslider.luizgustavoweb.com
 * The quick way to slide a HTML list
 *
 * Open source under the MIT License
 * © 2015 Luiz Gustavo Martins
 */
 
const helpers = require('./helpers.js');

module.exports = function(user_options)
{
	this.userOptions = user_options;
	
	this.options = {
		easing: 'ease',
		height: null,
		initial: 1,
		interval: 5,
		loop: false,
		navigation: true,
		slideshow: false,
		speed: 'normal',
		step: 1,
		width: null
	};
	
	this.elements = {
		list: this
	};
	
	this.auxiliaries = {
		animationBlocked: false,
		animationIteration: 1,
		animationName: 'jauntyslider-move',
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
		this.treatInterval();
		this.setDuration();
		this.setAnimationProperties();
		this.setSlidesPositions();
		this.setup();
		this.actions();
		if(this.slideshow) this.startSlideshow();
	};
	
	this.overrideOptions = function() {
		for(let option in this.userOptions) {
			if(this.options.hasOwnProperty(option)) {
				this.options[option] = helpers.checkString(this.userOptions[option]);
			}
		}
	};
	
	this.build = function() {
		this.elements.list.removeAttribute('data-jauntyslider');
	
		this.elements.slides = Array.from(this.elements.list.children);
		
		this.auxiliaries.totalSlides = this.elements.slides.length;
		this.auxiliaries.lastSlide = this.elements.slides.length - 1;
		
		this.elements.wrapper = document.createElement('div');
		this.elements.wrapper.classList.add('jauntyslider-wrapper');
		
		this.elements.previousArrow = document.createElement('a');
		this.elements.previousArrow.classList.add('jauntyslider-previous');
		this.elements.previousArrow.setAttribute('title', 'Previous');
		
		this.elements.nextArrow = document.createElement('a');
		this.elements.nextArrow.classList.add('jauntyslider-next');
		this.elements.nextArrow.setAttribute('title', 'Next');
		
		helpers.wrap(this.elements.wrapper, this.elements.list);
		
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
	
	this.treatInterval = function() {
		this.options.interval = this.options.interval * 1000;
	};

	this.setDuration = function() {
		switch(this.options.speed) {
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
				this.options.duration = '0.7s';
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
		this.elements.wrapper.style.width = this.options.width;
		this.elements.wrapper.style.height = this.options.height;
		
		this.elements.list.style.width = this.concatenateUnit(this.auxiliaries.listWidth);
		
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
			
			if(!this.auxiliaries.animationBlocked) {
				this.goBack();
				if(this.slideshow) this.restartSlideshow();
			}
		});
		
		this.elements.nextArrow.addEventListener('click', event => {
			event.preventDefault();
			
			if(!this.auxiliaries.animationBlocked) {
				this.goForward();
				if(this.slideshow) this.restartSlideshow();
			}
		});
		
		if(this.options.navigation) {
			this.elements.navigationItems.forEach((item, index) => {
				item.addEventListener('click', event => {
					event.preventDefault();
				
					if(!this.auxiliaries.animationBlocked) {
						this.navigate(index);
						if(this.slideshow) this.restartSlideshow();
					}
				});
			});
		}
		
		this.elements.list.addEventListener('animationstart', event => {
			this.auxiliaries.animationBlocked = true;
		});
		
		this.elements.list.addEventListener('animationend', event => {
			this.auxiliaries.animationBlocked = false;
		});
	};

	this.goBack = function() {
		if(this.canGoBack()) {
			if(this.mustGoToTheEnd()) {
				this.updateCurrentSlide(this.auxiliaries.lastSlide);
				this.move(true);
			} else {
				this.incrementCurrentSlide(-this.options.step);
				this.move();
			}
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
			const animation_name = this.auxiliaries.animationName + this.auxiliaries.animationIteration++;
			const origin = this.concatenateUnit(this.getPosition(this.auxiliaries.previousSlide));
			const destination = this.concatenateUnit(this.getPosition(this.auxiliaries.currentSlide));
		
			this.removeStyleSheetRule();
			this.insertStyleSheetRule(helpers.createKeyframes(animation_name, origin, destination));
			this.setAnimationNameProperty(animation_name);
		}
	};
	
	this.canGoBack = function() {
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
	
	this.setListPosition = function(position) {
		this.elements.list.style.marginLeft = this.concatenateUnit(position);
	};
	
	this.insertStyleSheetRule = function(rule) {
		this.elements.styleSheet.sheet.insertRule(rule, 0);
	};
	
	this.removeStyleSheetRule = function() {
		if(this.elements.styleSheet.sheet.cssRules.length) this.elements.styleSheet.sheet.deleteRule(0);
	};
	
	this.setAnimationNameProperty = function(animationName) {
		this.elements.list.style.animationName = animationName;
	};
	
	this.concatenateUnit = function(value) {
		return value + this.auxiliaries.defaultUnit;
	};
	
	this.startSlideshow = function() {
		this.progressSlideshow = setInterval(function(){
			this.goForward();
		}.bind(this), this.interval);
	};

	this.stopSlideshow = function() {
		clearInterval(this.progressSlideshow);
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
