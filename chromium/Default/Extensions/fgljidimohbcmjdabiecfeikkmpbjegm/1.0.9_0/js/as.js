var req = new XMLHttpRequest();

function Processing(name, tg, tx) {
	obj = document.getElementById(name);
	obj.innerHTML = '<web-progress-bar role="progressbar"><div class="zipping">' + tx + '</div><div class="web-progress-bar-wrapper"><div class="web-progress-bar-indeterminate"></div></div></web-progress-bar>';
	if (tg) {
		tg.classList.toggle('w-button-disable');
		tg.disabled = true;
	}
}

function DisplayContent(name, tg) {
	obj = document.getElementById(name);
	obj.innerHTML = req.responseText;
	if (tg) {
		tg.disabled = false;
		tg.classList.remove('w-button-disable');
	}
}

function SendQuery(url, callbackFunction, method, cache, request) {
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				eval(callbackFunction);
			}
		}
	};
	if (cache != 1) {
		url += "&rand=" + Math.random() * 1000;
	}
	if (method == 'POST') {
		req.open("POST", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(request);
	} else {
		req.open("GET", url, true);
		req.send(null);
	}
}

function sd_type() {
	document.getElementById("opd").setAttribute("style", "display: bock;");
	document.getElementById("yid").setAttribute("style", "display: none;");
	document.getElementById('b1').classList.add('selected');
	document.getElementById('b2').classList.remove('selected');
	document.getElementById('device_id').value = "";
	document.getElementById('av_u').value = 0;
}

function yid_type() {
	document.getElementById("opd").setAttribute("style", "display: none;");
	document.getElementById("yid").setAttribute("style", "display: bock;");
	document.getElementById('b2').classList.add('selected');
	document.getElementById('b1').classList.remove('selected');
	document.getElementById('tbi').value = 0;
	document.getElementById('model').value = "";
	document.getElementById('av').value = 0;
	document.getElementById("mdl").setAttribute("style", "display: none;");
}

window.onload = function () {
	var tbi = document.getElementById("tbi"),
		model = document.getElementById("model"),
		mdl = document.getElementById("mdl");
	tbi.onchange = function () {
		if (tbi.value == 0 || tbi.value == "other" || tbi.value == "") {
			mdl.style.display = "none";
			
		} 
		model.length = 1;
		if (this.selectedIndex < 1) return;
		var nsx = plist[tbi.value];
		if (nsx) {
			mdl.style.display = "inline-block";
			for (var i = 0; i < nsx.length; i++) {
				model.options[model.options.length] = new Option(nsx[i], nsx[i]);
			}
		} else {
			mdl.style.display = "none";
		}
	};
	tbi.onchange();
}

var apksubmit = document.getElementById("apksubmit");
var ddea_o = document.getElementById("ddea");
ddea_o.style.display = "none";

function ajax(url,request){  
		SendQuery(url,'DisplayContent("downloader_area",apksubmit)','POST',1,request);	
}

apkdownloader.addEventListener("submit", function (evt) {
Processing('downloader_area',apksubmit,'Connecting to Google Play');
evt.preventDefault();

var a = document.getElementById("region-package").value;
var tb = document.getElementById("tbi").value;
var av = document.getElementById("av").value;
var model = document.getElementById("model").value;
var device_id = document.getElementById("device_id").value;
var av_u = document.getElementById("av_u").value;
ddea_o.style.display = "block";
ajax('https://chrome.androidcontents.com/','google_id='+a+'&x=downloader&tbi='+tb+'&av_u='+av_u+'&device_id='+device_id+'&model='+encodeURI(model)+'&hl=en&de_av=&android_ver='+av);
});

var autoComplete = function (e) {
	if (document.querySelector) {
		var t = {
			selector: 0,
			source: 0,
			minChars: 3,
			delay: 150,
			offsetLeft: 0,
			offsetTop: 1,
			cache: 1,
			menuClass: "",
			renderItem: function (e, t) {
				t = t.replace(/[-/\^$*+?.()|[]{}]/g, "\$&");
				var o = new RegExp("(" + t.split(" ").join("|") + ")", "gi");
				return '<div class="autocomplete-suggestion" data-val="' + e + '">' + e.replace(o, "<b>$1</b>") + "</div>"
			},
			onSelect: function (e, t, o) {}
		};
		for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
		for (var n = "object" == typeof t.selector ? [t.selector] : document.querySelectorAll(t.selector), s = 0; s < n.length; s++) {
			var l = n[s];
			l.sc = document.createElement("div"), l.sc.className = "autocomplete-suggestions " + t.menuClass, l.autocompleteAttr = l.getAttribute("autocomplete"), l.setAttribute("autocomplete", "off"), l.cache = {}, l.last_val = "", l.updateSC = function (e, o) {
				var n = l.getBoundingClientRect();
				if (l.sc.style.left = Math.round(n.left + (window.pageXOffset || document.documentElement.scrollLeft) + t.offsetLeft) + "px", l.sc.style.top = Math.round(n.bottom + (window.pageYOffset || document.documentElement.scrollTop) + t.offsetTop) + "px", l.sc.style.width = Math.round(n.right - n.left) + "px", !e && (l.sc.style.display = "block", l.sc.maxHeight || (l.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(l.sc, null) : l.sc.currentStyle).maxHeight)), l.sc.suggestionHeight || (l.sc.suggestionHeight = l.sc.querySelector(".autocomplete-suggestion").offsetHeight), l.sc.suggestionHeight))
					if (o) {
						var s = l.sc.scrollTop,
							a = o.getBoundingClientRect().top - l.sc.getBoundingClientRect().top;
						a + l.sc.suggestionHeight - l.sc.maxHeight > 0 ? l.sc.scrollTop = a + l.sc.suggestionHeight + s - l.sc.maxHeight : a < 0 && (l.sc.scrollTop = a + s)
					} else l.sc.scrollTop = 0
			}, i(window, "resize", l.updateSC), document.body.appendChild(l.sc), r("autocomplete-suggestion", "mouseleave", function (e) {
				var t = l.sc.querySelector(".autocomplete-suggestion.selected");
				t && setTimeout(function () {
					t.className = t.className.replace("selected", "")
				}, 20)
			}, l.sc), r("autocomplete-suggestion", "mouseover", function (e) {
				var t = l.sc.querySelector(".autocomplete-suggestion.selected");
				t && (t.className = t.className.replace("selected", "")), this.className += " selected"
			}, l.sc), r("autocomplete-suggestion", "mousedown", function (e) {
				if (c(this, "autocomplete-suggestion")) {
					var o = this.getAttribute("data-val");
					l.value = o, t.onSelect(e, o, this), l.sc.style.display = "none"
				}
			}, l.sc), l.blurHandler = function () {
				try {
					var e = document.querySelector(".autocomplete-suggestions:hover")
				} catch (t) {
					e = 0
				}
				e ? l !== document.activeElement && setTimeout(function () {
					l.focus()
				}, 20) : (l.last_val = l.value, l.sc.style.display = "none", setTimeout(function () {
					l.sc.style.display = "none"
				}, 350))
			}, i(l, "blur", l.blurHandler);
			var a = function (e) {
				var o = l.value;
				if (l.cache[o] = e, e.length && o.length >= t.minChars) {
					for (var n = "", s = 0; s < e.length; s++) n += t.renderItem(e[s], o);
					l.sc.innerHTML = n, l.updateSC(0)
				} else l.sc.style.display = "none"
			};
			l.keydownHandler = function (e) {
				var o, n = window.event ? e.keyCode : e.which;
				if ((40 == n || 38 == n) && l.sc.innerHTML) return (s = l.sc.querySelector(".autocomplete-suggestion.selected")) ? (o = 40 == n ? s.nextSibling : s.previousSibling) ? (s.className = s.className.replace("selected", ""), o.className += " selected", l.value = o.getAttribute("data-val")) : (s.className = s.className.replace("selected", ""), l.value = l.last_val, o = 0) : ((o = 40 == n ? l.sc.querySelector(".autocomplete-suggestion") : l.sc.childNodes[l.sc.childNodes.length - 1]).className += " selected", l.value = o.getAttribute("data-val")), l.updateSC(0, o), !1;
				if (27 == n) l.value = l.last_val, l.sc.style.display = "none";
				else if (13 == n || 9 == n) {
					var s;
					(s = l.sc.querySelector(".autocomplete-suggestion.selected")) && "none" != l.sc.style.display && (t.onSelect(e, s.getAttribute("data-val"), s), setTimeout(function () {
						l.sc.style.display = "none"
					}, 20))
				}
			}, i(l, "keydown", l.keydownHandler), l.keyupHandler = function (e) {
				var o = window.event ? e.keyCode : e.which;
				if (!o || (o < 35 || o > 40) && 13 != o && 27 != o) {
					var n = l.value;
					if (n.length >= t.minChars) {
						if (n != l.last_val) {
							if (l.last_val = n, clearTimeout(l.timer), t.cache) {
								if (n in l.cache) return void a(l.cache[n]);
								for (var s = 1; s < n.length - t.minChars; s++) {
									var c = n.slice(0, n.length - s);
									if (c in l.cache && !l.cache[c].length) return void a([])
								}
							}
							l.timer = setTimeout(function () {
								t.source(n, a)
							}, t.delay)
						}
					} else l.last_val = n, l.sc.style.display = "none"
				}
			}, i(l, "keyup", l.keyupHandler), l.focusHandler = function (e) {
				l.last_val = "n", l.keyupHandler(e)
			}, t.minChars || i(l, "focus", l.focusHandler)
		}
		this.destroy = function () {
			for (var e = 0; e < n.length; e++) {
				var t = n[e];
				u(window, "resize", t.updateSC), u(t, "blur", t.blurHandler), u(t, "focus", t.focusHandler), u(t, "keydown", t.keydownHandler), u(t, "keyup", t.keyupHandler), t.autocompleteAttr ? t.setAttribute("autocomplete", t.autocompleteAttr) : t.removeAttribute("autocomplete"), document.body.removeChild(t.sc), t = null
			}
		}
	}

	function c(e, t) {
		return e.classList ? e.classList.contains(t) : new RegExp("\b" + t + "\b").test(e.className)
	}

	function i(e, t, o) {
		e.attachEvent ? e.attachEvent("on" + t, o) : e.addEventListener(t, o)
	}

	function u(e, t, o) {
		e.detachEvent ? e.detachEvent("on" + t, o) : e.removeEventListener(t, o)
	}

	function r(e, t, o, n) {
		i(n || document, t, function (t) {
			for (var n, s = t.target || t.srcElement; s && !(n = c(s, e));) s = s.parentElement;
			n && o.call(s, t)
		})
	}
};

function debounce(e, t, o) {
	var n;
	return function () {
		var s = this,
			l = arguments,
			a = o && !n;
		clearTimeout(n), n = setTimeout(function () {
			n = null, o || e.apply(s, l)
		}, t), a && e.apply(s, l)
	}
}
"function" == typeof define && define.amd ? define("autoComplete", function () {
	return autoComplete
}) : "undefined" != typeof module && module.exports ? module.exports = autoComplete : window.autoComplete = autoComplete;
for (var $input = null, $inputs = document.querySelectorAll('input[name="q"]'), i = 0; i < $inputs.length; i++)
	if (null != $inputs[i].offsetParent) {
		$input = $inputs[i];
		break
	}
null != $input && new autoComplete({
	selector: $input,
	cache: !0,
	delay: 0,
	minChars: 1,
	source: debounce(function (e, t) {
		try {
			o.abort()
		} catch (e) {}
		var o = new XMLHttpRequest;
		o.addEventListener("readystatechange", function () {
			if (4 === this.readyState && 200 === this.status) {
				for (var e = JSON.parse(this.responseText), o = [], n = 0; n < e.length; ++n) o.push(e[n].s);
				t(o.slice(0, 5))
			}
		}), o.open("GET", "https://lh3.androidcontents.com/key/?hl=en&q=" + e.toLowerCase()), o.send()
	}, 250),
	onSelect: function (e, t, o) {
		var n = o.getAttribute("data-val");
		window.location.href = "/search?q=" + n.replace(/ /g, "+")
	}
});
var iso_sh = document.getElementById("iso");
var inav_sh = document.getElementById("inav");
iso_sh.style.display = "none";
inav_sh.style.display = "block";

function s_op() {
	document.getElementById('iso').setAttribute("style", "display: bock;");
	document.getElementById('inav').setAttribute("style", "display: none;");
	document.getElementById('searchform').focus();

}

function s_cl() {
	document.getElementById('iso').setAttribute("style", "display: none;");
	document.getElementById('inav').setAttribute("style", "display: bock;");

}

function menu_lang() {
	document.getElementById("arrow_lang").classList.toggle("menu-lang-up");
	document.getElementById("list_lang").classList.toggle("is-active");
}

function menu_op() {
	document.getElementById('menu-body').classList.toggle('is-visible');
	document.getElementById('m_obfuscator').classList.toggle('is-visible');
	document.getElementById('menu_btn').classList.toggle('open');
	var x = document.getElementById('pageapp');
	if (x) {
		x.classList.toggle('is-visible');
	}
}
menu_btn.addEventListener("click", menu_op);
m_obfuscator.addEventListener("click", menu_op);
showsearch.addEventListener("click", s_op);
hiddensearch.addEventListener("click", s_cl);
b2.addEventListener("click", yid_type);
b1.addEventListener("click", sd_type);