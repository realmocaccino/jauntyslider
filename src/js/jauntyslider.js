/*
 * Jaunty Slider v1.0 - http://jauntyslider.luizgustavoweb.com
 * The quick way to slide a HTML list
 *
 * Open source under the MIT License
 * © 2015 Luiz Gustavo Martins
 */

module.exports = function(options)
{
	this.list = this;
	this.labelActive = 'active';
	this.options = options;
	this.defaults = {
		interval: 5000,
		loop: false,
		navigation: true,
		slideshow: false,
		speed: 'normal',
		start: 0,
		step: 1
	}

	this.init = function() {
		this.setOptions();
		this.setWidth();
		this.setHeight();
		this.setSpeed();
		this.build();
		this.actions();
		this.finishing();
		if(this.slideshow) {
			this.startSlideshow();
		}
	}
	
	this.setOptions = function() {
		for(let defaultOption in this.defaults) {
			if(!this.options.hasOwnProperty(defaultOption)) {
				this.options[defaultOption] = this.defaults[defaultOption];
			}
		}
	}
	
	this.setWidth = function() {
		if(!this.options.width) this.options.width = this.offsetWidth;
	}
	
	this.setHeight = function() {
		if(!this.options.height) this.options.height = this.offsetHeight;
	}

	this.startSlideshow = function() {
		this.progressSlideshow = setInterval(function(){
			this.nextSlide();
		}.bind(this), this.interval);
	}

	this.stopSlideshow = function() {
		clearInterval(this.progressSlideshow);
	}

	this.restartSlideshow = function() {
		this.stopSlideshow();
		this.startSlideshow();
	}

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
	}

	this.build = function() {
		
		let sliderWrapper = document.createElement('div').classList.add('slider');
		let sliderScrollWrapper = document.createElement('div').classList.add('slider-scroll');
		
		sliderWrapper.classList.add('slider');
		sliderScrollWrapper.classList.add('slider-scroll');
		
		this.list.parentNode.insertBefore(sliderScrollWrapper, this.list);
		sliderScrollWrapper.appendChild(this.list);
		
		sliderScrollWrapper.parentNode.insertBefore(sliderWrapper, sliderScrollWrapper);
		sliderWrapper.appendChild(sliderScrollWrapper);
	
		//this.list.wrap('<div class="slider"><div class="slider-scroll"></div></div>');
		this.slider = this.list.parents('.slider');
		this.slider.width(this.width).height(this.height);
		this.scroll = this.slider.children('.slider-scroll');
		this.scroll.before('<a class="slider-previous" title="Previous"></a>');
		this.previousArrow = this.slider.children('.slider-previous');
		this.scroll.after('<a class="slider-next" title="Next"></a>');
		this.nextArrow = this.slider.children('.slider-next');
		this.slides = this.list.children();
		this.totalSlides = this.slides.length;
		this.slider.append('<ul class="navigation"></ul>');
		this.navigation = this.slider.children('ul.navigation');
		this.slides.each(function(index, element){
			this.navigation.append('<li></li>');
		}.bind(this));
		this.navigationSlides = this.navigation.children();
	}

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
	}

	this.finishing = function() {
		var widthList = 0;
		this.positionSlides = new Array();
		this.slides.each(function(index, element){
			this.positionSlides[index] = widthList;
			widthList += $(element).width();
		}.bind(this));
		this.list.width(widthList);
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
	}

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
	}

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
	}

	this.navigate = function(seletor) {
		this.currentSlide = $(seletor).index();
		this.move(this.positionSlides[this.currentSlide]);
		this.navigationSlides.removeClass(this.labelActive);
		$(seletor).addClass(this.labelActive);
	}

	this.move = function(position, duration) {
		this.scroll.stop().animate({
			scrollLeft: position
		}, duration ? duration : this.duration, this.speed, function(){
			this.updateArrows();
		}.bind(this));
	}

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
	}
	
	this.init();
}
