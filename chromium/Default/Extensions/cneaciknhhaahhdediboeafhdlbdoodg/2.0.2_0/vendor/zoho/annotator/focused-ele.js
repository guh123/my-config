/* $Id$ */
if(!window.zcaptureFragment){
    $(window).off("blur.ze").off("focus.ze");
    runtime.sendMessage({
        value: "visibilityChange"//No i18n
    });
    if(window.zdelayedCature){
        stopDelayedCapture();
    }
    if($("#zannotator__partialScreen").length){
        resetCssValues();
    }
    var fragment_target;
    window.zcaptureFragment = true;
    elementsEventState(document.body);
    createFragmentContainer();
    createFragmentContainerPos();
    applyFragmentContCss();
    function createFragmentContainer(){
        $("#zannotator__fragmentSelector").remove();
        var fragmentCont = $("<div/>", {
            id: "zannotator__fragmentSelector", //No i18n
            class: "zannotator__fragmentSelector"   //No i18n
        }).css({
            "position": "absolute", //No i18n
            "z-index": "2147483647"    //No i18n
        });
        $("body").append(fragmentCont);
        $("body").append('<div id="zfragment-selectorTop"></div><div id="zfragment-selectorLeft"></div><div id="zfragment-selectorRight"></div><div id="zfragment-selectorBottom"></div>');
    }
    function createFragmentContainerPos(){
        var elements = {
            top: $('#zfragment-selectorTop'),
            left: $('#zfragment-selectorLeft'),
            right: $('#zfragment-selectorRight'),
            bottom: $('#zfragment-selectorBottom')
        };
        document.body.addEventListener('mousemove', fragmentMouseMoveAction);
        document.body.addEventListener('mouseup', fragmentMouseUpAction);
        document.body.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 27){
                removeFragmentCapture();
                cancelPartialScreen();
            }
        }, false);
    }
    function fragmentMouseMoveAction(event){
        var elements = {
            top: $('#zfragment-selectorTop'),
            left: $('#zfragment-selectorLeft'),
            right: $('#zfragment-selectorRight'),
            bottom: $('#zfragment-selectorBottom')
        };
        if(event.target.id.indexOf('zfragment-selector') !== -1){
            return;
        }
        var target = $(event.target), targetOffset = target[0].getBoundingClientRect(), targetHeight = targetOffset.height, targetWidth  = targetOffset.width;
        fragment_target = target;
        elements.top.css({
            left:  (targetOffset.left),
            top:   (targetOffset.top),
            width: (targetWidth)
        });
        elements.bottom.css({
            top:   (targetOffset.top + targetHeight),
            left:  (targetOffset.left),
            width: (targetWidth)
        });
        elements.left.css({
            left:   (targetOffset.left),
            top:    (targetOffset.top),
            height: (targetHeight)
        });
        elements.right.css({
            left:   (targetOffset.left + targetWidth),
            top:    (targetOffset.top),
            height: (targetHeight + 2)
        });
    }
    function fragmentMouseUpAction(event){
        var elements = {
            top: $('#zfragment-selectorTop'),
            left: $('#zfragment-selectorLeft'),
            right: $('#zfragment-selectorRight'),
            bottom: $('#zfragment-selectorBottom')
        };
        //var target = $(event.target);
        var target = fragment_target;
        var targetOffset = target[0].getBoundingClientRect();
        $("#zannotator__fragmentSelector").css({"width":target.outerWidth(), "height":target.outerHeight(), "top":target.offset().top, "left":target.offset().left});   //No i18n
        removeFragmentCapture();
        fragmentPosition(target, targetOffset);
    }
    function fragmentPosition(target, tOffset){
        var docH, body=document.body, html=document.documentElement;
        var winW = $(window).width(), winH = $(window).height(), tarW = tOffset.width, tarH = tOffset.height, pos;
        var top  = document.documentElement.scrollTop || window.scrollY || window.pageYOffset || document.scrollingElement.scrollTop;
        top = Math.ceil(top);
        var left = document.documentElement.scrollLeft || window.scrollX || window.pageXOffset || document.scrollingElement.scrollLeft;
        left = Math.ceil(left);
        if(tarH === 0 || tarW === 0){
            showAlertMessage();
            return;
        }
        if(tarH <= winH){
            if((tOffset.top + tarH) > winH){
                var scrollTop = (tOffset.top + tarH) - winH;
                top = scrollTop+top;
                window.scrollTo(left, top);
            } else if(tOffset.top < 0){
                top = tOffset.top+top;
                window.scrollTo(left, top);
            }
            if((tOffset.left + tarW) > winW){
                var scrollLeft = (tOffset.left + tarW) - winH;
                window.scrollTo(scrollLeft+left, top);
            } else if(tOffset.left < 0){
                window.scrollTo(tOffset.left+left, top);
            }
            setTimeout(function(){
                tOffset = target[0].getBoundingClientRect();
                /*If body is not having scroll*/
                if(tOffset.top < 0 && body.scrollHeight / window.innerHeight <= 1){
                    tOffset.top = 0; 
                    tOffset.y = 0; 
                } else if((tOffset.top + tarH) > winH && body.scrollHeight / window.innerHeight <= 1){
                    tarH = winH - tOffset.top;
                }
                /*If body is not having scroll*/
                positionToCapture(tOffset, tarW, tarH, winW, winH);
            }, 100);
        } else{
            if(body.scrollHeight / window.innerHeight <= 1){
                if(tOffset.y < 0){
                    tOffset.y = 0;
                    tOffset.top = 0;
                } 
                if(tOffset.x < 0){
                    tOffset.x = 0;
                    tOffset.left = 0;
                }
                tarH = winH - tOffset.top;
                positionToCapture(tOffset, tarW, tarH, winW, winH);
            } else{
                docH = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                top = tOffset.top+top;
                pos = {
                    x: tOffset.left, 
                    y: 0, 
                    width: tarW,
                    height: Math.floor(tarH),
                    winW: winW,
                    winH: winH,
                    scrollTop: top,
                    pixRatio: window.devicePixelRatio
                }
                runtime.sendMessage({
                    value: "captureFragment",//No i18n
                    pos: pos,
                    step: "scroll"  //No i18n
                });
            }
        }
    }
    function positionToCapture(tOffset, tarW, tarH, winW, winH){
        pos = {
                x1: parseInt(tOffset.left), 
                x2: parseInt(tOffset.left + tarW), 
                y1: parseInt(tOffset.top), 
                y2: parseInt(tOffset.top + tarH),
                width: winW,
                height: winH
            }
        fragmentCaptureCall(pos);
    }
    function fragmentCaptureCall(pos){
        setTimeout(function(){
            
            //removeIf(!chrome)
            chrome.runtime.sendMessage({
                action: 1027, //IPC_ACTION.PARTIAL_CAPTURE
                data : {
                    positionValues: pos,
                    pixRatio: window.devicePixelRatio
                }
            });
            //endRemoveIf(!chrome)

            }, 200);
    }
    function removeFragmentCapture(){
        window.zcaptureFragment = false;
        setTimeout(function(){
            elementsEventState(document.body, true);
        }, 150);
        document.body.removeEventListener("mousemove", fragmentMouseMoveAction);
        document.body.removeEventListener("mouseup", fragmentMouseUpAction);
        $('#zfragment-selectorTop, #zfragment-selectorBottom, #zfragment-selectorRight, #zfragment-selectorLeft').remove();
        $("#zannotator__fragmentSelector").remove();
    }
    function elementsEventState(ele, state){
        if (!state) {
            ele.addEventListener('click', stopElementsEvent);
        } else {
            ele.removeEventListener('click', stopElementsEvent);
        }
        var i, l, childs = $(ele).children();
        for (i = 0, l = childs.length; i < l; i++) {
            elementsEventState(childs[i], state);
        }
    }
    function stopElementsEvent(evt){
        evt.preventDefault();
        evt.stopPropagation();
    }
    function showAlertMessage(){
        var zalertDialogWrapper=$("<div/>").css({
            "position": "fixed",    //No i18n
            "width": "100%",    //No i18n
            "height": "100%",   //No i18n
            "top":"0px",    //No i18n
            "left":"0px",   //No i18n
            "background-color": "rgba(0, 0, 0, 0.6)",   //No i18n
            "z-index":"1000000" //No i18n
        }).appendTo($("body"));
        var zalertDialog = $("<div/>").css({
                "position": "fixed",    //No i18n
                "width": "510px",   //No i18n
                "top": "calc( 50% - 140px)",    //No i18n
                "left": "calc( 50% - 250px)",   //No i18n
                "background": "#fff",   //No i18n
                "border": "1px solid #e6e6e6",  //No i18n
                "box-shadow": "0px 0px 40px rgba(0, 0, 0, 0.3)",    //No i18n
                "border-radius": "3px", //No i18n
                "background": "#fff",   //No i18n
                "z-index": 1000000, //No i18n
                "line-height": "1.3"    //No i18n
            });
        $("body").append(zalertDialog);
        var msgcontParent=$("<div/>").css({"padding": "30px"}).appendTo(zalertDialog);   //No i18n
        msgcontParent.append('<i id="alert__infoicon"><svg id="alert__infosvg" viewBox="0 0 48 48"><g><g><path d="M23.9,17.4c1.5,0,2.5-1.1,2.4-2.3c0-1.3-0.9-2.4-2.3-2.4s-2.4,1.1-2.4,2.4C21.6,16.3,22.6,17.4,23.9,17.4z"></path> <path d="M26.2,35.5V21.8c0-1.2-1.4-1.3-1.8-1.3h-0.7c0,0-1.7,0-1.7,1.1v14.3c0,0.3,0.2,0.9,1.3,0.9h1.6C25.3,36.7,26.2,36.5,26.2,35.5z"></path></g><path d="M24,0C10.7,0,0,10.7,0,24s10.7,24,24,24s24-10.7,24-24S37.3,0,24,0z M24,44C13,44,4,35,4,24S13,4,24,4s20,9,20,20S35,44,24,44z"></path></g></svg></i>');   //No i18n
        $("#alert__infoicon").css({"display": "table-cell","position":"relative","float":"left" ,"padding": "0px 15px 0px 0px"});//No i18n
        $("#alert__infosvg").css({"width": "32px", "height": "32px", "fill": "#439edc"});//No i18n
        var msgcont = $("<div/>").css({
                "overflow": "auto", //No i18n
                "display": "block", //No i18n
                "line-height": "1.3"    //No i18n
        }).appendTo(msgcontParent);
        msgcont.append($("<span/>").css({"display": "inline-block","font-size":"14px","font-family":"sans-serif","font-weight":"bold","line-height": "1.3"}).text(i18n.getMessage("fragmentMsg1")));    //No i18n
        msgcont.append($("<span/>").css({"display": "inline-block","position":"relative","float":"left","margin-top":"10px","font-size":"14px","font-family":"sans-serif","line-height": "1.3","padding-top":"10px"}).text(i18n.getMessage("fragmentMsg2"))); //No i18n
        var actionBtn = $("<div/>").css({"padding": "0px 32px 30px","overflow": "auto","display": "block","line-height": "1.3"});   //No i18n
        zalertDialog.append(actionBtn)
        $("<span/>").attr({"id":"fragmentcancelbutton"}).css({  //No i18n
            "display": "inline-block",  //No i18n
            "line-height": "1.3",   //No i18n
            "padding": "7px 17px",  //No i18n
            "float": "right",   //No i18n
            "background": "#d6d6d6",    //No i18n
            "border": "1px solid #d6d6d6",  //No i18n
            "border-radius": "3px", //No i18n
            "font-size": "14px",    //No i18n
            "text-align": "center", //No i18n
            "color": "#111",    //No i18n
            "cursor":"pointer", //No i18n
            "font-family":"sans-serif"  //No i18n 
        }).text(i18n.getMessage("cancel")).appendTo(actionBtn);//No i18n
        var captureBtn = $("#fragmentcancelbutton").clone();    //No i18n
        captureBtn.attr({"id":"fragmentcapturebutton"}).css({   //No i18n
            "background": "#24bd5d",    //No i18n
            "border": "1px solid #24bd5d",  //No i18n
            "color":"#fff", //No i18n
            "margin-right": "10px"  //No i18n
        }).text(i18n.getMessage("fragmentBtnLabel")).appendTo(actionBtn); //No i18n
        $("#fragmentcancelbutton").hover(function(){$("#fragmentcancelbutton").css({"background": "#e3e3e3","border": "1px solid #e3e3e3"})}, function(){$("#fragmentcancelbutton").css({"background-color":"#d6d6d6","border": "1px solid #d6d6d6"})});//No i18n
        captureBtn.hover(function(){captureBtn.css({"background": "#27ca62","border": "1px solid #27ca62"})}, function(){captureBtn.css({"background-color":"#24bd5d","border": "1px solid #24bd5d"})});//No i18n
        captureBtn.off("mousedown").on("mousedown", function(){ //No i18n
            zalertDialogWrapper.remove();
            zalertDialog.remove();

            //removeIf(!chrome)
            chrome.runtime.sendMessage({
                "value": "initiatePartial" //No i18n
            });
            //endRemoveIf(!chrome)

            });
        $("#fragmentcancelbutton").off("mousedown").on("mousedown", function(){ //No i18n
            zalertDialogWrapper.remove();
            zalertDialog.remove();
        });
        $("body").off("keydown").on("keydown", function(event) {    //No i18n
            if (event.keyCode === 27) {
                zalertDialogWrapper.remove();
                zalertDialog.remove();
                cancelPartialScreen();
                event.stopPropagation();
            }
        });
    }
    function applyFragmentContCss(){
      $("#zfragment-selectorTop, #zfragment-selectorBottom").css({  //No i18n
            "background": "#11bf58",    //No i18n
            "height": "2px",    //No i18n
            "position": "fixed",    //No i18n
            "z-index": "2147483647",    //No i18n
            "box-shadow": "rgba(255, 255, 255, 0.4) 0px 0px 15px",  //No i18n
            "transition": "all 200ms ease"  //No i18n
      });
      $("#zfragment-selectorLeft, #zfragment-selectorRight").css({  //No i18n
            "background": "#11bf58",    //No i18n
            "width": "2px", //No i18n
            "position": "fixed",    //No i18n
            "z-index": "2147483647",    //No i18n
            "box-shadow": "rgba(255, 255, 255, 0.4) 0px 0px 15px",  //No i18n
            "transition": "all 200ms ease"  //No i18n
      });
    }
}

function cancelPartialScreen() {
    //removeIf(!chrome)
    chrome.runtime.sendMessage({
      action: 1027, //IPC_ACTION.PARTIAL_CAPTURE
      data : undefined
    });
    //endRemoveIf(!chrome)
  
    }