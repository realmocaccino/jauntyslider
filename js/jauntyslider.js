/*
 * Jaunty Slider v1.0 - http://jauntyslider.luizgustavoweb.com
 * The quick way to slide a HTML list
 *
 * Open source under the MIT License
 * Copyright © 2015 Luiz Gustavo Martins
 *
 *
 * Includes jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Uses the built in easing capabilities added In jQuery 1.1 to offer multiple easing options
 *
 * Open source under the BSD License
 * Copyright © 2008 George McGinley Smith
 *
 */
 
jQuery.extend(jQuery.easing, {
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	}
});
 
$(document).ready(function(){
	$('ul[data-jauntyslider]').each(function(index){
		new jauntyslider(this).init();
	});
});

function jauntyslider(list) {

	var self = this;
	this.list = $(list);
	this.labelActive = 'active';
	
	this.init = function() {
		this.getParameters();
		this.treatParameters();
		this.setSpeed();
		this.preloadImages();
		this.loadingImages = setInterval(function(){
			if(self.allImagesLoaded) {
				clearInterval(self.loadingImages);
				self.build();
				self.actions();
				self.finishing();
				if(self.slideshow) {
					self.startSlideshow();
				}
			}
		}, 50);
	};
	
	this.getParameters = function() {
		var data = this.list.data('jauntyslider').replace(/\s+/g, '').split(';');
		for(i in data) {
			if(data[i]) {
				this[data[i].split(':')[0].toLowerCase()] = data[i].split(':')[1].toLowerCase();
			}
		}
	}
	
	this.treatParameters = function() {
		this.loop = (this.loop === 'true');
		this.width = (this.width === undefined) ? this.list.width() : this.width;
		if(this.height === undefined) { this.treatHeight(); }
		this.slideshow = (this.slideshow === 'true');
		this.interval = (this.interval === undefined) ? 5000 : parseInt(this.interval.replace('s', '')) * 1000;
		this.step = (this.step === undefined) ? 1 : parseInt(this.step);
		this.showNavigation = (this.navigation === undefined) ? true : (this.navigation === 'true');
		this.currentSlide = (this.start === undefined) ? 0 : this.start - 1;
	}
	
	this.treatHeight = function() {
		if(this.list.height() < window.innerHeight) {
			this.height = this.list.height();
		} else {
			/*var heightChildren = 0;
			this.list.parent().children().each(function(){
				if($(this).attr('data-jauntyslider') == undefined) {
					heightChildren += $(this).height();
				}
			});
			this.height = this.list.parent().height() - heightChildren;*/
			this.height = this.list.parent().height();
			if(this.height > window.innerHeight) {
				this.height = window.innerHeight - $('body').offset().top;
			}
		}	
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
	
	this.preloadImages = function() {
		var images = this.list.find('img'),
			loadedImages = 0,
			totalImages = images.length;
		this.allImagesLoaded = false;
		images.load(function() {
			if(++loadedImages === totalImages) {
				self.allImagesLoaded = true;
			}
		});
	}

	this.build = function() {
		this.list.wrap('<div class="slider"><div class="slider-scroll"></div></div>');
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
		this.slides.each(function(index){
			self.navigation.append('<li></li>');
		});
		this.navigationSlides = this.navigation.children();
	}

	this.actions = function() {
		this.previousArrow.on('click', function(event) {
			self.previousSlide();
			event.preventDefault();
		});
		this.nextArrow.on('click', function(event) {
			self.nextSlide();
			event.preventDefault();
		});
		this.navigationSlides.on('click', function(event) {
			self.navigate(this);
			event.preventDefault();
		});
		if(this.slideshow) {
			this.previousArrow.add(this.nextArrow).add(this.navigationSlides).on('click', function(event) {
				self.restartSlideshow();
			});
		}
	}

	this.finishing = function() {
		var widthList = 0;
		this.positionSlides = new Array();
		this.slides.each(function(index){
			self.positionSlides[index] = widthList;
			widthList += $(this).width();
		});
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
	};

	this.move = function(position, duration) {
		this.scroll.stop().animate({
			scrollLeft: position
		}, duration ? duration : self.duration, self.speed, function(){
			self.updateArrows();
		});
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
	
	this.startSlideshow = function() {
		this.progressSlideshow = setInterval(function(){
			self.nextSlide();
		}, self.interval);
	}
	
	this.stopSlideshow = function() {
		clearInterval(this.progressSlideshow);
	}
	
	this.restartSlideshow = function() {
		this.stopSlideshow();
		this.startSlideshow();
	}

}
