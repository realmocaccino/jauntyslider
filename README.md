# Jauntyslider v1.0
The quick way to slide a HTML list<br>
http://jauntyslider.luizgustavoweb.com

## Introduction
A powerful slider with a simple configuration. All you need to do is attach the attibute *data-jauntyslider* on a html list like the example below:

```html
<ul data-jauntyslider>
```

## Requirements
- jQuery
- HTML5

If you're using Bower, jQuery is already included in the json file as a component of the project.

## Install
In order to be able to use Jauntyslider, include the css and javascript files in the *head* section of your page:

```html
<link href="css/jauntyslider.min.css" rel="stylesheet" type="text/css">
<script src="js/jauntyslider.min.js"></script>
```

## Usage
As stated in the introduction, we start using the attribute *data-jauntyslider*.

```html
<ul data-jauntyslider>
```

And there you go! The Jauntyslider is up and running in your list.

You can also set some options to customize the slider if you want:

```html
<ul data-jauntyslider="loop:false; speed:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

Jauntyslider supports multiple sliders on the same page:

```html
<ul id="slider-1" data-jauntyslider="loop:false; speed:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
<ul id="slider-2" data-jauntyslider="slideshow:true; duration:4s;">
	<li><img src="my-pet.jpg"></li>
	[...]
</ul>
```

## Parameters

### Speed

**[options: slow | normal | fast | easein | easeout]**

**[default: normal]**

Defines the speed of the transitions.

### Loop

**[options: true | false]**

**[default: true]**

When reaching the end of the slider, it'll come back to the beginning.

### Start

**[default: 1]**

Defines in which slide the slider will start. 

### Width

**[default: inheritance]**

Sets the width of the slider. 

If not set, it dinamically inherits its width parent.

### Height

**[default: inheritance]**

Sets the height of the slider. 

If not set, it dinamically inherits its height parent.

### Slideshow

**[options: true | false]**

**[default: false]**

Activates the transition of the slides automatically. 

The navigation is allowed even so.

### Interval

**[default: 5s]**

Defines the interval between the transitions of the slideshow.

### Navigation

**[options: true | false]**

**[default: true]**

If <em>false</em> hides the navigation UI.

### Step

**[default: 1]**

Allows to change the number of the slides that slider will travel by every transition.

## Contribution
Future versions with more options are to come.

If you want to contribute with the project, email me ([contato@luizgustavoweb.com](mailto:contato@luizgustavoweb.com)).

Thanks for using!

## License
Jauntyslider is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

© [Luiz Gustavo](http://www.luizgustavoweb.com)
