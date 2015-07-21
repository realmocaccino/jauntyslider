# Jauntyslider
The quick way to slide a HTML list<br>http://jauntyslider.luizgustavoweb.com

## Introduction
Jauntyslider lets you create a slider from your HTML list with just one step. All you need to do is attach the attibute *data-jauntyslider* on the  list like the example below:

```html
<ul data-jauntyslider>
```

## Requirements
- jQuery
- HTML5

If you're using Bower, jQuery is already included in the json file as a component of the project.

## Install
In order to be able to use Jauntyslider, include the css and javascript files in your document:

```html
<link href="css/jauntyslider.min.css" rel="stylesheet">
<script src="js/jauntyslider.min.js"></script>
```

## Usage
As stated in the introduction, we start using the attribute *data-jauntyslider*.

```html
<ul data-jauntyslider>
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

And there you go! The Jauntyslider is up and running in your list.<br>
You can also set options to customize the slider.<br>
If you want the slider to move faster, for instance, you can do like the example below:

```html
<ul data-jauntyslider="speed:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

You can set more than one option at a time:

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

## Options

### Speed

**[options: slow | normal | fast | easein | easeout]**

**[default: normal]**

Defines the speed of the transitions.

### Loop

**[options: true | false]**

**[default: false]**

If *true*, when reaching the end of the slider, it'll come back to the beginning.

### Start

**[default: 1]**

Defines in which slide the slider will start. 

### Width

**[default: inheritance]**

Sets the width of the slider.<br>
If not set, it dinamically inherits its width parent.

### Height

**[default: inheritance]**

Sets the height of the slider.<br>
If not set, it dinamically inherits its height parent.

### Slideshow

**[options: true | false]**

**[default: true]**

The automatic transition of the slides is default.<br>
The navigation is allowed even so.<br>
Set *false* to disable the slideshow.

### Interval

**[default: 5s]**

Defines the interval between the transitions of the slideshow.

### Navigation

**[options: true | false]**

**[default: true]**

If *false* hides the navigation on the bottom.

### Step

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
