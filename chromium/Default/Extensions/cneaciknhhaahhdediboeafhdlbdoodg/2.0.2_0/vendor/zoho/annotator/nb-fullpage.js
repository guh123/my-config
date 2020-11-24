/* $Id$ */
(function () {
    var base = this;
    if(initialScroll === 0){
        var docH, body=document.body, html=document.documentElement;
        docH = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        if(docH/window.innerHeight <= 1){
            runtime.sendMessage({
                action: 1038, //No i18n
                step: "noscrollCapture"    //No i
            });
        }else{
            window.scrollTo(0, 0);
            setTimeout(function(){
                runtime.sendMessage({
                    action: 1038, //No i18n
                    step: "scrollAndCapture"    //No i18n
                });
            },100);
            this._overflowPro = document.getElementsByTagName("body")[0].style.overflow;    //No i18n
            $('body').css("overflow","hidden"); //No i18n
            this._totalH = 0,this._documentH=docH,this._isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1, this._isEdge = navigator.userAgent.toLowerCase().indexOf('Edge') > -1; //No i18n
        }
    } else if(initialScroll === 1){
        scrollAndCapture();
    } else{
        mergeImage(initialScroll);
    }
    $("body").keydown(function(event) {
        if (event.keyCode === 27) {
            $('body').css("overflow",base._overflowPro);   //No i18n
            setEleDefaultPosition();    //No i18n
            runtime.sendMessage({
                action: 1038,
                step: "cancelCapture"  //No i18n
            });
        }
    });
    window.addEventListener("visibilitychange", function() {  //No i18n
       $('body').css("overflow",base._overflowPro);    //No i18n
        setEleDefaultPosition();    //No i18n
        runtime.sendMessage({
            action: 1038,
            step: "cancelCapture"  //No i18n
        });
    });
})();
function scrollAndCapture(){
    var base = this;
    var visiblePageH = window.innerHeight;
    var docH, body=document.body, html=document.documentElement;
    docH = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    if(this._isFirefox){
        this._documentH = (this._documentH>22528) ? 22528 : this._documentH;
    } else if(this._isEdge){
        this._documentH = (this._documentH>8192) ? 8192 : this._documentH;
    } else{
        this._documentH = (this._documentH>16384) ? 16384 : this._documentH;
    }
    var top  = document.documentElement.scrollTop || window.scrollY || window.pageYOffset || document.scrollingElement.scrollTop;
    top = Math.ceil(top);
    var scrollVal = top + visiblePageH;
    this._totalH = this._totalH + visiblePageH;
    window.scrollTo(0, scrollVal);
    var topAfterScroll = document.documentElement.scrollTop || window.scrollY || window.pageYOffset || document.scrollingElement.scrollTop;
    if(topAfterScroll <= 0){
        runtime.sendMessage({
            action: 1038
        });
        $('body').css("overflow",base._overflowPro);   //No i18n
        setEleDefaultPosition(); //No i18n
    } else{
        setTimeout(function(){
            changeFixedElePos();
            setTimeout(function(){
                if(scrollVal < base._documentH && scrollVal < docH){
                    runtime.sendMessage({
                        action: 1038,
                      step: "scrollAndCapture"  //No i18n
                    });  
                } else{
                    runtime.sendMessage({
                        action: 1038,
                      step: "mergeScreenshots"  //No i18n
                    });
                    $('body').css("overflow",base._overflowPro);   //No i18n
                    setEleDefaultPosition(); //No i18n
                }
            }, 200);
        }, 100);
    }
};
function setEleDefaultPosition(){
    var elements = document.getElementsByClassName("zannotator__resetPosition");    //No i18n
    $(elements).removeClass("zannotator__resetPosition");
}
function changeFixedElePos(){
    var allElems = document.body.getElementsByTagName("*");
    for (var i=0;i<allElems.length;i++) {
        var elePos = window.getComputedStyle(allElems[i],null).getPropertyValue('position');
        if(elePos === 'fixed' || elePos === 'sticky') {
            $(allElems[i]).addClass("zannotator__resetPosition");
        }
    }
}
function mergeImage(imageDetails){
    var canvas = $("<canvas/>", { id: "zannotator__canvas--fullpage" });    //No i18n
    $("body").append(canvas);
    canvas = document.getElementById("zannotator__canvas--fullpage");       //No i18n
    $(canvas).css("display","none");                                        //No i18n
    var getContext = () =>canvas.getContext('2d');                          //No i18n
    var i,drp=1,top=0;
    if(this._isFirefox){
        this._documentH = (this._documentH > 22528) ? 22528 : this._documentH;
    } else if(this._isEdge){
        this._documentH = (this._documentH>8192) ? 8192 : this._documentH;
    } else{
        this._documentH = (this._documentH > 16384) ? 16384 : this._documentH;
    }
    if(window.devicePixelRatio !== undefined && !this._isFirefox){
        drp = window.devicePixelRatio;
    }
    canvas.width=window.innerWidth * drp;
    canvas.height=this._documentH * drp;
    if(this._documentH * drp > 32767){
        canvas.height = 32767;
    }
    for(i = 0; i < imageDetails.length; i++){
        if(i===imageDetails.length-1 && this._totalH > this._documentH){
            cropImage(imageDetails[i],this._totalH);
        }
        else{
            drawOnCanvas(imageDetails[i]);
        }
    }
    function loadImage(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`load ${url} fail`));
            img.src = url;
        });
    };
    function drawOnCanvas(options, ht, last){
        var ctx = getContext();
        return loadImage(options).then(img => {
            if(last && drp === 2){
                top = top - ht;
            }
            ctx.drawImage(img, 0 , top, img.width, img.height);
            top = top + img.height;

        });
    };
    function cropImage(uri,currentHeight){
        var tempCanvas = $("<canvas/>").attr("id","zannotator__tempcanvas");
        $("body").append(tempCanvas);
        tempCanvas = document.getElementById("zannotator__tempcanvas");
        var context=tempCanvas.getContext('2d');    //No i18n
        $(tempCanvas).css('display','none')
        var ch = currentHeight - this._documentH;
        var img = new Image();
        img.src=uri;
        img.onload = function(){
            tempCanvas.height=img.height-ch;
            tempCanvas.width=img.width;
            context.drawImage(img,0,-ch,img.width,img.height);
            drawOnCanvas(tempCanvas.toDataURL(), ch, true);
            tempCanvas.remove();
        }
    };
    setTimeout(function(){
        var canvasUri=canvas.toDataURL();
        canvas.remove();
            runtime.sendMessage({
            action: 1038,
            step: "captureDone",  //No i18n
            canvasUri: canvasUri
        });
    },500);
};


