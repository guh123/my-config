/* $Id$ */
var ZPosition = (function($, $window, $document){
	var target, element, targetHeight, targetWidth, targetOffset, options, within, elemWidth,
	elemHeight, elemOffset, availableHeight, availableWidth, win , element, callout, recalculated, hiddenParents, prevStyles, correctionOffset;
	var defaultOptions = {
		direction: 'top-left', //No I18N
		showWithinTarget: false,
		within: $window,
		arrow:{
			minSpace:0,
			margin:{
				left:0,
				top:0
			},
			callback:undefined
		},
		callbacks:{
			dimensionModifier: $.noop,
			directionModifier: $.noop
		},
		customDimensions: false,
		positionAlterable: 'flipallfit' //'flipside'|flipsidefit'|flipall'|flipfit'|'fit'|false //No I18N
		/*newly added flipside, flipsideallfit*/
	};
	var calloutPositions = {
		'top-left' : 'bottom-right',	//No I18N
		'top-right' : 'bottom-left',	//No I18N
		'bottom-left' : 'top-right',	//No I18N
		'bottom-right' :'top-left',	//No I18N
		'top' :'bottom',	//No I18N
		'bottom' :'top',	//No I18N
		'left' :'right',	//No I18N
		'right' : 'left',    //No I18N
		'left-top' : 'right-bottom',	//No I18N
		'left-bottom' : 'right-top',	//No I18N
		'right-top' : 'left-bottom',	//No I18N
		'right-bottom' : 'left-top'	//No I18N
	};
	var regex = {
		relDirections: /^(top|top-right|top-left|bottom|bottom-right|bottom-left|left|left-top|left-bottom|right|right-top|right-bottom|top-left-corner|top-right-corner|bottom-left-corner|bottom-right-corner)$/,
		withinDirections: /^(top|bottom|left|right|top-left|top-right|bottom-left|bottom-right|center)$/,
		fit: /^(fit|flipfit|flipallfit|flipsidefit|flipsideallfit|true)$/,
		flip: /^(flip|flipfit|flipall|flipallfit|flipside|flipsidefit|flipsideall|flipsideallfit|true)$/,
		flipside : /^(flipside|flipsidefit|flipsideall|flipsideallfit|true)$/,
		flipall: /^(flipall|flipallfit|flipsideall|flipsideallfit|true)$/
	};
	function getCorrectionOffset(){
		var $body = $('body'); //No I18N
		if( correctionOffset ){
			return correctionOffset;
		}
		correctionOffset = {left:0, top: 0};
		//Correction in mobile browsers. --> Issue : https://github.com/jquery/jquery/issues/3187
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			var temp = $('<span>').css({
				position:'absolute', //No I18N
				height:'20px', //No I18N
				width:'20px', //NO I18N
				top:'0px', //No I18N
				left:'0px' //No I18N
			}).appendTo( $body );
			correctionOffset = temp.offset();
			correctionOffset.left = correctionOffset.left - parseFloat( $body.css('margin-left') ) - parseFloat( $body.css('border-left-width') ) ; //No I18N 
			correctionOffset.top = correctionOffset.top - parseFloat( $body.css('margin-top') ) - parseFloat( $body.css('border-top-width') ) ; //No I18N
			temp.remove();
		}
		return correctionOffset;
	}
	function getDimensions(element){
		if( element.preventDefault ){
			return{
				width:0, height:0, offset: {left: element.pageX, top: element.pageY}
			}
		}
		var element = $(element);
		if( element.nodeType === 9 ){
			return{
				width: element.width(), height: element.height(), offset: {left:0, top:0}
			}
		}
		if( $.isWindow(element) ){
			return{
				width: element.width(), height: element.height(), offset: {left: element.scrollLeft(), top: element.scrollTop()}
			}
		}
		var dimension = {
			width: getDimension( element[0], 'outerWidth' ), //No I18N
			height: getDimension( element[0], 'outerHeight' ), //No I18N
			offset: getOffset( element )
		}
		return dimension;
	}
	function getOffset( element ){
		// element.addClass('no-transform');
		var offset = element.offset();
		// console.log( offset );
		// var styleset = window.getComputedStyle( element[0], null );
		// console.log('transform', styleset.transform)
		// element.removeClass('no-transform');
		// element[0].style.transform = transform;
		var excessoffset = getCorrectionOffset();
		offset.left -= excessoffset.left;
		offset.top -= excessoffset.top;

		// console.log( 'ofset ', offset );
		//Incase it is transformed
		if( (ZComponents.Browser.isFirefox() || ZComponents.Browser.isChrome() ||  ZComponents.Browser.isSafari()) && window.WebKitCSSMatrix ){
			if( ZComponents.Browser.isSafari() ){
				var version = /version\/(\d+)/.exec( ZComponents.userAgent );
				if( version ){
					version = parseFloat( version[1] );
					if( version < 11 ){
						return offset;
					}
				}
			}
			var styleset = window.getComputedStyle( element[0], null );
			if( styleset.webkitTransform && styleset.webkitTransform !== 'none' ){ //No I18N
				 // console.log( styleset.transform );
				 var curTransform = new  WebKitCSSMatrix(window.getComputedStyle(element[0]).webkitTransform);
				 // console.log( curTransform );
				 offset.left -= curTransform.m41;
				 offset.top -= curTransform.m42;
			}	
		}
		return offset;	
	}
	/* Direction if alterable is fixed based on within element*/
	function fixDirection(direction){
		var dir = direction.split('-'); //No I18N
		var changedir = false;
		/* To filp in case of insufficient space
			top-left =>  bottom-left
			bottom-left => top-left
			left-top => right-top
			right-top => left-top
		 */
		if(/^(top|bottom)$/.test(dir[0]) || /^corner$/.test(dir[2])){
			callout && callout.callback.call(this, callout.element, calloutPositions[dir[0]]);
			var collisionWidth = elemWidth + ( callout ? (callout.width ? callout.width : callout.element.outerWidth()) : 0 );
			var collisionHeight = elemHeight + ( callout ? (callout.height ? callout.height : callout.element.outerHeight()) : 0 );
			var dirInfo = flip.top(direction, collisionHeight);
			direction = dirInfo.direction;
			if(dirInfo.overTop > 0 && regex.flipall.test(options.positionAlterable)){
				var	newDirInfo = flip.left("right", collisionWidth);	//No I18N
				/* check - if space in top/bottom is inefficient left/right space is checked, if available left/right position is taken, else top/bottom position is fixed */
				if(newDirInfo.overLeft <= 0){
					direction = newDirInfo.direction;
				}
			}
		}
		dir = direction.split('-'); //No I18N

		if(/^(left|right)$/.test(dir[0]) || /^corner$/.test(dir[2])){
			callout && callout.callback.call(this, callout.element, calloutPositions[dir[0]]);
			var collisionWidth = elemWidth + ( callout ? (callout.width ? callout.width : callout.element.outerWidth()) : 0 );
			var collisionHeight = elemHeight + ( callout ? (callout.height ? callout.height : callout.element.outerHeight()) : 0 );
			var dirInfo = flip.left(direction, collisionWidth);
			direction = dirInfo.direction;
			if(dirInfo.overLeft > 0 && regex.flipall.test(options.positionAlterable)){
				var newDirInfo = flip.top("bottom", collisionHeight);	//No I18N
				/* check - if space in left or right is inefficient, element is displayed in top/bottom */
				direction = newDirInfo.direction;
			}
		}
		return direction;
	}
	/* To filp in case of insufficient space
		top-left =>  top-right
		bottom-left => bottom-right
		left-top => left-bottom
		right-top => right-bottom
	 */
	function fixAlternateDirection(direction){
		var dir = direction.split('-'), //No I18N
		calloutWidthLeft = 0, calloutHeightLeft = 0;
		if(target.preventDefault && callout){
			/* If target is an event, callout must point the mouse pointer, so collisionWidth is reduced*/
			calloutWidthLeft = 2*callout.width + callout.width/2;
			calloutHeightLeft = 2*callout.height + callout.height/2;	
		}
		if(/^(left|right)$/.test(dir[1])){
			// var dirInfo = flip.left(dir[1], elemWidth - targetWidth - calloutHeightLeft);
			var dirInfo = flip.left(dir[1], elemWidth - (dir[0]==='corner'? 0: targetWidth) - calloutHeightLeft);
			direction = direction.replace(dir[1],dirInfo.direction);
		}else if(/^(top|bottom)$/.test(dir[1])){
			var dirInfo = flip.top(dir[1], elemHeight - targetHeight - calloutWidthLeft);
			direction = direction.replace(dir[1], dirInfo.direction);
		}
		return direction;
	}
	/* To initiate callout element*/
	function initCallout(elementDir){
		if( options.arrow && options.arrow.element ){
			var	callout = {};
			var element = options.arrow.element;
			if(typeof element === 'string' || element.jquery || element.nodeType){	//No I18N
				element = $(element);
				if(element.length){
					callout.element = element;
				}
			}
			if(callout.element && callout.element.css('position') !== 'static'){	//No I18N
				callout.centeredToTarget = (/^(center|undefined)$/.test(options.arrow.direction)) && !target.preventDefault ? true : false;
				callout.callback =  $.isFunction(options.arrow.callback)? options.arrow.callback : ($.isFunction(options.arrowCallback)? options.arrowCallback: $.noop );
				callout.direction = calloutPositions[elementDir];
				callout.callback.call(this, callout.element, callout.direction.split('-')[0]);	//No I18N
				callout.height = (typeof options.arrow.height === 'number' ? options.arrow.height : 0);	//No I18N
				callout.width = (typeof options.arrow.height === 'number' ? options.arrow.width : 0); //No I18N
				callout.minSpace = options.arrow.minSpace;
				callout.margin = options.arrow.margin || {left:0,top:0};
				return callout;	
			}else{
				options.arrow = undefined;
			}
		}	
	}
	function getElementHeight( direction ){
		if( elemHeight > getAvailableHeight( options.direction ) ){
			return  getAvailableHeight( options.direction );
		}else{
			return elemHeight;
		}
	}
	function getElementWidth(){
		if( elemWidth > getAvailableWidth( options.direction ) ){
			return  getAvailableWidth( options.direction );
		}else{
			return elemWidth;
		}
	}
	function fitCalloutPosition( callout, calloutP ){
		var dir = callout.direction.split('-'); //No I18N
		var maxValue, tempDir = dir[1], minValue = 0;
		var elemWidth1 = getElementWidth();
		var elemHeight1 = getElementHeight();
		if( /^(left|right)$/.test( dir[1] ) ){ 
			maxValue = elemWidth1 - callout.width;
		}else if( /^(top|bottom)$/.test( dir[1] ) ){ 
			maxValue = elemHeight1 - callout.height;
		}else{
			if( /^(top|bottom)$/.test( dir[0] ) ){
				maxValue = elemWidth1 - callout.width;
				tempDir = 'left'; //No I18N
			}else if( /^(left|right)$/.test( dir[0] ) ){
				maxValue = elemHeight1 - callout.height;
				tempDir = 'top'; //No I18N
			}
		}	
		if( calloutP[tempDir] > maxValue ){
			calloutP[ tempDir ] = maxValue;
		}
		if( calloutP[tempDir] < minValue ){
			calloutP[ tempDir ] = minValue;
		}
	}
	/* Function to get the callout position `for a given direction*/
	function getCalloutPosition( callout , correctionPixel ){
		callout.element.css({left:'auto', top:'auto', right:'auto', bottom:'auto'}); //No I18N
		var pos = {};
		var dir = callout.direction.split('-'); //No I18N
		if( /^(top|bottom)$/.test( dir[0] ) ){
			pos[ dir[0] ] = -(callout.height);	
			if( !dir[1] ){
				pos.left = elemWidth/2 - callout.width/2 - correctionPixel.left;
			}
		}else if(/^(left|right)$/.test( dir[0] )){
			pos[dir[0]]  = -(callout.width);
			if( !dir[1] ){
				pos.top = elemHeight/2 - callout.height/2 - correctionPixel.top;
			}
		}
		if( /^(left|right)$/.test( dir[1] ) ){
			var cPix = ( correctionPixel.left );
			if( dir[1] === 'left' ){ //No I18N	
				cPix = -( cPix );
			}
			if( targetWidth && elemWidth > targetWidth ){
				pos[dir[1]] = targetWidth/2 - callout.width/2 + cPix;
			}else{
				pos.left = elemWidth/2 - callout.width/2;
			}
		}else if( /^(top|bottom)$/.test( dir[1] ) ){
			var cPix = 	( correctionPixel.top );
			if( dir[1] === 'top' ){ //No I18N
				cPix = -( cPix );
			}
			if( targetHeight && elemHeight > targetHeight ){
				pos[dir[1]] = targetHeight/2 - callout.height/2 + cPix;
			}else{
				pos.top = elemHeight/2 - callout.height/2;
			}
		}
		var doesHaveBoxShadow = element.css('box-shadow') !== 'none'; //No I18N
		/*This correction is done because the pointer always sits on the element rather than attached to the element*/
		if( callout.direction.split("-")[0] === "top" ){ //No I18N
			pos.top =  pos.top + ( ( parseFloat( element.css('border-top-width') ) || doesHaveBoxShadow )? 1:0); //No I18N
		}else if( callout.direction.split("-")[0] === 'bottom' ){ //No I18N
			pos.bottom = pos.bottom +( ( parseFloat( element.css('border-bottom-width') ) || doesHaveBoxShadow )? 1:0 ); //No I18N
		}else if( callout.direction.split("-")[0] === 'right' ){ //No I18N
			pos.right = pos.right + ( ( parseFloat( element.css('border-right-width') ) || doesHaveBoxShadow )? 1:0); //No I18N
		}else if( callout.direction.split("-")[0] === 'left' ){ //No I18N
			pos.left = pos.left + ( ( parseFloat( element.css('border-left-width') ) || doesHaveBoxShadow )? 1:0);  //No I18N
		}
		return pos;
	}
	var flip = {
		/* Filp north south position incase of insufficient height in the given direction */
		top: function(direction, collisionHeight){
			var dir = direction.split('-')[0], 
				response = {direction: direction},
				availHeight = getAvailableHeight(direction);
			response.overTop = collisionHeight -  availHeight;
			if(response.overTop > 0){
				var newdir = dir === 'top' ? 'bottom' : 'top'; //No I18N
				var newAvailableHeight = getAvailableHeight(direction.replace(dir, newdir));
				if(newAvailableHeight > availHeight){
					response.direction = direction.replace(dir, newdir);
					response.overTop = collisionHeight - newAvailableHeight;
				}
			}
			return response;
		},
		/* Flip the left right position incase of insufficient width in the given direction*/
		left: function(direction, collisionWidth){
			var dir = direction.split('-'), response = {direction: direction}, finalDir, newdir;
			var availWidth = getAvailableWidth(direction);
			response.overLeft = collisionWidth -  availWidth;
			if(response.overLeft > 0){
				finalDir = dir[0];
				if(dir[2] === 'corner'){
					finalDir = dir[1];
				}
				newdir = finalDir === 'left' ? 'right' : 'left';	//No I18N
				var newAvailableWidth = getAvailableWidth( direction.replace(finalDir, newdir) );
				if(newAvailableWidth > availWidth){
					response.direction = direction.replace(finalDir, newdir);
					response.overLeft = collisionWidth - newAvailableWidth;
				}
			}
			return response;	
		}
	}
	/* Fit the element position based on the viewport*/
	function fitPosition( position ){
		var newPosition = $.extend({}, position),
		direction = options.direction,
		collisionWidth = elemWidth + callout ? callout.width : 0,
		collisionHeight = elemHeight + callout ? callout.height : 0,
		dir = direction.split('-');	//No I18N
		dir[1] = dir[1] === undefined? (/^(top|bottom)$/.test(dir[0])? 'left' : 'top') : dir[1];	//No I18N
		var offset = within.isWindow? {left: win.scrollLeft, top: win.scrollTop} : within.offset;
		if(/^(top|bottom)$/.test(dir[1]) || target.preventDefault){
			var overTop = within.scrollTop - newPosition.top;
			if( overTop>0 ){
				newPosition.top += overTop;
			}
			var overBottom = ( newPosition.top + elemHeight) - (within.scrollTop + getAvailableHeight().complete);
			if(overBottom > 0){
				newPosition.top -= overBottom;
			}
		}
		if(/^(left|right)$/.test(dir[1]) || target.preventDefault){
			var overLeft = within.scrollLeft - newPosition.left;
			if( overLeft>0 ){
				newPosition.left += overLeft;
			}
			var overRight = ( newPosition.left + elemWidth) - (within.scrollLeft + getAvailableWidth().complete)+1;
			if(overRight > 0){
				newPosition.left -= overRight;
			}
		}
		return newPosition;
	}
	function calculatePosition(direction){
		var newPosition, position;
		options.direction = direction;
		if( !/corner/.test( options.direction )){
			callout = initCallout( options.direction );
		}
		if( regex.flip.test( options.positionAlterable ) && !recalculated){
			options.direction = fixDirection( options.direction );
		}
		/*Setting Callout properties*/
		if( callout ){
			callout.direction = calloutPositions[ options.direction ];
			callout.callback.call(this, callout.element, callout.direction.split('-')[0]);	//No I18N
			if( !callout.height ){
				callout.height = callout.element.outerHeight();
			}
			if( !callout.width ){
				callout.width = callout.element.outerWidth();
			}
		}
		if( regex.flipside.test(options.positionAlterable) ){
			options.direction = fixAlternateDirection( options.direction );
		}
		position = fixPosition( options.direction );
		newPosition = $.extend( {}, position);
		if(regex.fit.test(options.positionAlterable)){
			newPosition = fitPosition( position );
		}
		if( newPosition.top < within.scrollTop ){
			newPosition.top = within.scrollTop;
		}
		if( newPosition.left < within.scrollLeft ){
			newPosition.left = within.scrollLeft;
		}
		var newdir;
		if( callout && regex.flipall.test( options.positionAlterable ) && !recalculated && !target.preventDefault ){
			/* Calculate whether calloutminspace is available*/
			var CALLOUTMINSPACE = callout.minSpace;
			if( CALLOUTMINSPACE !== undefined ){
				var dir = options.direction.split('-'); //No I18N
				var minElemLeft, minElemTop, maxEleLeft, maxEleTop;
				var elemWidth1 = getElementWidth();
				var elemHeight1 = getElementHeight();
				minElemLeft = targetOffset.left - elemWidth1 + callout.width;
				minElemTop = targetOffset.top - elemHeight1 + callout.height;
				maxEleLeft = targetOffset.left + targetWidth - callout.width;
				maxEleTop = targetOffset.top + targetHeight - callout.height;
				if( /^(top|bottom)$/.test( dir[0] ) ){
					if( newPosition.left < minElemLeft ){
						newdir = 'left'; //No I18N
					}
					if( newPosition.left > maxEleLeft ){
						newdir = 'right'; //No I18N
					}
				}else if( /^(left|right)$/.test( dir[0] ) ){
					if( newPosition.top < minElemTop ){
						newdir = 'top'; //No I18N
					}
					if( newPosition.top > maxEleTop ){
						newdir = 'bottom'; //No I18N
					}	
				}
			}
		}
		if( !newdir || recalculated ){
			var correctedPosition = getCorrectedPosition(newPosition, element);
			if( callout ){
				callout.direction = calloutPositions[options.direction];
				var correctionPixel = {
					left: ( newPosition.left - position.left ),
					top: ( newPosition.top - position.top )
				}
				callout.position = getCalloutPosition( callout, correctionPixel );
				fitCalloutPosition( callout, callout.position );
			}	
		}else{
			recalculated = true;
		 	correctedPosition = calculatePosition( newdir );
		}
		return correctedPosition;
	}
	/* Function to get the available height in the given direction*/
	function getAvailableHeight( direction ){
		if( !availableHeight ){
			if( within.isWindow || within.isDocument ){
				availableHeight = { 
									top: targetOffset.top - within.scrollTop,
									bottom: within.height - ( targetOffset.top + targetHeight - within.scrollTop ),
									complete: within.height
								  }
			}else{
				availableHeight = {};
				if( within.offset.top < win.scrollTop ){
					availableHeight.top = targetOffset.top - win.scrollTop;
				}else{
					availableHeight.top = targetOffset.top - within.scrollTop;
				}
				availableHeight.bottom = ( within.offset.top + within.height ) - ( targetOffset.top + targetHeight );
				var diffHeight = ( win.height + win.scrollTop ) - ( within.offset.top + within.height );
				if( diffHeight < 0 ){
					availableHeight.bottom += diffHeight;
				}	
				availableHeight.complete = 	availableHeight.top + availableHeight.bottom + targetHeight;
			}
		}
		if(!direction){
			return availableHeight;
		}
		direction = direction.split('-')[0];	//No I18N
		if(direction === 'top'){	//No I18N
			return availableHeight.top;
		}else if(direction === 'bottom'){	//No I18N
			return availableHeight.bottom;
		}else{
			return availableHeight.complete;
		}	
	}
	/* Function to get the available width in the given direction*/
	function getAvailableWidth( direction ){
		if( !availableWidth ){
			if( within.isWindow || within.isDocument ){
				availableWidth = { 
									left: targetOffset.left - within.scrollLeft,
									right: within.width - ( targetOffset.left + targetWidth - within.scrollLeft ),
									complete: within.width
								  }
			}else{
				availableWidth = {};
				if( within.offset.left < win.scrollLeft ){
					availableWidth.left = targetOffset.left - win.scrollLeft;
				}else{
					availableWidth.left = targetOffset.left - within.scrollLeft;
				}
				availableWidth.right = ( within.offset.left + within.width ) - ( targetOffset.left + targetWidth );
				var diffWidth = ( win.width + win.scrollLeft ) - ( within.offset.left + within.width );
				if( diffWidth < 0 ){
					availableWidth.right += diffWidth;
				}	
				availableWidth.complete = 	availableWidth.left + availableWidth.right + targetWidth;
			}
		}
		if(!direction){
			return availableWidth;
		}
		var dir = direction.split('-'),	//No I18N
			finaldir = dir[2] === 'corner'? dir[1]:dir[0];
		if(finaldir === 'left'){	//No I18N
			return availableWidth.left;
		}else if(finaldir === 'right'){	//No I18N
			return availableWidth.right;
		}else{
			return availableWidth.complete;
		}
	}
	/* Function to get element position for the given direction*/
	function fixPosition(direction){
		direction = direction || options.direction;
		if(!regex.relDirections.test(direction)){
			options.direction = direction = 'top-left';	//No I18N
		}
		var dir = direction.split('-'); //No I18N
		var basePosition = $.extend({}, targetOffset);
		if(dir[0] === 'top'){ //No I18N
			basePosition.top -=  (elemHeight + (callout? callout.height : 0));
		}else if(dir[0] === 'bottom'){ //No I18N
			basePosition.top += (targetHeight + (callout? callout.height : 0));
		}else if(dir[0] === 'left'){ //No I18N
			basePosition.left -= (elemWidth + (callout? callout.width : 0));
		}else if(dir[0] === 'right'){ //No I18N
			basePosition.left += (targetWidth + (callout? callout.width : 0));
		}	
		if(dir[1] === undefined){
			if(dir[0].match(/^left|right$/)){
				basePosition.top = basePosition.top - elemHeight/2 + targetHeight/2; 
			}else{
				basePosition.left = basePosition.left - elemWidth/2 + targetWidth/2;
			}
		}else if(dir[1] === 'top'){	//No I18N
			basePosition.top = basePosition.top + targetHeight - elemHeight;
		}else if(dir[1] === 'left'){	//No I18N
			basePosition.left = basePosition.left - elemWidth + (dir[2] === 'corner'? 0: targetWidth);	//No I18N
		}else if(dir[1] === 'right' && dir[2] === 'corner'){	//No I18N
			basePosition.left = basePosition.left + targetWidth; 
		}
		return basePosition;
	}
	function showHiddenParent( element ){
		element = $(element);
        if( element.is(':hidden') ){ //No I18N
            var i = 1;
            var parent = element;
            while( i && parent && !parent.is('body') ){ //No I18N
                if( parent.css('display') === 'none' ){ //No I18N
                    hiddenParents.push( parent );
                    prevStyles.push( parent.attr('style')||''); //No I18N
                    parent.css({
                        display:'block', //No I18N
                        position:'absolute', //No I18N
                        opacity:1,
                        visibility:'hidden' //No I18N
                    });  
                    i = parent.is(':hidden'); //No I18N
                }
                parent = parent.parent();
            }
        }
    }
    function resetParent(){
        if( hiddenParents && hiddenParents.length ){
            hiddenParents.forEach(function( parent, i ){
                parent.attr('style', prevStyles[i] ); //No I18N
            });
            hiddenParents = [];
            prevStyles = [];
        }
    }
	/* Function to get the corrected element position based on the element positioning and relative parent positioning*/
	function getCorrectedPosition( calculatedOffset, element ){
		var offsetNew = $.extend({}, calculatedOffset);
		var position = element.css('position'); //No I18N
		var curOffset = elemOffset;
		var curTopCss = parseFloat( element.css('top') ); //No I18N
		var curLeftCss = parseFloat( element.css('left') ); //No I18N
		if( /^(absolute|fixed)$/.test( position ) && (isNaN( curTopCss ) || isNaN( curLeftCss ) )){
			var p = element.position();
			curTopCss = p.top;
			curLeftCss = p.left;
		}else{
			curTopCss = parseFloat( curTopCss ) || 0;
			curLeftCss = parseFloat( curLeftCss ) || 0;
		}
		offsetNew.top = offsetNew.top - (curOffset.top - parseFloat( curTopCss ) );
		offsetNew.left = offsetNew.left - (curOffset.left - parseFloat( curLeftCss ) );
		return offsetNew;	
	}
	function getScrollBarWidth(){
		var scrollEle = document.createElement("div");
		var styleProps = "width:100px;height:100px;overflow:scroll;";  	 // No I18N
		document.querySelector("body").appendChild(scrollEle);	 // No I18N
		scrollEle.style.cssText = styleProps; 
		var scrollWidth = $(scrollEle).width() - scrollEle.scrollWidth;			
		document.querySelector("body").removeChild(scrollEle);	 // No I18N
		return scrollWidth || 0;
	}
	/* Function to get the dimensions of within container*/
	function getWithinDimensions( element ){
		element = element.length? element : $window;
		var isWindow =  $.isWindow(element[0]);
		var isDocument = !!element[0] && element[0].nodeType === 9;
		var offset = (isWindow || isDocument)? { left:0, top:0 } : (getOffset( element ) || {left:0, top:0});
		var scrollLeft = isWindow || isDocument? win.scrollLeft : offset.left < win.scrollLeft? win.scrollLeft : offset.left;
		var scrollTop = isWindow || isDocument? win.scrollTop : offset.top < win.scrollTop? win.scrollTop : offset.top;
		/* For window, documentElements.clienWidth is used instead of window.innerWidth ==> because
		   When mouse is scrollBar is shown permanently, window.innerWidth gives (width + scrollbarwidth)
		   documentElement.clientWidth gives width excluding scrollbar width. 	
		*/
		var width, height, scrollEle;
		if( isWindow ){
			var d = document.documentElement;
			var w = window;
			width =  w.innerWidth || d.clientWidth;
			height =  w.innerHeight || d.clientHeight;
			/*width = window.innerWidth;
			height = window.innerHeight;*/
			scrollEle = $('body'); //No I18N
		}else if( isDocument ){
			width = document.documentElement.scrollWidth; 
			height = document.documentElement.scrollHeight;
		}else{
			width = element.outerWidth();
			height = element.outerHeight(); 
			scrollEle = element;
		}
		if( scrollEle ){
			var overflowX = scrollEle.css('overflow-x'); //No I18N
			var overflowY = scrollEle.css('overflow-y'); //No I18N
			var hasOverflowX = overflowX === "scroll" || ( (overflowX === "auto" || ( scrollEle.is('body') && overflowX === 'visible') ) && width < scrollEle[0].scrollWidth); //No I18N
			var hasOverflowY = overflowY === "scroll" || ( ( overflowY === "auto" || ( scrollEle.is('body') && overflowY === 'visible') ) && height < scrollEle[0].scrollHeight); //No I18N
			var scrollWidth;
			if( hasOverflowX ){
				height -= ( scrollWidth === undefined? getScrollBarWidth() : scrollWidth );
			}
			if( hasOverflowY ){
				width -= (scrollWidth = getScrollBarWidth() );
			}
		}
		/*
			For window|document, to find with and height, javascript functions are used, becos jquery produces buggy results in some cases
		*/
		return{
			element : element,
			isWindow:  isWindow,
			isDocument: isDocument,
			offset: offset,
			scrollLeft: scrollLeft, 
			scrollTop: scrollTop,
			width: width,
			height: height
		}
	}
	function changeDirection(  direction ){
		if( direction === 'top-left' ){	//No I18N
			direction = 'top-right';	//No I18N
		}else if( direction === 'bottom-left'){	//No I18N
			direction = 'bottom-right';	//No I18N
		}else if( direction === 'top-right'){	//No I18N
			direction = 'top-left';	//No I18N
		}else if( direction === 'bottom-right' ){	//No I18N
			direction = 'bottom-left'	//No I18N
		}
		return direction;
	}
	function getDimension( element, dimension ){
		var value;
		var styles = element.getBoundingClientRect && element.getBoundingClientRect();
		if( styles ){
			switch( dimension ){
				case 'outerWidth':	//No I18N
					value = styles.width;
					break;
				case 'outerHeight':	//No I18N
					value = styles.height;
					break;
			}
		}
		if( isNaN( value ) ){
			value = $(element)[dimension]();
		}
		return  value;
	}
	function getPosition(targetElement, elementPositioned ,opt){
		options = $.extend(true, {}, defaultOptions, opt);  //make a copy of options
		/* target elements dimensions*/
		target = targetElement;
		element = elementPositioned;
		if(!options.showWithinTarget){
			var targetDimension, elementDimension, position, oldDirection = options.direction;
			win = {
				scrollLeft : $window.scrollLeft(), scrollTop : $window.scrollTop(), height: document.documentElement.clientHeight, width: document.documentElement.clientWidth
			},
			/* element to be positioned dimensions*/
			elementDimension = getDimensions( element );
			targetDimension = opt.customDimensions ? target : getDimensions( target );
			
			within = getWithinDimensions($(options.within));
			if( opt.callbacks && typeof opt.callbacks.dimensionModifier === 'function' ){ //No I18N
				opt.callbacks.dimensionModifier( targetDimension, elementDimension, within );
			}

			elemWidth = elementDimension.width;
			elemHeight = elementDimension.height;
			elemOffset = elementDimension.offset;

			targetWidth = targetDimension.width;
			targetHeight = targetDimension.height;
			targetOffset = targetDimension.offset;

			if(!regex.relDirections.test(options.direction)){
				options.direction = 'top-right';	//No I18N
			}else{
				options.direction = changeDirection( options.direction );
			}
			position = calculatePosition(options.direction);
			var response = {
				elementPosition: position || {left:0, top:0}, 
				oldDirection: oldDirection,
				direction: changeDirection( options.direction ),
				arrowPosition: callout? callout.position : {left:0,top:0},
				arrowDirection: calloutPositions[options.direction] && calloutPositions[options.direction].split('-')[0]	//No I18N
			}
			var dir = options.direction.split('-'); //No I18N
			if( /^(top|bottom)$/.test( dir[0] ) ){
				response.availableHeight =  getAvailableHeight( dir[0] ) - (callout? callout.height : 0);
				response.availableWidth = getAvailableWidth( dir[0] );
			}else if( /^(left|right)$/.test( dir[0]) ){
				response.availableHeight =  getAvailableHeight( dir[0] );
				response.availableWidth = getAvailableWidth( dir[0] ) - (callout? callout.width : 0);
			}
			return response;
		}else{
			return getWithinTargetPosition();			
		}
	}
	function getWithinTargetPosition(){
		/*Elements with position 'absolute'|'fixed' are preferred to be  */
		target = $(target);
		var isWindow, position = {}, containerProps = {};
		if( !target.length || ( target[0] === window || target[0].nodeType === 9 /*document*/ ) ){
			target = $(window);
			isWindow = true;
		}
		if( !regex.withinDirections.test(options.direction) ){
			options.direction = 'top-left';	 //No I18N
		}
		var containerProps = { 
							   width : target.outerWidth() - (isWindow ? 0 :  parseFloat(target.css('border-right-width')) + parseFloat(target.css('border-left-width'))), //No I18N
							   height : target.outerHeight() - (isWindow ? 0 :  parseFloat(target.css('border-top-width')) - parseFloat(target.css('border-bottom-width')))	//No I18N
							};
		/*Container Properties*/
		containerProps.offset = isWindow ? {left:window.scrollX, top:window.scrollY} : (getOffset( target ) || {left:0, top:0});
		/*Element Properties*/
		var elementProps = { width:element.outerWidth(), height:element.outerHeight() };
		var centerDirections = ['center','left','right','top','bottom']; // No I18N
		var directionPropertObj = {left:'width',top:'height'}; // No I18N
		for(var dir in directionPropertObj){
			var oppDir = dir === 'left'?'right':'bottom'; // No I18N
			var prop = directionPropertObj[dir];
			if(options.direction.indexOf(dir) !== -1){
				position[dir] = containerProps.offset[dir];
			}else if(options.direction.indexOf(oppDir) !== -1){
				position[dir] = containerProps.offset[dir] + containerProps[prop] - elementProps[prop];
			}else if(centerDirections.indexOf(options.direction) !== -1){
				position[dir] = containerProps.offset[dir] + containerProps[prop]/2 - elementProps[prop]/2;	
			}
		}
		position = getCorrectedPosition(position, element);
		return {
			elementPosition : position
		}
	}
	return {
		get: function(targetElement, elementPositioned, opt){
			if( targetElement && $(elementPositioned).length){
				if( targetElement instanceof jQuery ){
					targetElement = targetElement[0];
				}
				if( elementPositioned instanceof jQuery ){
					elementPositioned = elementPositioned[0];
				}
				if( elementPositioned.nodeType === 1 && ( targetElement.nodeType === 1 || ( opt.showWithinTarget && (targetElement === window || targetElement === document) ) || targetElement.preventDefault || opt.customDimensions ) ){
					hiddenParents = [], prevStyles = [];
					showHiddenParent( targetElement );
					showHiddenParent( elementPositioned );
					opt = opt || {};
					var positionObject = getPosition( targetElement, $(elementPositioned), opt);
					resetParent();
					target = element   = recalculated = targetHeight = targetWidth = callout  = targetOffset   = options  = within = elemWidth = elemHeight = elemOffset = availableHeight = availableWidth = win = correctionOffset = hiddenParents = prevStyles = undefined;
					return positionObject;		
				}
			}
		}
	}
})(jQuery, jQuery(window), jQuery(document));
