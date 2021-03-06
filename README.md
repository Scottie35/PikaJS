## What is PikaJS?

PikaJS is like jQuery or PrototypeJS, only smaller, lighter, and more efficient.

## How do you say "Pika"?

However you want.

I say PEEK-ah, which is a Slovene word meaning "dot" or "period". This is appropriate since PikaJS is very small.

The name has a double-meaning since a pika (PIKE-uh) is a small lagomorph related to rabbits. Pikas are small, cute, and furry, much like PikaJS.

Therefore, you can say it either way - or make up your own pronunciation.

PHEW! Now that that's out of the way...

## Why PikaJS?

I had been using jQuery and PrototypeJS, and I needed to ditch PrototypeJS at long last. My colleague [Michael Franzl](https://github.com/michaelfranzl) said, "Hey! Check out this [Balalaika](https://github.com/finom/balalaika) thing!" So I did.

https://github.com/finom/balalaika

*BOOYAH!* That's pretty sassy. Well done, sir.

PikaJS is based on Balalaika, which itself is simply a very, very small "jQuery" that's only 986 bytes in size. When you look at its source code, first you weep. Then, after awhile, you realize that it's actually quite simple. It's just nicely optimized.

Modern browsers (including IE10 and up) will work just fine with Balalaika. At this point, browsers have all the functions they need to do fancy jQuery-like stuff without all kinds of hacks. So, Balalaika simply leverages this built-in functionality in a nice, small, jQuery-like "wrapper".

BUT, the only functions included in Balalaika are:

    $(expr) -> selected elements
    .is()
    .on()
    .off()
    .extend()

PikaJS therefore starts with Balalaika and builds all kinds of stuff on top of it. 

For example, AJAX requests of all kinds should be easy to do without digging into XMLHttpRequest. Now, I realize that we're in a brave new world where everything is "Web 4.0 Push Notification Mobile Cloud Blockchain Fabulous™", but back here in the real world, we still need to send and receive data from a server with JavaScript from a simple web page. Yeah, THAT real world.

Anyhoo, the idea was to include the best of jQuery and the best of PrototypeJS (yes, it exists) - but in a much smaller package.

**PrototypeJS 1.7.3 + Script.aculo.us**  =  120 kB minified

**jQuery 3.5.1**  =  87.3 kB

**PikaJS**  =  **10.6** kB

That's just minified, not gzipped. PikaJS is only **4.4kB** gzipped.

## Okay, but how compatible is PikaJS?

Pika will work with all modern browsers, including IE10+, Edge, and the majority of mobile browsers. It is being used on [Sott.net](https://www.sott.net) - which gets millions of pageviews a month - with no complaints. So, I guess that means it works!

PikaJS also includes a few things to improve compatibility with various browsers, but not TOO much. For the most part, I just made sure that what I used wasn't cutting edge, but instead widely supported and generally fast and small.

IE < 10 is not supported, but this shouldn't be a big deal. IE 8 and IE 9 are effectively dead, and IE 11 accounts for less than 1% of global browser market share as of February 2021. Note also that jQuery 3.x no longer supports ancient versions of IE out of the box, either.

End users who have IE8 or IE9 and cannot upgrade to an actual, real web browser may wish to simply dowse their puters in gasoline and set them on fire. 

Or, you can include a shim, shiv, polyfill, shimmy, shaky, or chimichanga - whichever you prefer.

## Okay, but how did you make it so small?

It's quite simple, actually.

Dig into the source for jQuery or Prototype, and you'll find that both do a lot of what I call "fluffy stuff".

They tend to compensate for poor programming, fix things for you, and generally they extend the living poop out of everything.

This is all great for ease of use, but it also results in bloat.

PikaJS takes a very different approach: You're a programmer. Learn how to program! 😱

PikaJS does not hold your hand. It's not forgiving. If what you write doesn't work, you need to figure out why.

For example, Pika doesn't clean up after you. If you attach an event listener, it's up to you to remove it before you remove the element the listener is attached to from the DOM. jQuery and Prototype do this for you, but PikaJS does not. 

Most of the time, it isn't *needed* if you pay attention to how you code - and use delegated event listeners.

In recent years, there is an air of, "I want it to just work". That's nice and all, but it doesn't result in efficient, fast code. It results in bloated, slow code. Not everyone is running your JS on a Core i7 in the latest browser!

PikaJS is small, furry, and fast, but it's not very smart - much like a lagomorph. So, you have to be the smart one when you use it. And don't forget to feed it. 

## Wow, that sounds awful!

It's just a "new" way of working. Most of the functionality you've come to expect from jQuery exists already in PikaJS, and it works. There is also a TON of functionality in other libraries that either you don't use, or you don't need!

There are benefits to doing things this way. When your library isn't extending every object out the wazoo, memory usage drops.

When it doesn't hold your hand, you are forced to code better, to **think** about performance and stability, and to think about exactly what your event listeners are doing and *how* they are working. You learn more, and you write better code.

Historically, programmers tend to use some framework that is, "the latest thing". They never actually bother to look at source code and see if they can improve upon what has been done. Need some new functionality? There's a gem/library/node/photon for that!

I don't use any code without knowing exactly what it's doing. This is unusual, I admit, but PikaJS is the result.

## Well, but, but... Okay, so what does PikaJS give me?

First of all, note carefully which methods are chainable, and which aren't. The most normally-chained methods ARE chainable.

Also, note that in some cases, you must use .each to iterate over a series of selected elements. But again, most often-used methods like .show, .hide, .css, .addClass, and .removeClass automatically iterate over selectors that return multiple results from the DOM tree.

This was a simple question of minimizing code and complexity. Also, methods involving modifying content in the DOM generally require .each so that you're sure that you're doing what you think you're doing.

In those cases where you do have to use .each, you will find it isn't really that inconvenient!

## So how do I use it?

First, include the minifed **pika-min.js** in the head of your page.

**Be sure to also remove jQuery, PrototypeJS, or whatever else you're using that commandeers window.$, or you'll be in big trouble!**

And then, get crackin':

### DOM Ready

    $(function() {
    	// Do stuff here
    });

### Selectors

	

    $('body') ->  Object [ <body> ]
    
    $('img.pic_class') ->  Object [ <img>, <img> ]
    
    $('#some_div')  ->  Object [ <div> ]
    
    $('#some_div ul')  ->  Object [ <ul> ]
    
    $('div.thisclass')  ->  Object [ <div> ]
    
    $('#container div.thisclass span')  ->  Object [ <span>, <span>, <span> ]
    
    $('#this_doesnt_exist')  ->  Object [ ]
    
    $('form[name=myForm]')  ->  Object [ <form#my-form-id> ]
	
The return object is basically an array of DOM elements. You can check for existence however you want:

    $('#this_doesnt_exist').length > 0  ->  false

Note that you can also do pure JS stuff very easily like this:

	$('#container div.thisclass span')  ->  Object [ <span>, <span>, <span> ]

	$('#container div.thisclass span')[0]  ->  <span>

	$('#container div.thisclass span')[0].innerHTML  ->  'Some text/html inside the SPAN tag'

	$('#search-form')[0].submit()  ->  Submit the form
	
	$('#some-div')[0].childNodes  ->  Child nodes of DIV#some-div; pass each back in to $( ) to Pikafy it
	
### Advanced selectors

    $('#container div.thisclass').select('span')  ->  Object [ <span1>, <span2>, <span3> ]

    $('#container div.thisclass').eq(1)  ->  Object [ <span2> ]  (this is CHAINABLE! Indexing starts at 0)

    $('#container div.thisclass')[1]  ->  <span2>   (this is NOT chainable!)

To make any DOM element chainable, just pass it in to $():

    var el = document.getElementById('main');  // el = <div#main>
    $(el)	  ->  Object [ <div#main> ]
    
    var el = $('#container div.thisclass')[1];	// el = <span2>
    $(el)  ->  Object [ <span2> ]

### All the goodies

#### $.extend

	var myObject = {a:1};
	$.extend(myObject,{
		b: 2
	});

	This is not magic. It's a simple loop that adds the passed-in object parameters to myObject.
	
#### .is

	$('#container div').is('.thisclass')	->	Returns true if DIV has class "thisclass", false otherwise

#### .on

	// Simple event listener

	$('.my-selector').on('click.namespace', function() {
		alert('I need my balalaika');
	});

	// Submit a form
	$('#my-form').on('submit', function(event) {
		// Stop event bubbling/HTML form submission (this happens automagically in ._on, but not here)
		$.S(event);
		// Do stuff here
		// Do AJAX, or you can submit form like so:
		this[0].submit();
	});
	
#### ._on
	
	// Delegated event listener
	// You can pass event in to your function() if you want to do stuff with it, but it's not required
	// In the following example, this inside function() = the A element clicked on
	
	$('.my-selector')._on('mousedown.namespace', 'a', function(event) {
		// Ignore right-click
		if (event.which != 1) {return true;}
		// Do stuff
		this.hide();
	});
	
Why delegated event handlers?

When you just use .on(), you have more work to do. You need to call .off() if you're going to remove that element from the DOM. PikaJS does NOT do this for you.

With a delegated event listener, that becomes unnecessary. 

For example, say you have a `<UL>` and you want to listen for clicks on each `<LI>`. You're also going to be adding/removing `<LI>` elements on the fly. In that case, it's far more efficient (and easier) to just do this:

    $('ul.mylist')._on('click', 'li', function() {
    	// Do stuff with this, which is the <LI> clicked on
    });

Note here that with ._on(), you can add/remove `<LI>`'s at will, and you won't have memory leaks or need to add/remove click listeners.

The reason is that the delegated event listener is attached to 'ul.mylist', and this listener filters clicks by checking to see if the clicked element `.is('li')`. If it is, your `function()` is executed. If not, it does nothing.

So you can add/remove `<LI>` like crazy, and it will "just work". One listener is all you need!

Two other important notes:

1. The event bubble/propagation is stopped by `._on()` by default

2. `._on()` checks to make sure that $('ul.mylist') exists first. If it doesn't, it does NOT attach a listener. This means you can use `._on()` to create a whole bunch of listeners in 1 JS file, and if that element doesn't exist on the page, nothing will break because nothing will happen.
3. If you pass `false` as the 4th parameter (bubble), `._on()` will NOT prevent the event from bubbling. This is handy in certain situations.
	
#### .off

	$('.my-selector').off('click.namespace');

#### .onChange

	$('input#search').onChange(700, function() {
		// Check every 700ms to see if the value of the input element has changed
		// If it has changed, do something here, like AJAX call to search form
	});

#### .ajax

	// Do an AJAX request (with all options below set to default - can omit most of them)
	// This simply leverages XMLHttpRequest
	$.ajax({
		url: null,
		type: 'GET',
		data: null,
		processData: true,
		returnType: null,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		},
		timeout: 0,
		before: null,
		done: null,
		fail: null,
		always: null		
	});

**url:** a string (REQUIRED)

**type:** 'GET' or 'POST' usually, defaults to 'GET'

**data:** optional even for 'POST', can be any of the following:

- FormData()
- serialized query string (DIY)
- string (assumed to be serialized already)
- Object (will be serialized automagically)
- Typically, when submitting a form via ajax, you'll just use data: `$('#myForm).formData()`, which will give you a FormData object. DONE!

**processData:** if true, data will be serialized; always true for GET requests; ignored if FormData is passed in as data (!!)

**returnType:**

- if set to 'script', entire response will be parsed and executed as JavaScript immediately
- if default null, any JS in the response will be extracted and executed WHEN the remainder of the response is inserted into the DOM via another PikaJS method like .html() or .update()... This works differently than jQuery!!

**contentType:**

- default is for serialized data
- automatically ignored if data is FormData(), which allows for multipart uploads and the like

**headers:**

- Defaults are often needed, so if you add your own custom headers, you may need to also specify the defaults:

```javascript
{
    'X-Your-Header': 'Stuff',
    'X-Your-Other-Header': 'More Stuff',
    // Don't forget to add the defaults!
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
}
```

**timeout:** 

- Default is 0, or "let the browser handle it"
- If set to 5000, for example, will call `XMLHttpRequest.abort()` after 5000ms. This will simply call the `fail()` function inside the `.ajax()` call

**before:** function to execute before the AJAX request; called with no arguments

**done:** function to execute on SUCCESS

- function arguments you can add to your callback if you need them: **response, responseType, status, statusText**
- Note that these arguments are XMLHttpRequest standard return variables
- If all you want is response, define your done function like this: `function(res) { // res = response }`
- If you want response and status, define your done function like so: `function(res, resType, status) { // etc }`

**fail:** function to execute on FAIL or ABORT/timeout if set

- function arguments you can add to your callback if you need them: **response, responseType, status, statusText**

**always:** function to execute always on SUCCESS or FAIL

- function arguments you can add to your callback if you need them: **response, responseType, status, statusText**

#### What about a jQuery-like dataFilter option?
	
Don't need one. dataFilter in jQuery is simply called on the returned data before it is passed to done, so you can just implement/call it yourself in:

    done: function(response, responseType, status, statusText) {
    	// Do your data filter stuff here somehow
    	// Carry on
    }

#### Why not use fetch()?

fetch() uses promises, which is nice. BUT... It's experimental, cookieless by default, the promise doesn't reject on an HTTP error, timeouts are not supported, aborting is complicated, and there is no progress tracking...

In short, it's not quite 'there' yet, so you can just use it yourself if you want/need.

#### .formData

	$('#myForm').formData()
	
	Returns FormData object containing values of all fields in FORM element with id #myForm

	$('#myForm').formData(0)
	$('#myForm').formData(false)
	
	Returns string that is the serialized values of all fields in FORM with id #myForm
	
#### .select

See above in [Selectors](#selectors) section
	
#### .parent

	$('#mydiv').parent();
	
	Returns parent of #mydiv as: Object [ <BLAH> ], and is thus chainable

#### .remove

	$('#mydiv').remove();
	
	Removes element from DOM and returns element's HTML as string; For multiple elements, use .each

#### .html

	$('#mydiv').html()
	
	Returns element's innerHTML as string
	
	$('#mydiv').html('<em>Some text!</em>');
	
	Sets element's contents to passed-in HTML; Any JS is executed; Chainable;
	For updating multiple elements, use .each

#### .update

	$('#mydiv').update('<em>Some text!</em>');
	
	See second .html usage example above

#### .replace

	$('#mydiv').replace('html');
	
	Replaces element's contents and returns that element; Chainable; JS executed;
	For replacing multiple elements, use .each

#### .append

	$('#mydiv').append('html');
	
	Insert 'html' as last child element inside #mydiv; Chainable; JS executed;
	For multiple elements, use .each

#### .prepend

	$('#mydiv').prepend('html');
	
	Insert 'html' as first child element inside #mydiv; Chainable; JS executed;
	For multiple elements, use .each

#### .before

	$('#mydiv').before('html');
	
	Insert 'html' as new sibling element before #mydiv; Chainable; JS executed;
	For multiple elements, use .each

#### .after

	$('#mydiv').after('html');
	
	Insert 'html' as new sibling element after #mydiv; Chainable; JS executed;
	For multiple elements, use .each

#### .up

	$('#mydiv').up();
	
	Get the 1st node up the DOM tree; Chainable

	$('#mydiv').up('div.thingy', 2);
	
	Get the 3rd node up the DOM tree that matches 'div.thingy'; Indexing starts at 0; Chainable;

#### .down

	$('#mydiv').down();
	
	Get the 1st node down the DOM tree; Chainable

	$('#mydiv').down('div.thingy', 2);
	
	Get the 3rd node down the DOM tree that matches 'div.thingy'; Indexing starts at 0; Chainable

#### .previous

	$('#mydiv').previous();
	
	Get the previous sibling in the DOM tree; Chainable
	
	$('#mydiv').previous('div.stuff', 1);

	Get the 2nd previous sibling in the DOM tree matching 'div.stuff'; Indexing starts at 0; Chainable

#### .next

	$('#mydiv').next();
	
	Get the next sibling in the DOM tree; Chainable
	
	$('#mydiv').next('div.stuff', 1);

	Get the 2nd next sibling in the DOM tree matching 'div.stuff'; Indexing starts at 0; Chainable

#### .first

	$('div.some_class').first();	->	Object [ <div> ]
	
	Get the first element from the selected elements; Chainable
	If you don't need the result to be chainable, you can simply do:
	  $('div.some_class')[0]  ->  <div>

#### .last

	$('div.some_class').last();
	
	Get the last element from the selected elements; Chainable
	
#### .attr

	$('div.crazy').attr('id');
	
	Get the id attribute of div.crazy

	$('div.crazy').attr('id', 'my-super-id');
	
	Set the id attribute of div.crazy to 'my-super-id'; Chainable;
	For multiple elements, use .each

#### .val

	$('input#cheese').val();
	
	Get the value of input#cheese

	$('input#cheese').val('Whiz!');
	
	Set the value of input#cheese; Chainable;
	For multiple elements, use .each

#### .addClass

	$('div.crazy').addClass('red');
	
	Adds class 'red' to ALL divs that have class 'crazy'; Chainable; No .each required!

#### .removeClass

	$('div.crazy').removeClass('red');
	
	Removes class 'red' from ALL divs that have class 'crazy'; Chainable; No .each required!

#### .show

	$('div.red').show();
	
	Sets ALL divs with class 'red' to visible; Chainable

#### .hide

	$('div.red').hide();
	
	Sets ALL divs with class 'red' to hidden; Chainable

#### .visible

	$('div.red').visible()
	
	Returns true or false depending on if div.red is visible or hidden

#### .css

	$('div.red').css('opacity')
	
	Returns CSS opacity value for div.red
	
	$('div.red').css({
		opacity: '0.5',
		'background-color': '#fff'
	});
	
	Sets CSS for ALL div.red as specified; Chainable; Note that values like 'background-color' need 
	to be passed as a string due to the hyphen. Note also that rgb values and short hex color values 
	like #fff will be automagically converted into #aabbcc hex format for both getting and setting. 
	Finally, it's up to you to compensate for any 'background-color' vs 'backgroundColor' problems.

#### .getDimensions

	$('div.red').getDimensions()
	
	Returns object with dimensions of div.red like so:
		Object { width: 340, height: 367 }

#### .getHeight

	$('div.red').getHeight()
	
	Returns number equal to height of div.red; Convenience wrapper for .getDimensions

#### .getWidth

	$('div.red').getWidth()
	
	Returns number equal to width of div.red; Convenience wrapper for .getDimensions

#### .each

	$('div.red').each(function() {
		this.html('Uh-oh!');
	});
	
	Iterates over each instance of div.red and sets the innerHTML of each to 'Uh-oh!'; JS executed

#### .blank

	$('div.red').blank()
	
	Returns true if value (for form elements) or innerHTML of selected element is empty, false otherwise
	
#### .focus

	$('input#firstName').focus();
	
	Focus browser on input#firstName

#### .data

	$('div.blue').eq(1).data('snausage');
	
	Returns data attribute 'data-snausage' on 2nd div.blue
	
	$('div.blue').data('snausage', 'this is some stuff');
	
	Sets data attribute data-snausage on ALL divs with class='blue'; Chainable;
	For multiple elements, use .each
	
### Animations and fun effects:

Note that Element.animate is great, but not yet widely supported - and still "experimental".

These effects are NOT chainable. Normally you'd just add them as the last link in the chain anyway, like: `$('#blah').html('ERROR: You suck!').show().fade(7);`

#### .fade

	$('div.blue').fade();
	
	Fades out div.blue instantly; Uses requestAnimationFrame if possible, or setTimeout otherwise
	
	$('div.blue').fade(7);
	
	Fades out div.blue after 7 seconds
	
	$('div.blue').fade(0, true);
	
	Fades out div.blue instantly, and then removes the element (2nd param = remove, default is false)
	
#### .slideUp

	$('div.blue').slideUp();
	
	Slides up div.blue instantly; Uses requestAnimationFrame if possible, or setTimeout otherwise
	
	$('div.blue').slideUp(5);
	
	Slides up div.blue after 5 seconds
	
#### .scrollTo

	$('div.blue').scrollTo();
	
	Smooth scrolls up or down to the location of div.blue in the document.
	Uses requestAnimationFrame if possible, or setTimeout otherwise.
	
	$('div.blue').scrollTo({
		duration: 0.3,
		offset: -200
	});
	
	Smooth scrolls up or down to the location of div.blue, -200 pixels, in the document. 
	Since default duration is 0.5 (about 0.5s), the given duration of 0.3 will scroll faster. 
	Uses requestAnimationFrame if possible, or setTimeout otherwise

### Special internal methods you can use if you want:
		
#### $.H

	Used internally to improve on Balalaika's conversion from text -> HTML. Uses
	document.createRange().createContextualFragment('some HTML') to convert from a string of HTML
	into actual DOM nodes to be inserted.
	
	This also extracts any and all SCRIPT tags, attaches a unique ID, and the extracted JS is then 
	executed at the appropriate time when the HTML nodes are inserted into the page via .html(), 
	.update(), etc.

#### $.R

	Used internally by $.H to create a 7-char unique ID string for extracted JS execution at the appropriate time

#### $.S

	$.S(event)  ->  
	Calls event.preventDefault() and event.stopPropagation(); 
	Uses window.event if event is undefined

#### $.t

	$.t(obj)	->  return typeof obj === 'undefined';
	!$.t(obj)	->  return typeof obj !== 'undefined';
	$.t(obj, 'f')	->  return typeof obj === 'function';
	!$.t(obj, 's')	->  return typeof obj !== 'string';
	
	Second argument can be:
		'a' = array
		'f' = function
		'n' = number
		'o' = object
		's' = string
	
	BE CAREFUL! Checking for undefined doesn't always work like you think depending on the variable scope and context...
	
#### $.T

	$.T('div#my_div')  ->  Like Toggle.display(el) in PrototypeJS (VERY handy!)

#### $.JS

	This is used internally to attach JS code to the document <HEAD> for execution. If for some 
	odd reason you want to use it, you can like so:
	
	$.JS('some javascript code here', document);
	
	The second param document can be omitted, or it can be included if you want to use a different 
	context. The JS is executed immediately.
	
### Finally, miscellaneous variables and methods

$ includes the following default values for PikaJS:

	$.Version = '1.0'
	$.Ajax = {
		url: null,
		type: 'GET',
		data: null,
		processData: true,
		returnType: null,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		},
		timeout: 0,
		before: null,
		done: null,
		fail: null,
		always: null
	}

You can override these if you want for AJAX calls, or just for fun because you're nuts.

Also included are several other internal methods, which you can check out and use if you want. I'll just summarize them below.

#### $.merge(first, second)

	Like Array.concat, but also modifies the first array to be the result of the merge.
	
#### $.getTags(context, tag)

	Extracts content <tag> from context; Used for extracting JS from AJAX-returned HTML
	
#### $.execJS(id)

	Executes the JS returned from an AJAX call that matches the proper ID
	
#### $.first(el)

	Returns first descendant node of el.
	Note this is different from $(...).first(), which is technically $.fn.first()!!
	
#### $.findR(el, prop, expr, index)

	Recursive find used for .up, .previous, and .next

#### $.cOff(el)

	Returns cumulative offset of el in the document; Returns {left: x, top: y}

#### $.rgb2Hex(rgb)

	For CSS. Does what it sounds like!
	
#### $.longHex(hex)

	Converts short 3-digit hex color codes into full 6-digit color codes

#### $.doToS(prefix, obj, add)

	Builder for $.toS

#### $.toS(a)

	Object -> to query string

## Can you make it so that...

Maybe, but don't hold your breath.

Fortunately, it's very easy to write your own functions Balalaika-style, like so:

	$.fn.superfunc = function(options) {
		// this = the result of $('...')
		// Do whatever with options
		return this; // For chainable
	}

You would call the above function like:

		$('#myDiv').superfunc(options);
	
If you want to add multiple functions, you can also do this:

	$.extend($, {
		superfunc = function(a){
			// blah
		},
		megafunc = function(a){
			// bluh
		},
		hyperfunc = function(a){
			// blih
		}
	});

## Can you make it even smaller?

Sure! The version **pika-pure-min.js** is just pika-min.js but without the animation/effects stuff.

IOW, it's PikaJS without `.fade`, `.slideUp`, or `.scrollTo` - each of which are relatively large.

It's only **9.28kB** minified instead of 10.6kB.

That's all, folks!

~ THE END ~
