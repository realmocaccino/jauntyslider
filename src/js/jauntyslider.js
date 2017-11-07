/*
 * Jaunty Slider v1.0 - http://jauntyslider.luizgustavoweb.com
 * The quick way to slide a HTML list
 *
 * Open source under the MIT License
 * © 2015 Luiz Gustavo Martins
 */
 
const helpers = require('./helpers.js');

module.exports = function(userOptions)
{
	this.userOptions = userOptions;
	
	this.options = {
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
		defaultUnit: 'px',
		labelActive: 'active'
	};
	
	this.preloadImages = function() {
		const images = this.elements.list.querySelectorAll('img');
		const totalImages = images.length;
		let loadedImages = 0;
			
		images.forEach(image => {
			(new Image()).src = image.getAttribute('src');
			if(++loadedImages == totalImages) this.init();
		});
	};

	this.init = function() {
		this.build();
		this.overrideOptions();
		this.setWidth();
		this.setHeight();
		this.setInitialSlide();
		this.treatInterval();
		this.setSpeed();
		this.setSlidesPositions();
		this.setup();
		this.actions();
		if(this.slideshow) this.startSlideshow();
	};
	
	this.build = function() {
		this.elements.list.removeAttribute('data-jauntyslider');
	
		this.elements.slides = this.elements.list.querySelectorAll('li');
		this.auxiliaries.totalSlides = this.elements.slides.length;
		
		this.elements.wrapper = document.createElement('div');
		this.elements.wrapper.classList.add('jauntyslider-wrapper');
		
		this.elements.scrollWrapper = document.createElement('div');
		this.elements.scrollWrapper.classList.add('jauntyslider-wrapper-scroll');
		
		this.elements.previousArrow = document.createElement('a');
		this.elements.previousArrow.classList.add('jauntyslider-previous');
		this.elements.previousArrow.setAttribute('title', 'Previous');
		
		this.elements.nextArrow = document.createElement('a');
		this.elements.nextArrow.classList.add('jauntyslider-next');
		this.elements.nextArrow.setAttribute('title', 'Next');
		
		this.elements.navigation = document.createElement('ul');
		this.elements.navigation.classList.add('jauntyslider-navigation');
		
		this.elements.slides.forEach(() => this.elements.navigation.appendChild(document.createElement('li')));
		this.elements.navigationItems = this.elements.navigation.querySelectorAll('li');
		
		helpers.wrap(this.elements.scrollWrapper, this.elements.list);
		helpers.wrap(this.elements.wrapper, this.elements.scrollWrapper);
		
		this.elements.wrapper.insertBefore(this.elements.previousArrow, this.elements.scrollWrapper);
		this.elements.wrapper.appendChild(this.elements.nextArrow);
		this.elements.wrapper.appendChild(this.elements.navigation);
	};
	
	this.overrideOptions = function() {
		for(let option in this.userOptions) {
			if(this.options.hasOwnProperty(option)) {
				this.options[option] = this.userOptions[option];
			}
		}
	};
	
	this.setWidth = function() {
		if(!this.userOptions.width) this.options.width = this.elements.list.offsetWidth;
	};
	
	this.setHeight = function() {
		if(!this.userOptions.height) this.options.height = this.elements.list.offsetHeight;
	};
	
	this.setInitialSlide = function() {
		this.auxiliaries.currentSlide = this.options.initial - 1;
	};
	
	this.treatInterval = function() {
		this.options.interval = this.options.interval * 1000;
	};

	this.setSpeed = function() {
		this.speed = (this.speed === undefined) ? 'normal' : this.speed;
		
		switch(this.speed) {
			case 'slow':
				this.speed = 'linear';
				this.auxiliaries.duration = 975;
			break;
			case 'normal':
				this.speed = 'linear';
				this.auxiliaries.duration = 575;
			break;
			case 'fast':
				this.speed = 'linear';
				this.auxiliaries.duration = 275;
			break;
			case 'easein':
				this.speed = 'easeInQuart';
				this.auxiliaries.duration = 875;
			break;
			case 'easeout':
				this.speed = 'easeOutQuart';
				this.auxiliaries.duration = 1275;
			break;
			case 'easeinout':
				this.speed = 'easeInOutQuart';
				this.auxiliaries.duration = 1275;
			break;
			default:
				this.speed = 'linear';
				this.auxiliaries.duration = 575;
			break;
		}
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
		
		this.elements.list.style.width = this.auxiliaries.listWidth + this.auxiliaries.defaultUnit;
	
		//this.move(this.auxiliaries.slidesPositions[this.auxiliaries.currentSlide], 1);
		
		this.elements.navigation.style.marginLeft = '-' + (helpers.getContentWidth(this.elements.navigation) / 2) + this.auxiliaries.defaultUnit;
		
		this.elements.navigationItems.item(this.auxiliaries.currentSlide).classList.add(this.auxiliaries.labelActive);
		
		if(!this.options.loop && this.auxiliaries.totalSlides > 1) {
			this.elements.previousArrow.style.visibility = 'hidden';
		}
		
		if(this.auxiliaries.totalSlides > 1) {
			this.elements.nextArrow.style.visibility = 'visible';
		} else {
			this.elements.nextArrow.style.visibility = 'hidden';
			this.elements.previousArrow.style.visibility = 'hidden';
		}
		
		if(!this.options.navigation) {
			this.elements.navigation.style.visibility = 'hidden';
		}
	};
	
	this.actions = function() {
		this.elements.previousArrow.addEventListener('click', event => {
			event.preventDefault();
			
			this.previousSlide();
			if(this.slideshow) this.restartSlideshow();
		});
		
		this.elements.nextArrow.addEventListener('click', event => {
			event.preventDefault();
			
			this.nextSlide();
			if(this.slideshow) this.restartSlideshow();
		});
		
		this.elements.navigationItems.forEach(item => {
			item.addEventListener('click', event => {
				event.preventDefault();
				
				this.navigate(event.target);
				if(this.slideshow) this.restartSlideshow();
			});
		});
	};

	this.previousSlide = function() {
		if((this.auxiliaries.currentSlide - this.options.step) >= 0 || this.options.loop) {
			if(((this.auxiliaries.currentSlide == 0) || (this.auxiliaries.currentSlide - this.options.step) < 0) && this.options.loop) {
				this.updateCurrentSlide(this.auxiliaries.totalSlides - 1);
				//this.move(this.auxiliaries.slidesPositions[this.auxiliaries.currentSlide], 1);
			} else {
				this.updateCurrentSlide(-this.options.step);
				//this.move(this.auxiliaries.slidesPositions[this.auxiliaries.currentSlide]);
			}
			this.updateCurrentNavigationItem();
		}
	};

	this.nextSlide = function() {
		if((this.auxiliaries.currentSlide + this.options.step) < this.auxiliaries.totalSlides || this.options.loop) {
			if((this.auxiliaries.currentSlide == (this.auxiliaries.totalSlides - 1) || (this.auxiliaries.currentSlide + this.options.step) > (this.auxiliaries.totalSlides - 1)) && this.options.loop) {
				this.updateCurrentSlide(0);
				//this.move(this.auxiliaries.slidesPositions[this.auxiliaries.currentSlide], 1);
			} else {
				this.updateCurrentSlide(this.options.step);
				//this.move(this.auxiliaries.slidesPositions[this.auxiliaries.currentSlide]);
			}
			this.updateCurrentNavigationItem();
		} else if(this.options.slideshow) {
			this.stopSlideshow();
		}
	};

	this.navigate = function(item) {
		this.auxiliaries.currentSlide = $(item).index();
		//this.move(this.auxiliaries.slidesPositions[this.auxiliaries.currentSlide]);
		this.navigationItems.removeClass(this.auxiliaries.labelActive);
		$(item).addClass(this.auxiliaries.labelActive);
	};

	this.move = function(position, duration) {
		this.scroll.stop().animate({
			scrollLeft: position
		}, duration ? duration : this.auxiliaries.duration, this.speed, function(){
			this.updateArrows();
		}.bind(this));
	};
	
	this.updateCurrentSlide = function(increment) {
		this.auxiliaries.currentSlide += increment;
	};

	this.updateArrows = function() {
		this.previousArrow.removeClass().addClass('slider-previous');
		this.nextArrow.removeClass().addClass('slider-next');
		if(this.auxiliaries.currentSlide == 0 && !this.loop) {
			this.previousArrow.css('visibility','hidden');
		}
		if(this.auxiliaries.currentSlide != 0) {
			this.previousArrow.css('visibility','visible');
		}
		if(this.auxiliaries.currentSlide == (this.auxiliaries.totalSlides-1) && !this.loop) {
			this.nextArrow.css('visibility','hidden');
		}
		if(this.auxiliaries.currentSlide != (this.auxiliaries.totalSlides-1)) {
			this.nextArrow.css('visibility','visible');
		}
	};
	
	this.updateCurrentNavigationItem = function() {
		this.elements.navigation.querySelector('.' + this.auxiliaries.labelActive).classList.remove(this.auxiliaries.labelActive);
		this.elements.navigationItems.item(this.auxiliaries.currentSlide).classList.add(this.auxiliaries.labelActive);
	};
	
	this.startSlideshow = function() {
		this.progressSlideshow = setInterval(function(){
			this.nextSlide();
		}.bind(this), this.interval);
	};

	this.stopSlideshow = function() {
		clearInterval(this.progressSlideshow);
	};

	this.restartSlideshow = function() {
		this.stopSlideshow();
		this.startSlideshow();
	};
	
	return this;
};
