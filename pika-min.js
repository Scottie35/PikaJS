/**
 * 	@license PikaJS v2.0.1
 * 	© 2022 Scott Ogrin - MIT License
 * 	Balalaika v1.0.1 - https://github.com/finom/balalaika - MIT License
 */
var __$=window.$;window.Pika=function(t,e,n,i,r,s,o,a,u,f,l,c){return(c=function(t,e){return new c.i(t,e)}).i=function(i,r){n.push.apply(this,i?i.nodeType||i==t?[i]:""+i===i?/</.test(i)?((a=e.createElement(r||"q")).innerHTML=i,a.children):(r&&c(r)[0]||e).querySelectorAll(i):/f/.test(typeof i)?/c/.test(e.readyState)?i():c(e).on("DOMContentLoaded",i):i:n)},c.i[l="prototype"]=(c.extend=function(t){for(f=arguments,a=1;a<f.length;a++)if(l=f[a])for(u in l)t[u]=l[u];return t})(c.fn=c[l]=n,{on:function(t,e){return t=t.split(i),this.map(function(n){(i[a=t[0]+(n.b$=n.b$||++r)]=i[a]||[]).push([e,t[1]]),n["add"+s](t[0],e)}),this},off:function(t,e){return t=t.split(i),l="remove"+s,this.map(function(n){if(f=i[t[0]+n.b$],a=f&&f.length)for(;u=f[--a];)e&&e!=u[0]||t[1]&&t[1]!=u[1]||(n[l](t[0],u[0]),f.splice(a,1));else!t[1]&&n[l](t[0],e)}),this},is:function(t){return((a=this[0]).matches||a["webkit"+o]||a["moz"+o]||a["ms"+o]).call(a,t)}}),c}(window,document,[],/\.(.+)/,0,"EventListener","MatchesSelector"),function(t,e,i,r,s,o,a,u,f,l,c,h,d,p,v,m,g,y,x){t.extend(t,{Version:"2.0",Bubble:!1,Ajax:{url:null,type:"GET",data:null,processData:!0,responseType:null,contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},timeout:0,before:null,done:null,fail:null,always:null},Js:{},ajax:function(e){var i=null,r=null,s=null,o=t.Ajax;if(!e.url||!t.t(e.url,"s"))return!1;i=e.url,e.type?e.type=e.type.toUpperCase():e.type=o.type,e.data=e.data||o.data,e[u]=e[u]||o[u],e[f]=e[f]||o[f],e[l]=e[l]||o[l],e[c]=e[c]||o[c],e[h]=e[h]||m(o[h]),r=e.data,"GET"==e.type&&(e[u]=!0,e[l]=!1),r instanceof FormData&&"GET"!=e.type?(e[u]=!1,e[l]=!1):e[u]&&(null==r||t.t(r,"s")||(r=t.toS(r)));var a=new XMLHttpRequest;if("GET"==e.type&&null!=r&&(i=i+(/\?/.test(i)?"&":"?")+r),a.open(e.type,i),"GET"!=e.type&&!1!==e[l]&&a.setRequestHeader("Content-Type",e[l]),null!==e[c])for(n in e[c])a.setRequestHeader(n,e[c][n]);t.t(e.before,"f")&&e.before(),a.onreadystatechange=function(){if(4===a.readyState){var n=null,i=null,r=a.status,o=a.statusText;if(r>=200&&r<300||304==r){if(s&&clearTimeout(s),"text"===(i=a.responseType||"text")&&t.t(a.responseText,"s"))if("script"==e[f]){var u=a.responseText,l=t.R();null==u.match(/^<script[^>]*>/)&&(u="<script>"+u+"<\/script>"),t.H(u,l),n="",u=null,null,t.execJS(l)}else n=a.responseText;else n=a.response;t.t(e.done,"f")&&e.done(n,i,r,o)}else t.t(e.fail,"f")&&e.fail(n,i,r,o);t.t(e.always,"f")&&setTimeout(function(){e.always(n,i,r,o)},1)}},e[h]>0&&(s=setTimeout(function(){a.abort()},e[h])),"GET"==e.type||null==r?a.send():a.send(r)},cOff:function(t){var e=0,n=0;if(t[o])do{e+=t.offsetTop||0,n+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:e,left:n,x:n,y:e}},doToS:function(e,n,i){var r;if(t.t(n,"a"))for(var s=0,o=n[p];s<o;s++)/\[\]$/.test(e)?i(e,n[s]):t.doToS(e+"["+(t.t(n[s],"o")&&null!=n[s]?s:"")+"]",n[s],i);else if(t.t(n,"o"))for(r in n)t.doToS(e+"["+r+"]",n[r],i);else i(e,n)},execJS:function(e){if(!t.t(t.Js[e])){for(var n=0,i=t.Js[e].txt[p];n<i;n++)t.t(t.Js[e].txt[n])||t.JS(t.Js[e].txt[n],t.Js[e].doc[n]);delete t.Js[e]}},first:function(t){for(t=t.firstChild;t&&1!==t.nodeType;)t=t.nextSibling;return t},findR:function(e,n,i,r){if(!e)return e;for(i=i||0,r=r||0,t.t(i,"n")&&(r=i,i=null);e=e[n];)if(1===e.nodeType&&(!i||t(e).is(i))&&!(--r>=0))return e},getTags:function(e,n){var i,r="querySelectorAll",s="toLowerCase";return i=t.t(e[r])?[]:e[r](n||"*"),void 0===n||n&&e.nodeName&&e.nodeName[s]()===n[s]()?t.merge([e],i):i},H:function(n,i,s){var a,u=String(n),f=null,l=e;if(f=null==u.match(/<[^>]+?>/im)?l.createTextNode(u):l.createRange().createContextualFragment(u),(a=t.getTags(f,"script"))[p]>0){t.Js[i]={txt:[],doc:[]};for(var c=0,h=a[p];c<h;c++)a[c].textContent&&(t.Js[i].txt.push(a[c].textContent),t.Js[i].doc.push(a[c][r]),a[c][o]&&a[c][o].removeChild(a[c]))}if(!t.t(s)){var d=l.createElement("div");d.appendChild(f),f=d.innerHTML,d=null}return f},JS:function(t,e){var n=(e=e||D).createElement("script");n.text=t,e.head.appendChild(n)[o].removeChild(n)},longHex:function(t){return"#"+t.match(/[^#]/g).map(function(t){return t+t}).join("")},merge:function(t,e){for(var n=+e[p],i=0,r=t[p];i<n;i++)t[r++]=e[i];return t[p]=r,t},rgb2Hex:function(t){return"#"+t.match(/\b(\d+)\b/g).map(function(t){return("0"+m(t).toString(16)).slice(-2)}).join("")},R:function(){return Math.random().toString(36).substr(2,7)},S:function(t){(t=t||window.event).preventDefault(),t.stopPropagation()},t:function(t,e){return void 0===e?void 0===t:typeof t==={a:"array",f:"function",n:"number",o:"object",s:"string"}[e]},T:function(e){t(e).forEach(function(e){(e=t(e)).visible()?e.hide():e.show()})},toS:function(e){var n,i=[],r=encodeURIComponent,s=function(e,n){var s=t.t(n,"f")?n():n;i[i[p]]=r(e)+"="+r(null==s?"":s)};if(Array.isArray(e))for(var o=0,a=e[p];o<a;o++)s(e[o].name,e[o].value);else for(n in e)t.doToS(n,e[n],s);return i.join("&")},each:function(t,e){for(var n=Object.keys(t),i=0,r=n[p];i<r&&!1!==e.call(t,n[i],t[n[i]]);++i);},doEl:function(e){var n,i=!1;return t.t(e,"o")&&e[p]>0&&e[0]instanceof Element?n=e[0]:(i=t.R(),n=t.H(e,i)),[n,i]},debounce:function(t,e,n){var i;return e=e||100,n=n||!1,function(){var r=this,s=arguments;i?clearTimeout(i):n&&t.apply(r,s),i=setTimeout(function(){n||t.apply(r,s),i=null},e)}}}),t.extend(t.fn,{select:function(e){return t(e,this[0])},parent:function(){return t(this[0][o])},remove:function(){if(0!=this[p]){var t=this[0][o];if(t){var e=this[0].outerHTML;return t.removeChild(this[0]),e}}},html:function(e){return t.t(e)?this[0].innerHTML:this.update(e)},text:function(e){return t.t(e)?this[0].innerText:(this[0].innerText=e,this)},update:function(e){var n=t.R();return this[0].innerHTML=t.H(e,n,1),t.execJS(n),this},replace:function(e){var n,i=this[0][o];if(i){var r=t.doEl(e);n=i.replaceChild(r[0],this[0]),r[1]&&t.execJS(r[1])}return t.t(n)?this:t(n)},append:function(e){var n;if([1,11,9].indexOf(this[0].nodeType)>=0){var i=t.doEl(e);n=this[0].appendChild(i[0]),i[1]&&t.execJS(i[1])}return t.t(n)?this:t(n)},prepend:function(e){var n;if([1,11,9].indexOf(this[0].nodeType)>=0){var i=t.doEl(e);n=this[0].insertBefore(i[0],this[0].firstChild),i[1]&&t.execJS(i[1])}return t.t(n)?this:t(n)},before:function(e){var n,i=this[0][o];if(i){var r=t.doEl(e);n=i.insertBefore(r[0],this[0]),r[1]&&t.execJS(r[1])}return t.t(n)?this:t(n)},after:function(e){var n,i=this[0][o];if(i){var r=t.doEl(e);n=i.insertBefore(r[0],this[0].nextSibling),r[1]&&t.execJS(r[1])}return t.t(n)?this:t(n)},up:function(e,n){return t(0===arguments[p]?this[0][o]:t.findR(this[0],o,e,n))},down:function(e,n){return 0===arguments[p]?t(t.first(this[0])):(e=e||0,n=n||0,t.t(e,"n")&&(n=e,e="*"),t(t(this).select(e)[n]))},previous:function(e,n){return t(t.findR(this[0],"previousSibling",e,n))},next:function(e,n){return t(t.findR(this[0],"nextSibling",e,n))},first:function(){return t(this[0])},last:function(){return t(this[this[p]-1])},eq:function(e){if(t.t(e,"n")&&this[p]>e&&e in this)return t(this[e])},children:function(e){var n=[],i=this[0].children;if(!t.t(i))for(var r=0,s=i.length;r<s;r++)(t.t(e)||t(i[r]).is(e))&&n.push(i[r]);return t(n)},siblings:function(e){var n=[];if(this[0][o])for(var i=this[0][o].firstChild;i;)1!==i.nodeType||this[0]===i||e&&!t(i).is(e)||n.push(i),i=i.nextSibling;return t(n)},wrap:function(e){var n=t.R(),i="pika-wrap-"+t.R(),r=t.H('<div id="'+i+'">'+e+"</div>",n);this[0][o].insertBefore(r,this[0]);for(var s=t("div#"+i)[0];s.firstElementChild;)s=s.firstElementChild;return s.appendChild(this[0]),(s=t("div#"+i)[0]).replaceWith.apply(s,s.childNodes),t.execJS(n),this},unwrap:function(){return this[0][o].replaceWith.apply(this[0][o],this[0][o].childNodes),this},contains:function(e){return this[0].contains(t(e)[0])},attr:function(t,e){return e||""==e?(this[0].setAttribute(t,e),this):this[0].getAttribute(t)},removeAttr:function(t){return this[0].removeAttribute(t),this},hasClass:function(t){return(" "+(this[0].className.match(/[^\s]+/g)||[]).join(" ")+" ").indexOf(" "+t+" ")>-1},addClass:function(t){return this.forEach(function(e){e.classList.add.apply(e.classList,t.split(/\s/))}),this},removeClass:function(e){return this.forEach(function(n){if(t.t(e))n.className="";else{var i=n.classList;i.remove.apply(i,e.split(/\s/))}}),this},toggleClass:function(e,n){var i=e.split(/\s/);return this.forEach(function(e){for(var r=e.classList,s=0,o=i[p];s<o;++s)t.t(n)?r.contains(i[s])?r.remove.apply(r,[i[s]]):r.add.apply(r,[i[s]]):Boolean(n)?r.add.apply(r,[i[s]]):r.remove.apply(r,[i[s]])}),this},val:function(e){if(t.t(e)){if("SELECT"==this[0].nodeName&&null!=this[0].getAttribute("multiple")){var n=[];return this.select("option").forEach(function(t){null!=t.getAttribute("selected")&&n.push(t.value)}),n}return this[0].value}return this[0].value=e,this},show:function(t){return this.forEach(function(e){e.style.display=t||("SPAN"==e.tagName?"inline-block":"block")}),this},hide:function(){return this.forEach(function(t){t.style.display="none"}),this},visible:function(){return"none"!==this.css("display")},css:function(n,i){if(t.t(n,"s")&&t.t(i)){var r=this[0].style[n];if(!r||"auto"===r){var o=e[s].getComputedStyle(this[0],null);r=o?o[n]:null}return null==r?null:"opacity"===n?r?parseFloat(r):1:null!=r.match(/^rgb\(/)?t.rgb2Hex(r):null!=r.match(/^#\d{3}/)?t.longHex(r):"auto"===r?null:r}var a={};return t.t(n,"s")&&t.t(i,"s")?a[n]=i:a=n,this.forEach(function(e){for(var n in a){var i=String(a[n]);null!=i.match(/^#\d{3}/)&&(i=t.longHex(i)),e.style[n]=i}}),this},cOff:function(){return t.cOff(this[0])},offset:function(){var t=this[0].getBoundingClientRect();return{top:t.top+this[0][r][s].pageYOffset-this[0][r][i].clientTop,left:t.left+this[0][r][s].pageXOffset-this[0][r][i].clientLeft}},offsetParent:function(){for(var n=this[0].offsetParent;n&&"static"===t(n).css("position");)n=n.offsetParent;return t(null==n?e[i]:n)},position:function(){var t,e,n={top:0,left:0};return"fixed"===this.css("position")?e=this[0].getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),"html"!==t[0].nodeName&&(n=t.offset()),n={top:n.top+m(t.css("borderTopWidth")),left:n.left+m(t.css("borderLeftWidth"))}),{top:e.top-n.top-m(this.css("marginTop")),left:e.left-n.left-m(this.css("marginLeft"))}},getDimensions:function(){var t=this.css("display");if(t&&"none"!==t)return{width:this[0].offsetWidth,height:this[0].offsetHeight};var e=this[0].style,n={visibility:e.visibility,position:e[a],display:e.display},i={visibility:"hidden",display:"block"};"fixed"!==n[a]&&(i[a]="absolute"),this.css(i);var r={width:this[0].offsetWidth,height:this[0].offsetHeight};return this.css(n),r},getHeight:function(){return this.getDimensions().height},getWidth:function(){return this.getDimensions().width},_on:function(e,n,i,r){if(!t.t(this[0])){var s=!1;r=t.t(r)?!t.Bubble:r,e!=g&&e!=y||(s=!0,e=e==g?x:y),this.on(e,function(e){e.target&&t(e.target).is(n)&&(r&&t.S(e),s&&e[v]&&(e[v]===e.target||e.target.contains(e[v]))||i.call(t(e.target),e))})}},one:function(e,n,i){if(!t.t(this[0])){var r=!1;i=t.t(i)?!t.Bubble:i,e!=g&&e!=y||(r=!0,e=e==g?x:y);var s=this;this.on(e,function(o){i&&t.S(o),r&&o[v]&&(o[v]===o.target||o.target.contains(o[v]))||(n.call(t(o.target),o),s.off(e))})}},onChange:function(e,n){if(!t.t(this[0])){var i=this,r=this.val();setInterval(function(){var t=i.val();t!=r&&(r=t,n.call(i,t))},e)}},formData:function(e){var n=[],i=this[0],r=encodeURIComponent,s=Array.prototype.slice;return t.t(i,"o")&&"FORM"===i.nodeName?!t.t(e)&&0==e||!t.t(FormData,"f")?(s.call(i.elements).forEach(function(t){t.name&&!t.disabled&&-1===["file","reset","submit","button"].indexOf(t.type)&&("select-multiple"===t.type?s.call(t.options).forEach(function(e){e.selected&&n.push(r(t.name)+"="+r(e.value))}):(-1===["checkbox","radio"].indexOf(t.type)||t.checked)&&n.push(r(t.name)+"="+r(t.value)))}),n.join("&").replace(/%20/g,"+")):new FormData(i):n},blank:function(){var t,e=this[0];return t="SELECT"==e.tagName?e.value:e.value||e.innerHTML,/^\s*$/.test(t)},data:function(e,n){return t.t(n)?this[0].getAttribute("data-"+e):(this.forEach(function(t){t.setAttribute("data-"+e,n)}),this)},removeData:function(t){return this[0].removeAttribute("data-"+t),this},each:function(e,n){for(var i=0,r=this[p];i<r&&!(i in this&&!1===e.call(t(this[i])));i++);},focus:function(){return this[0].focus(),this},blur:function(){return this[0].blur(),this},find:function(t){return this.select(t)},dimensions:function(){return this.getDimensions()},width:function(){return this.getWidth()},height:function(){return this.getHeight()}})}(window.Pika,document,"documentElement","ownerDocument","defaultView","parentNode","position","processData","returnType","contentType","headers","timeout",0,"length","relatedTarget",parseInt,"mouseenter","mouseleave","mouseover"),Pika.noConflict=function(){return window.$===Pika&&(window.$=__$),Pika},window.Pika=window.$=Pika;
