/* $Id$ */
var ZDOMUtil = (function(window){
	var elements = undefined;
	return {
		init: function(elementName){
			elements = {
				div: document.createElement('div')	// No I18N
			}
		},
		clone: function(elementName){
			return elements[elementName].cloneNode();
		}
	}
})(window);
var ZComponents = (function($){
	var needToInit = true,
		userAgent = navigator.userAgent.toLowerCase(),
		sourceDiv = document.createElement('div'),
		sourceText = document.createTextNode(" ");
	function getAttrSupport(){
		var ele = document.createElement("div"), supported = false;
		ele.addEventListener("DOMAttrModified", function(){ 
			supported = true; 
		}, false);
		ele.setAttribute("class","zcomponents");
		return supported;
	}
	return {
		version: "3.1",	// No I18N
		isRTL : false,
		selector: "data-ctype",	// No I18N
		userAgent : userAgent,
		locale: navigator.language,
		zIndex : 1000, // ZIndex can be used for components like dialog.
		$document : $(document),
		$window : $(window),
		hasHandlebars : window.Handlebars ? true : false,
		keys : {},
		keyCode : {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			ALT: 18
		},
		initDeferredComponents : function(componentsMap, timeout, callback){
			var base = this;
			setTimeout(function(){
				$.each(componentsMap, function(ctype, componentGroup){
					$(componentGroup).each(function(i, component){
						base._initComponent($(component), ctype);		
					});
				});
				if(callback){
					callback(componentsMap);
				}
			},(timeout ? timeout : 10000)); // Default is 10 seconds
		},
		init : function(container,callback, attr){
			needToInit && this._init();
			container = container ? $(container) : $("body");
			var attr1 = attr ? attr : this.selector,
				attrSelector = "["+ attr1 +"]",	// No I18N
				uiComponents = document.querySelectorAll ? container[0].querySelectorAll(attrSelector) : $(attrSelector, container);
			if(container[0].attributes[attr1] || (container[0].dataset && container[0].dataset[attr1])){
				uiComponents = $(container).add(uiComponents);
			}			
			if(uiComponents.length){
				var base = this;
				this.eachAsync(uiComponents, {
					delay: 20,
					loop: function(i, ele){
						base._initComponent(ele, undefined, attr);
					},
					end: function(){
						base._end(container, uiComponents, callback);
					}
				});
			}else{
				this._end(container, uiComponents, callback);
			}
		},
		destroy: function( container,callback,attr ){
			container = container ? $(container) : $("body");
			attr = attr ? attr : this.selector;
			var attrSelector = "["+ attr +"]", // No I18N
				uiComponents = $(attrSelector, container); 
			if(container.is(attrSelector)){
				uiComponents = $(container).add(uiComponents);
			}
			if(uiComponents.length){
				var base = this;
				this.eachAsync(uiComponents, {
					delay: 20,
					loop: function(i, ele){
						$(ele)[ ele.getAttribute(attr) ]('destroy');
					},
					end: function(){
						base._end(container, uiComponents, callback, true);
					}
				});
			}else{
				this._end(container, uiComponents, callback, true);
			}
		},
		eachAsync : function(array,opts){ // will be modified later
			var i = 0, 
			l = array.length, 
			loop = opts.loop || function(){};
		
			this.whileAsync(
				$.extend(opts, {
					test: function(){ return i < l; },
					loop: function()
					{ 
						var val = array[i];
						return loop.call(val, i++, val);
					}
				})
			);
		},
		whileAsync : function(opts){ // async utility from jquery
			var delay = Math.abs(opts.delay) || 10,
				bulk = isNaN(opts.bulk) ? 500 : Math.abs(opts.bulk),
				test = opts.test || function(){ return true; },
				loop = opts.loop || function(){},
				end  = opts.end  || function(){};
			
			(function executeLoop(){
				var t = false, 
					begin = new Date();
				while( t = test() ){
					loop();
					if( bulk === 0 || (new Date() - begin) > bulk ){
						break;
					}
				}
				if( t ){
					setTimeout(executeLoop, delay);
				}else{
					end();
				}
			})();
		},
		_initComponent : function(element,ctype,attr){
			attr = attr ? attr : this.selector;
			element = $(element);
			element[!ctype ? element.attr(attr) : ctype]();
		},
		_end : function(mainDiv, uiComponents, callback, isdestroy){
			this.$document.trigger(isdestroy?"zcomponentdestroyed" : "zcomponentinitialized", mainDiv); // No I18N
			if(callback){
				callback(uiComponents);
			}
		},
		clearMetadata: function( elements ){
			if( elements ){
				$(elements).removeData('metadata');
			}
		},
		// using element.attributes because element.dataset is not supported in IE 9 and 10.
		_getDataAttributes : function(element, object){
			var data = element.attributes,
				len = data.length;
			for(var i = 0; i < len; i++){
				var name = data[i].nodeName,
					value = data[i].nodeValue === "" ? "true" : data[i].nodeValue ; // No I18N
				if(name !== "data"){
					// data-* attributes and other attributes
					name = name.match(/^data-/) ? name.replace(/^data-/,'') : name; // No I18N
					name = name.replace(/-([a-zA-Z])/g, this._stringReplace.bind(this));   // replacing the hyphenated names to camelCase
					/* modified the optionName since providing data-inner-html attribute in html element will be converted to innerHtml only. */
					/* replace svg and Html as Caps */
					name = name.replace("Html","HTML").replace(/Svg/g,"SVG");	// No I18N
					object[name] = (value === "true" || value === "false") ? (value === "true") : ((value.indexOf("{") !== -1) ? ZComponents._getObject(value) : value);	// No I18N
				}
			}
			return object;
		},
		_stringReplace: function(g){ 
			return g[1].toUpperCase(); 
		},
		_getDataSet : function(element, object){
			var data = element.dataset, value;
			for(var i in data){
				if(data.hasOwnProperty(i)){
				 	/* replace svg and Html as Caps */
					value = data[i];
					i = i.replace(/Html/g,"HTML").replace(/Svg/g,"SVG");	// No I18N
					object[i] = (value === "true" || value === "false") ? (value === "true") : ((value.indexOf("{") !== -1) ? ZComponents._getObject(value) : value);	// No I18N
				}
			}
			return object;
		},
		_getOptions: undefined,
		getOptions: function(element){
			element = element instanceof jQuery ? element[0] : element;
			var object = $.data(element,"metadata");	// No I18N
			if(!object && element.attributes){
				var dataAttr = element.getAttribute('data');	// No I18N
				if(dataAttr){
					// Retrieving options present in data attribute as a json.
					object = ZComponents._getObject(undefined, element);
				}
				object = this._getOptions(element, object ? object : {});
				$.data(element,"metadata",object);	// No I18N
			}
			return object ? object : {};
		},
		getTemplate: function(handleBarsFileName){
			var template;
			if( this.hasHandlebars && Handlebars.templates ){
				template = Handlebars.templates[handleBarsFileName];
			}
			return template;
		},
		_getObject : function(data, element) {
	        if(typeof data === "object"){	// No I18N
	        	return data;
	        }
	        data = data || element.getAttribute('data');	// No I18N
	        data = data.indexOf("{") < 0 ? "{" + data + "}" : data;	// No I18N
	        try{
	        	data = JSON.parse( data.replace(/'/g,'"') ); // No I18N
	        }
	        catch(error){
	        	return $.metadata ? $(element).metadata() : {};
	        }
	        return data;
	    },
		_extend : function(target,base){
			target.prototype = $.extend({},base.prototype,target.prototype);
			$.each(target.prototype,function(prop,value){
				if ($.type(value) === "function") { // No I18N
					target.prototype[ prop ] = (function(){
						var _super = function() {
							return base.prototype[ prop ].apply( this, arguments );
						};
						return function(){
							this._super = _super;
							return value.apply( this, arguments );
						};
					})();
				}
			});
		},
		OS: {
			isLinux: function(){
				return navigator.appVersion.indexOf("Linux") != -1;
			}
		},
		Browser : {
			isIE :  function(){
				return (userAgent.indexOf("msie") !== -1 || userAgent.indexOf(".net") !== -1); // No I18N
			},
			isSafari : function(){
				return (userAgent.indexOf("safari") !== -1 && userAgent.indexOf("chrome") === -1); // No I18N
			},
			isChrome : function(){
				return window.chrome;
			},
			isFirefox: function(){
				return userAgent.indexOf('firefox') > -1 ? true : false;
			},
			isMac: function(){
				return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
			},
			isWindows: function(){
				return navigator.platform.indexOf("Win") !== -1; // No I18N
			},
			getIEVersion : function(){
				var rv = -1; // Return value assumes failure.
				  if (navigator.appName == 'Microsoft Internet Explorer'){ //No I18N
				    var ua = navigator.userAgent;
				    var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"); //No I18N
				    if (re.exec(ua) != null){
				      rv = parseFloat( RegExp.$1 );
				    }
				  }
				  return rv;	
			}
		},
		AJAX : {
			transport: function(params, successCallback, failureCallback){
				var request = $.ajax({
					url: params.sourceURL,
					data: params.data,
					type: params.type,
					dataType: params.dataType,
					success: function(data){
						successCallback(data)
					},
					fail: function(error, exception){
						failureCallback(error, exception);
					},
					error: function(error, exception){
						failureCallback(error, exception);
					}
				})
				return request;
			}
		},
		// Component Users can set I18N for all Components at once or individual components separately.
		setI18NKeys : function(moduleName, values, replace){ 
			if(typeof moduleName === "object"){ // No I18N 
				// {"zdialog" : {"close":"Close the Dialog"},"ztooltip":{"close": "Close Text"} }
				for(var i in moduleName){
					this.keys[i] = $.extend({},this.keys[i],moduleName[i]);
				}
			}else{
			// module name is a string. Format: "zdialog",{ "close" : "Close the Dialog"}, true or false
				this.keys[moduleName] = replace ? values : $.extend({},this.keys[moduleName],values);
			}
		},
		getI18NText : function(moduleName, key, stringArray){
			var defaultKeys = undefined;
			if(arguments.length === 4){
				defaultKeys = stringArray;
				stringArray = arguments[3];
			}
			var keyObject = ZComponents.keys[moduleName] || {};
			var ii8nText = keyObject[key] || "";
	        if(ii8nText === "" && defaultKeys){	// No I18N
	            ii8nText = defaultKeys[ key ];           
	        }
	        if(stringArray){
                for (var i = 0; i < stringArray.length; i++) {
                    ii8nText = ii8nText.replace('{'+ i +'}',stringArray[i]);	// No I18N
                }
            }
	        return ii8nText;
		},
		create : function(initObject){
			var componentName = initObject.ctype.replace(initObject.ctype.charAt(0),""), // No I18N
				methodName = "create"+componentName.charAt(0).toUpperCase()+componentName.substring(1); // No I18N
			return this[methodName](initObject);	
		},
		setProperties : function(){
			var doc = document.documentElement || {},
				body = document.body || {};
			ZComponents.documentObject = {
				height: Math.max(doc.clientHeight,doc.scrollHeight,doc.offsetHeight,body.offsetHeight,body.scrollHeight),
				width: Math.max(doc.clientWidth,doc.scrollHeight,doc.offsetHeight,body.offsetWidth,body.scrollWidth)
			};
			ZComponents.windowObject = {
				height: window.innerHeight,
				width: window.innerWidth
			};
		},
		createSVGElement : function(tagName,attributes,childElements) {
    		var element =  document.createElementNS("ht"+"tp://www.w3.org/2000/svg", tagName); // No I18N
    		for (var i in attributes){
                element.setAttribute(i, attributes[i]);
    		}
    		if(childElements){
    			for(var a = 0; a < childElements.length; a++){
    				for(var b in childElements[a]){
    					var childEle = document.createElementNS("ht"+"tp://www.w3.org/2000/svg", b), // No I18N
    						childData = childElements[a][b];
		    			if(childData.nodes){
		    				childEle = this.createSVGElement(b, childData.props, childData.nodes);
		    			}else{
		    				for (var k in childData){
		               			childEle.setAttribute(k, childData[k]);
		    				}
		    			}
    					element.appendChild(childEle);
    				}
    			}
    		}
    		return element;
    	},
		createIcon: function(element, icon, svgId, iconClass, cname){
			icon = svgId ? (svgId.indexOf("#") === -1 ? "#"+svgId: svgId ) : (iconClass ? iconClass : icon); // No I18N
			if(icon){
				if(icon.indexOf("#") === -1){ // No I18N
					element.addClass(" "+icon+""); // No I18N
				}else{
					var svgId = icon.split(" ")[0], // No I18N
						customClass = icon.slice(svgId.length).trim() +" "+(cname ? cname+"__svg": "");	// No I18N
					element.empty().append($("<svg class='"+customClass+"'><use xlink:href='"+svgId+"'></use></svg>"));
				}
			}
			return element;
		},
		_handleIcon: function(iTag, svgData, defaultSVGId, iconClass, svgIconId, v1IconClass, isUpdate, prevIconClass, prevSVGIconId){
			if(isUpdate){
				iTag.removeClass(prevIconClass);
			}
			var iconIsSVG = false;
			if(v1IconClass !== undefined || iconClass !== undefined || svgIconId !== undefined){
				if((v1IconClass && v1IconClass.indexOf("#") === 0) || svgIconId !== undefined){
					var svgIcon = svgIconId || v1IconClass;
					var iconInfo = svgIcon.split(" ");	// No I18N
					svgIconId = iconInfo[0];
					iconClass = iconInfo[1] || "";
					iconIsSVG = true;
				}
				else{
					iconClass = iconClass || v1IconClass;
				}
			}
			else if(defaultSVGId !== undefined && svgData !== undefined){
				var svgIcon = this._svgSprite.querySelector("#"+defaultSVGId);
				if(!svgIcon){
					var props = svgData.props || {};
					props.id = defaultSVGId;
					var element = this.createSVGElement("symbol", props, svgData.nodes);	// No I18N
					this._svgSprite.appendChild(element);
				}
				svgIconId = "#"+ defaultSVGId;
				iconClass = svgData.props && svgData.props.class ? svgData.props.class : defaultSVGId;
				iconIsSVG = true;
			}
			if(iconIsSVG){
				svgIconId = svgIconId.indexOf("#") !== -1 ? svgIconId : "#"+svgIconId; // No I18N
				iTag.empty().append($("<svg class='"+ iconClass +"'><use xlink:href='"+ svgIconId +"'></use></svg>"));	// No I18N
			}
			else{
				iTag.addClass(iconClass);
			}
			return iTag;
		},
		encodeHTML : function(str){
			sourceText.nodeValue = str;
			return sourceDiv.innerHTML;
		},
		_init: function(str){
			ZDOMUtil.init();
			var base = ZComponents;			
			if(!needToInit){
				return false;
			}
			needToInit = false;
			base._getOptions = ZDOMUtil.clone('div').dataset ? base._getDataSet : base._getDataAttributes;	// No I18N
			base.isDOMAttrModifiedSupported = getAttrSupport();
			sourceDiv.appendChild(sourceText);
			if(base.Browser.isIE() && base.isDOMAttrModifiedSupported){				
				base.core._attachObserver = function(element){
					var base = this;
					this.observer = function(e){
						if(base.attributeList.indexOf(e.attrName) !== -1){
							// DOMAttrModified triggered for each and every property change.
							base._handleObserver(e.attrName, e.newValue);
						}
					}
					element.addEventListener("DOMAttrModified", this.observer, false);
				};
				base.core.destroy = function(){
					this.element[0].removeEventListener("DOMAttrModified", this.observer);
				};
			};
			base.setProperties();
			base._svgSprite = base.createSVGElement('svg',{id:"zcomponents__svg"});	// No I18N
			$(base._svgSprite).appendTo('body').hide();
		},
		registerComponent: function(componentName, parentComponent,  prototype){
			if(!prototype){
				prototype = parentComponent;
				parentComponent = this.core;
			}
			prototype.componentName = componentName;
			$[componentName] = function(options, element, userOptions){  // creating the constructor method for child.
				if(arguments.length){
					this._init(options, element, userOptions);
				}
			}
			var baseClass = new parentComponent();
			baseClass.options = $.extend( true, {}, baseClass.options );
			$[componentName].prototype = $.extend(true, {}, baseClass, prototype);
			$.fn[componentName] = function(options){ // Assigning the childComponent to global scope... [ Alternative to JQuery's Method ]
				needToInit && ZComponents._init();
				var returnValue = this,
					length = this.length;
				if(!options || typeof options === "object"){ // component is initialized
					options = options ? options : {};
					for(var i = 0; i < length; i++){
						var componentInstance = $(this[i]).data(componentName);
						if(componentInstance){
							return returnValue;
						}else{
							var data = $.extend(true, {}, $[componentName].prototype.options, ZComponents[componentName] ? ZComponents[componentName].DEFAULTS : {}, ZComponents.getOptions(this[i],{}), options);
							$(this[i]).data(componentName, new $[componentName](data, this[i], options));
						}
					}
				}else if(typeof options === "string" && options.indexOf("_") === -1){ // No I18N
					// Public Method Invocation
					var params = Array.prototype.slice.call(arguments,1);
					for(var i = 0; i < length; i++){
						var componentInstance = $(this[i]).data(componentName);
						if(componentInstance){
							if(options === "option"){ // No I18N
								options = params && params.length === 2 ? "setAttribute" : "getAttribute"; // No I18N
							}else if(options === "options"){ // No I18N
								options = params && params.length === 0 ? "getAttributes" : "setAttributes"; // No I18N
							}
							returnValue = componentInstance[options].apply(componentInstance, params);
						}
					}
				}else{
					return false;
				}
				return returnValue;
			}
			this._extend($[componentName], parentComponent);
		}
	}
})(jQuery);
(function($){
	ZComponents.core = function(options, element){
		if(arguments.length){
			this._init(options, element);
		}
	}
	ZComponents.core.prototype = {
		_init: function(options, element, userOptions){
			this.element = $(element);
			this.options = options;
			// this._attachObserver(element);
			this._create($(element), options, userOptions);
		},
		_create: function(){},
		_trigger: function(type, event, data, element){
			element = element ? element : this.element;
			var prop, orig,
				callback = this.options[ type ], value;

			data = data || {};
			event = $.Event( event );
			event.type = (this.componentName ? (this.componentName + type) : ""+type).toLowerCase(); // No I18N
			// the original event may come from any element
			// so we need to reset the target on the new event
			event.originalTarget = event.target; // saving the original target.
			event.target = element;
			orig = event.originalEvent;
			if ( orig ) {
				for ( prop in orig ) {
					if ( !( prop in event ) ) {
						event[ prop ] = orig[ prop ];
					}
				}
			}
			element.trigger( event, data );
			data = [ event ].concat( data );
			if(callback && typeof callback === "string"){ // No I18N
				value = this._triggerFunction(callback, element[0], data);
			}else{
				value = $.isFunction(callback) ? callback.apply(element, data) : undefined;
			}
			return value !== undefined ? value : !event.isDefaultPrevented();
		},
		_handleIcon: function(iTag, svgData, defaultSVGId, iconClass, svgIconId, v1IconClass, isUpdate, prevIconClass, prevSVGIconId, svgIconName){
			svgIconName = svgIconName || (this.componentName +"__"+ defaultSVGId);
			return ZComponents._handleIcon(iTag, svgData, svgIconName , iconClass, svgIconId, v1IconClass, isUpdate, prevIconClass, prevSVGIconId);
		},
		_triggerFunction: function(functionName, context, params){ 
			// Invoking functions which are passed as strings in HTML Elements.
			var namespaces = functionName.split("."),executionContext = window;
		    for(var i = 0; i < namespaces.length && executionContext; i++){
		        executionContext = executionContext[namespaces[i]];
		    }
		    return executionContext && executionContext.apply(context, params);
		},
		_handleObserver: function(attrName, attrValue){
			var formattedAttribute = attrName.replace(/^data-/,''); // No I18N
			formattedAttribute = formattedAttribute.replace(/-([a-zA-Z])/g, function(g){ 
				return g[1].toUpperCase(); // replacing the hyphenated names to camelCase
			});
			this.setAttribute(formattedAttribute, attrValue);
		},
		_attachObserver: function(element){
			var base = this;
			this.observer = new MutationObserver(function(props){
				var attrName = props[0].attributeName,
					attrValue = props[0].target.getAttribute(attrName);
				base._handleObserver(attrName, attrValue);
			});
			this.observer.observe(element,{
				attributes: true,
				attributeFilter: this.attributeList
			});
		},
		getData: function(element){
			return ZComponents.getOptions(element ? element : this.element[0]);
		},
		_setAttribute: function(){
			return true;
		},
		setAttribute: function(optionName, value){
			// calling "option" method with key and value sets the option with key to the value specified.(Setter Method)
			// This method inturn calls the "option" method of components to reflect the change immediately.
			// Example: element.zbutton("option","text","Save");
			if(typeof this.options[optionName] === "string" && this.options[optionName] === value){  // No I18N
			// checking whether the value is actually modified or not.
				return;
			}
			var valueChanged = this._setAttribute(optionName, value);
			if(optionName === "disable"){
				this._handleDisable(value);
				valueChanged = true;
			}
			if(valueChanged){
				this.options[optionName] = value;
			}
		},
		setAttributes: function(options){
			// calling "setAttributes" method will sets one or more options.(Setter Method) 
			// Example: element.zbutton("setAttributes",{"text":"Save","disabled":true});
			for(var i in options){
				this.setAttribute(i, options[i]); 
			}
		},
		getAttribute: function(optionName){
			// calling "getAttribute" method will return the value of the key.(Getter Method)
			// Example: element.zbutton("getAttribute","disabled");
			return this.options[ optionName ];
		},
		getAttributes: function(){
			// calling "getAttributes" method will return the entire options object.(Getter Method)
			// Example: element.zbutton("getAttributes")
			return $.extend(true, {}, this.options); // extending in order to avoid object overriding.
		},
		_getI18N: function(moduleName, key, defaultKeys, stringArray){
			var keyObject = ZComponents.keys[moduleName] || {};
			var ii8nText = keyObject[key] || "";	// No I18N
			if(ii8nText === "" && defaultKeys){	// No I18N
	            ii8nText = defaultKeys[ key ];
	        }
	        if(stringArray){
                for (var i = 0; i < stringArray.length; i++) {
                    ii8nText = ii8nText.replace('{'+ i +'}',stringArray[i]);	// No I18N
                }
            }
	        return ii8nText;
		},
		enable: function(){
			this._handleDisable(true);
		},
		disable: function(){
			this._handleDisable(false);
		},
		_handleDisable: function(enable){
			var ele = this._baseElement ? $(this._baseElement) : this.element;
			ele[enable ? "addClass" : "removeClass"]("is-disabled"); // No I18N
			enable ? ele.attr({"aria-disabled": enable, "disabled": enable}) : ele.removeAttr("aria-disabled disabled");	// No I18N
			this.setAttribute( 'disabled', !enable ); //No I18N
		},
		getElement: function(){
			return this._baseElement ? this._baseElement : this.element;
		},
		_destroy: function(){},
		destroy: function(){
			// this.observer.disconnect();
			// this.observer = undefined;
			this.element.off("."+this.eventPrefix);	//No I18N
			this.element.removeData(this.componentName).removeData('metadata');	// No I18N
			this._destroy();
			if(this._baseElement && this._baseElement[0] !== this.element[0]){ // sometimes element will be stored in base element
				this._baseElement.remove();
			}
		}
	}
}(jQuery));
document.addEventListener("DOMContentLoaded", ZComponents._init); // No I18N
window.addEventListener("resize", ZComponents.setProperties); // No I18N
