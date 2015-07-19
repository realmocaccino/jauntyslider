# Jauntyslider
The quick way to slide a HTML list http://jauntyslider.luizgustavoweb.com

## Requirements
- jQuery
- HTML5

If you're using Bower, jQuery is already included in the json file as a component of the project.

## Install
In order to be able to use Jauntyslider, include the css and javascript files in the Head section of your page:

```javascript
<script src="css/jauntyslider.min.css"></script>
<script src="js/jauntyslider.min.js"></script>
```

## Usage
Jauntyslide is a powerful slider with a simple configuration. All you need to do is attach the attibute <em>data-jauntyslider</em> on a html list and if you want, set some options within it to customize.

Now you can start to use it like the example below:

```javascript
<ul data-jauntyslider>
```

And there you go! The Jauntyslider is up and running in your html list.

You also can set some options to customize the slider:

```javascript
<ul data-jauntyslider="loop:false; speed:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
```

Jauntyslider supports multiple sliders on the same page:

```javascript
<ul id="slider-1" data-jauntyslider="loop:false; speed:fast;">
	<li><img src="new-horizon.jpg"></li>
	[...]
</ul>
<ul id="slider-2" data-jauntyslider="slideshow:true; duration:4s;">
	<li><img src="my-pet.jpg"></li>
	[...]
</ul>
```

## Options

#### Speed 

###### [slow | normal | fast | easein | easeout]

###### [default: normal]

Define the speed of the transitions.

#### Loop
[boleean]

[default: true]

When reaching the end of the slider, it'll come back to the beginning.

#### Start
[integer]

[Default: 1]

Define in which slide the jauntyslider will start. 

#### Width
[pixels] 

[Default: inheritance]

Set the width of the slider. 

Remember if not set, it dinamically will inherit its width parent div.

#### Height
[pixels]

[Default: inheritance]

Set the height of the slider. 

Remember if not set, it dinamically will inherit its heght parent div.

#### Slideshow
[boleean]

[default: false]

Activate the transition of the slides automatically. 

The navigation is allowed even so.

#### Interval
[seconds]

[default: 5s]

Define the interval between the transitions of the slideshow.

#### Navigation
[boolean]

[Default: true]

If <em>false</em> hides the navigation UI.

#### Step
[integer]

[Default: 1]

It allows to change the number of the slides that jauntyslider will travel by every transition.

## Contribution
Future versions with more options are to come.

If you want to contribute with the project, email me ([lgustavoms@gmail.com](mailto:lgustavoms@gmail.com)).

Thanks for using!

## License
Jauntyslider is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
