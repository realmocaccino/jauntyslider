# Jauntyslider
The quickest way to slide a HTML list<br>http://jauntyslider.luizgustavoweb.com

## Introduction
Jauntyslider lets you create a slider from your HTML list with just one step. All you need to do is attach the attibute *data-jauntyslider* on the  list like the example below:

```html
<ul data-jauntyslider>
```

Or if you need flexibility to select the element and set options, you can do this way:

```js
document.querySelector('ul').jauntyslider();
```

## No Requirements
You heard it right! No jQuery. No requirements at all.<br>

## Install
In order to be able to use Jauntyslider, [download the zip file](https://github.com/lgustavoms/jauntyslider/archive/master.zip) then include the css and javascript files in your document:

```html
<link href="dist/css/jauntyslider.min.css" rel="stylesheet">
<script src="dist/js/jauntyslider.min.js"></script>
```

Put the arrow images in your *img* folder as well.

## Usage
As stated in the introduction, we start using the attribute *data-jauntyslider*.

```html
<ul data-jauntyslider>
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

And there you go! The Jauntyslider is up and running in your list.<br>
You can also set parameters to customize the slider.<br>
If you want the slider to move faster, for instance, you can do like the example below:

```html
<ul data-jauntyslider="speed:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

You can set more than one parameter at a time:

```html
<ul data-jauntyslider="speed:fast; loop:true;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

Jauntyslider supports multiple sliders on the same page:

```html
<ul id="slider-1" data-jauntyslider="speed:fast; loop:true;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>

<ul id="slider-2" data-jauntyslider="interval:3s;">
	<li><img src="my-pet.jpg"></li>
	[...]
</ul>
```

## Parameters

### Duration

**[options: seconds | slow | normal | fast]**

**[default: normal]**

Defines how long the transition animation will run.

### Easing

**[options: linear | ease | ease-in | ease-out | ease-in-out]**

**[default: ease]**

Defines the easing function of the transition animation.

### Loop

**[options: true | false]**

**[default: false]**

If *true*, when reaching the end of the slider, it'll come back to the beginning.

### Width

**[options: %, px, pt, em, in...]**

**[default: inheritance]**

Sets the width of the slider.<br>
If not set, it dinamically inherits the width of the original list.

### Height

**[options: %, px, pt, em, in...]**

**[default: inheritance]**

Sets the height of the slider.<br>
If not set, it dinamically inherits the height of the original list.

### Slideshow

**[options: true | false]**

**[default: false]**

If *true*, enables an automatic transition of the slides.<br>
The navigation is allowed even so.

### Direction

**[options: forward | backward]**

**[default: forward]**

Defines the direction of the slideshow.

### Interval

**[options: seconds]**

**[default: 5]**

Defines the interval in seconds between the transitions of the slideshow.

### Navigation

**[options: true | false]**

**[default: true]**

If *false* hides the navigation on the bottom.

### Initial

**[options: integer]**

**[default: 1]**

Defines in which slide the slider will start.<br>
The first slide is 1 and the last slide is *n*.

### Step

**[options: integer]**

**[default: 1]**

Allows to change the number of the slides travelled by every transition.

## Contribution
Future versions with more options are to come.<br>
If you want to contribute with the project, don't hesitate to fork it and send a pull request.<br>
Thanks for using!

## License
Jauntyslider is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Author
[www.luizgustavoweb.com](http://www.luizgustavoweb.com)
