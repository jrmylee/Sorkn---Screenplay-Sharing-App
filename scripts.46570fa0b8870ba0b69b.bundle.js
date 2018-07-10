!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.anime=e()}(this,()=>{const t={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},e={duration:1e3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},n=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skewX","skewY","perspective"];let r;function o(t,e){return t.indexOf(e)>-1}const a={arr:t=>Array.isArray(t),obj:t=>o(Object.prototype.toString.call(t),"Object"),pth:t=>a.obj(t)&&t.hasOwnProperty("totalLength"),svg:t=>t instanceof SVGElement,dom:t=>t.nodeType||a.svg(t),str:t=>"string"==typeof t,fnc:t=>"function"==typeof t,und:t=>"undefined"==typeof t,hex:t=>/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t),rgb:t=>/^rgb/.test(t),hsl:t=>/^hsl/.test(t),col:t=>a.hex(t)||a.rgb(t)||a.hsl(t)},i=(()=>{function t(t,e){return 1-3*e+3*t}function e(t,e){return 3*e-6*t}function n(t){return 3*t}function r(r,o,a){return((t(o,a)*r+e(o,a))*r+n(o))*r}function o(r,o,a){return 3*t(o,a)*r*r+2*e(o,a)*r+n(o)}return function(t,e,n,a){if(!(0<=t&&t<=1&&0<=n&&n<=1))return;let i=new Float32Array(11);if(t!==e||n!==a)for(let o=0;o<11;++o)i[o]=r(.1*o,t,n);return s=>t===e&&n===a?s:0===s?0:1===s?1:r(function(e){let a=0,s=1;for(;10!==s&&i[s]<=e;++s)a+=.1;const u=a+(e-i[--s])/(i[s+1]-i[s])*.1,c=o(u,t,n);return c>=.001?function(t,e,n,a){for(let i=0;i<4;++i){const i=o(e,n,a);if(0===i)return e;e-=(r(e,n,a)-t)/i}return e}(e,u,t,n):0===c?u:function(t,e,n,o,a){let i,s,u=0;do{(i=r(s=e+(n-e)/2,o,a)-t)>0?n=s:e=s}while(Math.abs(i)>1e-7&&++u<10);return s}(e,a,a+.1,t,n)}(s),e,a)}})(),s=(()=>{const t=["Quad","Cubic","Quart","Quint","Sine","Expo","Circ","Back","Elastic"];function e(t,e){return 0===t||1===t?t:-Math.pow(2,10*(t-1))*Math.sin((t-1-e/(2*Math.PI)*Math.asin(1))*(2*Math.PI)/e)}const n={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],e],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],(t,n)=>1-e(1-t,n)],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],(t,n)=>t<.5?e(2*t,n)/2:1-e(-2*t+2,n)/2]};let r={linear:i(.25,.25,.75,.75)};for(let o in n)n[o].forEach((e,n)=>{r["ease"+o+t[n]]=a.fnc(e)?e:i.apply(this,e)});return r})();function u(t){if(!a.col(t))try{return document.querySelectorAll(t)}catch(t){return}}function c(t,e){const n=t.length,r=arguments.length>=2?arguments[1]:void 0;let o=[];for(let a=0;a<n;a++)if(a in t){const n=t[a];e.call(r,n,a,t)&&o.push(n)}return o}function l(t){return t.reduce((t,e)=>t.concat(a.arr(e)?l(e):e),[])}function f(t){return a.arr(t)?t:(a.str(t)&&(t=u(t)||t),t instanceof NodeList||t instanceof HTMLCollection?[].slice.call(t):[t])}function d(t,e){return t.some(t=>t===e)}function p(t){let e={};for(let n in t)e[n]=t[n];return e}function g(t,e){let n=p(t);for(let r in t)n[r]=e.hasOwnProperty(r)?e[r]:t[r];return n}function h(t,e){let n=p(t);for(let r in e)n[r]=a.und(t[r])?e[r]:t[r];return n}function m(t){const e=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);if(e)return e[2]}function y(t,e,n){return Math.min(Math.max(t,e),n)}function b(t,e){return a.fnc(t)?t(e.target,e.id,e.total):t}function x(t,e){if(e in t.style)return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function v(t,e){return a.dom(t)&&d(n,e)?"transform":a.dom(t)&&(t.getAttribute(e)||a.svg(t)&&t[e])?"attribute":a.dom(t)&&"transform"!==e&&x(t,e)?"css":null!=t[e]?"object":void 0}function w(t,e){switch(v(t,e)){case"transform":return function(t,e){const n=function(t){return o(t,"translate")||"perspective"===t?"px":o(t,"rotate")||o(t,"skew")?"deg":void 0}(e),r=o(e,"scale")?1:0+n,a=t.style.transform;if(!a)return r;let i=[],s=[],u=[];const l=/(\w+)\((.+?)\)/g;for(;i=l.exec(a);)s.push(i[1]),u.push(i[2]);const f=c(u,(t,n)=>s[n]===e);return f.length?f[0]:r}(t,e);case"css":return x(t,e);case"attribute":return t.getAttribute(e)}return t[e]||0}function A(t,e){const n=/^(\*=|\+=|-=)/.exec(t);if(!n)return t;const r=m(t)||0,o=parseFloat(e),a=parseFloat(t.replace(n[0],""));switch(n[0][0]){case"+":return o+a+r;case"-":return o-a+r;case"*":return o*a+r}}function M(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function $(t){const e=t.points;let n,r=0;for(let o=0;o<e.numberOfItems;o++){const t=e.getItem(o);o>0&&(r+=M(n,t)),n=t}return r}function I(t){if(t.getTotalLength)return t.getTotalLength();switch(t.tagName.toLowerCase()){case"circle":return function(t){return 2*Math.PI*t.getAttribute("r")}(t);case"rect":return function(t){return 2*t.getAttribute("width")+2*t.getAttribute("height")}(t);case"line":return function(t){return M({x:t.getAttribute("x1"),y:t.getAttribute("y1")},{x:t.getAttribute("x2"),y:t.getAttribute("y2")})}(t);case"polyline":return $(t);case"polygon":return function(t){const e=t.points;return $(t)+M(e.getItem(e.numberOfItems-1),e.getItem(0))}(t)}}function k(t,e){function n(n=0){return t.el.getPointAtLength(e+n>=1?e+n:0)}const r=n(),o=n(-1),a=n(1);switch(t.property){case"x":return r.x;case"y":return r.y;case"angle":return 180*Math.atan2(a.y-o.y,a.x-o.x)/Math.PI}}function O(t,e){const n=/-?\d*\.?\d+/g,r=function(t,e){if(a.col(t))return function(t){return a.rgb(t)?function(t){const e=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t);return e?`rgba(${e[1]},1)`:t}(t):a.hex(t)?function(e){const n=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(t,e,n,r)=>e+e+n+n+r+r),r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return`rgba(${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)},1)`}():a.hsl(t)?function(t){const e=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),n=parseInt(e[1])/360,r=parseInt(e[2])/100,o=parseInt(e[3])/100,a=e[4]||1;function i(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}let s,u,c;if(0==r)s=u=c=o;else{const t=o<.5?o*(1+r):o+r-o*r,e=2*o-t;s=i(e,t,n+1/3),u=i(e,t,n),c=i(e,t,n-1/3)}return`rgba(${255*s},${255*u},${255*c},${a})`}(t):void 0}(t);const n=m(t),r=n?t.substr(0,t.length-n.length):t;return e&&!/\s/g.test(t)?r+e:r}(a.pth(t)?t.totalLength:t,e)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:a.str(t)||e?r.split(n):[]}}function P(t){return c(t?l(a.arr(t)?t.map(f):f(t)):[],(t,e,n)=>n.indexOf(t)===e)}function j(t,e){let n=p(e);if(a.arr(t)){const r=t.length;2!==r||a.obj(t[0])?a.fnc(e.duration)||(n.duration=e.duration/r):t={value:t}}return f(t).map((t,n)=>{const r=n?0:e.delay;let o=a.obj(t)&&!a.pth(t)?t:{value:t};return a.und(o.delay)&&(o.delay=r),o}).map(t=>h(t,n))}const L={css:(t,e,n)=>t.style[e]=n,attribute:(t,e,n)=>t.setAttribute(e,n),object:(t,e,n)=>t[e]=n,transform:(t,e,n,r,o)=>{r[o]||(r[o]=[]),r[o].push(`${e}(${n})`)}};function T(t,e,n,r){const o="delay"===t;return e.length?(o?Math.min:Math.max).apply(Math,e.map(e=>e[t])):o?r.delay:n.offset+r.delay+r.duration}let C=[],F=0;const E=(()=>{function t(){F=requestAnimationFrame(e)}function e(e){const n=C.length;if(n){let r=0;for(;r<n;)C[r]&&C[r].tick(e),r++;t()}else cancelAnimationFrame(F),F=0}return t})();function N(n={}){let o,u,f=0,d=null;function p(){return window.Promise&&new Promise(t=>d=t)}let M=p(),$=function(n){const r=g(t,n),o=g(e,n),u=function(t){const e=P(n.targets);return e.map((t,n)=>({target:t,id:n,total:e.length}))}(),f=function(t,e){return c(l(t.map(t=>e.map(e=>(function(t,e){const n=v(t.target,e.name);if(n){const r=function(t,e){let n;return t.tweens.map(r=>{let o=function(t,e){let n={};for(let r in t){let o=b(t[r],e);a.arr(o)&&1===(o=o.map(t=>b(t,e))).length&&(o=o[0]),n[r]=o}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}(r,e);const u=o.value,c=w(e.target,t.name),l=n?n.to.original:c,f=a.arr(u)?u[0]:l,d=A(a.arr(u)?u[1]:u,f),p=m(d)||m(f)||m(c);return o.from=O(f,p),o.to=O(d,p),o.start=n?n.end:t.offset,o.end=o.start+o.delay+o.duration,o.easing=function(t){return a.arr(t)?i.apply(this,t):s[t]}(o.easing),o.elasticity=(1e3-y(o.elasticity,1,999))/1e3,o.isPath=a.pth(u),o.isColor=a.col(o.from.original),o.isColor&&(o.round=1),n=o,o})}(e,t);return{type:n,property:e.name,animatable:t,tweens:r,duration:r[r.length-1].end,delay:r[0].delay}}})(t,e)))),t=>!a.und(t))}(u,function(t,e,n){let r=[];const o=h(t,e);for(let a in n)o.hasOwnProperty(a)||"targets"===a||r.push({name:a,offset:o.offset,tweens:j(n[a],e)});return r}(r,o,n));return h(r,{children:[],animatables:u,animations:f,duration:T("duration",f,r,o),delay:T("delay",f,r,o)})}(n);function I(){$.reversed=!$.reversed}function S(t){return $.reversed?$.duration-t:t}function V(t){let e=0,n={};const o=$.animations,a=o.length;for(;e<a;){const r=o[e],a=r.animatable,i=r.tweens,s=i.length-1;let u=i[s];s&&(u=c(i,e=>t<e.end)[0]||u);const l=y(t-u.start-u.delay,0,u.duration)/u.duration,f=isNaN(l)?1:u.easing(l,u.elasticity),d=u.to.strings,p=u.round;let g,h=[];const m=u.to.numbers.length;for(let t=0;t<m;t++){let e;const n=u.to.numbers[t],r=u.from.numbers[t];e=u.isPath?k(u.value,f*n):r+f*(n-r),p&&(u.isColor&&t>2||(e=Math.round(e*p)/p)),h.push(e)}const b=d.length;if(b){g=d[0];for(let t=0;t<b;t++){const e=d[t+1],n=h[t];isNaN(n)||(g+=e?n+e:n+" ")}}else g=h[0];L[r.type](a.target,r.property,g,n,a.id),r.currentValue=g,e++}const i=Object.keys(n).length;if(i)for(let s=0;s<i;s++){if(!r){const t="transform";r=x(document.body,t)?t:`-webkit-${t}`}$.animatables[s].target.style[r]=n[s].join(" ")}$.currentTime=t,$.progress=t/$.duration*100}function X(t){$[t]&&$[t]($)}function Y(){$.remaining&&!0!==$.remaining&&$.remaining--}function Z(t){const e=$.duration,n=$.offset,r=n+$.delay,a=$.currentTime,i=$.reversed,s=S(t);$.children.length&&function(t){const e=$.children,n=e.length;if(t>=$.currentTime)for(let r=0;r<n;r++)e[r].seek(t);else for(let r=n;r--;)e[r].seek(t)}(s),(s>=r||!e)&&($.began||($.began=!0,X("begin")),X("run")),s>n&&s<e?V(s):(s<=n&&0!==a&&(V(0),i&&Y()),(s>=e&&a!==e||!e)&&(V(e),i||Y())),X("update"),t>=e&&($.remaining?(u=o,"alternate"===$.direction&&I()):($.pause(),$.completed||($.completed=!0,X("complete"),"Promise"in window&&(d(),M=p()))),f=0)}return $.reset=function(){const t=$.direction,e=$.loop;$.currentTime=0,$.progress=0,$.paused=!0,$.began=!1,$.completed=!1,$.reversed="reverse"===t,$.remaining="alternate"===t&&1===e?2:e,V(0);for(let n=$.children.length;n--;)$.children[n].reset()},$.tick=function(t){o=t,u||(u=o),Z((f+o-u)*N.speed)},$.seek=function(t){Z(S(t))},$.pause=function(){const t=C.indexOf($);t>-1&&C.splice(t,1),$.paused=!0},$.play=function(){$.paused&&($.paused=!1,u=0,f=S($.currentTime),C.push($),F||E())},$.reverse=function(){I(),u=0,f=S($.currentTime)},$.restart=function(){$.pause(),$.reset(),$.play()},$.finished=M,$.reset(),$.autoplay&&$.play(),$}return N.version="2.2.0",N.speed=1,N.running=C,N.remove=function(t){const e=P(t);for(let n=C.length;n--;){const t=C[n],r=t.animations;for(let n=r.length;n--;)d(e,r[n].animatable.target)&&(r.splice(n,1),r.length||t.pause())}},N.getValue=w,N.path=function(t,e){const n=a.str(t)?u(t)[0]:t,r=e||100;return function(t){return{el:n,property:t,totalLength:I(n)*(r/100)}}},N.setDashoffset=function(t){const e=I(t);return t.setAttribute("stroke-dasharray",e),e},N.bezier=i,N.easings=s,N.timeline=function(t){let n=N(t);return n.pause(),n.duration=0,n.add=function(r){return n.children.forEach(t=>{t.began=!0,t.completed=!0}),f(r).forEach(r=>{let o=h(r,g(e,t||{}));o.targets=o.targets||t.targets;const i=n.duration,s=o.offset;o.autoplay=!1,o.direction=n.direction,o.offset=a.und(s)?i:A(s,i),n.began=!0,n.completed=!0,n.seek(o.offset);const u=N(o);u.began=!0,u.completed=!0,u.duration>i&&(n.duration=u.duration),n.children.push(u)}),n.seek(0),n.reset(),n.autoplay&&n.restart(),n},n},N.random=((t,e)=>Math.floor(Math.random()*(e-t+1))+t),N});