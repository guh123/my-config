window.addEventListener("removeComponentByName", (event) => {
    if(event && event.detail) {
        var componentName = event.detail.componentName;
        var componentToRemove = document.querySelector(componentName);
        if(!componentToRemove) {
            return;
        }
        var parentDiv = componentToRemove.parentElement;
        if(!parentDiv) {
            return;
        }
        parentDiv.removeChild(componentToRemove);
    }
});

window.addEventListener("removeComponent", (event) => {
    if(event && event.detail) {
        var componentToRemove = event.detail.component;
        if(!componentToRemove) {
            return;
        }
        var parentDiv = componentToRemove.parentElement;
        if(!parentDiv) {
            return;
        }
        parentDiv.removeChild(componentToRemove);
    }
});

window.addEventListener("addComponent", (event) => {
    if(event && event.detail) {
        var detail = event.detail;
        var componentName = detail.componentName;
        var parentElement = detail.parentElement;
        var fileName = detail.fileName;

        if(!parentElement || !componentName) {
            return;
        }

        var newComponent = document.createElement(componentName);

        if(detail.attributes) {
            for(const key in detail.attributes) {
                if(detail.attributes.hasOwnProperty(key)) {
                    const value = detail.attributes[key];
                    newComponent.setAttribute(key, value);
                }
            }
        }
        parentElement.appendChild(newComponent);
    }
});

var currentTab = undefined;
var currentTabId = undefined;

//removeIf(!chrome)
chrome.runtime.sendMessage({
    action: 1034
}, (tab) => {
    currentTab = tab;
    currentTabId = tab.id;
});
//endRemoveIf(!chrome)

let eventMethod = window.addEventListener
			? "addEventListener" //NO I18N
			: "attachEvent"; //NO I18N
let eventer = window[eventMethod];
let messageEvent = eventMethod === "attachEvent" //NO I18N
    ? "onmessage" //NO I18N
    : "message"; //NO I18N

let fileMap = {

};

document.onkeydown = function(event) {
    if(event.keyCode === 27) { 
        //ESC KEY
        parent.postMessage({
            action : "closeApp" //NO I18N
        }, "*"); //NO I18N
    }
}