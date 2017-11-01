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
		interval: 5000,
		loop: false,
		navigation: true,
		slideshow: false,
		speed: 'normal',
		start: 0,
		step: 1,
		width: null
	};
	
	this.elements = {
		list: this
	};

	this.labelActive = 'active';
	
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
		this.overrideOptions();
		this.setWidth();
		this.setHeight();
		this.setSpeed();
		this.build();
		this.actions();
		this.finishing();
		if(this.slideshow) {
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
	
	this.setWidth = function() {
		if(!this.userOptions.width) this.options.width = this.offsetWidth;
	};
	
	this.setHeight = function() {
		if(!this.userOptions.height) this.options.height = this.offsetHeight;
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

	this.setSpeed = function() {
		this.speed = (this.speed === undefined) ? 'normal' : this.speed;
		switch(this.speed) {
			case 'slow':
				this.speed = 'linear';
				this.duration = 975;
			break;
			case 'normal':
				this.speed = 'linear';
				this.duration = 575;
			break;
			case 'fast':
				this.speed = 'linear';
				this.duration = 275;
			break;
			case 'easein':
				this.speed = 'easeInQuart';
				this.duration = 875;
			break;
			case 'easeout':
				this.speed = 'easeOutQuart';
				this.duration = 1275;
			break;
			case 'easeinout':
				this.speed = 'easeInOutQuart';
				this.duration = 1275;
			break;
			default:
				this.speed = 'linear';
				this.duration = 575;
			break;
		}
	};

	this.build = function() {
		
		this.elements.slides = this.elements.list.querySelectorAll('li');
		this.totalSlides = this.elements.slides.length;
		
		this.elements.wrapper = document.createElement('div');
		this.elements.wrapper.classList.add('jauntyslider-wrapper');
		this.elements.wrapper.style.width = this.options.width;
		this.elements.wrapper.style.height = this.options.height;
		
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
		this.elements.navigationSlides = this.elements.navigation.querySelectorAll('li');
		
		helpers.wrap(this.elements.scrollWrapper, this.elements.list);
		helpers.wrap(this.elements.wrapper, this.elements.scrollWrapper);
		
		this.elements.wrapper.insertBefore(this.elements.previousArrow, this.elements.scrollWrapper);
		this.elements.wrapper.appendChild(this.elements.nextArrow);
		this.elements.wrapper.appendChild(this.elements.navigation);
		
	};

	this.actions = function() {
		this.previousArrow.on('click', function(event) {
			this.previousSlide();
			event.preventDefault();
		}.bind(this));
		this.nextArrow.on('click', function(event) {
			this.nextSlide();
			event.preventDefault();
		}.bind(this));
		this.navigationSlides.on('click', function(event) {
			this.navigate(this);
			event.preventDefault();
		}.bind(this));
		if(this.slideshow) {
			this.previousArrow.add(this.nextArrow).add(this.navigationSlides).on('click', function(event) {
				this.restartSlideshow();
			}.bind(this));
		}
	};

	this.finishing = function() {
		var widthList = 0;
		this.positionSlides = new Array();
		this.slides.each(function(index, element){
			this.positionSlides[index] = widthList;
			widthList += $(element).width();
		}.bind(this));
		this.elements.list.width(widthList);
		if(this.currentSlide > (this.totalSlides-1)) {
			this.currentSlide = this.totalSlides - 1;
		} else if(this.currentSlide < 0) {
			this.currentSlide = 0;
		}
		this.move(this.positionSlides[this.currentSlide], 1);
		this.navigation.css('margin-left', '-'+this.navigation.width()+'px');
		this.navigationSlides.eq(this.currentSlide).addClass(this.labelActive);
		if(!this.loop && this.totalSlides > 1) {
			this.previousArrow.css('visibility','hidden');
		}
		if(this.totalSlides > 1) {
			this.nextArrow.css('visibility','visible');
		} else {
			this.nextArrow.css('visibility','hidden');
			this.navigation.css('visibility', 'hidden');
		}
		if(!this.showNavigation) {
			this.navigation.css('visibility', 'hidden');
		}
	};

	this.previousSlide = function() {
		if((this.currentSlide-this.step) >= 0 || this.loop) {
			if(((this.currentSlide == 0) || (this.currentSlide-this.step) < 0) && this.loop) {
				this.currentSlide = this.totalSlides-1;
				this.move(this.positionSlides[this.currentSlide], 1);
			} else {
				this.currentSlide -= this.step;
				this.move(this.positionSlides[this.currentSlide]);
			}
			this.navigation.find('.'+this.labelActive).removeClass(this.labelActive);
			this.navigationSlides.eq(this.currentSlide).addClass(this.labelActive);
		}
	};

	this.nextSlide = function() {
		if((this.currentSlide+this.step) <= (this.totalSlides-1) || this.loop) {
			if((this.currentSlide == (this.totalSlides-1) || (this.currentSlide+this.step) > (this.totalSlides-1)) && this.loop) {
				this.currentSlide = 0;
				this.move(this.positionSlides[this.currentSlide], 1);
			} else {
				this.currentSlide += this.step;
				this.move(this.positionSlides[this.currentSlide]);
			}
			this.navigation.find('.'+this.labelActive).removeClass(this.labelActive);
			this.navigationSlides.eq(this.currentSlide).addClass(this.labelActive);
		} else if(this.slideshow) {
			this.stopSlideshow();
		}
	};

	this.navigate = function(seletor) {
		this.currentSlide = $(seletor).index();
		this.move(this.positionSlides[this.currentSlide]);
		this.navigationSlides.removeClass(this.labelActive);
		$(seletor).addClass(this.labelActive);
	};

	this.move = function(position, duration) {
		this.scroll.stop().animate({
			scrollLeft: position
		}, duration ? duration : this.duration, this.speed, function(){
			this.updateArrows();
		}.bind(this));
	};

	this.updateArrows = function() {
		this.previousArrow.removeClass().addClass('slider-previous');
		this.nextArrow.removeClass().addClass('slider-next');
		if(this.currentSlide == 0 && !this.loop) {
			this.previousArrow.css('visibility','hidden');
		}
		if(this.currentSlide != 0) {
			this.previousArrow.css('visibility','visible');
		}
		if(this.currentSlide == (this.totalSlides-1) && !this.loop) {
			this.nextArrow.css('visibility','hidden');
		}
		if(this.currentSlide != (this.totalSlides-1)) {
			this.nextArrow.css('visibility','visible');
		}
	};
	
	return this;
};
