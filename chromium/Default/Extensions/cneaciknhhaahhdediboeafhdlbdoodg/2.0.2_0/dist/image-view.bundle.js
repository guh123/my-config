!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=17)}([function(e,n,t){"use strict";t.d(n,"e",(function(){return r})),t.d(n,"f",(function(){return o})),t.d(n,"g",(function(){return i})),t.d(n,"b",(function(){return a})),t.d(n,"a",(function(){return u})),t.d(n,"h",(function(){return c})),t.d(n,"c",(function(){return s})),t.d(n,"d",(function(){return f})),t.d(n,"i",(function(){return p}));chrome.extension,chrome.storage;var r=chrome.storage.local,o=chrome.runtime,i=chrome.tabs,a=chrome.browserAction,u=chrome.cookies,c=chrome.webNavigation,s=chrome.contextMenus,f=chrome.i18n,p=chrome.windows;chrome.webRequest},function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var r=t(7),o=t(2);function i(e,n,t,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void t(e)}u.done?n(c):Promise.resolve(c).then(r,o)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var a=e.apply(n,t);function u(e){i(a,r,o,u,c,"next",e)}function c(e){i(a,r,o,u,c,"throw",e)}u(void 0)}))}}function u(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e);var n=r.a.getDomain();this.urlPrefix="".concat(n,"/api/v1/"),this.accountPrefix="".concat(r.a.getAccountDomain(),"/"),this.noPrepend=!1,this.responseType=void 0}var n,t,i;return n=e,(t=[{key:"setNoPrepend",value:function(e){return this.noPrepend=e,this}},{key:"setResponseType",value:function(e){return this.responseType=e,this}},{key:"ajaxWithoutData",value:function(e,n,t,r){var i=this;return new Promise(function(){var u=a(regeneratorRuntime.mark((function a(u,c){var s,f;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return(s=new XMLHttpRequest).onload=function(){r||"blob"===this.responseType?u(this.response):u(this.responseText)},s.onerror=function(e){c(e)},s.open(e,i.prependUrl(n,t,r)),a.next=6,Object(o.c)("znbcsr");case 6:if(f=a.sent){a.next=10;break}return c(),a.abrupt("return");case 10:r&&(s.responseType="blob",s.setRequestHeader("processData",!1),s.setRequestHeader("contentType",!1)),i.responseType&&(s.responseType=i.responseType),s.setRequestHeader("X-ZCSRF-TOKEN","znbrcsr="+f.znbcsr),s.send();case 14:case"end":return a.stop()}}),a)})));return function(e,n){return u.apply(this,arguments)}}())}},{key:"ajaxWithData",value:function(e,n,t){var r=this;return new Promise(function(){var i=a(regeneratorRuntime.mark((function i(a,u){var c,s;return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return(c=new XMLHttpRequest).onload=function(e){a(this.responseText)},c.onerror=function(e){u(e)},c.open(e,r.prependUrl(n)),i.next=6,Object(o.c)("znbcsr");case 6:if(s=i.sent){i.next=10;break}return u(),i.abrupt("return");case 10:c.setRequestHeader("X-ZCSRF-TOKEN","znbrcsr="+s.znbcsr),c.send(t);case 12:case"end":return i.stop()}}),i)})));return function(e,n){return i.apply(this,arguments)}}())}},{key:"prependUrl",value:function(e,n,t){return t||this.noPrepend?e:n?"".concat(this.accountPrefix).concat(e):"".concat(this.urlPrefix).concat(e)}}])&&u(n.prototype,t),i&&u(n,i),e}()},function(e,n,t){"use strict";t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return i})),t.d(n,"g",(function(){return a})),t.d(n,"d",(function(){return u})),t.d(n,"a",(function(){return c})),t.d(n,"e",(function(){return s})),t.d(n,"f",(function(){return f}));var r=t(0);function o(e){return new Promise((function(n,t){try{r.a.get(e,(function(e){n(e)}))}catch(e){n(void 0)}}))}function i(e){return new Promise((function(n,t){try{r.e.get(e,(function(e){n(e)}))}catch(e){n(void 0)}}))}function a(e){return new Promise((function(n,t){try{r.e.set(e,(function(){n(!0)}))}catch(e){n(!1)}}))}function u(e){return new Promise((function(n,t){try{r.e.remove(e,(function(){n(!0)}))}catch(e){n(!1)}}))}function c(e){return new Promise((function(n,t){try{r.i.create(e,(function(e){n(e)}))}catch(e){n(void 0)}}))}function s(e){return new Promise((function(n,t){try{r.f.sendMessage(e,(function(e){n(e)}))}catch(e){n(void 0)}}))}function f(e,n){return new Promise((function(t,o){try{r.g.sendMessage(e,n,(function(e){t(e)}))}catch(e){t(void 0)}}))}},function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var r={SEND_ANALYTICS:1e3,SIGN_IN:1001,USER_WINDOW:1002,DOWNLOAD_BOOK_LIST:1003,INIT_WINDOW:1004,GET_TAB_ID:1005,GET_DOCUMENT:1006,INIT_READER_VIEW:1007,DISPLAY_READER_FRAME:1008,GET_STATUS:1009,CREATE_TAG:1010,SEARCH_TAG:1011,SEND_FEEDBACK:1012,SIGN_OUT:1013,GET_ALL_TAGS:1014,SEARCH_TAG_FROM_LIST:1015,FETCH_ANNOUNCEMENT:1016,SHOW_MEETING_NOTE:1017,SAVE_MEETING_NOTE:1018,SHOW_RECIPE_POPUP:1019,CLOSE_RECIPE_POPUP:1020,SHOW_PDF_POPUP:1021,RESET_TOOLBAR_ICON:1022,SHOW_TOAST:1023,HIDE_TOAST:1024,GET_LOGIN_STATUS:1025,APP_LOADING:1026,PARTIAL_CAPTURE:1027,GET_USER_IMAGE:1028,PART_PAGE_SCREENSHOT:1029,FOCUSED_PAGE_SCREENSHOT:1030,GET_NB_DOMAIN:1031,PARTIAL_ANNOTATION_FUNC:1032,TAKE_SCREENSHOT:1033,GET_CURRENT_TAB:1034,SAVE_POSITION:1035,FETCH_NOTEBOOK_IMAGE:1036,FLUSH_CACHED_CARD:1037,FULL_PAGE_SCREENSHOT:1038,OPEN_ANNOTATOR:1039,SHOW_LOADING_IFRAME:1040,HIDE_LOADING_IFRAME:1041,DOWNLOAD_FROM_URL:1042}},function(e,n,t){"use strict";function r(e,n){return function(e,n){var t=e.getDate(),r=e.getMonth(),i=r+1,a=e.getFullYear(),u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r],c=e.getHours(),s=e.getMinutes(),f=e.getSeconds(),p="AM";c>=12&&(p="PM");c>12&&(c-=12);switch(n){case"dd-MMM, yyyy":return o(t)+"-"+u+", "+a;case"YYYY-MM-DDTHH:mm:SS+0530":return a+"-"+o(i)+"-"+o(t)+"T"+o(c)+":"+o(s)+":"+o(f)+"+0530";case"YYYY-MM-DDTHH:mm:SS+0000":return a+"-"+o(i)+"-"+o(t)+"T"+o(c)+":"+o(s)+":"+o(f)+"+0000";case"dd/MM/YYYY":return o(t)+"/"+o(i)+"/"+a;case"HH:mm:SS":return o(c)+":"+o(s)+":"+o(f);case"HH:mm M, MMM dd, yyyy":return o(c)+":"+o(s)+" "+p+", "+u+" "+o(t)+", "+a;default:return t+" "+u+" "+a}}(new Date(e),n)}function o(e){return e<10?"0"+e:""+e}t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return o}))},function(e,n,t){"use strict";t.d(n,"j",(function(){return f})),t.d(n,"e",(function(){return p})),t.d(n,"p",(function(){return l})),t.d(n,"u",(function(){return d})),t.d(n,"t",(function(){return m})),t.d(n,"l",(function(){return h})),t.d(n,"r",(function(){return v})),t.d(n,"q",(function(){return g})),t.d(n,"g",(function(){return b})),t.d(n,"s",(function(){return w})),t.d(n,"k",(function(){return y})),t.d(n,"m",(function(){return x})),t.d(n,"y",(function(){return O})),t.d(n,"f",(function(){return T})),t.d(n,"o",(function(){return E})),t.d(n,"w",(function(){return S})),t.d(n,"c",(function(){return _})),t.d(n,"h",(function(){return R})),t.d(n,"v",(function(){return P})),t.d(n,"x",(function(){return k})),t.d(n,"z",(function(){return A})),t.d(n,"a",(function(){return D})),t.d(n,"i",(function(){return N})),t.d(n,"d",(function(){return C})),t.d(n,"b",(function(){return M})),t.d(n,"n",(function(){return F}));var r=t(2),o=t(3),i=t(0),a=t(4),u=t(8);t(9);function c(e,n,t,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void t(e)}u.done?n(c):Promise.resolve(c).then(r,o)}function s(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function a(e){c(i,r,o,a,u,"next",e)}function u(e){c(i,r,o,a,u,"throw",e)}a(void 0)}))}}function f(){var e,n,t=navigator.userAgent,r=(navigator.appName,""+parseFloat(navigator.appVersion)),o=parseInt(navigator.appVersion,10);-1!=(e=t.indexOf("Chrome"))?("Chrome",r=t.substring(e+7)):t.lastIndexOf(" ")+1<(e=t.lastIndexOf("/"))&&(r=t.substring(e+1)),-1!=(n=r.indexOf(";"))&&(r=r.substring(0,n)),-1!=(n=r.indexOf(" "))&&(r=r.substring(0,n)),o=parseInt(""+r,10),isNaN(o)&&(r=""+parseFloat(navigator.appVersion),o=parseInt(navigator.appVersion,10));var a={platformVersion:r,deviceName:navigator.userAgent,deviceType:"Web"},u=i.f.getManifest().version;return a.appVersion=u,a.appName="Chrome Extension - "+u,a.platformName="Chrome",a}function p(){return(new Date).getTime()}function l(){var e=navigator.language;return"zh"===e||"zh-CN"===e||"zh-TW"===e}function d(e,n){document.createElement(e).constructor===HTMLElement&&customElements.define(e,n)}function m(e){return new Promise((function(n,t){for(var r=[],o=0,i=0;i<e.length;i++){var a=new FileReader;a.onload=u,a.readAsDataURL(e[i])}function u(){r.push(this.result),++o===e.length&&n(r)}}))}function h(){return new Promise(function(){var e=s(regeneratorRuntime.mark((function e(n,t){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.c)("notebookList");case 2:(a=e.sent)&&a.length||i.f.sendMessage({action:o.a.DOWNLOAD_BOOK_LIST},(function(e){var t=[];e&&(e=JSON.parse(e))&&g(e.code)&&(t=e.notebooks),n(t)}));case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function v(e){return new Promise((function(n,t){if(fileMap[e])n(!0);else{var r=document.createElement("script");document.head.appendChild(r),r.onload=function(){fileMap[e]=!0,n(!0)},r.onerror=function(){t(!1)},r.src=e}}))}function g(e){return 200===e||201===e}function b(e){e&&(e.focus(),e.innerText&&w(e))}function w(e){var n,t;document.createRange?((n=document.createRange()).selectNodeContents(e),n.collapse(!1),(t=window.getSelection()).removeAllRanges(),t.addRange(n)):document.selection&&((n=document.body.createTextRange()).moveToElementText(e),n.collapse(!1),n.select())}function y(){var e,n,t,r,o=new Date;return o.getFullYear()+"-"+Object(a.b)(o.getMonth()+1)+"-"+Object(a.b)(o.getDate())+"T"+(Object(a.b)(o.getHours())+":"+Object(a.b)(o.getMinutes())+":"+Object(a.b)(o.getSeconds()))+(e=o.getTimezoneOffset()/60,n=e<0?"+":"-",t=Math.floor(Math.abs(e)),r=Math.floor(60*Math.abs(e)%60),n+Object(a.b)(t)+""+Object(a.b)(r))}function x(){return new Promise(function(){var e=s(regeneratorRuntime.mark((function e(n,t){var o,i,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.c)("userprofile");case 2:o=e.sent,i=void 0,o&&(i=o.userprofile)&&i.default_notecard_color&&"random"!==i.default_notecard_color.toLowerCase()&&n(i.default_notecard_color),u=(a=["#FFB47A","#FFEE8A","#FFC96C","#FFFFFF","#FF9575","#FF8785","#E9FF9D","#B3FFE8","#83D2FF","#CDC2FF","#F9D3FF","#D9E8F0"]).length,0,n(a[Math.floor(Math.random()*(u-0)+0)]);case 9:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function O(e){if(-1!==e.indexOf("rgb")){var n=(e=e.substring(e.indexOf("(")+1,e.indexOf(")"))).split(",");return"#"+(16777216+(n[2]|n[1]<<8|n[0]<<16)).toString(16).slice(1)}return e}function T(e){for(var n=e.split(","),t=n[0].match(/:(.*?);/)[1],r=atob(n[1]),o=r.length,i=new Uint8Array(o);o--;)i[o]=r.charCodeAt(o);return new Blob([i],{type:t})}function E(e,n){for(var t=0;t<e.length;t++){var r=e[t];r.is_read=!1;for(var o=0;o<n.length;o++){var i=n[o];if(i.announcement_id===r.announcement_id){r.is_read=i.is_read;break}}}return e}function S(e,n,t){return e?(e=(e=(e=(e=e.replace(/<article/g,"<div").replace(/<\/article>/g,"</div>")).replace(/<main/g,"<div").replace(/<\/main>/g,"</div>")).replace(/<section/g,"<div").replace(/<\/section>/g,"</div>")).replace(/<br>/g,"<br/>").replace(/<hr>/g,"<hr/>"),"true"===n&&function(e){e=Object(u.a)(e)}(e),e=(e=e.replace(/[\u2028\u2029]/gim,"<br />")).replace(/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/gim,""),"true"===t&&(e=e.replace(/"/g,"\\'")),e):e}function _(){return new Promise(function(){var e=s(regeneratorRuntime.mark((function e(n,t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.d)("znbcsr");case 2:n(!0);case 3:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function R(e){if(e&&e.length){for(var n=document.createDocumentFragment(),t=0;t<e.length;t++){var r=document.createElement("div");r.id=e[t].notebook_id,r.classList.add("each-book"),r.innerText=e[t].name,n.appendChild(r)}return n}}function P(e,n){for(var t=(new DOMParser).parseFromString(e,"text/html"),r=t.querySelectorAll("script"),o=0;o<r.length;o++)r[o].parentElement.removeChild(r[o]);for(var i=t.querySelectorAll("iframe"),a=0;a<i.length;a++)i[a].parentElement.removeChild(i[a]);for(var u=t.querySelectorAll("style"),c=0;c<u.length;c++)u[c].parentElement.removeChild(u[c]);for(var s=t.querySelectorAll("button"),f=0;f<s.length;f++)s[f].parentElement.removeChild(s[f]);for(var p=t.querySelectorAll("input"),l=0;l<p.length;l++)p[l].parentElement.removeChild(p[l]);for(var d=t.querySelectorAll("textarea"),m=0;m<d.length;m++)d[m].parentElement.removeChild(d[m]);for(var h=t.querySelectorAll(".clipper-space"),v=0;v<h.length;v++){var g=document.createElement("div");g.innerHTML=h[v].innerHTML,h[v].parentElement.appendChild(g),h[v].parentElement.removeChild(h[v])}if(!n){for(var b=t.querySelectorAll("image-view"),w=0;w<b.length;w++)b[w].parentElement.removeChild(b[w]);for(var y=t.querySelectorAll("p"),x=0;x<y.length;x++)y[x].innerText&&y[x].innerText.trim()||y[x].querySelector("img")||y[x].parentElement.removeChild(y[x]);for(var O=t.querySelectorAll("br"),T=0;T<O.length;T++)O[T].innerText&&O[T].innerText.trim()||O[T].querySelector("img")||O[T].parentElement.removeChild(O[T]);for(var E=t.querySelectorAll("div"),S=0;S<E.length;S++)E[S].innerText&&E[S].innerText.trim()||E[S].querySelector("img")||E[S].parentElement.removeChild(E[S])}return t.body.innerHTML}function k(e){for(var n=(new DOMParser).parseFromString(e,"text/html"),t=n.querySelectorAll("image-view"),r=0;r<t.length;r++){var o=document.createTextNode("-()-");t[r].parentElement.replaceChild(o,t[r])}return"undefined"===n.body.innerHTML?"":n.body.innerHTML}function A(e,n){return new Promise(function(){var t=s(regeneratorRuntime.mark((function t(o,i){var a,u,c,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.c)("analyticsShown");case 2:for(a=t.sent,c=!0,a&&a.analyticsShown?u=a.analyticsShown:(u="[]",c=!0),u=JSON.parse(u),s=0;s<u.length;s++)u[s].zuid===n&&(u[s].shown=e,c=!1);return c&&u.push({shown:e,zuid:n}),t.next=10,Object(r.g)({analyticsShown:JSON.stringify(u)});case 10:o(!0);case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())}function D(e){return new Promise(function(){var n=s(regeneratorRuntime.mark((function n(t,o){var i,a,u;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.c)("analyticsShown");case 2:i=n.sent,a=i&&i.analyticsShown?i.analyticsShown:"[]",a=JSON.parse(a),u=0;case 6:if(!(u<a.length)){n.next=13;break}if(a[u].zuid!==e){n.next=10;break}return t(!1),n.abrupt("return");case 10:u++,n.next=6;break;case 13:t(!0);case 14:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}function N(e){return new Promise(function(){var n=s(regeneratorRuntime.mark((function n(t,o){var i,a,u;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.c)("analyticsShown");case 2:i=n.sent,a=i&&i.analyticsShown?i.analyticsShown:"[]",a=JSON.parse(a),u=0;case 6:if(!(u<a.length)){n.next=13;break}if(a[u].zuid!==e){n.next=10;break}return t(a[u].shown),n.abrupt("return");case 10:u++,n.next=6;break;case 13:t(!1);case 14:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}function C(e){return new Promise((function(n,t){var r=e.querySelectorAll("img");if(r&&r.length)for(var a=function(e){var t=r[e].src;if(!t)return"continue";i.f.sendMessage({action:o.a.DOWNLOAD_FROM_URL,data:{url:t}},(function(t){var o=document.createElement("image-view");o.setAttribute("image-data",t),o.setAttribute("dont_load_annotator",!0),o.id="image-view_"+p();var i=document.createElement("div"),a=document.createElement("div");a.innerHTML="<div class='clipper-space'><br></div>",i.appendChild(a),i.appendChild(o);var u=document.createElement("div");u.innerHTML="<div class='clipper-space'><br></div>",i.appendChild(u);var c=r[e].parentElement;c.removeChild(r[e]),c.appendChild(i),n(!0)}))},u=0;u<r.length;u++)a(u)}))}function M(e){for(var n=(new DOMParser).parseFromString(e,"text/html"),t=n.querySelectorAll("img"),r=0;r<t.length;r++)if(t[r].src&&-1===t[r].src.indexOf("http"))if(-1!==t[r].src.indexOf("moz-extension://")||-1!==t[r].src.indexOf("chrome-extension://")){var o=new URL(t[r].src);t[r].src=currentTab.url+o.pathname}else t[r].src=currentTab.url+t[r].src;return n.body.innerHTML}function F(e){if(!e||!e.trim())return"#212121";var n,t,r;if(e.match(/#/))n=function(e){return e=L(e),parseInt(e.substring(0,2),16)}(e),t=function(e){return e=L(e),parseInt(e.substring(2,4),16)}(e),r=function(e){return e=L(e),parseInt(e.substring(4,6),16)}(e);else{var o=e.substring(e.indexOf("(")+1,e.lastIndexOf(")")).split(/,\s*/);n=o[0],t=o[1],r=o[2]}return Math.round((299*parseInt(n)+587*parseInt(t)+114*parseInt(r))/1e3)>125?"#212121":"#FFFFFF"}function L(e){return"#"===e.charAt(0)?e.substring(1,7):e}},function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.d(n,"a",(function(){return o}));var o=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.eventListeners={}}var n,t,o;return n=e,(t=[{key:"addListener",value:function(e,n,t,r){if(n){var o=this.eventListeners[e];o||(this.eventListeners[e]=[],o=this.eventListeners[e]),o.push({element:n,type:t,func:r}),n.addEventListener(t,r)}}},{key:"clearAllListeners",value:function(e){var n=this.eventListeners[e];if(n)for(;n.length;){var t=n.pop();t&&t.element&&t.element.removeEventListener(t.type,t.func)}}}])&&r(n.prototype,t),o&&r(n,o),e}())},function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.d(n,"a",(function(){return o}));var o=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.setup="https://notebook.zoho",this.accountsSetup="https://accounts.zoho",this.topLevelDomain=".com"}var n,t,o;return n=e,(t=[{key:"setSetup",value:function(e){return this.setup=e,this}},{key:"setTopLevelDomain",value:function(e){return this.topLevelDomain=e,this}},{key:"getTopLevelDomain",value:function(){return this.topLevelDomain}},{key:"getAccountsSetup",value:function(){return this.accountsSetup}},{key:"getSetup",value:function(){return this.setup}},{key:"getDomain",value:function(){return this.setup+""+this.topLevelDomain}},{key:"getAccountDomain",value:function(){return this.accountsSetup+""+this.topLevelDomain}}])&&r(n.prototype,t),o&&r(n,o),e}())},function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));var r={elements:["a","b","br","caption","cite","code","col","colgroup","dd","dl","dt","em","h1","h2","h3","h4","h5","h6","i","img","li","ol","p","q","small","strike","strong","sub","sup","table","tbody","td","tfoot","th","thead","tr","u","ul","div","span","figure","article","section"],attributes:{a:["href"],img:["type","height","src","width","duration","class","remotesrc","org-width","org-height","consumers","local-id"],col:["span","width"],colgroup:["span","width"],ol:["start","type"],q:["cite"],table:["summary","width"],td:["abbr","axis","colspan","rowspan","width"],th:["abbr","axis","colspan","rowspan","scope","width"],ul:["type"]},protocols:{a:{href:["http","https","mailto","tel"]},img:{src:["http","https","zresource"]}}};function o(e){for(var n=e.getElementsByTagName("style"),t=0;t<n.length;t++)n[t].parentNode.removeChild(n[t]);return e}function i(e){var n=document.createElement("div");n.innerHTML=e,n=o(n);var t=new Sanitize(r).clean_node(n),i=document.createElement("div");i.appendChild(t.cloneNode(!0));var a=i.innerHTML;return a=(a=a.replace(/[\u2028\u2029]/gim,"<br />")).replace(/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/gim,"")}},function(e,n,t){"use strict";t.d(n,"e",(function(){return s})),t.d(n,"k",(function(){return f})),t.d(n,"j",(function(){return p})),t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return d})),t.d(n,"o",(function(){return m})),t.d(n,"l",(function(){return h})),t.d(n,"c",(function(){return v})),t.d(n,"n",(function(){return g})),t.d(n,"q",(function(){return b})),t.d(n,"r",(function(){return w})),t.d(n,"p",(function(){return y})),t.d(n,"g",(function(){return x})),t.d(n,"m",(function(){return O})),t.d(n,"h",(function(){return T})),t.d(n,"i",(function(){return _})),t.d(n,"d",(function(){return R})),t.d(n,"f",(function(){return P}));var r=t(1),o=t(5),i=t(7),a=t(2);function u(e,n,t,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void t(e)}u.done?n(c):Promise.resolve(c).then(r,o)}function c(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function a(e){u(i,r,o,a,c,"next",e)}function c(e){u(i,r,o,a,c,"throw",e)}a(void 0)}))}}function s(){return(new r.a).ajaxWithoutData("GET","notebooks?sort_column=-Notebook.LastModifiedTime&offset=0&limit=100")}function f(){return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(n,t){var o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=new r.a,e.next=3,o.ajaxWithoutData("GET","userprofile/accounts/status");case 3:i=e.sent,n(i);case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function p(){return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(n,t){var o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=new r.a,e.next=3,o.ajaxWithoutData("GET","userprofile");case 3:i=e.sent,n(i);case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function l(e){return new Promise(function(){var n=c(regeneratorRuntime.mark((function n(t,o){var i,a,u,c,s,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("note/file"!==e.type){n.next=10;break}return n.next=3,E(e.fileUrl);case 3:return i=n.sent,n.next=6,S(e.notebook_id,i,"");case 6:a=n.sent,t(a),n.next=19;break;case 10:return u=new r.a,(c=new FormData).append("attachment",e.znml),s="notebooks/".concat(e.notebook_id,"/notecards"),e.notebook_id&&"undefined"!==e.notebook_id||(s="notecards"),n.next=17,u.ajaxWithData("POST",s,c);case 17:f=n.sent,t(f);case 19:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}function d(e,n,t,i){return new Promise(function(){var a=c(regeneratorRuntime.mark((function a(u,c){var s,f,p,l,d;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s=new r.a,f=Object(o.f)(t),(p=new FormData).append("attachment",f,i),l="notebooks/".concat(e,"/notecards/").concat(n,"/resources"),a.next=7,s.ajaxWithData("POST",l,p);case 7:d=a.sent,u(d);case 9:case"end":return a.stop()}}),a)})));return function(e,n){return a.apply(this,arguments)}}())}function m(e,n,t){return new Promise(function(){var o=c(regeneratorRuntime.mark((function o(i,a){var u,c,s,f;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return u=new r.a,(c=new FormData).append("JSONString",JSON.stringify({reminders:[{type:"reminder/time",reminder_time:t,created_time:(new Date).getTime()}]})),s="notebooks/".concat(e,"/notecards/").concat(n,"/reminders"),o.next=6,u.ajaxWithData("POST",s,c);case 6:f=o.sent,i(f);case 8:case"end":return o.stop()}}),o)})));return function(e,n){return o.apply(this,arguments)}}())}function h(e){return new Promise(function(){var n=c(regeneratorRuntime.mark((function n(t,o){var i,a,u;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=new r.a,a="tags/search?query=".concat(e,"&limit=5"),n.next=4,i.ajaxWithData("GET",a);case 4:u=n.sent,t(u);case 6:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}function v(e,n){return new Promise(function(){var t=c(regeneratorRuntime.mark((function t(o,i){var a,u,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=new r.a,"tags",(u=new FormData).append("JSONString",JSON.stringify({name:e,created_time:(new Date).getTime(),resource_id:n})),t.next=6,a.ajaxWithData("POST","tags",u);case 6:c=t.sent,o(c);case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())}function g(e){var n=e.sender,t=e.content,i=e.base64,a=e.imageName;return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(u,c){var s,f,p,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=new r.a,"feedback",f=new FormData,i&&(p=Object(o.f)(i),f.append("attachment",p,a)),"Notebook - Chrome Extension Feedback",f.append("JSONString",JSON.stringify({subject:"Notebook - Chrome Extension Feedback",sender:n,content:t})),e.next=8,s.ajaxWithData("POST","feedback",f);case 8:l=e.sent,u(l);case 10:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function b(){return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(n,t){var o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=new r.a,"logout",e.next=4,o.ajaxWithoutData("GET","logout",!0);case 4:i=e.sent,n(i);case 6:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function w(e,n,t){return new Promise(function(){var o=c(regeneratorRuntime.mark((function o(i,a){var u,c,s,f;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return u=new r.a,c="notebooks/".concat(e,"/notecards/").concat(n),(s=new FormData).append("attachment",t),o.next=6,u.ajaxWithData("PUT",c,s);case 6:f=o.sent,i(f);case 8:case"end":return o.stop()}}),o)})));return function(e,n){return o.apply(this,arguments)}}())}function y(e,n,t){return new Promise(function(){var o=c(regeneratorRuntime.mark((function o(i,a){var u,c,s,f,p,l;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:for(u=[],c=0;c<t.length;c++)u.push(t[c].tag_id);return s=new r.a,f="notebooks/".concat(e,"/notecards/").concat(n,"/tags"),(p=new FormData).append("JSONString",JSON.stringify({tag_ids:u})),o.next=8,s.ajaxWithData("PUT",f,p);case 8:l=o.sent,i(l);case 10:case"end":return o.stop()}}),o)})));return function(e,n){return o.apply(this,arguments)}}())}function x(){return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(n,t){var o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=new r.a,"tags?offset=0&limit=1000",e.next=4,o.ajaxWithData("GET","tags?offset=0&limit=1000");case 4:i=e.sent,n(i);case 6:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function O(e,n){return new Promise((function(t,r){var o=[];n=n.toLowerCase(),e.map((function(e){e.name.toLowerCase().startsWith(n)&&o.push(e)})),t(JSON.stringify({code:200,tags:o}))}))}function T(){return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(n,t){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"chromeClipper",(r=new XMLHttpRequest).onload=function(){n(this.responseText)},r.onerror=function(e){t(e)},r.open("GET","https://notebook.zoho.com/api/v1/announcements?last_announcement_time=1&platform=chromeClipper"),e.next=7,Object(a.c)("znbcsr");case 7:if(o=e.sent){e.next=11;break}return t(),e.abrupt("return");case 11:r.setRequestHeader("X-ZCSRF-TOKEN","znbrcsr="+o.znbcsr),r.send();case 13:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function E(e){return new Promise(function(){var n=c(regeneratorRuntime.mark((function n(t,o){var i,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=new r.a,n.next=3,i.ajaxWithoutData("GET",e,!1,!0);case 3:a=n.sent,t(a);case 5:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}function S(e,n,t){return new Promise(function(){var o=c(regeneratorRuntime.mark((function o(i,a){var u,c,s,f;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return u=new r.a,c=new FormData,s={name:"Untitled.pdf",notecard_name:"Untitled"},e&&"undefined"!==e&&(s.notebook_id=e),c.append("attachment",n,t||"Untitled.pdf"),c.append("JSONString",JSON.stringify(s)),"cards/file",o.next=9,u.ajaxWithData("POST","cards/file",c);case 9:f=o.sent,i(f);case 11:case"end":return o.stop()}}),o)})));return function(e,n){return o.apply(this,arguments)}}())}function _(){return new Promise(function(){var e=c(regeneratorRuntime.mark((function e(n,t){var o,u,c,s,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(o=new r.a).setNoPrepend(!0),o.setResponseType("blob"),u=i.a.getTopLevelDomain(),e.next=6,Object(a.c)("userprofile");case 6:if((c=e.sent)&&c.userprofile){e.next=10;break}return n(void 0),e.abrupt("return");case 10:return s="https://contacts.zoho".concat(u,"/file?t=user&ID=").concat(c.userprofile.zuid,"&fs=thumb"),e.next=13,o.ajaxWithoutData("GET",s);case 13:f=e.sent,n(f);case 15:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())}function R(e){return new Promise(function(){var n=c(regeneratorRuntime.mark((function n(t,o){var i,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(i=new r.a).setResponseType("blob"),n.next=4,i.ajaxWithoutData("GET","covers/".concat(e,"/thumbnail?size=m"));case 4:a=n.sent,t(a);case 6:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}function P(e){return new Promise(function(){var n=c(regeneratorRuntime.mark((function n(t,o){var u,c,s;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(u=new r.a).setNoPrepend(!0),u.setResponseType("blob"),i.a.getTopLevelDomain(),n.next=6,Object(a.c)("userprofile");case 6:if((c=n.sent)&&c.userprofile){n.next=10;break}return t(void 0),n.abrupt("return");case 10:return n.next=12,u.ajaxWithoutData("GET",e);case 12:s=n.sent,t(s);case 14:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}())}},,,,,,,,function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return m}));var r=t(5),o=t(6);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,n){return!n||"object"!==i(n)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function c(e){var n="function"==typeof Map?new Map:void 0;return(c=function(e){if(null===e||(t=e,-1===Function.toString.call(t).indexOf("[native code]")))return e;var t;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,r)}function r(){return s(e,arguments,l(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),p(r,e)})(e)}function s(e,n,t){return(s=f()?Reflect.construct:function(e,n,t){var r=[null];r.push.apply(r,n);var o=new(Function.bind.apply(e,r));return t&&p(o,t.prototype),o}).apply(null,arguments)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function p(e,n){return(p=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=document.createElement("template");d.innerHTML='<style>\n    .image-view {\n        position: relative;\n        height: 150px;\n        margin: 16px 0px;\n    }\n\n    .image-list {\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        border: none;\n        background-size: contain;\n        background-repeat: no-repeat;\n        background-position: 50% 0;\n    }\n\n    .hover-option {\n        position: absolute;\n        top: 8px;\n        /* left: 0px; */\n        right: 0px;\n        width: 62px;\n        height: 32px;\n    }\n\n    .iedit-photo {\n        right: 32px;\n    }\n\n    .iedit-photo:before,\n    .idelete-photo:before {\n        font-size: 20px;\n    }\n\n    .iedit-photo,\n    .idelete-photo {\n        position: absolute;\n        padding: 3px;\n        border-radius: 50%;\n        background-color: #212121;\n        cursor: pointer;\n        color: #E7E7E7;\n    }\n\n    .idelete-photo {\n        right: 0;\n    }\n</style>\n    \n<div class="image-view" contenteditable="false">\n    <div class="image-list"></div>\n    <div class="hover-option">\n            <div class="iedit-photo">\n            </div>\n            <div class="idelete-photo">\n            </div>\n        </div>\n</div>\n    ';var m=function(e){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&p(e,n)}(h,e);var n,t,i,c,s,m=(n=h,t=f(),function(){var e,r=l(n);if(t){var o=l(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return u(this,e)});function h(e,n){return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,h),m.call(this)}return i=h,(c=[{key:"connectedCallback",value:function(){var e=this;this.appendChild(d.content.cloneNode(!0));var n=this.querySelector(".image-list");n.style.backgroundImage="url(".concat(this.getAttribute("image-data"),")"),n.id="image-list_"+Object(r.e)(),o.a.addListener("ImageView",this.querySelector(".iedit-photo"),"click",this.openAnnotator.bind(this)),o.a.addListener("ImageView",this.querySelector(".idelete-photo"),"click",this.deleteImage.bind(this));var t=this.getAttribute("dont_load_annotator");t&&"undefined"!==t&&"null"!==t||this.openAnnotator(),o.a.addListener("ImageView",window,"message",(function(n){var t=n.data;if(t)switch(t.action){case"openAnnotatorResponse":if("image-view"!==t.componentName)return!0;var r=e.querySelector(".image-list");r&&r.id==t.detail.id&&(r.style.backgroundImage="url(".concat(t.detail.base64,")"),e.setAttribute("image-data",t.detail.base64)),window.dispatchEvent(new CustomEvent("image-changed"))}}))}},{key:"openAnnotator",value:function(e){var n=this.querySelector(".image-list"),t=this.getAttribute("image-data");parent.postMessage({action:"openAnnotator",componentName:"image-view",base64:t,id:n.id},"*")}},{key:"deleteImage",value:function(e){window.dispatchEvent(new CustomEvent("removeComponent",{detail:{component:this}})),window.dispatchEvent(new CustomEvent("image-deleted"))}}])&&a(i.prototype,c),s&&a(i,s),h}(c(HTMLElement));Object(r.u)("image-view",m)}]);