/*
 * Jaunty Slider v2.0 - http://jauntyslider.luizgustavoweb.com
 * The quickest way to slide a HTML list
 *
 * Open source under the MIT License
 * © 2017 Luiz Gustavo Martins
 */
 
const helpers = require('./helpers.js');

module.exports = function(userOptions)
{
	this.userOptions = userOptions;
	
	this.options = {
		animation: 'move',
		duration: 'normal',
		easing: 'ease',
		height: null,
		initial: 1,
		loop: false,
		navigation: true,
		slideshow: false,
		slideshowDirection: 'forward',
		slideshowInterval: 5,
		step: 1,
		width: null
	};
	
	this.elements = {
		list: this
	};
	
	this.auxiliaries = {
		transitionRunning: false,
		defaultUnit: 'px',
		isLoop: false,
		labelActive: 'active'
	};

	this.init = function() {
		this.overrideOptions();
		this.build();
		this.setWidth();
		this.setHeight();
		this.treatDuration();
		this.setSlidesAuxiliaries();
		this.setSlidesPositions();
		this.setup();
		this.actions();
		
		if(this.options.slideshow) {
			this.treatSlideshowDirection();
			this.treatSlideshowInterval();
			this.moveBySlideshow();
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
			this.elements.navigationItems = Array.from(this.elements.navigation.querySelectorAll('li'));
			
			this.elements.wrapper.appendChild(this.elements.navigation);
			
		}
	};
	
	this.setWidth = function() {
		if(!this.userOptions.width) this.options.width = this.elements.list.offsetWidth;
	};
	
	this.setHeight = function() {
		if(!this.userOptions.height) this.options.height = this.elements.list.offsetHeight || this.elements.slides[0].offsetHeight;
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
	
	this.setSlidesAuxiliaries = function() {
		this.auxiliaries.currentSlide = this.options.initial - 1;
		this.auxiliaries.nextSlide = this.auxiliaries.currentSlide;
		this.auxiliaries.previousSlide = null;
		this.auxiliaries.firstSlide = 0;
		this.auxiliaries.lastSlide = this.elements.slides.length - 1;
		this.auxiliaries.totalSlides = this.elements.slides.length;
	};
	
	this.setSlidesPositions = function() {
		this.auxiliaries.listWidth = 0;
		
		this.elements.slides.forEach(slide => {
			this.auxiliaries.listWidth += slide.offsetWidth;
		});
		
		this.auxiliaries.slidesPositions = helpers.getPositions(this.elements.slides, this.options.width, this.auxiliaries.listWidth);
	};

	this.setup = function() {
		this.elements.list.removeAttribute('data-jauntyslider');
		
		this.elements.wrapper.style.setProperty('width', this.concatenateUnit(this.options.width));
		this.elements.wrapper.style.setProperty('height', this.concatenateUnit(this.options.height));

		this.elements.list.style.setProperty('width', this.concatenateUnit(this.auxiliaries.listWidth), 'important');
		this.elements.list.style.setProperty('height', this.concatenateUnit(this.options.height));

		this.updateListPosition();
		
		if(this.options.loop && this.auxiliaries.totalSlides > 1) {
			this.elements.nextArrow.style.display = 'block';
			this.elements.previousArrow.style.display = 'block';
		} else {
			this.updateArrows();
		}
		
		if(this.options.navigation) {
			this.updateCurrentNavigationItem();
			this.elements.navigation.style.marginLeft = this.concatenateUnit('-' + (this.elements.navigation.offsetWidth / 2));
		}
	};
	
	this.actions = function() {
		this.elements.previousArrow.addEventListener('click', event => {
			event.preventDefault();
			if(this.options.slideshow) this.cancelMoveBySlideshow();
			
			this.goBackward();
		});
		
		this.elements.nextArrow.addEventListener('click', event => {
			event.preventDefault();
			if(this.options.slideshow) this.cancelMoveBySlideshow();
			
			this.goForward();
		});
		
		if(this.options.navigation) {
			this.elements.navigationItems.forEach((item, index) => {
				item.addEventListener('click', event => {
					event.preventDefault();
					if(this.options.slideshow) this.cancelMoveBySlideshow();
					
					this.navigate(index);
				});
			});
		}
		
		this.elements.list.addEventListener('transitionstart', event => {
			this.auxiliaries.transitionRunning = true;
		});
		
		this.elements.list.addEventListener('transitionend', event => {
			this.auxiliaries.transitionRunning = false;
			
			if(this.options.slideshow) this.moveBySlideshow();
		});
	};
	
	this.treatSlideshowDirection = function() {
		switch(this.options.slideshowDirection) {
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
	
	this.treatSlideshowInterval = function() {
		this.options.slideshowInterval = helpers.removeSecondSymbol(this.options.slideshowInterval) * 1000;
	};
	
	this.moveBySlideshow = function() {
		this.auxiliaries.slideshowTimeout = setTimeout(() => {
			this.auxiliaries.slideshowMethod();
		}, this.options.slideshowInterval);
	};
	
	this.cancelMoveBySlideshow = function() {
		clearTimeout(this.auxiliaries.slideshowTimeout);
	};

	this.goBackward = function() {
		if(this.canGoBackward()) {
			if(this.mustGoToTheEnd()) {
				this.updateNextSlide(this.auxiliaries.lastSlide);
				this.auxiliaries.isLoop = true;
			} else {
				this.updateNextSlide(this.auxiliaries.currentSlide - this.options.step);
			}
			this.move();
		}
	};

	this.goForward = function() {
		if(this.canGoForward()) {
			if(this.mustGoToTheBeggining()) {
				this.updateNextSlide(this.auxiliaries.firstSlide);
				this.auxiliaries.isLoop = true;
			} else {
				this.updateNextSlide(this.auxiliaries.currentSlide + this.options.step);
			}
			this.move();
		}
	};
	
	this.navigate = function(index) {
		this.updateNextSlide(index);
		this.move();
	};

	this.move = function() {
		this.updateOSD();
		this.animate();
		this.updateListPosition();
		this.updateCurrentSlide(this.auxiliaries.nextSlide);
	};
	
	this.animate = function() {
		if(this.options.animation != 'none') {
			if(this.auxiliaries.isLoop) {
				 this.fade();
				 this.auxiliaries.isLoop = false;
			} else {
				switch(this.options.animation) {
					case 'move':
						this.setTransitionProperties('margin-left');
					break;
					case 'fade':
						this.fade();
					break;
				}
			}
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
	
	this.updateNextSlide = function(index) {
		this.auxiliaries.nextSlide = index;
	};
	
	this.updateCurrentSlide = function(index) {
		this.updatePreviousSlide(this.auxiliaries.currentSlide);
		this.auxiliaries.currentSlide = index;
	};
	
	this.updatePreviousSlide = function(index) {
		this.auxiliaries.previousSlide = index;
	};
	
	this.updateOSD = function() {
		if(!this.options.loop) this.updateArrows();
		if(this.options.navigation) this.updateCurrentNavigationItem();
	};

	this.updateArrows = function() {
		if(this.auxiliaries.nextSlide != this.auxiliaries.firstSlide) {
			this.elements.previousArrow.style.display = 'block';
		} else if(this.auxiliaries.nextSlide == this.auxiliaries.firstSlide) {
			this.elements.previousArrow.style.display = 'none';
		}
		
		if(this.auxiliaries.nextSlide != this.auxiliaries.lastSlide) {
			this.elements.nextArrow.style.display = 'block';
		} else if(this.auxiliaries.nextSlide == this.auxiliaries.lastSlide) {
			this.elements.nextArrow.style.display = 'none';
		}
	};
	
	this.updateCurrentNavigationItem = function() {
		this.elements.navigationItems[this.auxiliaries.currentSlide].classList.remove(this.auxiliaries.labelActive);
		this.elements.navigationItems[this.auxiliaries.nextSlide].classList.add(this.auxiliaries.labelActive);
	};
	
	this.getPosition = function(index) {
		return this.auxiliaries.slidesPositions[index];
	};
	
	this.setListPosition = function(position) {
		this.elements.list.style.marginLeft = this.concatenateUnit(position);
	};
	
	this.updateListPosition = function() {
		this.setListPosition('-' + this.getPosition(this.auxiliaries.nextSlide));
	};
	
	this.concatenateUnit = function(value) {
		if(!helpers.hasUnit(value)) {
			return value + this.auxiliaries.defaultUnit;
		} else {
			return value;
		}
	};
	
	this.setTransitionProperties = function(property, duration = null, easing = null) {
		var duration = duration || this.options.duration;
		var easing = easing || this.options.easing;
		
		this.elements.list.style.transition = [property, duration, easing].join(' ');
	};
	
	this.removeTransitionProperties = function() {
		this.elements.list.style.transition = null;
	};
	
	this.fade = function() {
		this.removeTransitionProperties();
		this.elements.list.style.opacity = 0;
		setTimeout(() => {
			if(this.options.animation == 'fade') {
				this.setTransitionProperties('opacity');
			} else {
				this.setTransitionProperties('opacity', '0.5s', 'ease');
			}
			this.elements.list.style.opacity = 1;
		}, 20);
	};
	
	this.preloadImages = function() {
		const images = Array.from(this.elements.list.querySelectorAll('img'));
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
