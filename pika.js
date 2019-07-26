/**
 * @license PikaJS v1.11
 * © Scott Ogrin & Quantum Future Group, Inc. - MIT License
 * Balalaika v1.0.1 - MIT License
 */

// NOTE: We only support IE >= 10.
// IE 8+9 only have a ~2% desktop browser market share as of July 2017.

// Balalaika v1.0.1
// https://github.com/finom/balalaika
window.$=function(t,e,n,i,o,r,s,u,c,f,l,h){return h=function(t,e){return new h.i(t,e)},h.i=function(i,o){n.push.apply(this,i?i.nodeType||i==t?[i]:""+i===i?/</.test(i)?((u=e.createElement(o||"q")).innerHTML=i,u.children):(o&&h(o)[0]||e).querySelectorAll(i):/f/.test(typeof i)?/c/.test(e.readyState)?i():h(e).on("DOMContentLoaded",i):i:n)},h.i[l="prototype"]=(h.extend=function(t){for(f=arguments,u=1;u<f.length;u++)if(l=f[u])for(c in l)t[c]=l[c];return t})(h.fn=h[l]=n,{on:function(t,e){return t=t.split(i),this.map(function(n){(i[u=t[0]+(n.b$=n.b$||++o)]=i[u]||[]).push([e,t[1]]),n["add"+r](t[0],e)}),this},off:function(t,e){return t=t.split(i),l="remove"+r,this.map(function(n){if(f=i[t[0]+n.b$],u=f&&f.length)for(;c=f[--u];)e&&e!=c[0]||t[1]&&t[1]!=c[1]||(n[l](t[0],c[0]),f.splice(u,1));else!t[1]&&n[l](t[0],e)}),this},is:function(t){return u=this[0],(u.matches||u["webkit"+s]||u["moz"+s]||u["ms"+s]).call(u,t)}}),h}(window,document,[],/\.(.+)/,0,"EventListener","MatchesSelector");

// Built-in:
//	is, on, off, extend
//
// Works:
//	$('#list li') = [li, li, li]
//
// IMPORTANT:
//	Pika does NOT track and remove EventListeners like jQuery. Do it yourself!
//  Better yet, use ._on() so you don't have to

(function($,Win,Doc,PNode,Pos,ProcData,RetType,ContType,Hdrs,TimeOut,Style,Len,ReqAF){
$.extend($, {

	Version: '1.11',

	Ajax: {
		url: null,
		type: 'GET',
		data: null,
		processData: true,
		responseType: null,
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
	},

	Js: {}, // JS: { ij3sdfs: {txt: ['js', 'js'], doc: [document, document]}, b8e64hr: {...} }

// AJAX function
	ajax: function(opts) {
		var theurl = null, thedata = null, timeoutTimer = null, aD = $.Ajax;
		if (!opts.url || !$.t(opts.url, 's')) {
			return false;
		} else {
			theurl = opts.url;
		}
		(!opts.type) ? opts.type = aD.type :	opts.type = opts.type.toUpperCase();
		opts.data = opts.data || aD.data;
		opts[ProcData] = opts[ProcData] || aD[ProcData];
		opts[RetType] = opts[RetType] || aD[RetType];
		opts[ContType] = opts[ContType] || aD[ContType];
		opts[Hdrs] = opts[Hdrs] || aD[Hdrs];
		opts[TimeOut] = opts[TimeOut] || parseInt(aD[TimeOut]);
		thedata = opts.data;
		// Check type/data, change options
		//		1. GET with data must always be serialized! No FormData.
		// 		2. $(form).formData() 	==> FormData
		//		3. $(form).formData(0) 	==> Serialized with formData()
		//		4. {...} or whatever		==> Serialize with $.toS()
		if (opts.type == 'GET') {
			opts[ProcData] = true;
			opts[ContType] = false;
		}
		if (thedata instanceof FormData && opts.type != 'GET') {
			opts[ProcData] = false;
			opts[ContType] = false;
		} else if (opts[ProcData]) {
			if (thedata != null && !$.t(thedata, 's')) {
				thedata = $.toS(thedata);
			}
		}
		// Do request
		var xhr = new XMLHttpRequest();
		// Add URL parms if needed
		if (opts.type == 'GET' && thedata != null) {
			theurl = theurl + (/\?/.test(theurl) ? "&" : "?") + thedata;
		}
		// XMLHttpRequest.open(method, url, async=true, user, password)
		xhr.open(opts.type, theurl);
		// Set Content-Type
		if (opts.type != 'GET' && opts[ContType] !== false) {
			xhr.setRequestHeader('Content-Type', opts[ContType]);
		}
		// Set up other headers if present (this can override contentType!)
		if (opts[Hdrs] !== null) {
			for (n in opts[Hdrs]) {
				xhr.setRequestHeader(n, opts[Hdrs][n]);
			}
		}
		// Do .before() if necessary
		if ($.t(opts.before, 'f')) { opts.before(); }
		// Set up listeners
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				// These vars will be passed to our callback funcs below:
				var response = null, responseType = null, status = xhr.status, statusText = xhr.statusText;
				// Carry on
				// status = 0 on xhr.abort(), so it will be an error
				if (status >= 200 && status < 300 || status == 304) {
					// SUCCESS
					// Clear timer if set
					if (timeoutTimer) {
						Win.clearTimeout(timeoutTimer);
					}
					// This might not work, so we default it to "text":
					responseType = xhr.responseType || "text";
					// For XHR2 non-text, just pass it thru to callback
					if (responseType !== "text" || !$.t(xhr.responseText, 's')) {
						// Binary return type, which includes:
						//		- arrayBuffer
						//		- blob
						//		- document
						//		- JSON, which should be automagically parsed for us
						response = xhr.response;
					} else {
						// Text/HTML/JavaScript return type
						if (opts[RetType] == 'script') {
							// The whole response is supposed to be pure JS, so extract it, execute it, and return nothing
							var tmp = xhr.responseText, resp = null, id = $.R();
							if (tmp.match(/<script[^>]*>/) == null) {
								tmp = ("<script>" + tmp + "</script>");
							}
							resp = $.H(tmp, id);
							response = '';
							tmp = null;
							resp = null;
							$.execJS(id);
						} else {
							// This is some other text, like plain or HTML
							// NOTE: included JS is ONLY exec'd on insert into DOM!
							response = xhr.responseText;
						}
					}
					if ($.t(opts.done, 'f')) {

						opts.done(response, responseType, status, statusText);
					}
				} else {
					// ERROR
					if ($.t(opts.fail, 'f')) {
						// Response is null anyway if XHR request fails
						opts.fail(response, responseType, status, statusText);
					}
				}
				// Always run, with delay
				if ($.t(opts.always, 'f')) {
					setTimeout(function() { opts.always(response, responseType, status, statusText); }, 1);
				}
			}
		}
		// Set up timeout. Default: let browser handle it
		if (opts[TimeOut] > 0 ) {
			timeoutTimer = Win.setTimeout(function() {
				// This aborts already sent request
				xhr.abort();
				// readyState = 4, status = 0, so opts.fail() will be run
			}, opts[TimeOut]);
		}
		// Send request
		(opts.type == 'GET' || thedata == null) ? xhr.send() : xhr.send(thedata);
	},

	// Cumulative offset calc
  cOff: function(el) {
    var t = 0, l = 0;
    if (el[PNode]) {
      do {
        t += el.offsetTop  || 0;
        l += el.offsetLeft || 0;
        el = el.offsetParent;
      } while (el);
    }
    return {left: l, top: t};
  },

	// Builder called by $.toS for serializing object for AJAX call
	doToS: function(prefix, obj, add) {
		var name;
		if ($.t(obj, 'a')) {
			for (var i=0, l=obj[Len]; i<l; i++) {
				if (/\[\]$/.test(prefix)) {
					add(prefix, obj[i]);
				} else {
					$.doToS(prefix + "[" + ($.t(obj[i], 'o') && obj[i] != null ? i : "") + "]", obj[i], add);
				}
			}
		} else if ($.t(obj, 'o')) {
			for (name in obj) {
				$.doToS(prefix + "[" + name + "]", obj[name], add);
			}
		} else {
			add(prefix, obj);
		}
	},

	execJS: function(id) {
		// Only execute JS for a specific event based on id
		if (!$.t($.Js[id])) {
			for (var i=0, l=$.Js[id].txt[Len]; i<l; i++) {
				if (!$.t($.Js[id].txt[i])) {
					$.JS($.Js[id].txt[i], $.Js[id].doc[i]);
				}
			}
			delete $.Js[id];
		}
	},

	// Get first descendant of el
  first: function(el) {
    el = el.firstChild;
    while (el && el.nodeType !== 1) {
      el = el.nextSibling;
    }
    return el;
  },

  findR: function(el, prop, expr, index) {
    if (!el) { return el; }
    expr = expr || 0, index = index || 0;
    if ($.t(expr, 'n')) {
      index = expr, expr = null;
    }
    while (el = el[prop]) {
      if (el.nodeType !== 1) { continue; }
    	if (expr && !$(el).is(expr)) { continue; }
      if (--index >= 0) { continue; }
      return el;
    }
  },

	getTags: function(content, tag) {
		var ret, qS='querySelectorAll', tl='toLowerCase';
		if (!$.t(content[qS])) {
			ret = content[qS](tag || "*");
		} else {
			ret = [];
		}
		if (tag === undefined || tag && (content.nodeName && content.nodeName[tl]() === tag[tl]())) {
			return $.merge([content], ret);
		}
		return ret;
	},

	// This function converts text HTML into DOM nodes using createContextualFragment
	H: function(html, id, innerHtml) {
		var content = null, jstxt='', jsdoc, d = Doc, js;
		if (html.match(/<[^>]+?>/mi) == null) {
			// We have no HTML tags, so it's text only. Balalaika no likey!
			content = d.createTextNode(html);
		} else {
			// Always do this instead of $(html), because Balalaika is too simple for complex nested HTML + JS
			content = d.createRange().createContextualFragment(html);
		}
		// At this point, content is some DOM nodes, so save any JS for execution, and remove the SCRIPT nodes
		js = $.getTags(content, 'script');
		if (js[Len] > 0) {
			$.Js[id] = {txt: [], doc: []};
			for (var i=0, l=js[Len]; i < l; i++) {
				if (js[i].textContent) {
					$.Js[id].txt.push(js[i].textContent);
					$.Js[id].doc.push(js[i].ownerDocument);
					if (js[i][PNode]) {
						js[i][PNode].removeChild(js[i]);
					}
				}
			}
		}
		// content is cleaned, so check for innerHTML=? usage and modify return content
		if (!$.t(innerHtml)) {
		  var div = d.createElement('div');
		  div.appendChild(content);
		  content = div.innerHTML;
		  div = null;
		}
		return content;
	},

	JS: function(code, doc) {
		doc = doc || D;
		var js = doc.createElement("script");
		js.text = code;
		doc.head.appendChild(js)[PNode].removeChild(js);
	},

  longHex: function(hex) {
  	return "#"+(hex.match(/[^#]/g).map(function(char){ return char + char; })).join('');
  },

	merge: function(first, second) {
		var len = +second[Len], j = 0, i = first[Len];
		for (; j < len; j++) {
			first[i++] = second[j];
		}
		first[Len] = i;
		return first;
	},

  rgb2Hex: function(rgb) {
  	return "#"+(rgb.match(/\b(\d+)\b/g).map(function(digit){ return ('0' + parseInt(digit).toString(16)).slice(-2) })).join('');
  },

	R: function() {
		// This guy is used to link extracted JS from each call to $.H to the method where it was called
		// This prevents 2+ simultaneous DOM insertions from executing returned JS like 500 times
		return Math.random().toString(36).substr(2, 7);
	},

	// Instead of Event.stop(evt) or evt.stop()
	S: function(evt) {
		evt = evt || Win.event; // If no event passed or IE, use last event
		evt.preventDefault();
	  evt.stopPropagation();
	},

	// typeof checker
	t: function(val, type) {
		var t = {a: 'array', f: 'function', n: 'number', o: 'object', s: 'string'};
		return type === undefined ? typeof val === 'undefined' : typeof val === t[type];
	},

	// Instead of Toggle.display(el)
	T: function(el) {
		$(el).forEach(function(e) {
			e = $(e);
			e.visible() ? e.hide() : e.show();
		});
	},

	// Serialize an array of form elements [{name: "a", value: "1"}, {...}, ...] 
	// or a set of key/values into a query string
	toS: function(a) {
		var prefix,
			k = [],
			eu = encodeURIComponent,
			add = function(key, valOrFunc) {
				var val = $.t(valOrFunc, 'f') ? valOrFunc() : valOrFunc;
				k[k[Len]] = eu(key) + "=" + eu(val == null ? "" : val);
			};
		// Assume array of form elements as [{name: "a", value: "1"}, {...}, ...]
		if (Array.isArray(a)) {
			for (var i=0, l=a[Len]; i<l; i++) {
				add(a[i].name, a[i].value);
			}
		} else {
			for (prefix in a) {
				$.doToS(prefix, a[prefix], add);
			}
		}
		return k.join("&");
	},

});

$.extend($.fn, {
	
	// -- Selectors and DOM manipulation ---------------------
	
	select: function(expr) {
		// Find elements expr inside another selector $(this)
		return $(expr, this[0]);
	},

	parent: function() {
	  var el = this[0][PNode];
	  return $(el);
	},

	remove: function() {
	  var parent = this[0][PNode];
	  if (parent) {
	  	var ret=this[0].outerHTML;
	    parent.removeChild(this[0]);
	    return ret; // returns removed content
	  }
	},

	html: function(html) {
	  if ($.t(html)) {
	    return this[0].innerHTML;
	  } else {
	    return this.update(html);
	  }
	},

	update: function(html) {
		var id = $.R();
	  this[0].innerHTML = $.H(html, id, 1);
	  $.execJS(id);
	  return this;
	},

	replace: function(html) {
	  var id = $.R();
	  var content = $.H(html, id);
	  this[0][PNode].replaceChild(content, this[0]);
	  $.execJS(id);
	  return this; // Returns node that was replaced
	},

	append: function(html) {
			if ([1, 11, 9].indexOf(this[0].nodeType) >= 0) {
	  	var id = $.R();
	  	this[0].appendChild($.H(html, id));
	  	$.execJS(id);
	  }
	  return this;
	},

	prepend: function(html) {
		// This inserts as first CHILD element of el
	  if ([1, 11, 9].indexOf(this[0].nodeType) >= 0) {
	  	var id = $.R();
	  	this[0].insertBefore($.H(html, id), this[0].firstChild);
	  	$.execJS(id);
	  }
	  return this;
	},

	before: function(html)  {
		var parent = this[0][PNode];
		if (parent) {
			var id = $.R();
			parent.insertBefore($.H(html, id), this[0]);
			$.execJS(id);
		}
		return this;
	},

	after: function(html)  {
		var parent = this[0][PNode];
		if (parent) {
			var id = $.R();
			parent.insertBefore($.H(html, id), this[0].nextSibling);
			$.execJS(id);
		}
		return this;
	},

	up: function(expr, index) {
	  var node;
	  if (arguments[Len] === 0) { 
	  	node = this[0][PNode];
	  } else {
	  	node = $.findR(this[0], 'parentNode', expr, index);
	  }
	  return $(node);
	},

	down: function(expr, index) {
	  var node;
	  if (arguments[Len] === 0) {
			node = $.first(this[0]);  	
	  	return $(node);
	  }
	  expr = expr || 0, index = index || 0;
	  if ($.t(expr, 'n')) {
	    index = expr, expr = '*';
	  }
	  node = $(this).select(expr)[index];
	  return $(node);
	},

	previous: function(expr, index) {
	  return $($.findR(this[0], 'previousSibling', expr, index));
	},

	next: function (expr, index) {
	  return $($.findR(this[0], 'nextSibling', expr, index));
	},

	// Get first element from group of selected elements
	// Note this is $.fn.first, which differs from $.first
	first: function() {
		return $(this[0]);
	},

	last: function() {
		return $(this[this.length-1]);
	},

	// NOTE:
	// 		$$(...)[0] => $(...).eq(0)  	=>		$(...).eq(0).hide()		<-- is "Balalaika object"
	//		$$(...)[0]										=> 		$(...)[0].innerHTML		<-- is DOM node only
	eq: function(index) {
		if ($.t(index, 'n') && this[Len] > index) {
			if (index in this) {
				return $(this[index]);
			}
		}
	},

	attr: function(key, val) {
	  if (val || val == '') {
	    this[0].setAttribute(key, val);
	    return this;
	  } else {
	    return this[0].getAttribute(key);
	  }
	},

	hasClass: function(class_name) {
	  return this[0].className.indexOf(class_name) >= 0;
	},

	addClass: function(className) {
	  this.forEach(function(el) {
	    var classList = el.classList;
	    classList.add.apply(classList, className.split(/\s/));
	  });
	  return this;
	},

	removeClass: function(className) {
	  this.forEach(function(el) {
	    if ($.t(className)) {
	      el.className = '';
	    } else {
	      var cL = el.classList;
	      cL.remove.apply(cL, className.split(/\s/));
	    }
	  });
	  return this;
	},

	val: function(val) {
	  if (!$.t(val)) {
	    this[0].value = val;
	    return this;
	  } else {
	    return this[0].value;
	  }
	},

	// -- Formatting and styles ------------------------------

	show: function(type) {
	  this.forEach(function(el) {
		  if (el.tagName == 'SPAN') {
		    el[Style].display = type || 'inline-block';
		  } else {
		    el[Style].display = type || 'block';
		  }
	  });
	  return this;
	},

	hide: function() {
	  this.forEach(function(el) {
	    el[Style].display = 'none';
	  });
	  return this;
	},

	visible: function() {
		return this.css('display') !== 'none';
	},

	css: function(m) {
		if ($.t(m, 's')) {
			// Get
		  var val = this[0][Style][m];
		  if (!val || val === 'auto') {
		    var css = Doc.defaultView.getComputedStyle(this[0], null);
		    val = css ? css[m] : null;
		  }
		  if (m === 'opacity') return val ? parseFloat(val) : 1.0;
		  if (val.match(/^rgb\(/) != null) return $.rgb2Hex(val);
		  if (val.match(/^#\d{3}/) != null) return $.longHex(val);
		  return val === 'auto' ? null : val;
		} else {
			// Set
		  this.forEach(function(el) {
		    for (var key in m) {
		      var val = m[key]
		      if (val.match(/^#\d{3}/) != null) { val = $.longHex(val); }
		      el[Style][key] = val;
		    }
		  });
		  return this;
		}
	},

	getDimensions: function() {
	  var display = this.css('display');
	  if (display && display !== 'none') {
	    return {width: this[0].offsetWidth, height: this[0].offsetHeight};
	  }
	  var s = this[0][Style],
		  origStyles = {
		    visibility: s.visibility,
		    position:   s[Pos],
		    display:    s.display
		  },
	  	newStyles = {
		    visibility: 'hidden',
		    display:    'block'
		  };
	  if (origStyles[Pos] !== 'fixed') { newStyles[Pos] = 'absolute'; }
	  this.css(newStyles);
	  var dimensions = {
      width:  this[0].offsetWidth,
      height: this[0].offsetHeight
    };
	  this.css(origStyles);
	  return dimensions;
	},

	getHeight: function() {
	  // Offset height (not clientHeight!)
	  return this.getDimensions().height;
	},

	getWidth: function() {
	  // Offset width
	  return this.getDimensions().width;
	},

	// -- Event Observers ------------------------------------

	// jQuery-like delegated event handler (this = parent where listener is attached)
	// Note this cancels event bubble/default for you!
	_on: function(event, expr, fn) {
		// Prevent attaching if parent doesn't exist (so we can load all handlers on all pages if we want)
		if ($.t(this[0])) { return; }
		// Attach to PARENT, filter for child
		this.on(event, function(evt) {
			if (evt.target && $(evt.target).is(expr)) {
				$.S(evt);
				fn.call($(evt.target), evt); // func will have evt, this = $()
			}
		});
	},

	// Check value every (time) ms and call fn if changed
	onChange: function(time, fn) {
		if (!$.t(this[0])) {
			var that = this, value = this.val();
			setInterval(function() {
				var newv = that.val();
				if (newv != value) {
					value = newv;
					fn.call(that, newv);
				}
			}, time);
		}
	},

	// -- Ajax Stuff -----------------------------------------

	// Our FormData / serializer
	// Will serialize no matter what if FormData not supported (for a few mobile browsers)
	formData: function(doFD) {
	  var result = [], form = this[0], eu = encodeURIComponent, sl = Array.prototype.slice;
	  if ($.t(form, 'o') && form.nodeName === 'FORM') {
		  if ((!$.t(doFD) && doFD == false) || !$.t(FormData, 'f')) {
		    // Serialize it
		    sl.call(form.elements).forEach(function(f) {
		      if (f.name && !f.disabled && ['file', 'reset', 'submit', 'button'].indexOf(f.type) === -1) {
		        if (f.type === 'select-multiple') {
		          sl.call(f.options).forEach(function(option) {
		            if (option.selected) {
		            	result.push(eu(f.name) + '=' + eu(option.value));
		            }
		          });
		        } else if ((['checkbox', 'radio'].indexOf(f.type) === -1) || f.checked) {
			      	result.push(eu(f.name) + '=' + eu(f.value));
		      	}
		      }
		    });
		    return result.join('&').replace(/%20/g, '+');
		  } else {
		  	// Use FormData (default)
		  	return new FormData(form);
		  }
	  }
	  return result;
	},

	// -- Animations and Effects -----------------------------

	fade: function(delay) {
	  var el = $(this)[0], st = setTimeout;
	  delay = (delay || 0) * 1000;
	  el[Style].opacity = 1;
	  var go = function() {
	    el[Style].opacity = +el[Style].opacity - 0.0333; // Faster fade; 0.01667 is too slow
	    if (+el[Style].opacity > 0) {
	      (Win[ReqAF] && Win[ReqAF](go)) || st(go, 16); // Fallback is 1000ms/60fps = 16ms
	    } else {
	    	el[Style].display = 'none';
	    	el[Style].opacity = '';
	    }
	  };
	  (delay > 0) ? st(go, delay) : go();
	},

	slideUp: function(delay) {
	  var el = $(this)[0], st = setTimeout;
	  child = $(el).down();
	  delay = (delay || 0) * 1000;
	  var elPos = this.css('position'),
	  	childPos = child.css('position'),
	  	childHt = child.getHeight(),
	  	elOverflow = this.css('overflow'),
	  	styles = {};
	  // {position: absolute} is okay, but static is not; el overflow must be hidden
	  if (elPos === 'static' || !elPos) { styles[Pos] = 'relative'; }
	  if (elOverflow !== 'hidden') { styles.overflow = 'hidden'; }
		this.css(styles);
	  if (childPos === 'static' || !childPos) {
	  	child[0][Style][Pos] = 'relative';
	  }
	  el[Style].top = '0px';
	  var dec = childHt / 25;
	  var go = function() {
	    topnum = +(el[Style].top.replace(/px/,'')); // negative number
	    el[Style].top = (topnum - dec) + 'px'; // dec value is height/25
	    if (-childHt < topnum) {
	      (Win[ReqAF] && Win[ReqAF](go)) || st(go, 16);
	    } else {
				$(el).css({
					display: 'none',
					overflow: elOverflow,
					position: elPos == 'static' ? '' : elPos,
					top: ''
				});
				child[0][Style][Pos] = childPos == 'static' ? '' : childPos;
	    }
	  };
	  (delay > 0) ? st(go, delay) : go();
	},

	scrollTo: function(opts) {
		var el = $(this)[0], de=Doc.documentElement, db=Doc.body, sT=Win.scrollTo, mR = Math.round;
		opts = opts || {};
		if (!opts.duration) { opts.duration = 0.5; }
		if (!opts.offset) { opts.offset = 0; }
		var skrol = {
			left: mR(Win.pageXOffset || de.scrollLeft || db.scrollLeft),
			top: mR(Win.pageYOffset || de.scrollTop || db.scrollTop)
		};
	  var elSkrol = $.cOff(el).top + parseInt(opts.offset),
	  	maxSkrol = $('body').getHeight() - de.clientHeight + 40, // 40 for a bit extra
			diff = elSkrol - skrol.top, up;
		// Ignore tiny differences:
		if (Math.abs(diff) < 15) { return; }
		// Carry on
		if (diff < 0) {
			up = true;
		} else if (diff > 0) {
			up = false;
		} else {
			return;
		}
	  var dec = mR(diff / (60 * opts.duration)); // Gives 1s * 0.x duration at 60fps
	  var go = function() {
	 		skrol.top = skrol.top + dec; // dec is already + or - for down/up
			// Up scroll checks
			if (up && skrol.top < 0) {
				sT(skrol.left, 0);
				return;
			}
			if (up && skrol.top < elSkrol) { skrol.top = elSkrol; }
			// Down scroll checks
			if (!up && skrol.top > maxSkrol) {
				// Some elems are lower than max scroll-down, so stop:
				sT(skrol.left, maxSkrol);
				return;	
			}
			if (!up && skrol.top > elSkrol) { skrol.top = elSkrol; }
			// Carry on
	    if (skrol.top != elSkrol) {
	    	sT(skrol.left, skrol.top);
	      (Win[ReqAF] && Win[ReqAF](go)) || setTimeout(go, 16); // Fallback is 1000ms/60fps = 16ms
	    }
	  };
	  go();
	},

	// -- Miscellaneous --------------------------------------

	blank: function() {
		var t, x = this[0];
		if (x.tagName == 'SELECT') {
			t = x.value;
		} else {
			t = x.value || x.innerHTML;
		}
		return /^\s*$/.test(t);
	},

	data: function(key, val) {
	  if (!$.t(val)) {
	    this.forEach(function(item) {
	      item.setAttribute('data-' + key, val);
	    });
	    return this;
	  } else {
	    return this[0].getAttribute('data-' + key);
	  }
	},

	// This allows passing in a function(){...}, which will be called on each elem
	each: function(iterator, context) {
	  for (var i=0, l=this[Len]; i<l; i++) {
	    if (i in this) {
	    	iterator.call($(this[i]));
	    }
	  }
	},

	focus: function() {
	  this[0].focus();
	  return this;
	},

});

})(window.$,window,document,'parentNode','position','processData','returnType','contentType','headers','timeout','style','length','requestAnimationFrame');
