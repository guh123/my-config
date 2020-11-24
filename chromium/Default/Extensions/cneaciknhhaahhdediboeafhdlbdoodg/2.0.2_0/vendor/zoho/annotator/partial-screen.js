/* $Id$ */
var zannotator__partialScreen = { 
  body: {},
  drawn: false,
  ctrlPoints: {}
};
$(window).off("blur.ze").off("focus.ze");

//removeIf(!chrome)
chrome.runtime.sendMessage({
  value: "visibilityChange"//No i18n
});
//endRemoveIf(!chrome)

var styleNode           = document.createElement("style");
styleNode.type          = "text/css";
styleNode.textContent   = "@font-face { font-family: Lato; src: url('htt"+"ps://webfonts.zohostatic.com/latoregular/font.woff2'); }";//No i18n
document.head.appendChild(styleNode);
var styleNode           = document.createElement("style");
styleNode.type          = "text/css";
styleNode.textContent   = "@font-face {font-family: Lato; src: url('" + extension.getURL("/font/Lato.woff2") +"');}";    //No I18N
document.head.appendChild(styleNode);
if(window.zdelayedCature){
    stopDelayedCapture();
}
if(window.zcaptureFragment){
    removeFragmentCapture();
}
createContainer();
createButton();
getOrginalValues();
setCssProperty();
createControlPoints();
initEvent();
touchInit();
function createContainer() {
  $("#zannotator__partialScreen").remove();
  var div = $("<div/>", {
    id: "zannotator__partialScreen",//No i18n
    class: "zannotator__partialScreen"//No i18n
  }).css({
    "z-index": "2147483647",//No i18n
    width: "100%",
    height: "100%",
    position: "fixed",//No i18n
    top: "0px",//No i18n
    left: "0px",//No i18n
    bottom: "0px",//No i18n
    right: "0px",//No i18n
    "border-radius": "0px",//No i18n
    background:"none",//No i18n
    opacity:1,
    cursor: "crosshair",//No i18n
    overflow: "hidden",//No i18n
    "box-shadow": "none",//No i18n
    transform: "none"//No i18n
  });
  var topDiv = $("<div/>", {
    id: "zannotator__partial--top",//No i18n
    class: "zannotator__partial--inner"//No i18n
  }).css({
    width: "100%",
    top: "0px",//No i18n
    "background-color": " rgba(0, 0, 0, 0.4)"//No i18n
    //cursor:"default"//No i18n
  });
  var leftDiv = $("<div/>", {
    id: "zannotator__partial--left",//No i18n
    class: "zannotator__partial--inner"//No i18n
  }).css({ 
    left: "0px",//No i18n
    "background-color": " rgba(0, 0, 0, 0.4)"//No i18n
    //cursor:"default"
  });
  var rightDiv = $("<div/>", {
    id: "zannotator__partial--right",//No i18n
    class: "zannotator__partial--inner"//No i18n
  }).css({
    position: " absolute",//No i18n
    "background-color": " rgba(0, 0, 0, 0.4)",//No i18n
    width: "100%"//No i18n
    //cursor:"default"//No i18n
  });
  var bottomtDiv = $("<div/>", {
    id: "zannotator__partial--bottom",//No i18n
    class: "zannotator__partial--inner"//No i18n
  }).css({
    width: "100%",
    height: "100%",
    "background-color": " rgba(0, 0, 0, 0.4)",//No i18n
    position: "absolute"//No i18n
    //cursor:"crosshair"//No i18n
  });
  $("body").append(div);
  var centerDiv = $("<div/>", {
    id: "zannotator__partial--main",//No i18n
    class: "zannotator__partial--inner"//No i18n
  }).css({ position: "absolute", cursor: "move", border: "1px dashed black" });//No i18n
  $(div).append(topDiv).append(leftDiv).append(rightDiv).append(bottomtDiv);
  $(centerDiv).clone().attr({id: "zannotator__partial--main2"}).css({ border: "1px solid white" }).appendTo(div);//No i18n
  $(div).append(centerDiv);
}
function getOrginalValues() {
  zannotator__partialScreen.body.overflow = $("body").css("overflow");
  zannotator__partialScreen.body.cursor = $("body").css("cursor");
}
function setCssProperty() {
  //$("body").css("overflow", "hidden");
  $("#zannotator__partialScreen").css("overflow", "hidden");
  $("body").css("cursor", "crosshair");
}
function resetCssValues() {
  $("#zannotator__partialScreen").remove();
  $("#zannotator__extension").remove(); 
  $("body").css({
    cursor: zannotator__partialScreen.body.cursor,
    overflow: zannotator__partialScreen.body.overflow
  });
}
function initEvent() {
  document.activeElement.blur();
  var zannotate = {};
  $("#zannotator__partialScreen").on("mousedown", function(event) {
      if(event.which===3){
        return;
      }
      if (event.target.className !== "zannotator__ctrl--btn") {
        $(".zannotator__ctrl--btn").css({ visibility: "hidden" });
      }
      zannotator__partialScreen.mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      if (event.target.className === "zannotator__controlPoints") {   
        zannotator__partialScreen.ctrlPoints = {
          r: event.target.id.substr(event.target.id.length - 3, 1),
          c: event.target.id.substr(event.target.id.length - 1, 1)
        };
        zannotator__partialScreen.ctrlPoints.mousedown = true;
      } else if (zannotator__partialScreen.drawn === false) {
        zannotator__partialScreen.mousedown = true;
        zannotator__partialScreen.mouseDownPosition = {
          x: event.clientX,
          y: event.clientY
        };
      } else if (event.target.className === "zannotator__partial--inner") {
        zannotator__partialScreen.innerMouseDown = true;    
      }
  }).on("mouseup", function(event) {
      /*if (zannotator__partialScreen.mousemove == true) {
        UpdateControlPoints({
          x1: zannotator__partialScreen.mouseDownPosition.x,
          y1: zannotator__partialScreen.mouseDownPosition.y,
          x2: event.clientX,
          y2: event.clientY
        });
      }*/
      if (zannotator__partialScreen.mousedown === true) {
        $(".zannotator__controlPoints").css({ visibility: "visible" });
      }
      $(".zannotator__partial--inner").css("cursor","default");
      $("#zannotator__partial--main").css("cursor","move");
      updateButonPosition(zannotator__partialScreen.currentPosition);
      zannotator__partialScreen.ctrlPoints.mousedown = false;
      zannotator__partialScreen.mousedown = false;
      zannotator__partialScreen.mousemove = false;
      zannotator__partialScreen.innerMouseDown = false;
  }).on("mousemove", function(event) {
      mouseWinPos(event);
      /*if (zannotator__partialScreen.mousedown === true) {
        zannotator__partialScreen.drawn = zannotator__partialScreen.mousemove = true;
        modifyBorderValues({
          x1: zannotator__partialScreen.mouseDownPosition.x,
          y1: zannotator__partialScreen.mouseDownPosition.y,
          x2: event.clientX,
          y2: event.clientY
        });
      } else if (zannotator__partialScreen.ctrlPoints.mousedown === true) {
        resizeBorderValues(event);
        modifyBorderValues(zannotator__partialScreen.currentPosition);
        //UpdateControlPoints(zannotator__partialScreen.currentPosition);
      } else if (zannotator__partialScreen.innerMouseDown === true) {
        moveBorderValues(event);
        modifyBorderValues(zannotator__partialScreen.currentPosition);
        //UpdateControlPoints(zannotator__partialScreen.currentPosition);
      }*/
  });
  $("body").keydown(function(event) {
    if (event.keyCode === 27) {
      resetCssValues();
      event.stopPropagation();
      cancelPartialScreen();
    }
  });
   $(window).mouseup(function(){
    if(zannotator__partialScreen.mousemove === true){
      $("#zannotator__partialScreen").mouseup();
    } 
  }).on("mousemove", function(event) {
      mouseWinPos(event);
  });
}
function mouseWinPos(event){
    if (zannotator__partialScreen.mousedown === true) {
      zannotator__partialScreen.drawn = zannotator__partialScreen.mousemove = true;
      modifyBorderValues({
        x1: zannotator__partialScreen.mouseDownPosition.x,
        y1: zannotator__partialScreen.mouseDownPosition.y,
        x2: event.clientX,
        y2: event.clientY
      });
    } else if(zannotator__partialScreen.ctrlPoints.mousedown === true) {
      resizeBorderValues(event);
      modifyBorderValues(zannotator__partialScreen.currentPosition,{x2:event.clientX, y2: event.clientY});
    } else if(zannotator__partialScreen.innerMouseDown === true) {
      moveBorderValues(event);
      modifyBorderValues(zannotator__partialScreen.currentPosition);
    }
}
function touchInit(){
    var editorSVG=document.getElementById("zannotator__partialScreen");
    editorSVG.addEventListener("touchstart", touchHandler, true);
    editorSVG.addEventListener("touchmove", touchHandler, true);
    editorSVG.addEventListener("touchend", touchHandler, true);
    editorSVG.addEventListener("touchcancel", touchHandler, true);
}
function touchHandler(event){
    var touches = event.changedTouches,
    first = touches[0],
    type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");//No i18n
    simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
function sendMessageForScreenCapture() {
  resetCssValues();
  modifyBorderValues(zannotator__partialScreen.currentPosition);
  zannotator__partialScreen.currentPosition.width = $(window).width();
  zannotator__partialScreen.currentPosition.height = $(window).height();
  $("#zannotator__partialScreen").remove();
  setTimeout(function() {

    //removeIf(!chrome)
    chrome.runtime.sendMessage({
      action: 1027, //IPC_ACTION.PARTIAL_CAPTURE
      data : {
        positionValues: zannotator__partialScreen.currentPosition,
        pixRatio: window.devicePixelRatio
      }
    });
    //endRemoveIf(!chrome)

    }, 100);
}
function resetToOrginalValues() { 
}
function modifyBorderValues(position,pos) {
  /*New code for partial drag*/
  if(position.x2 <= 0){
    position.x2 = 0;
  } else if(position.x2 >= $(window).width() || (pos !== undefined && pos.x2 >= $(window).width())){
    position.x2 = $(window).width();
  } else if(position.x1 <= 0 || (pos !== undefined && pos.x2 <= 0)){
    position.x1 = 0;
  }
  if(position.y2 <= 0){
    position.y2 = 0;
  } else if(position.y2 >= $(window).height() || (pos !== undefined && pos.y2 >= $(window).height())){
    position.y2 = $(window).height();
  } else if(position.y1 <= 0 || (pos !== undefined && pos.y2 <= 0)){
    position.y1 = 0;
  }
  /*************************/
  if (position.x1 > position.x2) {
    var temp = position.x1;
    position.x1 = position.x2;
    position.x2 = temp;
  }
  if (position.y1 > position.y2) {
    var temp = position.y1;
    position.y1 = position.y2;
    position.y2 = temp;
  }
  zannotator__partialScreen.currentPosition = position;
  $("#zannotator__partial--top").css({ height: position.y1 });
  $("#zannotator__partial--left").css({
    height: position.y2 - position.y1,
    top: position.y1,
    width: position.x1
  });
  $("#zannotator__partial--right").css({
    height: position.y2 - position.y1,
    top: position.y1,
    left: position.x2
  });
  $("#zannotator__partial--bottom").css({ top: position.y2});
  $("#zannotator__partial--main, #zannotator__partial--main2").css({
    top: position.y1,
    left: position.x1,
    width: position.x2 - position.x1-2,
    height: position.y2 - position.y1-2
  });
}
function createControlPoints() {
  var row, col, div;
  var container = $("#zannotator__partialScreen");
  for (row = 1; row <= 3; row++) {
    for (col = 1; col <= 3; col++) {
      if (row == 2 && col == 2) {
        continue;
      }
      div = $("<div/>", {
        id: "zannotator__controlPoints--r" + row + "c" + col,//No i18n
        class: "zannotator__controlPoints"//No i18n
      });
      $("#zannotator__partial--main").append(div);
    }
  }
  $("#zannotator__controlPoints--r1c1").css({left: -7, top: -7, cursor: "nwse-resize"});//No i18n
  $("#zannotator__controlPoints--r3c1").css({left: -7, bottom: -7, cursor: "nesw-resize"});//No i18n
  $("#zannotator__controlPoints--r2c1").css({top: "calc(50% - 6px)", left: -7, cursor: "ew-resize"});//No i18n
  $("#zannotator__controlPoints--r1c2").css({left: "calc(50% - 6px)", top: -7, cursor: "ns-resize"});//No i18n
  $("#zannotator__controlPoints--r3c3").css({right: -7, bottom: -7, cursor: "nwse-resize"});//No i18n
  $("#zannotator__controlPoints--r1c3").css({right: -7, top: -7, cursor: "nesw-resize"});//No i18n
  $("#zannotator__controlPoints--r2c3").css({top: "calc(50% - 6px)", right: -7, cursor: "ew-resize"});//No i18n
  $("#zannotator__controlPoints--r3c2").css({left: "calc(50% - 6px)", bottom: -7, cursor: "ns-resize"});//No i18n
  $(".zannotator__controlPoints").css({
      width: "8px",                       //No i18n
      height: "8px",                      //No i18n
      border: "2px solid black",          //No i18n
      position: "absolute",               //No i18n
      "border-radius": "100%",            //No i18n
      visibility: "hidden",               //No i18n
      "background-color": "white",        //No i18n
      "-webkit-box-sizing": "initial",    //No i18n
      "box-sizing": "initial"             //No i18n
  });
}
/*function UpdateControlPoints(position) {
  $("#zannotator__controlPoints--r1c1").css({
    top: position.y1 - 6,
    left: position.x1 - 5
  });
  $("#zannotator__controlPoints--r1c2").css({
    top: position.y1 - 6,
    left: position.x1 + (position.x2 - position.x1) / 2 - 4
  });
  $("#zannotator__controlPoints--r1c3").css({
    top: position.y1 - 6,
    left: position.x2 - 6
  });
  $("#zannotator__controlPoints--r2c1").css({
    top: position.y1 + (position.y2 - position.y1) / 2 - 6,
    left: position.x1 - 5
  });
  $("#zannotator__controlPoints--r2c3").css({
    top: position.y1 + (position.y2 - position.y1) / 2 - 6,
    left: position.x2 - 6
  });
  $("#zannotator__controlPoints--r3c1").css({
    top: position.y2 - 6,
    left: position.x1 - 5
  });
  $("#zannotator__controlPoints--r3c3").css({
    top: position.y2 - 6,
    left: position.x2 - 6
  });
  $("#zannotator__controlPoints--r3c2").css({
    top: position.y2 - 6,
    left: position.x1 + (position.x2 - position.x1) / 2
  });
}*/
function moveBorderValues(event) {
  var changeInX, changeInY;
  changeInX = event.clientX - zannotator__partialScreen.mousePosition.x;
  changeInY = event.clientY - zannotator__partialScreen.mousePosition.y;
  zannotator__partialScreen.mousePosition.x = event.clientX;
  zannotator__partialScreen.mousePosition.y = event.clientY;
  if(zannotator__partialScreen.currentPosition.y2 + changeInY > $(window).height() && changeInY > 0) {
    zannotator__partialScreen.currentPosition.y2 -= changeInY;
    zannotator__partialScreen.currentPosition.y1 -= changeInY;
  }
  if(zannotator__partialScreen.currentPosition.x2 + changeInX > $(window).width() && changeInX > 0) {
    zannotator__partialScreen.currentPosition.x2 -= changeInX;
    zannotator__partialScreen.currentPosition.x1 -= changeInX;
  }
  if(zannotator__partialScreen.currentPosition.x1 + changeInX < 0) {
    zannotator__partialScreen.currentPosition.x1 = 0;
    zannotator__partialScreen.currentPosition.x1 -= changeInX;
    zannotator__partialScreen.currentPosition.x2 -= changeInX;
  }
  if(zannotator__partialScreen.currentPosition.y1 + changeInY < 0) {
    zannotator__partialScreen.currentPosition.y1 = 0;
    zannotator__partialScreen.currentPosition.y1 -= changeInY;
    zannotator__partialScreen.currentPosition.y2 -= changeInY;
  }
  zannotator__partialScreen.currentPosition.x1 += changeInX;
  zannotator__partialScreen.currentPosition.y1 += changeInY;
  zannotator__partialScreen.currentPosition.y2 += changeInY;
  zannotator__partialScreen.currentPosition.x2 += changeInX;
}
function resizeBorderValues(event) {
  var changeInX, changeInY;
  zannotator__partialScreen.mousemove = true;
  changeInX = event.clientX - zannotator__partialScreen.mousePosition.x;
  changeInY = event.clientY - zannotator__partialScreen.mousePosition.y;
  zannotator__partialScreen.mousePosition.x = event.clientX;
  zannotator__partialScreen.mousePosition.y = event.clientY;
  if (changeInY !== 0) {
    if (zannotator__partialScreen.ctrlPoints.r == 1) {
      zannotator__partialScreen.currentPosition.y1 += changeInY;
    } else if (zannotator__partialScreen.ctrlPoints.r == 3) {
      zannotator__partialScreen.currentPosition.y2 += changeInY;
    }
    if(zannotator__partialScreen.currentPosition.y1 - zannotator__partialScreen.currentPosition.y2 > 0) {
      if (zannotator__partialScreen.ctrlPoints.r == 1) {
        zannotator__partialScreen.ctrlPoints.r = 3;
      } else {
        zannotator__partialScreen.ctrlPoints.r = 1;
      }
    }
  }
  if (changeInX !== 0) {
    if (zannotator__partialScreen.ctrlPoints.c == 1) {
      zannotator__partialScreen.currentPosition.x1 += changeInX;
    } else if (zannotator__partialScreen.ctrlPoints.c == 3) {
      zannotator__partialScreen.currentPosition.x2 += changeInX;
    }
    if(zannotator__partialScreen.currentPosition.x1 - zannotator__partialScreen.currentPosition.x2 > 0) {
      if (zannotator__partialScreen.ctrlPoints.c == 1) {
        zannotator__partialScreen.ctrlPoints.c = 3;
      } else {
        zannotator__partialScreen.ctrlPoints.c = 1;
      }
    }
  }
}
function createButton() {
  var svgElement = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "svg");  //No i18n
  var symbol = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "symbol"); //No i18n
  $(symbol).attr({
    id: "zannotaor__svgSymbol--cancel"  //No i18n
  });
  symbol.setAttribute("viewBox","0 0 15 15"); //No i18n
  var pathElement = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "path");  //No i18n
  $(pathElement).attr("d","M8.9,7.5l5.8-5.8c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L7.5,6.1L1.7,0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.8,5.8l-5.8,5.8c-0.4,0.4-0.4,1,0,1.4C0.5,14.9,0.7,15,1,15s0.5-0.1,0.7-0.3l5.8-5.8l5.8,5.8c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L8.9,7.5z");//No i18n
  $(symbol).append(pathElement);
  $(svgElement).append(symbol);
  $(svgElement).attr({"id":"zannotator__extension", "style":"display: none;"}); //No I18N
  $("body").append(svgElement);
  var div = $("<div/>", {
    id: "zannotator__capture--btn", //No i18n
    class: "zannotator__ctrl--btn"  //No i18n
  });
  var i = $("<span/>", {
      class: "zannotator__capture--svgIcon",  //No i18n
      width: "34px",  //No i18n
      height: "28px"  //No i18n
  }).css({ 
      width: "34px",            //No i18n
      height: "28px",           //No i18n
      left: "24px",             //No i18n
      position: "relative",     //No i18n
      top: "13px",float:"left"  //No i18n
  });
  var svg = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "svg"); //No i18n
  $(svg).attr({ width: "34px", height: "27px", fill: "#5fffae","id":"zannotator__camera--svgIcon"});
  var element = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "path");  //No i18n
  element.setAttribute("d","M20.7,2c0.3,0,0.6,0.2,0.7,0.3l0.8,2.3L22.6,6H24h6c1.1,0,2,0.9,2,2v15c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h6h1.4l0.5-1.4l0.8-2.3C12.7,2.2,13,2,13.3,2H20.7 M20.7,0h-7.3c-1.1,0-2.2,0.7-2.6,1.7L10,4H4C1.8,4,0,5.8,0,8v15c0,2.2,1.8,4,4,4h26c2.2,0,4-1.8,4-4V8c0-2.2-1.8-4-4-4h-6l-0.8-2.3C22.9,0.7,21.8,0,20.7,0L20.7,0z M17,9.3c3.1,0,5.7,2.6,5.7,5.7s-2.6,5.7-5.7,5.7s-5.7-2.6-5.7-5.7S13.9,9.3,17,9.3 M17,8c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S20.9,8,17,8L17,8z M5.5,8C4.7,8,4,8.7,4,9.5S4.7,11,5.5,11S7,10.3,7,9.5S6.3,8,5.5,8L5.5,8z");//No i18n
  $(svg).append(element);
  $(i).append(svg);
  $(div).append(i);  
  $(div).append("<span id='zannotator__capture--text'></span>");
  $("#zannotator__partialScreen").append(div);
  $("#zannotator__capture--text").css({
      position: "relative",     //No i18n
      top: "18px",              //No i18n
      "font-size": "17px",      //No i18n
      left: "4px"               //No i18n
  }).text(i18n.getMessage("Capture")); //No i18n
  var div = $("<button/>", {
    id: "zannotator__cancel--btn",  //No i18n
    class: "zannotator__ctrl--btn"  //No i18n
  });
  i = $("<i/>", {
      class: "zannotator__cancel--svgIcon",//No i18n
      width: "34px",//No i18n
      height: "28px"//No i18n
  }).css({
      width: "18px",//No i18n
      height: "18px",   //No i18n  
      left: "1px",//No i18n
      display: "inherit",//No i18n
      position: "relative",//No i18n
      top:"1px"//No i18n
  });
  $(div).append(i);
  svgElement = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "svg");//No i18n
  $(svgElement).attr({ id: "zannotator__svgCancel--icon", fill: "#E5614E",width:"18px","height":"18px" });//No i18n
  var use = document.createElementNS("htt"+"p://www.w3.org/2000/svg", "use");//No i18n
  use.setAttribute("href", "#zannotaor__svgSymbol--cancel");
  $(svgElement).append(use);
  $(i).append(svgElement);
  $("#zannotator__partialScreen").append(div);
  $(".zannotator__ctrl--btn").css({
      visibility: "hidden",//No i18n
      width: "70px",//No i18n
      height: "35px",//No i18n
      position: "absolute",//No i18n
      cursor: "pointer",//No i18n
      "user-select": "none",//No i18n
      color: "#FFF",//No i18n
      "border-color": "#4190F2"//No i18n
  });
  $("#zannotator__cancel--btn").css({
      "border-radius":"100%",//No i18n
      display: "block",//No i18n
      "font-family": "Lato, sans-serif",//No i18n
      "font-size": "13px",//No i18n
      "font-style": "normal",//No i18n
      width:"54px",//No i18n
      height:"54px",//No i18n
      "line-height":"1.2",//No i18n
      left: "-7px",//No i18n
      position: "absolute",//No i18n
      top: "-7px",//No i18n
      border:"none",//No i18n
      "box-shadow": "0px 0px 15px rgba(255, 255, 255, 0.4)",//No i18n
      "z-index": "1000",//No i18n
      background:"rgba(0,0,0,0.8) !important"//No i18n
  });
  $("#zannotator__capture--btn").css({
      "border-radius": "27px",//No i18n
      // "box-shadow": "rgba(255, 255, 255, 0.4) 0px 0px 15px 0px",//No i18n
      "box-shadow": "0px 0px 15px rgba(255, 255, 255, 0.4)",//No i18n
      "box-sizing": "content-box",//No i18n
      cursor: "pointer",//No i18n
      display: "block",//No i18n
      "font-family": "Lato, sans-serif",//No i18n
      "font-size": "13px",//No i18n
      "font-style": "normal",//No i18n
      height: "54px",//No i18n
      left: "62px",//No i18n
      margin: "0px 0px 0px 0px",//No i18n
      position: "absolute",//No i18n
      "text-align": "center",//No i18n
      top: "3px",//No i18n
      width: "150px",//No i18n
      padding: "0px 0px 0px 0px",//No i18n
      border: "0px",//No i18n
      background:"rgba(0,0,0,0.8) !important"//No i18n
  });
  $("#zannotator__capture--btn").on("click mousedown", function(event) {
      sendMessageForScreenCapture();  event.preventDefault();
      event.stopPropagation();
  });
  $("#zannotator__cancel--btn").on("click mousedown", function(event) {
      resetCssValues();  event.preventDefault();
      event.stopPropagation();
      cancelPartialScreen();
  });
  $("#zannotator__cancel--btn, #zannotator__capture--btn").on("mousedown",function(event){
      event.preventDefault();
      event.stopPropagation();
  });
  $("#zannotator__partialScreen").on("click mousedown mouseup",function(event){
      event.preventDefault();
      event.stopPropagation();
  });
  applyCssValues();
}
function updateButonPosition(position) {
  var left,
  top = ((position.y2-position.y1)/2)+position.y1;
  left =(( position.x2-position.x1)/2)+position.x1;
  var buttonHeight=0;
  if(position.x2-position.x1<260){
    top=position.y2+37;
  }
  if(position.y2-position.y1<80){
    top=position.y2+37;
  }
  if(top+64>$(window).height()){
    top=position.y1-37;
  }
  if(left<107){
    left=107;
  }
  if(left+107>$(window).width()){
    left=$(window).width()-107;
  }
  if(top<0){
    top=position.y2+37;
  }
  if(top>$(window).height()){
    top=((position.y2-position.y1)/2)+position.y1;
    if($(window).width()-position.x2>200){
      left=position.x2+120;
    }else if(position.x1>220){
      left=position.x1-120;
    }else {
      left=(position.x2-position.x1)/2+position.x1;
    }
  }
  $("#zannotator__capture--btn").css({
    top: top-27,
    left: left -107
  });
  $("#zannotator__cancel--btn").css({
    top: top-27,
    left: left + 53
  });
  $(".zannotator__ctrl--btn").css({ visibility: "visible" });
}
function applyCssValues(){
  $("#zannotator__cancel--btn").css({
      "box-sizing": "border-box",//No i18n
      "min-width": "54px",//No i18n
      background:"rgba(0, 0, 0, 0.8) !important"//No i18n
  });
  $(".zannotator__partialScreen").css({
      margin:"0px 0px 0px 0px",//No i18n
      padding:"0px 0px 0px 0px",//No i18n
      position:"fixed",//No i18n
      "box-sizing":"border-box",//No i18n
      "z-index": "2147483647",//No i18n
      top: "0px",//No i18n
      left: "0px",//No i18n
      bottom:"0px",//No i18n
      right: "0px",//No i18n
      display:"block",//No i18n
      "animation-delay":"0s",//No i18n
      border:"none",//No i18n
      clear:"none",//No i18n
      float:"none", //No i18n
      "min-width":"0px",//No i18n
      "min-height":"0px"//No i18n
  });
  $(".zannotator__ctrl--btn").css({
      margin:"0px 0px 0px 0px",//No i18n
      border:"none",//No i18n
      padding:"7px 17px 7px 17px",//No i18n
      "box-sizing":"border-box",//No i18n
      position:"absolute",//No i18n
      "font-family": "Lato, sans-serif",//No i18n
      "font-size": "13px",//No i18n
      "font-style": "normal",//No i18n
      "min-width":"0px",//No i18n
      "min-height":"0px",//No i18n
      "transition": "none",//No i18n
      "-webkit-transition":"none",//No i18n
      "background": "rgba(0, 0, 0, 0.8)"//No i18n
  });
  $("#zannotator__capture--btn").css({
      padding:"0px"//No i18n
  })
  $(".zannotator__controlPoints").css({
      position:"absolute",//No i18n
      "border-radius": "100%",//No i18n
      border:"2px solid black",//No i18n
      "box-sizing":"content-box",//No i18n
      "display":"block"//No i18n
  });
  $(".zannotator__partial--inner").css({
      position:"absolute",//No i18n
      "background-color":"rgba(0, 0, 0, 0.4)",//No i18n
      display:"block",//No i18n
      "box-sizing":"content-box",//No i18n
      border:"none",//No i18n
      clear:"none"//No i18n
  });
  $("#zannotator__capture--text").css({
      position: "relative",//No i18n
      top: "17px",//No i18n
      "font-size": "17px",//No i18n
      left: "4px",//No i18n
      "box-sizing":"content-box",//No i18n
      "font-family": "Lato, sans-serif",//No i18n
      "font-style": "normal",//No i18n
      "margin": "0px",//No i18n
      "text-align": "center",//No i18n
      padding:"0px",//No i18n
      "line-height": 1.3//No i18n
  });
  $("#zannotator__capture--svgIcon").css({
      margin:"0px",//No i18n
      padding:"0px",//No i18n
      border:"none",//No i18n
      float:"left",//No i18n
      width: "34px",//No i18n
      height: "28px",//No i18n
      left: "24px",//No i18n
      position: "relative",//No i18n
      top: "13px",//No i18n
      float: "left",//No i18n
      "text-align": "center",//No i18n
      "box-sizing":"content-box",//No i18n
      "cursor": "pointer",//No i18n
      "user-select": "none",//No i18n
      color: "rgb(255, 255, 255)",//No i18n
      "word-wrap": "normal"//No i18n
  });
  $("#zannotator__camera--svgIcon").css({
      width: "34px",//No i18n
      height: "27px",//No i18n
      fill: "rgb(95, 255, 174)",//No i18n
      margin:"0px",//No i18n
      padding:"0px",//No i18n
      border:"none",//No i18n
      "box-sizing":"content-box"//No i18n
  });
  $("#zannotator__cancel--btn").css({
      "min-width":"54px",//No i18n
      "min-height":"54px"//No i18n
  });
  $("#zannotator__partial--main2").css({
      "box-sizing":"content-box",//No i18n
      background:"transparent",//No i18n
      border:"1px solid white"//No i18n
  });
  $("#zannotator__partial--main").css({
      "box-sizing":"content-box",//No i18n
      background:"transparent",//No i18n
      border: "1px dashed black" //No i18n
  });
}

function cancelPartialScreen() {
  //removeIf(!chrome)
  chrome.runtime.sendMessage({
    action: 1027, //IPC_ACTION.PARTIAL_CAPTURE
    data : undefined
  });
  //endRemoveIf(!chrome)

  }