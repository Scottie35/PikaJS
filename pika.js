/**
 * 	@license PikaJS v3.2.1
 * 	© 2021-2023 Scott Ogrin - MIT License
 */

var __$ = window.$;

window.Pika=(function(Doc, fn, nsRegXnEvts, Eid, N, DocEl, OwnDoc, DefVw, PN, Pos, PrcDt, RtTyp, CntTyp, Hdrs, TmOt, Styl, Ln, RelT, pI, Me, Ml, Mv, Mt, fE, crEl, nT, iH, aC, iB, gAt, sAt, rAt, $){

	// Aaaaand begin:
	$ = function(s, context) {
		return new $.i(s, context);
	}

	// Allows extending obj
	$.extend = function(obj) {
		for(var i = 1, k = arguments, l; i < k[Ln]; i++) {
			if (l = k[i]) {
				for (j in l) {
					obj[j] = l[j];
				}
			}
		}
		return obj;
	}

	$.extend($, {

		Version: '3.2.1',
		Bubble: false,
		Ajax: {
			url: N,
			type: 'GET',
			data: N,
			processData: true,
			responseType: N,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			headers: {
	      'X-Requested-With': 'XMLHttpRequest',
	      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
			},
			timeout: 0,
			before: N,
			done: N,
			fail: N,
			always: N
		},

		Js: {}, // JS: { ij3sdfs: {txt: ['js', 'js'], doc: [document, document]}, b8e64hr: {...} }

	// Why not fetch()?
	// fetch uses promises, which is nice. 
	// BUT: fetch is experimental, cookieless by default, promise doesn't reject on error, 
	// timeouts are not supported, aborting is complicated, and there is no progress tracking...
	// In short, those aren't the droids we're looking for.

	// AJAX function
		ajax: function(opts) {
			var theurl = N, thedata = N, timeoutTimer = N, aD = $.Ajax, sRH = 'setRequestHeader';
			if (!opts.url || !$.t(opts.url, 's')) {
				return false;
			} else {
				theurl = opts.url;
			}
			(!opts.type) ? opts.type = aD.type :	opts.type = opts.type.toUpperCase();
			opts.data = opts.data || aD.data;
			opts[PrcDt] = opts[PrcDt] || aD[PrcDt];
			opts[RtTyp] = opts[RtTyp] || aD[RtTyp];
			opts[CntTyp] = opts[CntTyp] || aD[CntTyp];
			opts[Hdrs] = opts[Hdrs] || aD[Hdrs];
			opts[TmOt] = opts[TmOt] || pI(aD[TmOt]);
			thedata = opts.data;
			// Check type/data, change options
			//		1. GET with data must always be serialized! No FormData.
			// 		2. $(form).formData() 	==> FormData
			//		3. $(form).formData(0) 	==> Serialized with formData()
			//		4. {...} or whatever		==> Serialize with $.toS()
			if (opts.type == 'GET') {
				opts[PrcDt] = true;
				opts[CntTyp] = false;
			}
			if (thedata instanceof FormData && opts.type != 'GET') {
				opts[PrcDt] = false;
				opts[CntTyp] = false;
			} else if (opts[PrcDt]) {
				if (thedata != N && !$.t(thedata, 's')) {
					thedata = $.toS(thedata);
				}
			}
			// Do request
			var xhr = new XMLHttpRequest();
			// Add URL parms if needed
			if (opts.type == 'GET' && thedata != N && thedata != '') {
				theurl = theurl + (/\?/.test(theurl) ? "&" : "?") + thedata;
			}
			// XMLHttpRequest.open(method, url, async=true, user, password)
			xhr.open(opts.type, theurl);
			// Set Content-Type
			if (opts.type != 'GET' && opts[CntTyp] !== false) {
				xhr[sRH]('Content-Type', opts[CntTyp]);
			}
			// Set up other headers if present (this can override contentType!)
			if (opts[Hdrs] !== N) {
				for (n in opts[Hdrs]) {
					xhr[sRH](n, opts[Hdrs][n]);
				}
			}
			// Do .before() if necessary
			if ($.t(opts.before, 'f')) { opts.before(); }
			// Set up listeners
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					// These vars will be passed to our callback funcs below:
					var response = N, responseType = N, status = xhr.status, statusText = xhr.statusText;
					// Carry on
					// status = 0 on xhr.abort(), so it will be an error
					if (status >= 200 && status < 300 || status == 304) {
						// SUCCESS
						// Clear timer if set
						if (timeoutTimer) {
							clearTimeout(timeoutTimer);
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
							if (opts[RtTyp] == 'script') {
								// The whole response is supposed to be pure JS, so extract it, execute it, and return nothing
								var tmp = xhr.responseText, resp = N, id = $.R();
								if (tmp.match(/^<script[^>]*>/) == N) {
									tmp = ("<script>" + tmp + "</script>");
								}
								resp = $.H(tmp, id);
								response = '';
								tmp = N;
								resp = N;
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
			if (opts[TmOt] > 0 ) {
				timeoutTimer = setTimeout(function() {
					// This aborts already sent request
					xhr.abort();
					// readyState = 4, status = 0, so opts.fail() will be run
				}, opts[TmOt]);
			}
			// Send request
			(opts.type == 'GET' || thedata == N) ? xhr.send() : xhr.send(thedata);
		},

		// Cumulative offset calc
	  cOff: function(el) {
	    var t = 0, l = 0;
	    if (el[PN]) {
	      do {
	        t += el.offsetTop  || 0;
	        l += el.offsetLeft || 0;
	        el = el.offsetParent;
	      } while (el);
	    }
	    return {top: t, left: l, x: l, y: t};
	  },

		// Builder called by $.toS for serializing object for AJAX call
		doToS: function(prefix, obj, add) {
			var name;
			if (Array.isArray(obj)) {
				for (var i=0, l=obj[Ln]; i<l; i++) {
					if (/\[\]$/.test(prefix)) {
						add(prefix, obj[i]);
					} else {
						$.doToS(prefix + "[" + ($.t(obj[i], 'o') && obj[i] != N ? i : "") + "]", obj[i], add);
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
				for (var i=0, l=$.Js[id].txt[Ln]; i<l; i++) {
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
	    while (el && el[nT] !== 1) {
	      el = el.nextSibling;
	    }
	    return el;
	  },

	  findR: function(el, prop, expr, index) {
	    if (!el) { return el; }
	    expr = expr || 0, index = index || 0;
	    if ($.t(expr, 'n')) {
	      index = expr, expr = N;
	    }
	    while (el = el[prop]) {
	      if (el[nT] !== 1) { continue; }
	    	if (expr && !$(el).is(expr)) { continue; }
	      if (--index >= 0) { continue; }
	      return el;
	    }
	  },

		getTags: function(content, tag) {
			var ret, qS='querySelectorAll', tl='toLowerCase';
			ret = (!$.t(content[qS])) ? content[qS](tag || "*") : [];
			if (/^u/.test(typeof tag) || tag && (content.nodeName && content.nodeName[tl]() === tag[tl]())) {
				return $.merge([content], ret);
			}
			return ret;
		},

		// This function converts text HTML into DOM nodes using createContextualFragment
		H: function(html, id, innerHtml) {
			var h = String(html), content = N, jstxt='', jsdoc, d = Doc, js;
			// Be careful of nodes with no HTML!
			content = (h.match(/<[^>]+?>/mi) == N) ? d.createTextNode(h) : d.createRange().createContextualFragment(h);
			// At this point, content is some DOM nodes, so save any JS for execution, and remove the SCRIPT nodes
			js = $.getTags(content, 'script');
			if (js[Ln] > 0) {
				$.Js[id] = {txt: [], doc: []};
				for (var i=0, l=js[Ln]; i<l; i++) {
					if (js[i].textContent) {
						$.Js[id].txt.push(js[i].textContent);
						$.Js[id].doc.push(js[i][OwnDoc]);
						if (js[i][PN]) {
							js[i][PN].removeChild(js[i]);
						}
					}
				}
			}
			// content is cleaned, so check for innerHTML=? usage and modify return content
			if (!$.t(innerHtml)) {
			  var div = d[crEl]('div');
			  div[aC](content);
			  content = div[iH];
			  div = N;
			}
			return content;
		},

		JS: function(code, doc) {
			doc = doc || Doc;
			var js = doc[crEl]("script");
			js.text = code;
			doc.head[aC](js)[PN].removeChild(js);
		},

	  longHex: function(hex) {
	  	return "#"+(hex.match(/[^#]/g).map(function(char){ return char + char; })).join('');
	  },

		merge: function(first, second) {
			var len = +second[Ln], j = 0, i = first[Ln];
			for (; j < len; j++) {
				first[i++] = second[j];
			}
			first[Ln] = i;
			return first;
		},

	  rgb2Hex: function(rgb) {
	  	return "#"+(rgb.match(/\b(\d+)\b/g).map(function(digit){ return ('0' + pI(digit).toString(16)).slice(-2) })).join('');
	  },

		R: function() {
			// This guy is used to link extracted JS from each call to $.H to the method where it was called
			// This prevents 2+ simultaneous DOM insertions from executing returned JS like 500 times
			return Math.random().toString(36).substr(2, 7);
		},

		// Instead of Event.stop(evt) or evt.stop()
		S: function(evt) {
			evt = evt || window.event;
			evt.preventDefault();
		  evt.stopPropagation();
		},

		// typeof checker
		t: function(val, type) {
			// Types: Undefined, Null*, Boolean, Number, BigInt, String, Symbol, Function, Object
			var t = {b: /^bo/, n: /^n/, i: /bi/, s: /st/, y: /sy/, f: /^f/,  o: /^o/};
			return /^u/.test(typeof type) ? /^u/.test(typeof val) : t[type].test(typeof val);
		},

		// Instead of Toggle.display(el)
		T: function(el) {
			$(el)[fE](function(e) {
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
					k[k[Ln]] = eu(key) + "=" + eu(val == N ? "" : val);
				};
			// Assume array of form elements as [{name: "a", value: "1"}, {...}, ...]
			if (Array.isArray(a)) {
				for (var i=0, l=a[Ln]; i<l; i++) {
					add(a[i].name, a[i].value);
				}
			} else {
				for (prefix in a) {
					$.doToS(prefix, a[prefix], add);
				}
			}
			return k.join("&");
		},

		// Object iterator (NOT the same as $.fn.each !!)
		each: function(obj, f) {
			var keys = Object.keys(obj);
			for (var i=0, l=keys[Ln]; i<l; ++i) {
				// func will be passed name, props, with this = obj
				// If func returns false, loop is aborted
				if (f.call(obj, keys[i], obj[keys[i]]) === false) { break; }
			}
		},

		// Process el as either HTML String OR PikaJS selector obj
		doEl: function(el) {
			var cont, id = false;
			if ($.t(el, 'o') && el[Ln] > 0 && (el[0] instanceof Element)) {
				cont = el[0];
			} else {
				id = $.R();
				cont = $.H(el, id);
			}
			return [cont, id];
		},

		debounce: function(func, delay, now) {
		  var timeout;
		  delay = delay || 100;
		  now = now || false;
		  return function debounced() {
		    var obj = this, args = arguments;
		    function delayed() {
		      if (!now) { func.apply(obj, args); }
		      timeout = N; 
		    }
		    if (timeout) {
		      clearTimeout(timeout);
		    } else if (now) {
		      func.apply(obj, args);
		    }
		    timeout = setTimeout(delayed, delay); 
		  }
		}

	});

	// Basic selector / content ready functionality
	$.i = function(s, context) {
		fn.push.apply(this, !s ? fn : s[nT] || s == window ? [s] : "" + s === s ? /</.test(s) ? ((i = Doc[crEl](context || 'q'))[iH] = s, i.children) : (context && $(context)[0] || Doc).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(Doc.readyState) ? s() : $(Doc).on('DOMContentLoaded', s) : s);
	}

	// -- Selectors and DOM manipulation ---------------------
	$.i.prototype = $.extend($.fn = $.prototype = fn, {

		is: function(expr) {
			return this[0].matches(expr);
		},
	
		select: function(expr) {
			var els = [];
			this[fE](function(el) {
				$(expr, el)[fE](function(e) {
					els.push(e)
				});
			});
			return $(els);
		},

		parent: function() {
		  return $(this[0][PN]);
		},

		remove: function() {
		  if (this[Ln] == 0) { return; }
		  var parent = this[0][PN];
		  if (parent) {
		  	var ret=this[0].outerHTML;
		    parent.removeChild(this[0]);
		    return ret; // returns removed content
		  }
		},

		html: function(html) {
		  return $.t(html) ? this[0][iH] : this.update(html);
		},

		text: function(val) {
			if (!$.t(val)) {
				this[0].innerText = val;
				return this;
			} else {
				return this[0].innerText;
			}
		},

		update: function(html) {
			var id = $.R();
		  this[0][iH] = $.H(html, id, 1);
		  $.execJS(id);
		  return this;
		},

		replace: function(el) {
		  var parent = this[0][PN], res;
			if (parent) {
				var ret = $.doEl(el);
				res = parent.replaceChild(ret[0], this[0]);
				if (ret[1]) $.execJS(ret[1]);
			}
		  return !$.t(res) ? $(res) : this; // Returns node that was replaced
		},

		append: function(el) {
			var res;
			if ([1, 11, 9].indexOf(this[0][nT]) >= 0) {
		  	var ret = $.doEl(el);
		  	res = this[0][aC](ret[0]);
		  	if (ret[1]) $.execJS(ret[1]);
		  }
		  return !$.t(res) ? $(res) : this;	// Returns appended child
		},

		prepend: function(el) {
			// This inserts as first CHILD element of el
			var res;
		  if ([1, 11, 9].indexOf(this[0][nT]) >= 0) {
		  	var ret = $.doEl(el);
		  	res = this[0][iB](ret[0], this[0].firstChild);
		  	if (ret[1]) $.execJS(ret[1]);
		  }
		  return !$.t(res) ? $(res) : this;
		},

		before: function(el)  {
			var parent = this[0][PN], res;
			if (parent) {
				var ret = $.doEl(el);
				res = parent[iB](ret[0], this[0]);
				if (ret[1]) $.execJS(ret[1]);
			}
			return !$.t(res) ? $(res) : this;
		},

		after: function(el)  {
			var parent = this[0][PN], res;
			if (parent) {
				var ret = $.doEl(el);
				res = parent[iB](ret[0], this[0].nextSibling);
				if (ret[1]) $.execJS(ret[1]);
			}
			return !$.t(res) ? $(res) : this;
		},

		up: function(expr, index) {
		  return $((arguments[Ln] === 0) ? this[0][PN] : $.findR(this[0], PN, expr, index));
		},

		down: function(expr, index) {
		  if (arguments[Ln] === 0) {
		  	return $($.first(this[0]));
		  }
		  expr = expr || 0, index = index || 0;
		  if ($.t(expr, 'n')) {
		    index = expr, expr = '*';
		  }
		  return $($(this).select(expr)[index]);
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
			return $(this[this[Ln]-1]);
		},

		// NOTE:
		// 		$$(...)[0] => $(...).eq(0)  	=>		$(...).eq(0).hide()		<-- is Pika object
		//		$$(...)[0]										=> 		$(...)[0][iH]		<-- is DOM node only
		eq: function(index) {
			if ($.t(index, 'n') && this[Ln] > index) {
				if (index in this) {
					return $(this[index]);
				}
			}
		},

		children: function(expr) {
			var els = [], kids = this[0].children;
			if (!$.t(kids)) {
				for (var i=0, l=kids[Ln]; i<l; i++) {
					if ($.t(expr) || $(kids[i]).is(expr)) {
						els.push(kids[i]);
					}
				}
			}
			return $(els);
		},

		siblings: function(expr) {
	    var els = [];
	    if(this[0][PN]) {
		    var el = this[0][PN].firstChild;
		    while (el) {
		      if (el[nT] === 1 && this[0] !== el && (expr ? $(el).is(expr) : 1)) {
		        els.push(el);
		      }
		      el = el.nextSibling;
		    }
	    }
	    return $(els);
		},

		wrap: function(html) {
			// Replaces el with html WITH el plopped inside new node
		  var id = $.R(), divId = 'pika-wrap-' + $.R();
		  var content = $.H('<div id="' + divId + '">' + html + '</div>', id);
		  // Insert html before el (this destroys content var)
	  	this[0][PN][iB](content, this[0]);
		  // Get innermost elem of html
			var el = $('div#' + divId)[0];
			while (el.firstElementChild) {
				el = el.firstElementChild;
			}
			// Put orig content back into wrap tags
			el[aC](this[0]);
			// Remove temp DIV wrapper
			el = $('div#' + divId)[0];
			// This is the same as: elem.replaceWith(...elem.childNodes), but backwards compatible:
			el.replaceWith.apply(el, el.childNodes);
		  $.execJS(id);
		  return this; // Returns node that was wrapped
		},

		unwrap: function() {
			// Replace el's parent with el
			this[0][PN].replaceWith.apply(this[0][PN], this[0][PN].childNodes);
		  return this; // Returns node that was unwrapped
		},

		contains: function(el) {
			for (var i=0, l=this[Ln]; i<l; ++i) {
				if ($(this[i])[0].contains($(el)[0])) { return true; }
			}
			return false;
		},

		attr: function(key, val) {
		  if (val || val == '') {
		    this[0][sAt](key, val);
		    return this;
		  } else {
		    return this[0][gAt](key);
		  }
		},

		removeAttr: function(name) {
			this[0][rAt](name);
			return this;
		},


		hasClass: function(class_name) {
		  return (' ' + (this[0].className.match(/[^\s]+/g) || []).join(' ') + ' ').indexOf(' ' + class_name + ' ') > -1;
		},

		addClass: function(className) {
		  this[fE](function(el) {
		    el.classList.add.apply(el.classList, className.split(/\s/));
		  });
		  return this;
		},

		removeClass: function(className) {
		  this[fE](function(el) {
		    if ($.t(className)) {
		      el.className = '';
		    } else {
		      var cL = el.classList;
		      cL.remove.apply(cL, className.split(/\s/));
		    }
		  });
		  if (this[0].className == '') { this.removeAttr('class'); }
		  return this;
		},

		toggleClass: function(className, addremove) {
		  var cN = className.split(/\s/);
		  this[fE](function(el) {
		    var cL = el.classList;
		    for(var i=0, l=cN[Ln]; i<l; ++i) {
		    	if ($.t(addremove)) {
			    	cL.contains(cN[i]) ? cL.remove.apply(cL, [cN[i]]) : cL.add.apply(cL, [cN[i]]);
		    	} else {
		    		!!addremove ? cL.add.apply(cL, [cN[i]]) : cL.remove.apply(cL, [cN[i]]);
		    	}
		    }
		  });
		  return this;
		},

		val: function(val) {
		  if (!$.t(val)) {
		    this[0].value = val;
		    return this;
		  } else {
		    if (this[0].nodeName == 'SELECT' && this[0][gAt]('multiple') != N) {
		    	var arr = [];
		    	this.select('option')[fE](function(el) {
		    		if (el[gAt]('selected') != N) {
		    			arr.push(el.value);
		    		}
		    	});
		    	return arr;
		    } else {
		    	return this[0].value;	
		    }
		  }
		},

		// -- Formatting and styles ------------------------------

		show: function(type) {
		  this[fE](function(el) {
		  	// Inline check
		  	if (el[Styl].display == 'none') {
		  		el[Styl].display = N;
		  		if ($(el).attr('style') == '') { el[rAt]('style'); }
		  	} 
		  	// Stylesheet check
		  	if ($(el).css('display') == 'none') {
		  		el[Styl].display = type || (el.tagName == 'SPAN' ? 'inline-block' : 'block');	
		  	}
		  });
		  return this;
		},

		hide: function() {
		  this[fE](function(el) {
		    el[Styl].display = 'none';
		  });
		  return this;
		},

		visible: function() {
			return this.css('display') !== 'none';
		},

		css: function(m, n) {
			if ($.t(m, 's') && $.t(n)) {
				// Get
			  var val = this[0][Styl][m];
			  if (!val || val == 'auto') {
			    var css = Doc[DefVw].getComputedStyle(this[0], N);
			    val = css ? css[m] : N;
			  }
			  if (val == N) {return N;}
			  if (m == 'opacity') return val ? parseFloat(val) : 1.0;
			  if (val.match(/^rgb\(/) != N) return $.rgb2Hex(val);
			  if (val.match(/^#\d{3}$/) != N) return $.longHex(val);
			  return val == 'auto' ? N : val;
			} else {
				// Set
				var obj = {};
				if ($.t(m, 's') && $.t(n, 's')) {
					obj[m] = n;
				} else {
					obj = m;
				}
			  this[fE](function(el) {
			    for (var key in obj) {
			      var val = String(obj[key]);
			      if (val.match(/^#\d{3}$/) != N) { val = $.longHex(val); }
			      el[Styl][key] = val;
			    }
			  });
			  return this;
			}
		},

		cOff: function() {
			// Get position of el on page relative to top left corner of window (cumulative offset position)
			return $.cOff(this[0]);
		},

		offset: function() {
			// Position of el relative to DOCUMENT
			var bcr = this[0].getBoundingClientRect();
			return {
				top: bcr.top + this[0][OwnDoc][DefVw].pageYOffset - this[0][OwnDoc][DocEl].clientTop,
				left: bcr.left + this[0][OwnDoc][DefVw].pageXOffset - this[0][OwnDoc][DocEl].clientLeft
			};
		},

		offsetParent: function() {
			var parOff = this[0].offsetParent;
			while (parOff && $(parOff).css("position") == "static") {
				parOff = parOff.offsetParent;
			}
			return (parOff == N) ? $(Doc[DocEl]) : $(parOff);
		},

		position: function() {
			// Position of el relative to OFFSET PARENT
			var offPar, offset, parOff = {top: 0, left: 0};
			if (this.css('position') == 'fixed') {
				offset = this[0].getBoundingClientRect();
			} else {
				offPar = this.offsetParent();
				offset = this.offset();
				if (offPar[0].nodeName != 'html') {
					parOff = offPar.offset();
				}
				// Add offsetParent borders
				parOff = {
					top: parOff.top + pI(offPar.css('borderTopWidth')),
					left: parOff.left + pI(offPar.css('borderLeftWidth'))
				};
			}
			// Subtract parent offsets and element margins + padding
			return {
				top: offset.top - parOff.top - pI(this.css("marginTop")),
				left: offset.left - parOff.left - pI(this.css("marginLeft"))
			};
		},

		getDimensions: function() {
		  var display = this.css('display');
		  if (display && display !== 'none') {
		    return {width: this[0].offsetWidth, height: this[0].offsetHeight};
		  }
		  var s = this[0][Styl],
			  origStyls = {
			    visibility: s.visibility,
			    position:   s[Pos],
			    display:    s.display
			  },
		  	newStyls = {
			    visibility: 'hidden',
			    display:    'block'
			  };
		  if (origStyls[Pos] !== 'fixed') { newStyls[Pos] = 'absolute'; }
		  this.css(newStyls);
		  var dimensions = {
	      width:  this[0].offsetWidth,
	      height: this[0].offsetHeight
	    };
		  this.css(origStyls);
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

		on: function(event, f) {
			// Prevent attaching if el doesn't exist (so we can load all handlers on all pages if we want)
			if ($.t(this[0])) { return; }
			// event = [ eventName, nameSpace ]
			// nsRegXnEvts is the regex, but we also use it to store event observer data for named event observers
			event = event.split(nsRegXnEvts);
			var i;
			this.map(function(el) {
				// el.pid$ is internal ID for an element
				// i is eventName + id ("click75")
				// nsRegXnEvts[i] is array of events (eg all click events for element#75) ([[handler, namespace], [handler, namespace]])
				(nsRegXnEvts[i = event[0] + (el.pid$ = el.pid$ || ++Eid)] = nsRegXnEvts[i] || []).push([f, event[1]]);
				el.addEventListener(event[0], f);
			});
			return this;
		},

		off: function(event, f) {
			// event = [ eventName, nameSpace ]
			event = event.split(nsRegXnEvts);
			var rEL = 'removeEventListener';
			this.map(function(el) {
				// el.pid$ - internal id for an element
				var i, j;
				evts = nsRegXnEvts[event[0] + el.pid$];
				// if array of events exist then i = length of array of events
				if(i = evts && evts[Ln]) {
					// while j = one of array of events
					while(j = evts[--i]) {
						// if (no f and no namespace || f but no namespace || no f but namespace || f and namespace)
						if((!f || f == j[0]) && (!event[1] || event[1] == j[1])) {
							el[rEL](event[0], j[0]);
							// remove event from array of events
							evts.splice(i, 1);
						}
					}
				} else {
					// If event added before using addEventListener, just remove it using el.removeEventListener(eventName, f)
					!event[1] && el[rEL](event[0], f);
				}	
			});
			return this;
		},

		// jQuery-like delegated event handler (this = parent where listener is attached)
		// Note this cancels event bubble/default for you if $.Bubble == false - unless last param === false
		_on: function(event, expr, f, stopbubl) {
			// Prevent attaching if el doesn't exist (so we can load all handlers on all pages if we want)
			if ($.t(this[0])) { return; }
			var special = false, evtarr = event.split(nsRegXnEvts);
			stopbubl = ($.t(stopbubl) ? (!$.Bubble) : stopbubl);
			// Change mouseenter->mouseover, mouseleave->mouseout (with special checks below)
			if (evtarr[0] == Me || evtarr[0] == Ml) {
				special = true;
				event = ((evtarr[0] == Me) ? Mv : Mt) + ($.t(evtarr[1]) ? '' : '.' + evtarr[1]);
			}
			// Attach to PARENT, filter for child
			this.on(event, function(evt) {
				// Either we have normal event, or we need to override mouseenter/leave to make them more useful:
				// We make mouseenter/leave into over/out AND and do some special checking
				// This allows delegated mouseenter/leave listeners since normally, they don't bubble
				// In short, we do NOT fire the event if we're dealing with entering or leaving a child element in some cases
				var et = evt.target;
				if (et && ($(et).is(expr) || $(expr).contains(et)) && (!special || (special && (!evt[RelT] || (evt[RelT] !== et && !$(et).contains(evt[RelT])))))) {
					if (stopbubl) { $.S(evt); }
					f.call((special || $(et).is(expr)) ? $(et) : $(et).up(expr), evt); // func will have evt, this = $()
				}
			});
			return this;
		},

		// Non-delegated event handler that removes itself after 1st event
		// Note this cancels event bubble/default for you if $.Bubble == false - unless last param === false
		// We don't use addEventListener with {once: true} becuz we want to do fancy stuff:
		one: function(event, f, stopbubl) {
			// Prevent attaching if el doesn't exist (so we can load all handlers on all pages if we want)
			if ($.t(this[0])) { return; }
			var special = false, evtarr = event.split(nsRegXnEvts);
			stopbubl = ($.t(stopbubl) ? !$.Bubble : stopbubl);
			// Change mouseenter->mousover, mouseleave->mouseout (with special checks below)
			if (evtarr[0] == Me || evtarr[0] == Ml) {
				special = true;
				event = ((evtarr[0] == Me) ? Mv : Mt) + ($.t(evtarr[1]) ? '' : '.' + evtarr[1]);
			}
			var that = this;
			this.on(event, function(evt) {
				// See ._on() for an explanation of this lunacy!
				if (stopbubl) { $.S(evt); }
				if (!special || (!evt[RelT] || (evt[RelT] !== evt.target && !evt.target.contains(evt[RelT])))) {
					f.call($(evt.target), evt);
					// Only run once!
					that.off(event);
				}
			});
			return this;
		},

		// Check value every (time) ms and call f if changed
		onChange: function(time, f) {
			if (!$.t(this[0])) {
				var that = this, value = this.val();
				setInterval(function() {
					var newv = that.val();
					if (newv != value) {
						value = newv;
						f.call(that, newv);
					}
				}, time);
			}
		},

		// -- Ajax Stuff -----------------------------------------

		// Our FormData / serializer
		// Will serialize no matter what if FormData not supported (for a few mobile browsers)
		formData: function(doFD) {
		  var result = [], form = this[0], eu = encodeURIComponent, sl = Array.prototype.slice;
		  if ($.t(form, 'o') && form.nodeName == 'FORM') {
			  if ((!$.t(doFD) && doFD == false) || !$.t(FormData, 'f')) {
			    // Serialize it
			    sl.call(form.elements)[fE](function(f) {
			      if (f.name && !f.disabled && ['file', 'reset', 'submit', 'button'].indexOf(f.type) == -1) {
			        if (f.type == 'select-multiple') {
			          sl.call(f.options)[fE](function(option) {
			            if (option.selected) {
			            	result.push(eu(f.name) + '=' + eu(option.value));
			            }
			          });
			        } else if ((['checkbox', 'radio'].indexOf(f.type) == -1) || f.checked) {
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

		// -- Miscellaneous --------------------------------------

		blank: function() {
			var t, x = this[0];
			t = (x.tagName == 'SELECT') ?  x.value : (x.value || x[iH]);
			return /^\s*$/.test(t);
		},

		data: function(key, val) {
		  if (!$.t(val)) {
		    this[fE](function(item) {
		      item[sAt]('data-' + key, val);
		    });
		    return this;
		  } else {
		    return this[0][gAt]('data-' + key);
		  }
		},

		removeData: function(name) {
			this[0][rAt]('data-' + name);
			return this;
		},

		// This allows passing in a function(){...}, which will be called on each elem
		each: function(iterator, context) {
		  for (var i=0, l=this[Ln]; i<l; i++) {
		    if (i in this) {
					if (iterator.call($(this[i])) === false) { break; }
		    }
		  }
		},

		focus: function() {
		  this[0].focus();
		  return this;
		},

		blur: function() {
		  this[0].blur();
		  return this;
		},

		// -- Aliases --------------------------------------

		find: function(expr) { return this.select(expr); },
		dimensions: function() { return this.getDimensions(); },
		width: function() { return this.getWidth(); },
		height: function() { return this.getHeight(); },

	});	

	return $;

})(document, [], /\.(.+)/, 0, null, 'documentElement', 'ownerDocument', 'defaultView', 'parentNode', 'position', 'processData', 'returnType', 'contentType', 'headers', 'timeout', 'style', 'length', 'relatedTarget', parseInt, 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'forEach', 'createElement', 'nodeType', 'innerHTML', 'appendChild', 'insertBefore', 'getAttribute', 'setAttribute', 'removeAttribute');

Pika.noConflict = function() {
	if (window.$ === Pika) { window.$ = __$; }
	return Pika;
}

window.Pika = window.$ = Pika;
