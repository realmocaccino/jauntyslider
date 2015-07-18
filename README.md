# jauntyslider
The quick way to slide a HTML list
http://jauntyslider.luizgustavoweb.com

<p>Jauntyslide is a powerful slider with a simple configuration.<br>
All you need to do is attach the html5 attibute data <em>jauntyslider</em> on a html list and if you like set some options within it to customize.<br>
In order to be able to use Jauntyslider, include the javascript file in the Head section of your page:</p>

<code><script src="js/jauntyslider.js"></script></code>

<p>Now you can start to use it like the example below:</p>

<ul data-jauntyslider>

<p>And there you go! The Jauntyslider is up and running in your html list.<br>
You also can set some options to customize the slider:</p>

<code><ul data-jauntyslider="loop:false; speed:fast;"></code>

Jauntyslider supports multiple sliders on the same page:

<code>
<ul id="slider-1" data-jauntyslider="loop:false; speed:fast;">
<ul id="slider-2" data-jauntyslider="slideshow:true; duration:4s;">
</code>

PARAMETERS

- Speed
[slow|normal|fast|easein|easeout]
[default: normal]
Define the speed of the transitions.

- Loop
[boleean]
[default: true]
When reaching the end of the slider, it'll come back to the beginning.

- Start
[integer]
[Default: 1]


- Width
[pixels] 
[Default: inheritance]


- Height
[pixels] 
[Default: inheritance]


- Slideshow
[boleean]
[default: true]
The transition of the slides will occur automatically.
The navigation is allowed even so.

- Interval
[s] (seconds)
[default: 5s]
Define the interval between the transitions of the slideshow.

- Navigation
[boolean]
[Default: true]


- Step
[integer]
[Default: 1]
It allows change the number of the slides by every transition.


REQUIREMENTS
- jQuery
- HTML5

If you're using Bower, jQuery is already included in the json file as a component of the project.


Thanks for using!
I'm working on it, and future versions with more settings are to come.
