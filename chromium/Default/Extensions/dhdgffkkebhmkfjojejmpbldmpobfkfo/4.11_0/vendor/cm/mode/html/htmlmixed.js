'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],e):e(CodeMirror)})(function(e){function x(d){var c=t[d];return c?c:t[d]=new RegExp("\\s+"+d+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")}function y(d,c){return(d=d.match(x(c)))?/^\s*(.*?)\s*$/.exec(d[2])[1]:
""}function u(d,c){for(var h in d)for(var f=c[h]||(c[h]=[]),k=d[h],g=k.length-1;0<=g;g--)f.unshift(k[g])}function z(d,c){for(var h=0;h<d.length;h++){var f=d[h];if(!f[0]||f[1].test(y(c,f[0])))return f[2]}}var A={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],
[null,null,"css"]]},t={};e.defineMode("htmlmixed",function(d,c){function h(a,b){var q=f.token(a,b.htmlState),l=/\btag\b/.test(q),r;if(l&&!/[<>\s\/]/.test(a.current())&&(r=b.htmlState.tagName&&b.htmlState.tagName.toLowerCase())&&k.hasOwnProperty(r))b.inTag=r+" ";else if(b.inTag&&l&&/>$/.test(a.current())){l=/^([\S]+) (.*)/.exec(b.inTag);b.inTag=null;a=">"==a.current()&&z(k[l[1]],l[2]);a=e.getMode(d,a);var B=new RegExp("^</s*"+l[1]+"s*>","i"),v=new RegExp("</s*"+l[1]+"s*>","i");b.token=function(m,n){if(m.match(B,
!1))return n.token=h,n.localState=n.localMode=null;n=n.localMode.token(m,n.localState);var p=m.current(),w=p.search(v);-1<w?m.backUp(p.length-w):p.match(/<\/?$/)&&(m.backUp(p.length),m.match(v,!1)||m.match(p));return n};b.localMode=a;b.localState=e.startState(a,f.indent(b.htmlState,""))}else b.inTag&&(b.inTag+=a.current(),a.eol()&&(b.inTag+=" "));return q}var f=e.getMode(d,{name:"xml",htmlMode:!0,multilineTagIndentFactor:c.multilineTagIndentFactor,multilineTagIndentPastTag:c.multilineTagIndentPastTag}),
k={},g=c&&c.tags;c=c&&c.scriptTypes;u(A,k);g&&u(g,k);if(c)for(g=c.length-1;0<=g;g--)k.script.unshift(["type",c[g].matches,c[g].mode]);return{startState:function(){var a=e.startState(f);return{token:h,inTag:null,localMode:null,localState:null,htmlState:a}},copyState:function(a){var b;a.localState&&(b=e.copyState(a.localMode,a.localState));return{token:a.token,inTag:a.inTag,localMode:a.localMode,localState:b,htmlState:e.copyState(f,a.htmlState)}},token:function(a,b){return b.token(a,b)},indent:function(a,
b,q){return!a.localMode||/^\s*<\//.test(b)?f.indent(a.htmlState,b):a.localMode.indent?a.localMode.indent(a.localState,b,q):e.Pass},innerMode:function(a){return{state:a.localState||a.htmlState,mode:a.localMode||f}}}},"xml","javascript","css");e.defineMIME("text/html","htmlmixed")});
(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],e):e(CodeMirror)})(function(e){function x(d){var c=t[d];return c?c:t[d]=new RegExp("\\s+"+d+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")}function y(d,c){return(d=d.match(x(c)))?/^\s*(.*?)\s*$/.exec(d[2])[1]:
""}function u(d,c){for(var h in d)for(var f=c[h]||(c[h]=[]),k=d[h],g=k.length-1;0<=g;g--)f.unshift(k[g])}function z(d,c){for(var h=0;h<d.length;h++){var f=d[h];if(!f[0]||f[1].test(y(c,f[0])))return f[2]}}var A={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],
[null,null,"css"]]},t={};e.defineMode("htmlmixed",function(d,c){function h(a,b){var q=f.token(a,b.htmlState),l=/\btag\b/.test(q),r;if(l&&!/[<>\s\/]/.test(a.current())&&(r=b.htmlState.tagName&&b.htmlState.tagName.toLowerCase())&&k.hasOwnProperty(r))b.inTag=r+" ";else if(b.inTag&&l&&/>$/.test(a.current())){l=/^([\S]+) (.*)/.exec(b.inTag);b.inTag=null;a=">"==a.current()&&z(k[l[1]],l[2]);a=e.getMode(d,a);var B=new RegExp("^</s*"+l[1]+"s*>","i"),v=new RegExp("</s*"+l[1]+"s*>","i");b.token=function(m,n){if(m.match(B,
!1))return n.token=h,n.localState=n.localMode=null;n=n.localMode.token(m,n.localState);var p=m.current(),w=p.search(v);-1<w?m.backUp(p.length-w):p.match(/<\/?$/)&&(m.backUp(p.length),m.match(v,!1)||m.match(p));return n};b.localMode=a;b.localState=e.startState(a,f.indent(b.htmlState,""))}else b.inTag&&(b.inTag+=a.current(),a.eol()&&(b.inTag+=" "));return q}var f=e.getMode(d,{name:"xml",htmlMode:!0,multilineTagIndentFactor:c.multilineTagIndentFactor,multilineTagIndentPastTag:c.multilineTagIndentPastTag}),
k={},g=c&&c.tags;c=c&&c.scriptTypes;u(A,k);g&&u(g,k);if(c)for(g=c.length-1;0<=g;g--)k.script.unshift(["type",c[g].matches,c[g].mode]);return{startState:function(){var a=e.startState(f);return{token:h,inTag:null,localMode:null,localState:null,htmlState:a}},copyState:function(a){var b;a.localState&&(b=e.copyState(a.localMode,a.localState));return{token:a.token,inTag:a.inTag,localMode:a.localMode,localState:b,htmlState:e.copyState(f,a.htmlState)}},token:function(a,b){return b.token(a,b)},indent:function(a,
b,q){return!a.localMode||/^\s*<\//.test(b)?f.indent(a.htmlState,b):a.localMode.indent?a.localMode.indent(a.localState,b,q):e.Pass},innerMode:function(a){return{state:a.localState||a.htmlState,mode:a.localMode||f}}}},"xml","javascript","css");e.defineMIME("text/html","htmlmixed")});
