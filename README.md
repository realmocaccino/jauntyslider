# Jauntyslider
The quick way to slide a HTML list<br>https://jauntyslider.luizgustavoweb.com

## Introduction
Jauntyslider lets you create a slider from your HTML list with just one step. All you need to do is attach the attibute *data-jauntyslider* on the  list like the example below:

```html
<ul data-jauntyslider>
```

Or you can do it by the classic way in your script:

```js
document.querySelector('ul').jauntyslider();
```

## No Dependencies
You read that right! No jQuery. No dependencies at all.<br>

## Install
In order to be able to use Jauntyslider, [download the zip file](https://github.com/lgustavoms/jauntyslider/archive/master.zip) then include the css and javascript files in your document:

```html
<link href="dist/css/jauntyslider.min.css" rel="stylesheet">
<script src="dist/js/jauntyslider.min.js"></script>
```

Put the arrows image in your *img* folder as well.

## Usage
As stated in the introduction, we start using the attribute *data-jauntyslider*.

```html
<ul data-jauntyslider>
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

And there you go! The Jauntyslider is up and running in your list.

You can also set parameters to customize the slider. For instance, you can make the slider move faster like this:

```html
<ul data-jauntyslider="duration:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

You can set more than one parameter at a time:

```html
<ul data-jauntyslider="duration:fast; easing:linear;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

Jauntyslider supports multiple sliders on the same page:

```html
<ul id="slider-1" data-jauntyslider="duration:fast; easing:linear;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>

<ul id="slider-2" data-jauntyslider="loop:true;">
	<li><img src="my-pet.jpg"></li>
	[...]
</ul>
```

## Parameters

### animation

**[options: move | fade | none]**

**[default: move]**

Defines the transition animation.

### direction

**[options: forward | backward]**

**[default: forward]**

Defines the direction of the slideshow.

### duration

**[options: seconds | slow | normal | fast]**

**[default: normal]**

Defines how long the transition animation will run.

### easing

**[options: linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n)]**

**[default: ease]**

Defines the easing function of the transition animation.

### height

**[options: %, px, pt, em, in...]**

**[default: inheritance]**

Sets the height of the slider.<br>
If not set, it dinamically inherits the height of the original list.

### initial

**[options: integer]**

**[default: 1]**

Defines in which slide the slider will start.<br>
The first slide is 1 and the last slide is *n*.

### interval

**[options: seconds]**

**[default: 5]**

Defines the interval in seconds between the transitions of the slideshow.

### loop

**[options: true | false]**

**[default: false]**

If *true*, when reaching the end of the slider, it'll come back to the beginning.

### navigation

**[options: true | false]**

**[default: true]**

If *false* hides the navigation on the bottom.

### slideshow

**[options: true | false]**

**[default: false]**

If *true*, enables an automatic transition of the slides.<br>
The navigation is allowed even so.

### slideshowDirection

**[options: forward | backward]**

**[default: forward]**

Defines the direction of the slideshow.

### slideshowInterval

**[options: seconds]**

**[default: 5]**

Defines the interval in seconds between the transitions of the slideshow.<br>
It begins to count only when the current transition is completed.

### step

**[options: integer]**

**[default: 1]**

Allows to change the number of the slides travelled by every transition.

### width

**[options: %, px, pt, em, in...]**

**[default: inheritance]**

Sets the width of the slider.<br>
If not set, it dinamically inherits the width of the original list.

## Behind the Scenes
Jauntyslider is built upon CSS transitions. The codebase takes advantage of the new features of ES6 compiled to ES5 to support old browsers. We're keeping an eye on Web Animations API because it has proven to be more flexible over rAF.

## Contribution
Future versions with more options are to come. If you want to contribute with the project, don't hesitate to fork it and send a pull request.<br>

## License
Jauntyslider is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Author
[www.luizgustavoweb.com](http://www.luizgustavoweb.com)
