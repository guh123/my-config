'use strict';Registry.require(["promise","helper"],()=>{const k=rea.FEATURES,x=Registry.get("helper"),I=Registry.get("promise");let y;const b=k.RUNTIME.BROWSER_VERSION;let q=!0;y=k.RUNTIME.CHROME?83<=b?2020:64<=b?2018:59<=b?2017:47<=b?2015:5:k.RUNTIME.SAFARI?14<=b?2020:11<=b?2018:10<=b?2017:6<=b?2015:6<=b?5:3:k.RUNTIME.EDGE?83<=b?2020:16<=b?2017:2016:k.RUNTIME.FIREFOX?77<=b?2020:58<=b?2018:52<=b?2017:2016:5;const D={};k.RUNTIME.CHROME&&77>b?(q=!1,console.warn("hint: disable inline ESLint config due to web worker CSP issues",
"https://bugs.chromium.org/p/chromium/issues/detail?id=777076","https://bugs.chromium.org/p/chromium/issues/detail?id=159303")):k.RUNTIME.EDGE?(q=!1,console.warn("hint: disable inline ESLint config due to web worker CSP issues")):window.Worker||(q=!1,console.warn("hint: disable inline ESLint config because web workers are unavailable and this extension's CSP doesn't allow unsafe eval, which is required for ESLint's dynamic reconfigration"));const z={env:{es6:2015<=y,browser:!0},parserOptions:{ecmaVersion:y,
sourceType:"script",ecmaFeatures:{globalReturn:!0}},rules:{curly:[1,"multi-line"],"dot-location":0,"dot-notation":[1,{allowKeywords:!0}],"no-caller":1,"no-case-declarations":2,"no-div-regex":0,"no-empty-pattern":2,"no-eq-null":0,"no-eval":1,"no-extra-bind":1,"no-fallthrough":1,"no-implicit-globals":2,"no-implied-eval":1,"no-lone-blocks":1,"no-loop-func":1,"no-multi-spaces":1,"no-multi-str":1,"no-native-reassign":1,"no-octal-escape":2,"no-octal":2,"no-proto":1,"no-redeclare":2,"no-return-assign":1,
"no-sequences":1,"no-undef":1,"no-useless-call":1,"no-useless-concat":1,"no-with":1}},r={};x.each("uneval unsafeWindow TM_info GM_info GM GM_addStyle GM_deleteValue GM_listValues GM_getValue GM_download GM_log GM_registerMenuCommand GM_unregisterMenuCommand GM_openInTab GM_setValue GM_addValueChangeListener GM_removeValueChangeListener GM_xmlhttpRequest GM_getTab GM_setTab GM_saveTab GM_getTabs GM_setClipboard GM_notification GM_getResourceText GM_getResourceURL".split(" "),t=>{r[t]="writeable"});
z.globals=r;let g;const m={};let u;Registry.register("hinter","e1582c36",{hint:function(t,p,J){const v=I(),E=v.promise(),F=J||D;let d;p?(d=p,d.globals=x.assign(d.globals||{},r)):d=z;if(window.Worker&&!k.RUNTIME.SAFARI){const n=()=>{g=new Worker("worker/lint.js");g.onmessage=e=>{e=e.data;const a=e.id;var c;let h;a&&(c=m[a])&&(h=c.d)&&(delete m[a],(c=e.results)?(q||(c=c.map(l=>{let f;l.message&&(f=l.message.match(/Configuration for rule "([^"]+)"[\s\S]*evaluate a string as JavaScript[\s\S]*/))&&
(l.message='Rule "'+f[1]+'": ESLint inline configuration is not supported by this browser.',l.severity=1);return l})),h.resolve(c)):h.reject(e.error||"Unknown error"));A(a)};g.postMessage({method:"base_uri",value:rea.extension.getURL("/")});u=null};var A=e=>{g||n();if(e)u=null;else if(u)return;let a,c=Date.now();Object.keys(m).forEach(h=>{m[h].ts<=c&&(a=m[h],c=a.ts)});a&&(u=a.id,g.postMessage({method:a.method,id:a.id,config:a.c,options:a.o,text:a.t}))};E.abort=()=>{g&&(g.terminate(),g=null,A())};
g||n();p=x.createUUID();m[p]={method:"lint",id:p,d:v,t,c:d,o:F,ts:Date.now()};A()}else Registry.vendor("vendor/eslint/eslint",()=>{try{const n={problem:"error",layout:1,suggestion:1},e=new window.eslint.Linter;d.extends&&d.extends.includes("eslint:recommended")&&(d.rules=d.rules||[],e.getRules().forEach(function(c,h){let l;var f;let B,G;if(c&&(f=c.meta)&&void 0===d.rules[h]&&(l=f.docs)&&l.recommended){c=[(f.type?n[f.type]:null)||1];if(f=f.schema)B={},f.forEach(w=>{"object"==w.type&&Object.keys(w.properties).forEach(C=>
{const H=w.properties[C].default;void 0!==H&&!1!==H&&(B[C]=w.properties[C].default,G=!0)})}),G&&c.push(B);d.rules[h]=c}}));const a=e.verify(t,d,F);v.resolve(a||[])}catch(n){v.reject(n)}});return E},globals:r,config:z,options:D,autoHintMaxLength:5E4})});