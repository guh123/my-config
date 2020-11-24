		/* $Id$ */
(function($){
	ZComponents.zdatetimepicker = {
		DEFAULTS: {
			"position": "auto",  // No I18N
			"format": "dd/MM/yyyy",  // No I18N
			"dateFormat": "dd/MM/yyyy",   // No I18N
			"displayType": "box",   // No I18N
			"type": "popup",   // No I18N
			"displayWeekNumbers": false,  // No I18N
			"weekHeading": "Week",  // No I18N
			"selectionType": "single",  // No I18N
			"selectionLimit": undefined,  // No I18N
			"monthToBeShownOnOpen": undefined, // No I18N
			"disabledTimeList": [],   // No I18N
			"selectedDateMonthViewIndex": undefined, // No I18N
			"navigationBar": {  // No I18N
				"monthSwitcher": true,   // No I18N
				"yearSwitcher": true,   // No I18N
				"monthYearHeadingFormat": "MMM yyyy",  // No I18N
				"monthYearSwitcherType": "drilldown",  // No I18N
				"monthFormatInSwitcher": "MMM",   // No I18N
				"navigationButtonsDisplayPattern" : "split", // No I18N
				"togetherTypeNavigationButtonsPosition": "right",  // No I18N
				"monthNavigationStep": 1,  // No I18N
				"yearNavigationStep": 1,   // No I18N
				"yearNavigationButtons": true,   // No I18N
				"monthNavigationButtons": true,   // No I18N
				"dropdownStartYear": "THIS_YEAR-10",   // No I18N
				"dropdownEndYear": "THIS_YEAR+10"   // No I18N
			},
			"clearButtonLabel": "Clear",  // No I18N
			"cancelButtonLabel": "Cancel",  // No I18N
			"OKButtonLabel": "OK",   // No I18N
			"todayButtonLabel": "Today",   // No I18N
			"todayButtonAction": "navigate-only",  // No I18N
			"displayAdjacentMonthDates": false,  // No I18N
			"allowSelectionOfAdjacentMonthDates": true,  // No I18N
			"hideCancelButton": false,  // No I18N
			"monthsPerView": 1,  // No I18N
			"immediateCommit": true,  // No I18N
			"value": undefined,   // No I18N
			"values": [],   // No I18N
			"specialDaysOfWeek": [],  // No I18N
			"disabledDaysOfWeek": [],   // No I18N
			"disabledDates": [],  // No I18N
			"specialDates": [],  // No I18N
			"weekendDays": "0,6",  // No I18N
			"title": undefined,   // No I18N
			"closeButton": false,   // No I18N		
			"closeOnDateSelect": true, // No I18N
			"closeOnBodyClick": true,   // No I18N
			"otherInputFormats": [],   // No I18N
			"todayButton": false,  // No I18N
			"todayButtonLabel": "Today",  // No I18N
			"timeMultipleSelectBoxType": "h-m-t",  // No I18N
			"fixedTimeOptions": [],   // No I18N
			"timeFieldType": "input",  // No I18N
			"timeLabelType": "icon",   // No I18N
			"timeLabel": "Time",    // No I18N
			"hourStep": 1,   // No I18N
			"minuteStep": 5,  // No I18N
			"locale": "en-US",    // No I18N
			"keys": {	// No I18N
				"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],	// No I18N
				"daysAbbreviated": ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"],	// No I18N
				"months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],	// No I18N
				"monthsAbbreviated": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],	// No I18N
				"close": "Close",  // No I18N
				"nextMonth": "Next Month",  // No I18N
				"nextYear": "Next Year",  // No I18N
				"prevMonth": "Last Month",  // No I18N
				"prevYear": "Last Year",  // No I18N
				"nextDecade": "Next Decade",  // No I18N
				"prevDecade": "Last Decade",  // No I18N
				"nextCentury": "Next Century",  // No I18N
				"prevCentury": "Last Century"  // No I18N
			}
		}	
	};
	var dateTimePickerPrototype = {
		eventPrefix: "zdatetimepicker",  // No I18N
		options: $.extend({}, ZComponents.zdatetimepicker.DEFAULTS),
 		_CONSTANTS: {
			"headingDateFormat": "MMMM yyyy",   // No I18N
			"displayType": "box",  // No I18N
			"monthYearSelectionMode": "none",   // No I18N
			"clearButtonPosition": "right",   // No I18N
			"OKButtonPosition": "right",   // No I18N
			"todayButtonPosition": "center",   // No I18N
			"cancelButtonPosition": "right",    // No I18N
			"calloutPosition": "bottom",  // No I18N
			"defaultDateFormat": "dd/MM/yyyy",  // No I18N
			"defaultButtonAlignment": "right"   // No I18N
		},
		_EVENTS: {
			"BEFOREFOCUS": "beforefocus",  // No I18N
			"BEFOREOPEN": "beforeopen", // No I18N
			"OPEN": "open", // No I18N
			"BEFORECLOSE": "beforeclose", // No I18N
			"CLOSE":"close",	// No I18N
			"DATESELECT": "dateselect",  // No I18N
			"TODAYBUTTONCLICK": "todaybuttonclick",  // No I18N
			"APPLY": "change",  // No I18N
			"CANCEL": "cancel",   // No I18N
			"RESET": "clear", // No I18N
			"BEFOREDRILLDOWN": "beforedrilldown", // No I18N
			"DRILLDOWN": "drilldown",  // No I18N
			"DATEMOUSEOVER": "datemouseover",  // No I18N
			"MONTHCHANGE": "monthchange",  // No I18N
			"YEARCHANGE": "yearchange",  // No I18N
			"DECADECHANGE": "decadechange",  // No I18N
			"HOURCHANGE": "hourchange",  // No I18N
			"MINUTECHANGE": "minutechange",  // No I18N
			"PERIODCHANGE": "periodchange",  // No I18N
			"BEFOREDATECELLRENDER": "beforedatecellrender",  // No I18N
			"TIMECHANGE": "timechange",	// No I18N
			"DRAGSTART": "dragstart", 	// No I18N
			"DRAG": "drag",  	// No I18N
			"DRAGEND": "dragend"  	// No I18N
		},
        _ANIMATIONEVENTS: "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend transitionend", // No I18N
		_EFFECTS: {  
			"slide" : { // No I18N
				"open" : "slideDown", // No I18N
				"close": "slideUp" // No I18N
			},
			"fade" : { // No I18N
				"open" : "fadeIn", // No I18N
				"close" : "fadeOut" // No I18N
			}
		},
		_create: function(element, options, userOptions){
			userOptions = $.extend(true, {}, userOptions, this.element.data());
			var locale = userOptions.locale || ZComponents.zdatetimepicker.DEFAULTS.locale || ZComponents.locale;
			userOptions && userOptions.navigationBar && (this._yearNavigation = userOptions.navigationBar.yearNavigationButtons);	
			userOptions && (this._isPositionModified = userOptions.position);
			this.options.locale = locale;
			if(this._yearNavigation == undefined && /^(drilldown|none)$/.test(this.options.navigationBar.monthYearSwitcherType)){
				this._yearNavigation = true;
			}
			this._rowsCount = [];
			var shouldInit = this._initialize(element, options);	
			shouldInit && this._hasDate && this._bindEvents();
		},
		_initialize: function(element, options, preventConstruct){		
			this._getValuesFromLocale();
        	this.options.position = this.options.position === "auto" ? (this.options.displayType === "callout" ? "bottom" : "bottom-left") : this.options.position;	// No I18N      	
			if(options.forElement){
				this.options.forElement = $(this.options.forElement);
			}
			this.options.buttonsAlignment = ZComponents.buttonsAlignment || this._CONSTANTS.defaultButtonAlignment;
			this._weekEnds = this.options.weekendDays.split(",");
			this.element[0].setAttribute("tabindex", 0);
			var options = ["minDate", "maxDate", "value"];  // No I18N
			this._hasDate = this._checkIfFormatHasDate();
			this._hasTime = this._checkIfDateHasTime(); 
			this._monthsPerView = this.options.monthsPerView;
			for(var i=0,len=options.length; i<len;i++){
				var value = this.options[options[i]];
				if(value){
					this._parseValue(options[i], value); 
					if(options[i] === "value" && this.options.value !== undefined){ // No I18N 
						this._currentSelected = new Date(this.options.value.getTime());
						if(!this._viewDate){
							this._viewDate = new Date(this.options.value.getTime());
							if(this._monthsPerView > 1 && this.options.selectedDateMonthViewIndex >= 1){
								this._viewDate = this._moveMonth(this._viewDate, -this.options.selectedDateMonthViewIndex);
							}
						}
						this._valueUpdate = true;
					}				
				}
				if(options[i] === "value"){   // No I18N 
					if(!this._viewDate){
						this._viewDate = new Date();
						this._viewDate.setHours(0,0,0,0);
					}
				}else{
					this["_"+options[i]] = this.options[options[i]];  // No I18N 
				}			
			}
			if(this._minDateHasTime){
				this._minTime = new Date(this.options.minDate.getTime())
			}
			if(this._maxDateHasTime){
				this._maxTime = new Date(this.options.minDate.getTime());
			}
			this._minDate && this._minDate.setHours(0,0,0,0);
			this._maxDate && this._maxDate.setHours(0,0,0,0);
			this._selectedDates = [];
			this._performValidations();
			if(this._hasDate){
				if(!this.options.value || this.options.values.length === 0){
					this._setMonthToView();
					this._setYearToView();
				}
				if(this.options.monthToBeShownOnOpen || this.options.yearToBeShownOnOpen){
					this._validateViewDate();
				}	
				if(this.options.selectionType === "multiple"){  // No I18N
					this._setValues();		
				}
				this._viewMode = this._getViewMode() || 0;
			}
			var datesObject = {"disabledDates": this.options.disabledDates, "specialDates": this.options.specialDates, "disabledTimeList": this.options.disabledTimeList};	// No I18N
			this._convertStringToObject(datesObject);
			this.options.OKButton =  !this.options.immediateCommit;
			this.options.cancelButton = !this.options.immediateCommit && !this.options.hideCancelButton;
			if(!preventConstruct){
				this._buildElement();
				this._constructOtherElements();
			}
			this.options.className && this.element.addClass(this.options.className);
			if(this._hasDate && this.options.value !== undefined){
				var date = this._resetTime(this.options.value);
				this.element.find("[data-time='"+date.getTime()+"']").addClass($.zdatetimepicker._CLASSES.selected).attr("aria-selected", true); // No I18N
			}
			this.options.value && (this._currentSelected = new Date(this.options.value.getTime()));
			this.options.width && this.element.css("width", this.options.width);  // No I18N
			this.options.height && this.element.css("height", this.options.height); // No I18N
			return true;
		},
		_checkIfFormatHasDate: function(){
			var format = this.options.format;
			return (format.indexOf("d") > -1 || format.indexOf("dd") > -1);  // No I18N
		},
		_getValuesFromLocale: function(){
			var locale = ZComponents.localeInfo[this.options.locale];
			if(locale){
				this.options.keys.days = locale.days || this.options.keys.days;
				this.options.keys.daysAbbreviated = locale.daysAbbreviated || this.options.keys.daysAbbreviated;
				this.options.keys.monthsAbbreviated = locale.monthsAbbreviated || this.options.keys.monthsAbbreviated;
				this.options.keys.months = locale.months || this.options.keys.months;
				this.options.firstDayOfWeek = locale.firstDayOfWeek || 0;
			}
		},
		_convertStringToObject: function(datesObject){
			for(var option in datesObject){
				if(datesObject[option] !== undefined){
					if(typeof datesObject[option] === "string"){	// No I18N
						datesObject[option] = this.options[option] = this._parseDateValue(datesObject[option], this._dateFormat)
					}else if(datesObject[option] instanceof Array){
						var base = this;
						datesObject[option] = this.options[option] = $.map(datesObject[option], function(d){
							if(typeof d === "object" && !(d instanceof Date)){ // No I18N
								if((d.date && d.date instanceof Date && d.hasOwnProperty("isValid")) ||  (d.date && d.date.date instanceof Date && d.date.hasOwnProperty("isValid")) || (d.startDate && d.startDate.date instanceof Date && d.startDate.hasOwnProperty("isValid")) || (d.endDate && d.endDate.date instanceof Date && d.endDate.hasOwnProperty("isValid"))){  // No I18N
									return d;
								}
								if(d.date){
									d.date = base._parseDateValue(d.date, base._dateFormat);
									d.date.date.setHours(0,0,0,0);
								}else{
									if(d.startDate && d.endDate){
										d.startDate = base._parseDateValue(d.startDate, base._dateFormat);
										d.startDate.date.setHours(0,0,0,0);
										d.endDate = base._parseDateValue(d.endDate, base._dateFormat);
										d.endDate.date.setHours(0,0,0,0);
									}
								}
								return d;
							}else{
								var date = base._parseDateValue(d,  option === "disabledTimeList" ? base._timeFormat : base._dateFormat);   // No I18N
								option === "disabledTimeList" ? date.date.setSeconds(0,0) : date.date.setHours(0,0,0,0);   // No I18N
								return date;
							}
						})
					}
				}
			}
		},
		_setMonthToView: function(){
			var month = this.options.monthToBeShownOnOpen;
			if(month !== undefined){
				if(typeof month === "number" && month >= 0 && month <= 11){  // No I18N
					this._viewDate.setMonth(month);
				}else if(typeof month === "string"){  // No I18N
					if(month.indexOf("THIS_MONTH") > -1){  // No I18N
						var value = ZDateUtil.convertOffsetToValue(month.substring(10));
						this._viewDate = this._moveMonth(this._viewDate, value);  
					}else if(month.indexOf("NEXT_MONTH") > -1){  // No I18N
						this._viewDate = this._moveMonth(this._viewDate, 1);  
					}else if(month.indexOf("LAST_MONTH") > -1){   // No I18N
						this._viewDate = this._moveMonth(this._viewDate, -1); 
					}
				}
			}
		},
		_setYearToView: function(){
			var year = this.options.yearToBeShownOnOpen;
			if(typeof year === "number"){   // No I18N
				this._viewDate.setFullYear(year);
			}else if(typeof year === "string"){  // No I18N
				if(year.indexOf("THIS_YEAR") > -1){   // No I18N
					var value = ZDateUtil.convertOffsetToValue(year.substring(9));
					this._viewDate.setFullYear(this._viewDate.getFullYear() + value);
				}else if(year.indexOf("NEXT_YEAR") > -1 && year.length === 9){   // No I18N
					this._viewDate.setFullYear(this._viewDate.getFullYear() + 1); 
				}else if(year.indexOf("LAST_YEAR") > -1 && year.length === 9){  // No I18N
					this._viewDate.setFullYear(this._viewDate.getFullYear() - 1); 
				}
			}
		},
		_constructOtherElements: function(){
			var commands = this.options.commandBar, options = this.options, columnExists;
			if(this.options.type === "inline"){  // No I18N
				this.element.show();
			}
			if(this.options.title && this.options.title.length){
				this.element.prepend($($.zdatetimepicker._HEADER));
				this.element.find("."+$.zdatetimepicker._CLASSES.title).html(this.options.isTitleHTMLEncoded ? this.options.title : ZComponents.encodeHTML(this.options.title)); // No I18N
				if(this.options.draggable && $.fn.zdraggable && this.options.type !== "inline"){
					this._initDraggable();
				}
			}
			this.options.closeButton && this.options.type !== "inline" && this._createCloseButton();  // No I18N
			columnExists = this._checkIfColumnExists();
			if(columnExists || options.OKButton || options.todayButton || options.cancelButton || options.clearButton){		
				this._createButtons();
				this._bindButtonEvents();
			}
			this._monthsPerView ===  3 && this._footer && this._footer.length && this._hasTime && this.element.addClass($.zdatetimepicker._CLASSES.triple);				
		},
		_initDraggable: function(){ 
			if(this.options.displayType !== "inline"){   // No I18N
				this.element.zdraggable({
					"handle": "."+$.zdatetimepicker._CLASSES.header,  // No I18N
					"ignore": "."+$.zdatetimepicker._CLASSES.closeButton, // No I18N
					"container" : "window", // No I18N  
					"start": this._dragStartHandler.bind(this),  // No I18N
					"drag": this._dragHandler.bind(this),  // No I18N
					"end": this._dragEndHandler.bind(this)  // No I18N
				});
			}		
		},
		_dragStartHandler: function(orgEvent, ui){
			this._trigger(this._EVENTS.DRAGSTART, orgEvent, ui);		
		},
		_dragHandler: function(orgEvent, ui){
			this._trigger(this._EVENTS.DRAG, orgEvent, ui);		
		},
		_dragEndHandler: function(orgEvent, ui){
			this._trigger(this._EVENTS.DRAGEND, orgEvent, ui);		
		},
		_setValues: function(){
			var len = this.options.values.length;
			this._valueUpdate = true;
			for(var i=0; i<len;i++){
				var date, value = this.options.values[i];
				if(typeof value === "string"){  // No I18N
					date = value === "TODAY" ? new Date() : this._parseDateValue(this.options.values[i], this.options.format).date;  // No I18N
				}else if(value instanceof Date){
					date = value;
				}else{
					this.options.values.splice(i, 1);
				}
				if(date){
					date.setHours(0,0,0,0);
					this._selectedDates.push(date);
					if(i === len - 1){
						this._viewDate = new Date(date.getTime());
					}
				}			
			}	
		},
		_getViewMode: function(){
			var viewmode;
			if(this.options.navigationBar.monthYearSwitcherType === "drilldown"){  // No I18N
				if(!this._valueUpdate){
					switch(this.options.drilldownLevelOnOpen){
						case "dates": viewmode = 0; break; // No I18N
						case "months": viewmode = 1; break; // No I18N
						case "years": viewmode = 2; break; // No I18N
						case "decades": viewmode = 3; break; // No I18N
					}
				}else{
					viewmode = 0;
					this.element.find("."+$.zdatetimepicker._CLASSES.disabledCalendar).removeClass($.zdatetimepicker._CLASSES.disabledCalendar);
				}
			}
			return viewmode;
		},
		_bindButtonEvents: function(){
			this._today.length && this._today.on("click."+this.eventPrefix, this._todayClickHandler.bind(this));
			this._applyButton && this._apply.on("click."+this.eventPrefix, this._applyClickHandler.bind(this));  // No I18N
			this._cancel.length && this._cancel.on("click."+this.eventPrefix, this._cancelClickHandler.bind(this));  // No I18N
			this._reset.length && this._reset.on("click."+this.eventPrefix, this._resetClickHandler.bind(this));  // No I18N
		},
		_unBindButtonEvents: function(){
			this._today.length && this._today.off("click."+this.eventPrefix);  // No I18N
			this._applyButton && this._apply.off("click."+this.eventPrefix);  // No I18N
			this._cancel.length && this._cancel.off("click."+this.eventPrefix);  // No I18N
			this._reset && this._reset.length && this._reset.off("click."+this.eventPrefix);  // No I18N
		},
		_resetClickHandler: function(orgEvent){
			if(orgEvent && !($(orgEvent.target).closest(this._reset).hasClass("is-disabled")) || !orgEvent){
				if(this.options.immediateCommit){
					this._valueUpdate = false;
					this.options.value = undefined;
					this.options.values = [];
					this._selectedTime = this._minTime ? new Date(this._minTime.getTime()) : undefined;
				}
				this._viewDate.setHours(0,0,0,0);
				var className = $.zdatetimepicker._CLASSES.selected+" "+$.zdatetimepicker._CLASSES.disabled;  // No I18N
				this.element.find("."+$.zdatetimepicker._CLASSES.monthContainer).find('.'+$.zdatetimepicker._CLASSES.selected+",."+$.zdatetimepicker._CLASSES.disabled+":not(.zdisabled)").removeClass(className).removeAttr("aria-selected aria-disabled"); // No I18N
				this.element.find("."+$.zdatetimepicker._CLASSES.monthYearTable).find('.'+$.zdatetimepicker._CLASSES.selected+",."+$.zdatetimepicker._CLASSES.disabled+":not(.zdisabled)").removeClass(className).removeAttr("aria-selected aria-disabled"); // No I18N			
				this._selectedDates = [];
				this._queryString = ""; // No I18N
				this._currentSelected = undefined;
				if(this._hasTime){  
					if(this.options.timeFieldType === "multiple-select-box" && this.options.timeMultipleSelectBoxType === "h-m-t"){  // No I18N
						this._checkTimeOptions();
					}
					this._setSelectedTimeValues(undefined, undefined, undefined, true);		
				} 
				this._reset && this._reset.length && this._hasDate && this._reset.attr("disabled", true).addClass("is-disabled");  // No I18N
				this._trigger(this._EVENTS.RESET, orgEvent, {valuesObject: [], values: [], options: this.options});		
			}			
		},
		_cancelClickHandler: function(orgEvent){
			this._resetClickHandler(orgEvent);
			this._closePicker();
			this._trigger(this._EVENTS.CANCEL, orgEvent, {valueString: ZDateUtil.formatDate(this.options.value, this.options.format), value: this.options.value});		
		},
		_applyClickHandler: function(orgEvent, isNotSubmit, valueSet){
			var returnObj, shouldClose, applyButton;
			if(orgEvent){
				applyButton = $(orgEvent.target).closest(this._apply);
			}
			if(this._hasTime && !this._selectedTime){
				var time, date;
				if(this.options.timeFieldType === "single-select-box"){  // No I18N
					time = this._singleTimeSelect.zselectbox("getAttribute", "selectedValue");  // No I18N
					date = new Date(parseInt(time));
					this._viewDate.setHours(date.getHours(), date.getMinutes(), 0,0);
				}else if(this.options.timeFieldType === "multiple-select-box" && this.options.timeMultipleSelectBoxType === "hm-t"){  // No I18N
					var period = "";  // No I18N
					time = this._combinedTimeElement.zselectbox("getAttribute", "selectedValue"); // No I18N
					if(this._is12HourFormat){
						period = this._combinedPeriodElement.zselectbox("getAttribute", "selectedValue");  // No I18N
					}
					time = time + " "+period;  // No I18N
					date = this._parseDateValue(time, this._timeFormat).date;
					this._viewDate.setHours(date.getHours(), date.getMinutes(), 0,0);
				}
			}
			if(orgEvent && !(applyButton.hasClass("is-disabled")) || !orgEvent){
				if(this.options.selectionType === "single" && this._hasDate){    // No I18N
					var date = new Date();
					if(this._currentSelected){
						this._valueUpdate = true;
						date = new Date(this._currentSelected.getTime());	
					}else{
						this._selectedTime = this._minTime ? new Date(this._minTime.getTime()) : undefined;
					}
					if(this._selectedTime){
						date.setHours(this._selectedTime.getHours(), this._selectedTime.getMinutes(), 0,0);
					}
					this.options.value = this._currentSelected ?  new Date(date.getTime()) : undefined;
					returnObj = {value: this.options.value, valueString:  ZDateUtil.formatDate(this.options.value, this.options.format)};
				}else{
					if(this._selectedDates.length){
						this._valueUpdate = true;
					}else{
						this._selectedTime = this._minTime ? new Date(this._minTime.getTime()) : undefined;
					}
					if(this.options.selectionLimit && this.options.selectionLimit === this._selectedDates.length && !this._hasTime && this._viewMode === 0 || $(orgEvent.target).closest(this._apply).length){
						shouldClose = true;
					}else{
						shouldClose = false;
					}
					this.options.values = [];
					for(var i=0;i<this._selectedDates.length;i++){
						var newDate = new Date(this._selectedDates[i]);
						if(this._selectedTime){
							newDate.setHours(this._selectedTime.getHours(), this._selectedTime.getMinutes(), 0, 0);
						}
						var formattedDate = ZDateUtil.formatDate(newDate, this.options.format);
						this.options.values.push(formattedDate);
					}
					returnObj = {values: this.options.values, valuesObject: this._selectedDates};
				}		
				this._trigger(this._EVENTS.APPLY, orgEvent, returnObj);
				if(!valueSet && this.options.selectionType === "single" &&  (isNotSubmit &&  this.options.closeOnDateSelect && !this._hasTime && this._viewMode === 0 || !isNotSubmit) || this.options.selectionType === "multiple" && shouldClose){  // No I18N
					this._closePicker();
				}
			}
			this._valueUpdate = this.options.value || this.options.values.length;
		},
		_createCloseButton: function(){
			if(!this._closeButton){
				var closeText = this._getI18N(this.eventPrefix, "close", this.options.keys);  // No I18N
				this._closeButton = $("<button role='button' class='"+$.zdatetimepicker._CLASSES.close+"' title='"+closeText+"' aria-label='"+closeText+"'></div>"); // No I18N
				this._closeButton.appendTo(this.element.find("."+$.zdatetimepicker._CLASSES.header));
				var innerClose = $("<i class='"+$.zdatetimepicker._CLASSES.navIcon+"'></i>"), svgEle; // No I18N
				innerClose.appendTo(this._closeButton);	
			}else{
				innerClose = this._closeButton.find("."+$.zdatetimepicker._CLASSES.navIcon);
			}
			innerClose.removeAttr("class").addClass($.zdatetimepicker._CLASSES.navIcon);  // No I18N
			var svgData = {
				props: {"viewBox": "0 0 16 16"},  // No I18N
				nodes:[{"rect": {"x": "1.5", "y": "7.4", "transform": "matrix(0.7071 -0.7071 0.7071 0.7071 -3.3137 8)", "class": "st0", "width": "13", "height": "1.1"}},   // No I18N
					  {"rect": {"x": "1.5", "y": "7.4", "transform": "matrix(0.7071 0.7071 -0.7071 0.7071 8 -3.3137)", "class": "st0", "width" : "13", "height": "1.1"}}]  // No I18N
			}; 
            this._handleIcon(innerClose, svgData, "closebutton",  this.options.closeIconClassName, this.options.closeSVGIconId); 
			this._closeButton.on("click."+this.eventPrefix, this._closeClickHandler.bind(this)); // No I18N
		},
		_performValidations: function(){
			var displayType = "monthYearSelectionMode", format = "headingDateFormat", len = this.options.values.length; // No I18N
			!this.options.drilldownLevelOnOpen && (this.options.drilldownLevelOnOpen = "dates"); // No I18N
			if(!this.options.format){
				this.options.format = this._CONSTANTS.defaultDateFormat;
			}
			this._validateBoundaries();
			this.options.navigationBar[displayType]= /^(dropdown|drilldown|none)$/.test(this.options.navigationBar[displayType]) ? this.options.navigationBar[displayType] : this._CONSTANTS[displayType];
			if(!/^(top|bottom|right|left|top-left|top-right|bottom-left|bottom-right)$/.test(this.options.position)){
				this.options.position = 'bottom';	 //No I18N 
			}
			if(!this.options.navigationBar.monthSwitcher && !this.options.navigationBar.yearSwitcher){
				this.options[displayType] = "none";  // No I18N
			}
			this.options.displayType = /^(box|callout)$/.test(this.options.displayType) ? this.options.displayType : this._CONSTANTS.displayType;
			this.options.navigationBar.yearNavigationButtons = this._yearNavigation || !this.options.navigationBar[displayType] === "dropdown";
			this.options.navigationBar.monthYearHeadingFormat =  /^(MMM yyyy|MMMM yyyy|yyyy MMM|yyyy MMMM)$/.test(this.options.navigationBar.monthYearHeadingFormat) ? this.options.navigationBar.monthYearHeadingFormat : this._CONSTANTS[format];
			var stepOptions = ["hourStep", "minuteStep"];   // No I18N
			for(var i=0, len = stepOptions.length; i<len; i++){
				this.options[stepOptions[i]] = Number(this.options[stepOptions[i]]);
				if(this.options[stepOptions[i]] <= 0){
					this.options[stepOptions[i]] = 1;
				}
			}
		},
		_checkIfDateHasTime: function(){
			var format = this.options.format;
			var hasTime = (format.indexOf("H") > -1 || format.indexOf("h") > -1 || format.indexOf("m") > -1);  // No I18N
			if(hasTime){
				this._is12HourFormat = format.indexOf("h") > -1;
				this._timeFormat = format.substring(format.indexOf("h") === -1 ? format.indexOf("H") : format.indexOf("h"));  // No I18N
			}	
			var dateLastIndex = format.lastIndexOf("d"), monthLastIndex = format.lastIndexOf("M"), yearLastIndex = format.lastIndexOf("y"), maxIndex, minIndex;   // No I18N
			maxIndex = Math.max(dateLastIndex, monthLastIndex);
			maxIndex = Math.max(maxIndex, yearLastIndex);
			var dateFirstIndex = format.indexOf("d"), monthFirstIndex = format.indexOf("M"), yearFirstIndex = format.indexOf("y");   // No I18N
			minIndex = Math.min(dateFirstIndex, monthFirstIndex);
			minIndex = Math.min(minIndex, yearFirstIndex);
			this._dateFormat = format.substring(minIndex, maxIndex+1);
			return hasTime;
		},
		_buildElement: function(element){
			var preventConstruct = element;
			element = element || this.element;
			var monthYearFormat = this.options.navigationBar.monthYearHeadingFormat.split(" "), displayType = this.options.navigationBar.monthYearSwitcherType;  // No I18N
			var monthSwitcher = this.options.navigationBar.monthSwitcher, yearSwitcher = this.options.navigationBar.yearSwitcher;
			if(this._hasDate){
				if(this._monthsPerView === 1){
					if(!preventConstruct || preventConstruct.length === 0){
						element.addClass($.zdatetimepicker._CLASSES.datepicker);
						element.append($($.zdatetimepicker._TEMPLATE));
					}
					this._elementId = element[0].getAttribute("id") ? element[0].getAttribute("id") : Math.floor(Math.random() * 1000000)+"_zdatetimepicker"; // No I18N
					element[0].setAttribute("id", this._elementId); // No I18N
					this.options.appendTo && element.appendTo($(this.options.appendTo));
					this._fillDayOfWeek(element);
					this._fillNavBar(this._viewDate, {left: true, right: true, element: element});
					this._fillDates(undefined, element);	
					this._updateArrowState();
					this._generateContent(element);
					if(monthYearFormat[0] === "yyyy"){   // No I18N
						element.find("."+$.zdatetimepicker._CLASSES.yearNav).prependTo(this._monthYearNav);  // No I18N
					}	
					displayType === "drilldown" && (monthSwitcher || yearSwitcher) && this._monthYearNav.addClass("h-cursorpointer");  // No I18N			
					displayType === "dropdown" && this._bindSelectBox(); // No I18N
				}else{
					this.element.addClass($.zdatetimepicker._CLASSES.group).append($("<ul class='"+$.zdatetimepicker._CLASSES.container+"'></ul>"));
					var navDisplayType = this.options.navigationBar.navigationButtonsDisplayPattern, position = this.options.navigationBar.togetherTypeNavigationButtonsPosition;
					this._elementId = this.element[0].getAttribute("id") ? this.element[0].getAttribute("id") : Math.floor(Math.random() * 1000000)+"_zdatetimepicker"; // No I18N
					this.element.appendTo(this.options.appendTo ? $(this.options.appendTo) : "body")[0].setAttribute("id", this._elementId); // No I18N
					for(var i=0; i<this._monthsPerView;i++){
						this._navBar = this._monthYearNav = this._leftNav = this._rightNav = this._weeknumbers = undefined;
						var element = $($.zdatetimepicker._TEMPLATE), parent = $("<li class='"+$.zdatetimepicker._CLASSES.list+"'><div class='"+$.zdatetimepicker._CLASSES.datepicker+"'></div></li>").appendTo(this.element.find("ul"));
						element.appendTo(parent.find("."+$.zdatetimepicker._CLASSES.datepicker));
						this._fillDayOfWeek(element);
						var newDate = new Date(this._viewDate.getTime());
						newDate.setMonth(this._viewDate.getMonth() + i);
						if(i === 0){
							displayType === "dropdown" && this.options.navigationBar.yearNavigationButtons && this.options.navigationBar.monthNavigationButtons && element.addClass($.zdatetimepicker._CLASSES.dropdown); // No I18N
							this._fillNavBar(this._viewDate, {index: i, left: position === "right" &&  navDisplayType === "together" ? false : true  , element: element});  // No I18N
							this._fillDates(undefined, element);
							this._updateArrowState(this._viewDate, i);
							displayType === "drilldown" && (monthSwitcher || yearSwitcher) && this._monthYearNav.addClass("h-cursorpointer") && this._monthYearNav.on("click."+this.eventPrefix, this._monthYearNavClickHandler.bind(this)); // No I18N
							displayType === "dropdown" && this._bindSelectBox(); // No I18N
						}else{
							if(i === this._monthsPerView - 1){	
								this._fillNavBar(newDate, {index: i, right: true, left: navDisplayType === "together" && position === "right" ? true : false, element: element});   // No I18N
								this._updateArrowState(newDate, i);
							}else{
								this._fillNavBar(newDate, {index: i, element: element});
							}
							this._fillDates(newDate, element);
						}
						if(monthYearFormat[0] === "yyyy"){   // No I18N
							$(this.element.find("."+$.zdatetimepicker._CLASSES.datepicker)[i]).find("."+$.zdatetimepicker._CLASSES.yearNav).prependTo(this._monthYearNav);  // No I18N
						}
					}
					this._generateContent();
				}
				this._appendEmptyTd();
				this.options.displayType === "callout" && this._constructPointer(); // No I18N	
			}else{
				this.element.addClass($.zdatetimepicker._CLASSES.datepicker);
			}
			this._hasTime && this._buildTimePicker();
			this.options.selectionType === "multiple" && this.element.find("."+$.zdatetimepicker._CLASSES.dateView).attr("aria-multiselectable", true);   // No I18N
			this.options.customHTMLAboveNavigationBar && this._insertHTMLAboveNavbar();
			this.options.customHTMLBelowCalendar &&	this._insertHTMLBelowCalendar();
			this.options.customHTMLAboveCalendar && this._insertHTMLAboveCalendar();
		},
		_generateContent: function(element){
			if(this.options.navigationBar.monthYearSwitcherType === "drilldown"){  // No I18N
				switch(this._viewMode){
					case 1: this._fillMonths(true, element); break;
					case 2: this._fillYears(true, element); break;
					case 3: this._fillDecades(true, element); break;
				}
			}
		},
		_insertHTMLAboveCalendar: function(){
			var element = $(this.options.customHTMLAboveCalendar);
			this._aboveCalendarParent = element.parent();
			if(element.length){
				!element.is(":visible") && element.show();  // No I18N

				element.addClass("zdatetimepicker--custom");
				element.insertBefore(this.element.find("."+$.zdatetimepicker._CLASSES.dateView));
			}
		},
		_insertHTMLAboveNavbar: function(){
			var element = $(this.options.customHTMLAboveNavigationBar);
			this._aboveNavbarParent = element.parent();
			if(element.length){
				!element.is(":visible") && element.show();  // No I18N
				element.addClass("zdatetimepicker--custom"); 
				if(this.options.title){
					element.insertAfter(this.element.find("."+$.zdatetimepicker._CLASSES.title));
				}else{
					element.prependTo(this.element);
				}
			}
		},
		_insertHTMLBelowCalendar: function(){
			var element = $(this.options.customHTMLBelowCalendar);
			this._belowCalendarParent = element.parent();
			if(element.length){
				!element.is(":visible") && element.show();  // No I18N
				element.addClass("zdatetimepicker--custom");
				element.insertAfter(this._monthsPerView === 1 ? this.element.find("."+$.zdatetimepicker._CLASSES.body).last() : this.element.find("."+$.zdatetimepicker._CLASSES.container));
			}
		},
		_constructPointer: function(){
			if(!this._isPositionModified){
				this.options.position = this._CONSTANTS.calloutPosition;
			}
			this._pointer = $("<div class='"+$.zdatetimepicker._CLASSES.pointer+"'></div>").prependTo(this.element); // No I18N
		},
		_buildTimePicker: function(){
			var hasButtons = this.options.todayButton || this.options.clearButton || !this.options.immediateCommit , multipleContainer;  
			this._validateTimeOptions();
			this._timeElement = $("<div class='"+$.zdatetimepicker._CLASSES.timepicker+" "+(this._monthsPerView === 3 && hasButtons ? "h-align"+(this.options.buttonsAlignment === "left" ? "right": "left") : "h-aligncenter")+"'></div>");  // No I18N
			hasButtons && this.options.buttonsAlignment === "right" && this._footer ? this._timeElement.insertBefore(this._footer) : this._timeElement.appendTo(this.element);    // No I18N
			if(this.options.timeFieldType === "multiple-select-box"){  // No I18N
				multipleContainer = $("<div class='zdatetimepicker--multipleselectbox'>").appendTo(this._timeElement);
			}
			this._buildLabel(multipleContainer);	
			switch(this.options.timeFieldType){
				case "input":  // No I18N
					this._buildInputElement();
				break;
				case "multiple-select-box":  // No I18N
					if(this.options.timeMultipleSelectBoxType === "h-m-t"){  // No I18N
						this._buildTimeSelectBox(multipleContainer);
					}
					if(this.options.timeMultipleSelectBoxType === "hm-t"){  // No I18N
						this._buildCombinedTimeSelectBox(multipleContainer);
					}
				break;
				case "single-select-box":    // No I18N
					this._buildSingleTimeSelect(this._timeElement);
				break;
			}
			this._monthsPerView ===  3 && this._footer && this._footer.length && this._hasTime && this.element.addClass($.zdatetimepicker._CLASSES.triple);				
			var tempDate = new Date();
			tempDate = this.options.value ? tempDate.setHours(this.options.value.getHours(), this.options.value.getMinutes(), 0,0) : (this._minTime ? tempDate.setHours(this._minTime.getHours(), this._minTime.getMinutes(), 0, 0) : this. _viewDate.getTime());
			this._viewDate = new Date(tempDate);
		},
		_buildCombinedTimeSelectBox: function(container){
			var timeSelect = "<select id='"+this._elementId+"-time-combined'>", timeString ="", previousTime; // No I18N
			for(var i=(this._is12HourFormat ? 1 : 0); i<=(this._is12HourFormat ? 12 : 23); i=i+this.options.hourStep){
				for(var j=0; j<59; j= j+this.options.minuteStep){
					timeString = (i < 10 ? "0"+i : i)+":"+(j<10 ? "0"+j : j);  // No I18N
					if(!this._is12HourFormat){
						var date = this._parseDateValue(timeString, this._timeFormat).date, disabled = "", selected;
						disabled = (this._minTime && date.getTime() < this._minTime.getTime()) || (this._maxTime && date.getTime() > this._maxTime.getTime());
						disabled = disabled  ? "disabled" : "";  // No I18N
					}
					timeSelect += "<option value='"+timeString+"' "+disabled+">"+timeString+"</option>";  // No I18N
				}
			}
			timeSelect += "</select>"; // No I18N
			this._combinedTimeElement = $(timeSelect);
			this._combinedTimeElement.appendTo(container);
			this._combinedTimeElement.zselectbox({
				dropdownList: {width: 100, height: 200, className: "zdatetimepicker--menu"},   // No I18N
				itemclick: this._combinedTimeClickHandler.bind(this)
			});
			if(this._is12HourFormat){
				var hourValue, hourVal;
				hourValue = this.options.value ? new Date(this.options.value.getTime()) : this._minTime ? new Date(this._minTime.getTime()) : undefined;
				hourValue && (hourVal = hourValue.getHours());
				var periodHTML = "<select id='"+this._elementId+"-combined-period'><option value='AM' "+(hourVal < 11 ? "selected" : "")+">AM</option><option value='PM' "+(hourVal> 11 ? "selected" : "")+">PM </option></select>";   // No I18N
				this._combinedPeriodElement  = $(periodHTML);
				this._combinedPeriodElement .appendTo(container);
				this._combinedPeriodElement .zselectbox({
					dropdownList: {width: 50,	height: 330, className: "zdatetimepicker--menu"},   // No I18N
					itemclick: this._combinedPeriodClickHandler.bind(this)
				});
			}	
			this._checkCombinedTimeOptions();
		},
		_checkCombinedTimeOptions: function(orgEvent){
			var selectedPeriod, options, selectedValue, disabledValue, time, date, selected, currentTime, value; 
			this._is12HourFormat && ( selectedPeriod = this._combinedPeriodElement.zselectbox("getAttribute", "selectedValue"));	  // No I18N	
			options = this._combinedTimeElement.find("option");   // No I18N
			selectedValue = this._combinedTimeElement.zselectbox("getAttribute", "selectedValue");   // No I18N
			for(var i=0,len = options.length; i <len;i++){	
				if(selectedPeriod){
					time = options[i].value + " "+selectedPeriod, date = this._parseDateValue(time, this._timeFormat).date, selected;  // No I18N
					if(selectedPeriod === "PM"){   // No I18N
						disabledValue = (this._minTime && (this._minTime.getHours() > 12 && date.getTime() < this._minTime.getTime())) || (this._maxTime && (this._maxTime.getHours() > 12 && date.getTime() > this._maxTime.getTime()));							
					}else{
						disabledValue = (this._minTime && (this._minTime.getHours() < 12 && date.getTime() < this._minTime.getTime())) || (this._maxTime && (this._maxTime.getHours() < 12 && date.getTime() > this._maxTime.getTime()));					
					}
					disabledValue = disabledValue === undefined ? false : disabledValue;
					disabledValue = this._checkIfTimeIsDisabled(date, date.getMinutes(), disabledValue);
					this._combinedTimeElement.zselectbox("setOptionAttributes", options[i], {disabled: disabledValue, customAttributes: {'data-time': date.getTime()}});   // No I18N					
				}else{
					date = this._parseDateValue(options[i].value, this._timeFormat).date;
					this._combinedTimeElement.zselectbox("setOptionAttributes", options[i], "customAttributes", {"data-time": date.getTime()});   // No I18N
				}
				if(i >0){
					value = new Date();
					if(this.options.value){
						value.setHours(this.options.value.getHours(), this.options.value.getMinutes(), 0,0);
					}else{
						value.setSeconds(0,0);
					}
					time = parseInt(options[i-1].getAttribute("data-time")), currentTime = date.getTime();   // No I18N
					selected = this.options.value ? time < value.getTime() && currentTime >= value.getTime() : (this._minTime &&  (time < this._minTime.getTime() && currentTime >= this._minTime.getTime())) || (this._maxTime &&  (time > this._maxTime.getTime() && currentTime <= this._maxTime.getTime()));		
				}
				if(selected && !orgEvent){
					selectedValue = options[i].value; 
				}else{
					if(this._combinedTimeElement.zselectbox("getAttribute", "selectedValue").length){  // No I18N
						selectedValue = this._combinedTimeElement.zselectbox("getAttribute", "selectedValue");   // No I18N
					}  
				}
			}
			!orgEvent && this._combinedTimeElement.zselectbox("setAttribute", "selectedValue", selectedValue);   // No I18N
			if(this._is12HourFormat){
				var time = selectedValue + " "+ selectedPeriod, date, disabledValue;  // No I18N
				date = this._parseDateValue(time, this._timeFormat).date;
				if(date){
					if(selectedPeriod === "PM"){  // No I18N
						date.setHours(date.getHours() - 12);
						disabledValue = (this._minTime && ( date.getTime() < this._minTime.getTime())) || (this._maxTime && ( date.getTime() > this._maxTime.getTime()));
					}else{
						date.setHours(date.getHours() + 12);
						disabledValue = (this._minTime && ( date.getTime() < this._minTime.getTime())) || (this._maxTime && ( date.getTime() > this._maxTime.getTime()));				
					}		
					disabledValue = disabledValue === undefined ? false : disabledValue;
					disabledValue = this._checkIfTimeIsDisabled(date, date.getMinutes(), disabledValue, date.getHours());
					this._combinedPeriodElement.zselectbox("setOptionAttributes", selectedPeriod === "PM" ? "AM" : "PM" , "disabled", disabledValue);   // No I18N
				}
			}
		},
		_combinedPeriodClickHandler: function(orgEvent){
			this._checkCombinedTimeOptions(orgEvent);
			this._setCombinedTimeValues(orgEvent);
		},
		_combinedTimeClickHandler: function(orgEvent){
			this._checkCombinedTimeOptions(orgEvent);
			this._setCombinedTimeValues(orgEvent);
		},
		_setCombinedTimeValues:  function(orgEvent){
			var time, selectedTime;
			selectedTime = this._combinedTimeElement.zselectbox("getAttribute", "selectedValue");   // No I18N
			if(this._is12HourFormat){
				var selectedPeriod = this._combinedPeriodElement.zselectbox("getAttribute", "selectedValue");   // No I18N
				selectedTime = selectedTime + " "+ selectedPeriod;     // No I18N
			}
			var date = this._parseDateValue(selectedTime, this._timeFormat).date;
			this._viewDate.setHours(date.getHours(), date.getMinutes(), 0,0);
			this._selectedTime = new Date(this._viewDate.getTime());
			this._updateTimeForMultiple(date);
			this.options.immediateCommit && (this._currentSelected || this._selectedDates.length) && this._applyClickHandler(orgEvent, true);
		},
		_validateTimeOptions: function(){
			this._minTime = this.options.minTime || this._minTime;
			this._maxTime = this.options.maxTime || this._maxTime;
			if(this._minTime){
				this._minTime = this._parseDateValue(this._minTime, this._timeFormat).date;
				this._minTime.setSeconds(0,0);
			}
			if(this._maxTime){
				this._maxTime = this._parseDateValue(this._maxTime, this._timeFormat).date;
				this._maxTime.setSeconds(0,0);
			}
			if(this._minTime && this._maxTime && ZDateUtil.isGreater(this._minTime, this._maxTime)){
				this._maxTime = this.options.maxTime =  undefined;
			}
			var tempDate;
			if(this.options.value){
				tempDate = new Date();
				tempDate.setHours(this.options.value.getHours(),this.options.value.getMinutes(),0,0);
			}
			if(this._maxTime && tempDate && ZDateUtil.isGreater(tempDate, this._maxTime)){
				this.options.value.setHours(this._maxTime.getHours(),this._maxTime.getMinutes(),0,0);
			}
			if(this._minTime && tempDate && ZDateUtil.isGreater(this._minTime, tempDate)){
				this.options.value.setHours(this._minTime.getHours(),this._minTime.getMinutes(),0,0);
			}	
			if(this.options.disabledTimeList.length && typeof this.options.disabledTimeList[0] === "string"){  // No I18N
				this._convertStringToObject({"disabledTimeList": this.options.disabledTimeList});  // No I18N
			}	
			this._selectedTime = this.options.value ? tempDate : (this._minTime ? new Date(this._minTime.getTime()) : undefined); 		
		},
		_buildLabel: function(multipleContainer){
			var hasIcon = false;
			if(this.options.timeLabelType === "icon" || this.options.timeLabelType === "icon-text"){   // No I18N
				hasIcon = true;
				this._createTimeIcon(multipleContainer);
			}	
			if(this.options.timeLabelType === "text" || this.options.timeLabelType === "icon-text"){  // No I18N
				var label = this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeLabel);
				if(label.length === 0){
					label = $("<span class='"+$.zdatetimepicker._CLASSES.timeLabel+"'></span>");
					hasIcon ? label.insertAfter(this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeIcon)) : label.prependTo(multipleContainer || this._timeElement);  // No I18N				
				}
				label.text(this.options.timeLabel);
			} 
		},
		_buildSingleTimeSelect: function(container){
			var len = this.options.fixedTimeOptions.length, options = this.options.fixedTimeOptions;
			if(len){
				var timeHTML = "<select id= '"+this._elementId+"-single-time-select'>";   // No I18N
				for(var i=0; i<len;i++){
					var date = this._parseDateValue(options[i], this._timeFormat).date, selected, isGreater, disabled = "";
					date.setSeconds(0,0);
					if(this.options.value){
						var tempDate = new Date();
						tempDate.setHours(this.options.value.getHours(), this.options.value.getMinutes(), 0, 0);
					}					
					selected = tempDate && ZDateUtil.areTimesEqual(date, tempDate) ? "selected" : "";   // No I18N
					isGreater = (!this._minTime && !this._maxTime) || (this._minTime ? ZDateUtil.isGreater(date, this._minTime) : true) && (this._maxTime ? ZDateUtil.isGreater(this._maxTime, date) : true);
					for(var j=0; j<this.options.disabledTimeList.length; j++){
						var timeObj = this.options.disabledTimeList[j].date;
						if(date.getTime() === timeObj.getTime()){
							disabled = "disabled";  // No I18N
							break;
						}
					}
					isGreater && (timeHTML += "<option value='"+date.getTime()+"' "+selected+" "+disabled+">"+options[i]+"</option>");   // No I18N
				}
				timeHTML += "</select>";   // No I18N
			}	
			timeHTML = $(timeHTML).appendTo(container);
			this._singleTimeSelect = timeHTML;
			this._singleTimeSelect.zselectbox({
									dropdownList: {width: 100, height: 200, className: "zdatetimepicker--menu"},   // No I18N
									itemclick: this._singleSelectClickHandler.bind(this),
									width: "auto"  // No I18N
								});
		},
		_singleSelectClickHandler: function(orgEvent, ui){
			var date = new Date(parseInt(ui.selectedValue));
			this._viewDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
			this._selectedTime = new Date(this._viewDate.getTime());
			this._updateTimeForMultiple(this._viewDate);
			this.options.immediateCommit &&	this._applyClickHandler(orgEvent, true);	
		},
		_buildTimeSelectBox: function(container){
			var hourHTML = "<select id='"+this._elementId+"-hour'>";   // No I18N
			var minHours, maxHours, minMinutes, maxMinutes, valueString;
			this.options.value && (valueString =  ZDateUtil.formatDate(this.options.value, this.options.format));
			if(this._minTime){
				minHours = this._minTime.getHours();
				minMinutes = this._minTime.getMinutes()
			}
			if(this._maxTime){
				maxHours = this._maxTime.getHours();
				maxMinutes = this._maxTime.getMinutes();
			}		
			var disabled, selected, selectedHour, selectedH;
			selectedH = this.options.value ? this._normalizeHourValue(this.options.value.getHours()) : (minHours ? this._normalizeHourValue(minHours) : (this._is12HourFormat ? 12 : 0));
			for(var i= (this._is12HourFormat ? 1 : 0);i<=(this._is12HourFormat ? 12 : 23);i++){
				if(this._is12HourFormat){
					selected = (i === selectedH ? "selected" : "");  // No I18N
				}else{
					selected = (i ===  selectedH ? "selected" : "");  // No I18N
					selected === "selected" && (selectedHour = i);   // No I18N
					disabled = (i < minHours || i > maxHours) ? "disabled" : "";  // No I18N
				}
				hourHTML += "<option "+disabled+" value="+i+" "+selected+">"+(i < 10 ? "0"+i : i )+"</option>";	// No I18N
			}
			hourHTML += "</select>";  // No I18N
			hourHTML = $(hourHTML);
			hourHTML.appendTo(container);
			this._viewDate.setHours(this.options.value ? this.options.value.getHours() : (this._minTime ? minHours : 0 ));
			this._hourElement = $("#"+this._elementId+"-hour");   // No I18N
			var minuteHTML = "<select id='"+this._elementId+"-minute'>";   // No I18N
			for(var i=0;i<=59;i=i+this.options.minuteStep){
				if(this._is12HourFormat){
					selected = 0;
				}else{
					disabled = (i < minMinutes && selectedHour === minHours ) ? "disabled" : "";  // No I18N
					disabled = disabled === undefined ? false : disabled;
				}
				var minuteValue = (this.options.value ? this.options.value.getMinutes() : (this._minTime ? minMinutes : 0));
				selected = (i - this.options.minuteStep < minuteValue) && (i >=  minuteValue) ? " selected" : "";		  // No I18N		
				minuteHTML += "<option "+disabled+" value="+i+" "+selected+" >"+(i < 10 ? "0"+i : i )+"</option>";	// No I18N
				this._viewDate.setMinutes(minuteValue);
			}
			minuteHTML += "</select>";    // No I18N
			minuteHTML = $(minuteHTML);
			minuteHTML.appendTo(container);
			this._minuteElement = $("#"+this._elementId+"-minute");   // No I18N
			if(this._is12HourFormat){
				var hourValue, hour12Hr;
				this.options.value && (hourValue = this.options.value.getHours());
				hourValue = this.options.value ? this.options.value.getHours() : this._minTime ? this._minTime.getHours() : undefined;
				hour12Hr = hourValue % 12;
				var periodHTML = "<select id='"+this._elementId+"-period'><option value='AM' "+(hourValue < 11 ? "selected" : "")+">AM</option><option value='PM' "+(hourValue > 11 ? "selected" : "")+">PM </option></select>";   // No I18N
				periodHTML = $(periodHTML);
				periodHTML.appendTo(container);
				this._periodElement = $("#"+this._elementId+"-period");   // No I18N
			}		
			this._bindTimeSelectbox();
			if(this._minTime || this._maxTime || this.options.disabledTimeList.length){
				this._checkTimeOptions(undefined, false);	
			}
		},
		_checkIfTimeIsDisabled: function(tempDate, minuteVal, isDisabled, hours){
			var isDisabled, disabledTime = this.options.disabledTimeList;
			hours = hours || tempDate.getHours();
			minuteVal = minuteVal || tempDate.getMinutes();
			for(var j=0; j<disabledTime.length; j++){
				var timeObj = disabledTime[j].date;
				if(hours === timeObj.getHours() && minuteVal === timeObj.getMinutes()){
					isDisabled = true;
					break;
				}
			}
			return isDisabled;
		},
		_checkTimeOptions: function(ui, valueCheck, date){
			date = date || this._viewDate;
			var tempDate = new Date().setHours(date.getHours(), date.getMinutes(),0,0);
			tempDate = new Date(tempDate);
			if(!this._is12HourFormat){
				var selectedMin, disabled, selected;
				selectedMin = parseInt(this._minuteElement.zselectbox("getAttribute", "selectedValue"));   // No I18N
				for(var i=0; i<=59; i=i+this.options.minuteStep){
					var condition = this._minTime && tempDate.getHours() === this._minTime.getHours() && i < this._minTime.getMinutes() || this._maxTime && tempDate.getHours() === this._maxTime.getHours() && i > this._maxTime.getMinutes();
					condition = condition === undefined ? false : condition;
					condition = this._checkIfTimeIsDisabled(tempDate, i, condition);
					this._minuteElement.zselectbox("setOptionAttributes", i, "disabled", condition);  // No I18N
				}
				this._minTime && this._hourElement.zselectbox("setOptionAttributes", this._minTime.getHours(), "disabled", tempDate.getMinutes() < this._minTime.getMinutes()); // No I18N
				this._maxTime && this._hourElement.zselectbox("setOptionAttributes", this._maxTime.getHours(), "disabled", tempDate.getMinutes() > this._maxTime.getMinutes()); // No I18N
			}else{
				for(var i=0; i<=59; i=i+this.options.minuteStep){
					var condition = this._minTime && tempDate.getHours() === this._minTime.getHours() && i < this._minTime.getMinutes() || this._maxTime && tempDate.getHours() === this._maxTime.getHours() && i > this._maxTime.getMinutes();
					condition = condition === undefined ? false : condition
					condition = this._checkIfTimeIsDisabled(tempDate, i, condition);
					this._minuteElement.zselectbox("setOptionAttributes", i, "disabled", condition);  // No I18N
				}
				for(var i =1; i<=12; i=i+this.options.hourStep){
					var hour = i, disabled, selectedMin = parseInt(this._minuteElement.zselectbox("getAttribute", "selectedValue"));   // No I18N 
					if(tempDate.getHours() >= 12){
						hour = i === 12 ? i : i + 12;
						var condition = ((this._minTime && (hour < this._minTime.getHours() || hour === this._minTime.getHours() && selectedMin < this._minTime.getMinutes())) || (this._maxTime && (hour > this._maxTime.getHours() || hour === this._maxTime.getHours() && selectedMin > this._maxTime.getMinutes())));
						condition = condition === undefined ? false : condition;
						condition = this._checkIfTimeIsDisabled(tempDate, tempDate.getMinutes(), condition, hour);
						disabled = hour <= 23 && condition
					}else{
						hour = i % 12;
						var condition = ((this._minTime && (hour < this._minTime.getHours() || hour === this._minTime.getHours() && selectedMin < this._minTime.getMinutes())) || (this._maxTime && (hour > this._maxTime.getHours() || hour === this._maxTime.getHours() && selectedMin > this._maxTime.getMinutes())));
						condition = condition === undefined ? false : condition;	
						condition = this._checkIfTimeIsDisabled(tempDate, tempDate.getMinutes(), condition, hour);
						disabled =  condition;				
					}
					this._hourElement.zselectbox("setOptionAttributes", i, "disabled", disabled);   // No I18N 
				}
				var hours;
				hours = tempDate.getHours() - 12;
				var condition = tempDate.getHours() >= 12  && ((this._minTime && (this._minTime.getHours() === hours && tempDate.getMinutes() < this._minTime.getMinutes() || hours < this._minTime.getHours())) || (this._maxTime && (this._maxTime.getHours() ===  hours && tempDate.getMinutes() < this._maxTime.getMinutes() || hours > this._maxTime.getHours())));
				condition = condition === undefined ? false : condition;
				condition = this._checkIfTimeIsDisabled(tempDate, tempDate.getMinutes(), condition, hours);
				this._periodElement.zselectbox("setOptionAttributes", "AM", "disabled", condition);  // No I18N 
				hours = tempDate.getHours() + 12;
				var condition = tempDate.getHours() < 12 && ((this._minTime && (this._minTime.getHours() === hours && tempDate.getMinutes() < this._minTime.getMinutes() || hours < this._minTime.getHours())) || (this._maxTime && (this._maxTime.getHours() === hours && tempDate.getMinutes() > this._maxTime.getMinutes() || hours > this._maxTime.getHours())));
				condition = condition === undefined  ? false : condition;
				condition = this._checkIfTimeIsDisabled(tempDate, tempDate.getMinutes(), condition, hours);		
				this._periodElement.zselectbox("setOptionAttributes", "PM", "disabled", condition);  // No I18N 
				this._setSelectedTimeValues(valueCheck);
			}
		},
		_normalizeHourValue: function(hourValue){
			if(this._is12HourFormat){
				if(hourValue === 0){
					hourValue = 12;
				}else if(hourValue  > 0 && hourValue <= 11){
					hourValue = (hourValue + 12) % 12;
				}else if(hourValue > 11){	
					hourValue = hourValue % 12 === 0 ? 12 : hourValue % 12;
				}
			}
			return hourValue
		},
		_bindTimeSelectbox: function(){
			this._hourElement.zselectbox({ dropdownList: { width: 40,	height: 330, className: "zdatetimepicker--menu" }, width: "auto" }); // No I18N
			this._minuteElement.zselectbox({ dropdownList: { width: 40,	height: 330, className: "zdatetimepicker--menu" }, width: "auto" }); // No I18N
			this._periodElement && this._periodElement.zselectbox({ dropdownList: { width: 50,	height: 330, className: "zdatetimepicker--menu" }, width: "auto"}); // No I18N
			$("#"+this._elementId+"-minute, #"+this._elementId+"-hour").on("zselectboxitemclick", this._timeSelectClickHandler.bind(this));   // No I18N
			this._periodElement && this._periodElement.on("zselectboxitemclick", this._periodClickHandler.bind(this));   // No I18N
		},
		_periodClickHandler: function(orgEvent, ui){
			var hourValue = parseInt(this._hourElement.zselectbox("getAttribute", "selectedValue")), modValue = hourValue % 12;   // No I18N
			if(ui.selectedValue === "AM"){    // No I18N 
				hourValue = modValue === 0 ? 0 : hourValue;
			}
			if(ui.selectedValue === "PM"){   // No I18N
				hourValue = modValue === 0 ? 12 : hourValue + 12;
			}
			this._selectedPeriod = ui.selectedValue;
			this._viewDate.setHours(hourValue);
			this._trigger(this._EVENTS.PERIODCHANGE, orgEvent, {value: this.options.value, valueString: ZDateUtil.formatDate(this.options.value, this.options.format),selectedValue: ui.selectedValue});
			if(this._minTime || this._maxTime || this.options.disabledTimeList.length){
				this._checkTimeOptions(ui, false);
			}
			this._selectedTime = new Date(this._viewDate.getTime());
			if(this.options.immediateCommit && (this._currentSelected || this._selectedDates.length)){
				this._applyClickHandler(orgEvent, true);
			}	
		},
		_timeSelectClickHandler: function(orgEvent, ui){
			var value = parseInt(ui.selectedValue);
			if($(ui.selectbox).attr("id").indexOf("hour") > -1){   // No I18N
				if(this._is12HourFormat){
					var period = this._periodElement.zselectbox("getAttribute", "selectedValue"); // No I18N
					if(period === "PM"){ // No I18N
						value = value % 12 === 0 ? 12 : value + 12; 
					}else{
						value = value % 12 === 0 ? 0 : value;
					}
				}
				this._viewDate.setHours(value);
				this._trigger(this._EVENTS.HOURCHANGE, orgEvent, {value: this.options.value, valueString: ZDateUtil.formatDate(this.options.value, this.options.format), selectedValue: parseInt(ui.selectedValue)});
			}else{
				this._viewDate.setMinutes(value);
				this._trigger(this._EVENTS.MINUTECHANGE, orgEvent, {value: this.options.value, valueString: ZDateUtil.formatDate(this.options.value, this.options.format), selectedValue: parseInt(ui.selectedValue)});
			}
			if(this._minTime || this._maxTime || this.options.disabledTimeList.length){
				this._checkTimeOptions(ui, false);
			}
			this._selectedTime = new Date(this._viewDate.getTime());
			this._updateTimeForMultiple(this._viewDate);
			if(this.options.immediateCommit && (this._currentSelected || this._selectedDates.length)){
				this._applyClickHandler(orgEvent, true);
			}
		},
		_buildInputElement: function(){
			var input = $("<input type='text' style='width:100px' class='zdatetimepicker-timeinput'/>").appendTo(this._timeElement), base = this;  // No I18N
			input.data("zdatetimefield") && input.zdatetimefield("destroy"); // No I18N
			var tempDate;
			if(this.options.value){
				tempDate = new Date();
				tempDate.setHours(this.options.value.getHours(), this.options.value.getMinutes(), 0, 0);
			}
			input.zdatetimefield({
									format: this._is12HourFormat ? "hh:mm tt" : "HH:mm",   // No I18N
									dateTimePicker: false,
									value:  this.options.value ? tempDate : (this._is12HourFormat ? "12:00 AM" : "00:00"),  // No I18N
									min: this._minTime,
									max: this._maxTime,
									hourStep: this.options.hourStep,
									minuteStep: this.options.minuteStep,
									clearButton: "none",  // No I18N
									spinend: this._spinEndHandler.bind(base),
									picker: false,
									change: this._timeFieldChangeHandler.bind(base)
								});
			this._selectedTime = input.zdatetimefield("getAttribute", "value");  // No I18N
		},  
		_timeFieldChangeHandler: function(orgEvent, ui){
			var date = this._timeElement.find("input").zdatetimefield("getAttribute", "value");  // No I18N
			this._trigger(this._EVENTS.TIMECHANGE, orgEvent, {value: date, valueString: ZDateUtil.formatDate(date, this.options.format)});
		},
		_spinEndHandler: function(orgEvent, ui){
			this._timeModified = true;
			var value = ui.dateValue;
			this._selectedTime = value;
			if(value !== undefined && this._viewDate){
				this._viewDate.setHours(value.getHours(), value.getMinutes(), 0,0);
				this._updateTimeForMultiple(value);
				if(this.options.immediateCommit && (this._currentSelected || this._selectedDates.length )){
					this._applyClickHandler(orgEvent, true);
				}
			}
		},
		_updateTimeForMultiple: function(value){
			if(this.options.selectionType === "multiple"){
				for(var i=0;i<this._selectedDates.length;i++){
					this._selectedDates[i].setHours(value.getHours(), value.getMinutes(), 0, 0);
				}
			}
		},
		_createTimeIcon: function(container){
			var timeIcon = this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeIcon), svgEle;
			if(timeIcon.length === 0){
				timeIcon = $("<i class='"+$.zdatetimepicker._CLASSES.timeIcon+"'></i>"); // No I18N
			}else{
				timeIcon.empty();
			}
			timeIcon.removeAttr("class").attr("class", $.zdatetimepicker._CLASSES.timeIcon);  // No I18N
			timeIcon.prependTo(container || this._timeElement);
			var svgData = {
				props: {"viewBox": "0 0 16 16"},  // No I18N
				nodes: [{"path": {"d": "M8,0.6C3.9,0.6,0.6,3.9,0.6,8s3.3,7.4,7.4,7.4s7.4-3.3,7.4-7.4S12.1,0.6,8,0.6z M8,13.9c-3.3,0-5.9-2.6-5.9-5.9c0-3.3,2.6-5.9,5.9-5.9c3.3,0,5.9,2.6,5.9,5.9C13.9,11.3,11.3,13.9,8,13.9z"}},   // No I18N
						{"polygon": {"points": "8.5,7.5 8.5,4.5 6.5,4.5 6.5,9.5 11.5,9.5 11.5,7.5"}}]  // No I18N
			}  
            this._handleIcon(timeIcon, svgData,"time", this.options.timeLabelIconClassName, this.options.timeLabelSVGIconId);  // No I18N
		},
		_createButtons: function(){
			var layout = this._checkIfColumnExists();	
			if(!this._footer){
				this._footer = $("<div class='"+$.zdatetimepicker._CLASSES.footer+"'></div>").appendTo(this.element); // No I18N
			}
			if(!layout){
				this._autoGenSingleColBtns(this._footer);
			}else{
				this._generateCustomCols(this._footer);
			}
			if(this._footer){
				this._reset = this._footer.find(".clearButton-zdatetimepicker");
				this._reset.length && this._reset.attr("aria-label", this.options.clearButtonLabel);  // No I18N
				this._apply = this._footer.find(".OKButton-zdatetimepicker");
				this._apply.length && this._apply.attr("aria-label", this.options.OKButtonLabel);  // No I18N
				this._cancel = this._footer.find(".cancelButton-zdatetimepicker");
				this._cancel.length && this._cancel.attr("aria-label", this.options.cancelButtonLabel);  // No I18N
				this._today = this._footer.find(".zdatetimepicker__todaylink");
				this._today && this._today.attr("aria-label", this.options.todayButtonLabel);  // No I18N
			}
			this._applyButton = this._apply.length ? true : false;
			var valueUnavailable =  this.options.selectionType === "single" ? !this.options.value : (this._selectedDates && this._selectedDates.length === 0);  // No I18N
			this._reset && this._reset.length && valueUnavailable && this._reset.attr("disabled", true).addClass("is-disabled");  // No I18N
			this._monthsPerView === 3 && this.options.buttonsAlignment === "left" &&  this._footer.insertAfter(this.element.find("."+$.zdatetimepicker._CLASSES.container));  // No I18N
		},
		_generateCustomCols: function(footer){
			this._itemsList = [];
			var layout = this.options.commandBar, className ="", len =3, col, count = 0, columns;
			columns = ["leftColumn", "centerColumn", "rightColumn"];  // No I18N
			if(this._monthsPerView > 1){ 
				className = "zdatetimepicker--threecolumn";   // No I18N
			}
			footer.addClass(className);
			for(var i=0;i<3;i++){
				var footerSegment, column = layout[columns[i]];
				if(this._monthsPerView > 1){
					col = $("<div class='zdatetimepicker__column'>").appendTo(footer);
				}
				if(column){
					if(column.halign){
						footerSegment = $("<div class='zdatetimepicker__commandbaractions"+column.halign+"'></div>");  // No I18N
						if(len > 1 && this._monthsPerView > 1){							
							footerSegment.appendTo(col);
						}
						if(this._monthsPerView === 1 || (this._monthsPerView > 1 && len == 1)){
							footerSegment.appendTo(footer);
						}
					}
					for(var j=0;j<column.commands.length;j++){ 
						var command = column.commands[j], buttonExists;
						buttonExists = this._itemsList.indexOf(command) > -1;
						if(command === "OK"){
							if(!this.options.immediateCommit){
								this._applyButton = true;  
							}else{
								continue;
							}
						}
						if(!buttonExists){				
							if(command === "today"){  // No I18N
								$("<a class='zdatetimepicker__todaylink'>"+this.options.todayButtonLabel+"</a>").appendTo(footerSegment); // No I18N
							}else{
								var label = command+"ButtonLabel";  // No I18N
								$("<button role='button' class='zbutton zbutton--small "+(label === "OKButtonLabel" ? "zbutton--primary" : "")+" "+command+"Button-zdatetimepicker'><span class='zbutton__text'>"+this.options[label]+"</span></button>").appendTo(footerSegment); // No I18N						
							}
							this._itemsList[count++] = command;
						}
					}
					if(column.className){
						(col || footerSegment).addClass(column.className);
					}
				}
			}
		},
		_autoGenSingleColBtns: function(footer){
			var commands = this.options, count = 0; 
			if(this._monthsPerView !== 3 ){
				var buttons = ["todayButton", "clearButton", "cancelButton","OKButton"]; // No I18N
				for(var i=0; i<buttons.length;i++){
					if(commands[buttons[i]]){
						if(this.options.immediateCommit && buttons[i] !== "OKButton" || !this.options.immediateCommit){  // No I18N
							count++; 
							this.options.immediateCommit && (commands.OKButton = false);
						}				
					}
				}
				if(count === 1){
					var index;
					for(var i=0; i<buttons.length;i++){
						if(commands[buttons[i]]){ index = i; break; }
					}
					var position = this._CONSTANTS[buttons[index]+"Position"], label = commands[buttons[index]+"Label"], value = buttons[index];  // No I18N	
					if(buttons[index] !== "todayButton"){  // No I18N
						$("<div class='zdatetimepicker__commandbaractions"+position+"'><button role='button' class='zbutton zbutton--small "+(value === "OKButton" ? "zbutton--primary " : "")+value+"-zdatetimepicker"+"'><span class='zbutton__text'>"+label+"</span></button></div>").appendTo(footer); // No I18N
					}else{
						$("<div class='zdatetimepicker__commandbaractionscenter'><a class='zdatetimepicker__todaylink'>"+commands.todayButtonLabel+"</a></div>").appendTo(footer); // No I18N
					}
				}else if(count === 2){
					for(var i=1; i<buttons.length;i++){
						if(commands[buttons[i]]){ index = i; break;}
					}
					var label = commands[buttons[index]+"Label"], value = buttons[index]; // No I18N
					if(commands.todayButton){
						$("<div class='zdatetimepicker__commandbaractionsleft'><a class='zdatetimepicker__todaylink'>"+commands.todayButtonLabel+"</a></div>").appendTo(footer);	  // No I18N
						$("<div class='zdatetimepicker__commandbaractionsright'><button role='button' class='zbutton zbutton--small "+(value === "OKButton" ? "zbutton--primary " : "")+value+"-zdatetimepicker'><span class='zbutton__text'>"+label+"</span></button></div>").appendTo(footer);  // No I18N
					}else if(commands.OKButton && index !== 3){
						var footerElement;
						if(commands.clearButton){
							footerElement = $("<div class='zdatetimepicker__commandbaractionsleft'><button class='zbutton zbutton--small "+value+"-zdatetimepicker'><span class='zbutton__text'>"+commands.clearButtonLabel+"</span></button></div>").prependTo(footer); // No I18N
							$("<div class='zdatetimepicker__commandbaractionsright'><button role='button' class='zbutton zbutton--small zbutton--primary OKButton-zdatetimepicker'><span class='zbutton__text'>"+commands.OKButtonLabel+"</span></div>").appendTo(footer);  // No I18N										
						}else{
							footerElement = $("<div class='zdatetimepicker__commandbaractionsright'><button class='zbutton zbutton--small "+value+"-zdatetimepicker'><span class='zbutton__text'>"+label+"</span></button></div>").appendTo(footer);	// No I18N				
							$("<button role='button' class='zbutton zbutton--small zbutton--primary OKButton-zdatetimepicker'><span class='zbutton__text'>"+commands.OKButtonLabel+"</a>").appendTo(footerElement);  // No I18N															
						}
					}else{
						$("<div class='zdatetimepicker__commandbaractionsleft'><button role='button' class='zbutton zbutton--small clearButton-zdatetimepicker'><span class='zbutton__text'>"+commands.clearButtonLabel+"</span></button></div>").appendTo(footer);	  // No I18N				
						$("<div class='zdatetimepicker__commandbaractionsright'><button role='button' class='zbutton zbutton--small cancelButton-zdatetimepicker'><span class='zbutton__text'>"+commands.cancelButtonLabel+"</span></button></div>").appendTo(footer);		 // No I18N			
					} 
				}else if(count === 3){
					buttons = ["todayButton","OKButton", "clearButton", "cancelButton"];  // No I18N
					for(var i=2;i<buttons.length;i++){
						if(commands[buttons[i]]){ index = i; break;}
					}	
					var rightFooter;
					if(commands.OKButton){
						rightFooter = $("<div class='zdatetimepicker__commandbaractionsright'><button class='zbutton zbutton--small zbutton--primary OKButton-zdatetimepicker'><span class='zbutton__text'>"+commands.OKButtonLabel+"</span></button></div>").appendTo(footer);	// No I18N								
						if(commands.todayButton){
							rightFooter.prepend("<button role='button' class='zbutton zbutton--small "+buttons[i]+"-zdatetimepicker'><span class='zbutton__text'>"+commands[buttons[i]+"Label"]+"</span></button>");  // No I18N
						}
					}else{
						$("<div class='zdatetimepicker__commandbaractionsright'><button role='button' class='zbutton zbutton--small clearButton-zdatetimepicker'><span class='zbutton__text'>"+commands.clearButtonLabel+"</span></button><button class='zbutton zbutton--small'><span class='zbutton__text'>"+commands.cancelButtonLabel+"</span></button></div>").appendTo(footer);	// No I18N				
					}
					if(commands.todayButton){
						$("<div class='zdatetimepicker__commandbaractionsleft'><a class='zdatetimepicker__todaylink'>"+commands.todayButtonLabel+"</a></div>").appendTo(footer);	  // No I18N					
					}else{
						$("<div class='zdatetimepicker__commandbaractionsleft'><button role='button' class='zbutton zbutton--small clearButton-zdatetimepicker'><span class='zbutton__text'>"+commands.clearButtonLabel+"</span></button></div>").prependTo(footer);	  // No I18N					
						rightFooter.prepend("<button role='button' class='zbutton zbutton--small cancelButton-zdatetimepicker'><span class='zbutton__text'>"+commands.cancelButtonLabel+"</span></button>");						
					}
				}else if(count === 4){
					var footerEle = this.element.find(".zdatetimepicker__commandbaractionsright");
					$("<div class='zdatetimepicker__commandbaractionsleft'><button role='button' class='zbutton zbutton--small clearButton-zdatetimepicker'><span class='zbutton__text'>"+commands.clearButtonLabel+"</span></button></div>").prependTo(footer);	  // No I18N					
					$("<div class='zdatetimepicker__commandbaractionscenter'><a class='zdatetimepicker__todaylink'>"+commands.todayButtonLabel+"</a></div>").appendTo(footer); // No I18N
					var cancelElement = $("<button role='button' class='zbutton zbutton--small cancelButton-zdatetimepicker'><span class='zbutton__text'>"+commands.cancelButtonLabel+"</span></button>");
					var applyElement = $("<button role='button' class='zbutton zbutton--small zbutton--primary OKButton-zdatetimepicker'><span class='zbutton__text'>"+commands.OKButtonLabel+"</span></button>");
					var footerEle = $("<div class='zdatetimepicker__commandbaractionsright'></div>").appendTo(footer);	// No I18N		
					cancelElement.appendTo(footerEle);
					applyElement.appendTo(footerEle);
				}
			}else{
				var compartment = $("<div class='zdatetimepicker__commandbaractions"+this.options.buttonsAlignment+"'>").appendTo(footer);  // No I18N
				var buttons;
				if(this.options.buttonsAlignment === "right"){  // No I18N
					buttons = ["clearButton", "todayButton", "cancelButton", "OKButton"];  // No I18N
				}else{
					buttons = ["OKButton", "cancelButton", "todayButton", "clearButton"];  // No I18N
				}
				for(var i=0;i<buttons.length;i++){
					if(commands[buttons[i]]){
						if(buttons[i] === "todayButton"){
							$("<a class='zdatetimepicker__todaylink'>"+commands.todayButtonLabel+"</a>").appendTo(compartment);
						}else{
							var label = commands[buttons[i] + "Label"], className = buttons[i]+"-zdatetimepicker";  // No I18N
							$("<button role='button' class='zbutton zbutton--small "+className+" "+(buttons[i] === "OKButton" ? "zbutton--primary" : '')+"'><span class='zbutton__text'>"+label+"</span></button>").appendTo(compartment);  // No I18N
						}
					}
				}
			}
		},
		_todayClickHandler: function(orgEvent){
			var oldViewDate = new Date(this._viewDate.getTime()), oldViewMode = this._viewMode;
			this._viewDate = new Date();	
			this._viewDate.setHours(0,0,0,0);
			if((this._viewMode === 0 && !ZDateUtil.areDatesEqual(this._viewDate, oldViewDate)) || this._viewMode !== 0){
				this._setViewMode(0, true);
				this._renderContent();
			}
			this._trigger(this._EVENTS.TODAYBUTTONCLICK, orgEvent, {valueString: ZDateUtil.formatDate(this._viewDate, this.options.format), value: this._viewDate});
			if(this.options.todayButtonAction === "navigate-and-select"){	  // No I18N
				var todayElement = this.element.find("[data-time='"+this._viewDate.getTime()+"']");  // No I18N
				if(!todayElement.hasClass($.zdatetimepicker._CLASSES.disabled)){
					this._setDate(orgEvent,todayElement, this._viewDate);  
					oldViewMode === 0 && this.options.closeOnDateSelect && this.options.immediateCommit && this.options.selectionType === "single" && this._closePicker();  // No I18N
				}
			} 
		},
		_bindSelectBox: function(){
			this._monthHeader && this._monthHeader.zselectbox({ 
																dropdownList: { width: 99, height: 330,  className: "zdatetimepicker--menu"},   // No I18N
																width: "107px"  // No I18N
																
															});
			this._yearHeader && this._yearHeader.zcombobox({
															 acceptNewValues: true,
															 dropdownList: { width: 99,	height: 330, className: "zdatetimepicker--menu"},   // No I18N
															 width: "82px"  // No I18N
														   });
		},
		_bindEvents: function(preventBinding){
			var displayType = this.options.navigationBar.monthYearSwitcherType, disabledCl = $.zdatetimepicker._CLASSES.disabled;
		
			this._bindArrowEvents();

			!preventBinding && this.element.off("mousedown."+this.eventPrefix).on("mousedown."+this.eventPrefix, "."+$.zdatetimepicker._CLASSES.date+":not(."+disabledCl+")"+", ."+$.zdatetimepicker._CLASSES.adjacent+":not(."+disabledCl+"), .zdatetimepicker__monthview:not(."+disabledCl+"), .zdatetimepicker__year:not(."+disabledCl+"), .zdatetimepicker__decade:not(."+disabledCl+")", this._dateClickHandler.bind(this)); // No I18N
			
			this.element.off("mouseover."+this.eventPrefix).on("mouseover."+this.eventPrefix, this._mouseOverHandler.bind(this));  // No I18N

			this._monthsPerView === 1 && displayType === "drilldown" && this._monthYearNav && this._monthYearNav.on("click."+this.eventPrefix, this._monthYearNavClickHandler.bind(this)); // No I18N
			
			displayType === "dropdown" && $("#"+this._elementId+"-month-header, #"+this._elementId+"-year-header").on("zselectboxitemclick zcomboboxchange",  this._selectClickHandler.bind(this)); // No I18N
			this.element.on("keydown."+this.eventPrefix, this._keydownHandler.bind(this)); // No I18N
		},
		_keydownHandler: function(orgEvent){
			if(orgEvent.keyCode === ZComponents.keyCode.ESCAPE){
				this._closePicker(orgEvent);
			}
		},
		_mouseOverHandler: function(orgEvent){
			var target = $(orgEvent.target);
			if(target.closest("."+$.zdatetimepicker._CLASSES.date).length || target.closest("."+$.zdatetimepicker._CLASSES.adjacent).length){
				this._trigger(this._EVENTS.DATEMOUSEOVER, orgEvent, {cell: target});
			}
		},
		_monthYearNavClickHandler: function(orgEvent, element){
			if(this.options.navigationBar.monthSwitcher){
				orgEvent.stopPropagation();
				this._fillMonths(orgEvent, element);
			}else if(this.options.navigationBar.yearSwitcher){
				orgEvent.stopPropagation();
				this._fillYears(orgEvent, element);
			}
		},
		_fillMonths: function(firstView, element){
			var orgEvent;
			element = element || this.element;
			firstView && firstView.type !== undefined && (orgEvent = firstView);
			this._trigger(this._EVENTS.BEFOREDRILLDOWN, orgEvent, {viewMode: this._viewMode, element: this.element});
			if(!this._monthDrillDownElement){
				this._monthDrillDownElement = $("<div class='zdatetimepicker__months "+$.zdatetimepicker._CLASSES.body+"'>").insertAfter(element.find(".zdatetimepicker__days")[0]); // No I18N
				this._buildMonthNavBar();
				this._buildMonthNavBarBody();
				this.options.navigationBar.yearSwitcher && this._monthDrillDownElement.find("."+$.zdatetimepicker._CLASSES.monthYearNav).on("click."+this.eventPrefix, this._fillYears.bind(this)).addClass("h-cursorpointer"); // No I18N
			}else{
				this._updateMonthClasses(element);
				this._updateYearArrowState(1);
			}
			this._setViewMode(1, typeof firstView === "boolean", element);  // No I18N
			this._trigger(this._EVENTS.DRILLDOWN, orgEvent, {viewMode: this._viewMode, element: this.element, viewElement: this._monthDrillDownElement});
		},
		_fillYears: function(firstView, element){
			var orgEvent;
			if(firstView && firstView.type !== undefined){
				firstView.stopPropagation();
				firstView.preventDefault();
			} 
			if(!(this._monthDrillDownElement && this._viewMode === 1)){
				this._fillMonths(undefined, element);
			}
			this._trigger(this._EVENTS.BEFOREDRILLDOWN, orgEvent, {viewMode: this._viewMode, element: this.element});
			if(!this._yearDrillDownElement){
				this._yearDrillDownElement = $("<div class='zdatetimepicker__years "+$.zdatetimepicker._CLASSES.body+"'>"); // No I18N
				this._monthDrillDownElement ? this._yearDrillDownElement.insertAfter(this._monthDrillDownElement) : undefined;
				this._buildYearNavBar();
				this._buildYearNavBarBody();
				this._yearDrillDownElement.find("."+$.zdatetimepicker._CLASSES.monthYearNav).on("click."+this.eventPrefix, this._fillDecades.bind(this)).addClass("h-cursorpointer"); // No I18N
			}else{
				this._yearDrillDownElement.find("."+$.zdatetimepicker._CLASSES.gridContainer).remove(); // No I18N
				var curYear = this._viewDate.getFullYear(), yearStart = (Math.floor(curYear/10) * 10), yearEnd = yearStart + 9;
				this._yearDrillDownElement.find("."+$.zdatetimepicker._CLASSES.yearNav).text(yearStart+"-"+yearEnd); // No I18N
				this._yearNavBar.find("."+$.zdatetimepicker._CLASSES.yearNav).data({start: yearStart});	
				this._updateYearArrowState(2, yearStart);		
				this._buildYearNavBarBody();
			}
			this._setViewMode(2, typeof firstView === "boolean", element);  // No I18N
			this._trigger(this._EVENTS.BEFOREDRILLDOWN, orgEvent, {viewMode: this._viewMode, element: this.element, viewElement: this._yearDrillDownElement});
		},
		_fillDecades: function(firstView, element){
			var orgEvent;
			if(firstView.type !== undefined){
				firstView.stopPropagation();
				firstView.preventDefault();
			}
			if(!this._yearDrillDownElement){
				this._fillYears(undefined, element);
			}
			this._trigger(this._EVENTS.BEFOREDRILLDOWN, orgEvent, {viewMode: this._viewMode, element: this.element});
			if(!this._decadeDrillDownElement){
				this._decadeDrillDownElement = $("<div class='zdatetimepicker__decades "+$.zdatetimepicker._CLASSES.body+"'>"); // No I18N
				this._yearDrillDownElement ? this._decadeDrillDownElement.insertAfter(this._yearDrillDownElement) : undefined;
				this._buildDecadeNavBar();
				this._buildDecadeNavBarBody();
			}else{
				this._decadeDrillDownElement.find("."+$.zdatetimepicker._CLASSES.gridContainer).remove();
				var curYear = this._viewDate.getFullYear(), yearStart = (Math.floor(curYear/100) * 100), yearEnd = yearStart + 90;
				this._decadeDrillDownElement.find("."+$.zdatetimepicker._CLASSES.yearNav).text(yearStart+"-"+yearEnd); // No I18N
				this._decadeNavBar.find("."+$.zdatetimepicker._CLASSES.yearNav).data({start: yearStart});				
				this._buildDecadeNavBarBody();		
			}
			this._setViewMode(3, typeof firstView === "boolean", element);  // No I18N
			this._trigger(this._EVENTS.BEFOREDRILLDOWN, orgEvent, {viewMode: this._viewMode, element: this.element, viewElement: this._decadeDrillDownElement});
		},
		_buildDecadeNavBar: function(){
			this._decadeNavBar = $("<div class='"+$.zdatetimepicker._CLASSES.navBar+"'></div>"); // No I18N
			var curYear = this._viewDate.getFullYear();
			var yearStart = (Math.floor(curYear/100) * 100), yearEnd = yearStart + 90;
			var yearNav = "<div class='"+$.zdatetimepicker._CLASSES.monthYearNav+"'><span class='"+$.zdatetimepicker._CLASSES.yearNav+"'>"+yearStart+" - "+yearEnd+"</span></div>"; // No I18N
			this._decadeDrillDownElement.append(this._decadeNavBar);
			this._createNavButtons(this._decadeNavBar, yearNav, 3);
			this._updateYearArrowState(3, yearStart);
			this._decadeNavBar.find("."+$.zdatetimepicker._CLASSES.yearNav).data({start: yearStart});
			$("#"+this._elementId+"-left-month-3, #"+this._elementId+"-right-month-3").on("click."+this.eventPrefix, this._handleDecadeArrowClick.bind(this));
		},
		_buildDecadeNavBarBody: function(year){
			var curYear = year || this._viewDate.getFullYear();
			var yearStart = (Math.floor(curYear/100) * 100) - 10, yearEnd = yearStart + 120, j=0;
			var yearTable = $("<div class='"+$.zdatetimepicker._CLASSES.gridContainer+"'><table class='"+$.zdatetimepicker._CLASSES.monthYearTable+"'><tbody></tbody></table></div>"), yearHTML; // No I18N
			yearHTML = "<tr role='row'>"; // No I18N
			yearTable.insertAfter(this._decadeNavBar);
			for(var i=yearStart; i < yearEnd; i = i + 10){
				j++;
				var classes = this._getDecadeClass(i,j);
				yearHTML += "<td role='gridcell' class='"+classes+"'>"+i+"</td>"; // No I18N
				if(j!== 12 && j % 4 === 0){
					yearHTML += "<tr role='row'>" // No I18N
				}
			}
			yearTable.find("tbody").append(yearHTML); // No I18N
		},
		_getDecadeClass: function(decade,index){
			var classes = (index === 1 || index === 12 ? " zdatetimepicker__drilldownnearlevelcell" : $.zdatetimepicker._CLASSES.grid)+" zdatetimepicker__decade ", min = this._minDate, max = this._maxDate; // No I18N
			if((min && decade < Math.floor(min.getFullYear()/10) * 10) || (max && decade > Math.floor(max.getFullYear()/10) * 10)){
				classes += " "+$.zdatetimepicker._CLASSES.disabled;  // No I18N
			}
			return classes;
		},
		_buildYearNavBarBody: function(year){
			var curYear = year || this._viewDate.getFullYear();
			var yearStart = (Math.floor(curYear/10) * 10) - 1, yearEnd = yearStart + 12, j=0;
			var yearTable = $("<div class='"+$.zdatetimepicker._CLASSES.gridContainer+"'><table class='"+$.zdatetimepicker._CLASSES.monthYearTable+"'><tbody></tbody></table></div>"), yearHTML; // No I18N
			yearHTML = "<tr role='row'>"; // No I18N
			yearTable.insertAfter(this._yearNavBar);
			for(var i=yearStart; i < yearEnd; i++){
				j++;
				var classes = this._getYearClasses(i, j);
				yearHTML += "<td role='gridcell' class='"+classes+"' data-year='"+i+"'>"+i+"</td>"; // No I18N
				if(j!== 12 && j % 4 === 0){
					yearHTML += "<tr role='row'>"; // No I18N
				}
			}
			yearTable.find("tbody").html(yearHTML); // No I18N
		},
		_getYearClasses: function(year, index){
			var classes = 'zdatetimepicker__year '+(index === 1 || index === 12 ? " zdatetimepicker__drilldownnearlevelcell" : $.zdatetimepicker._CLASSES.grid), today = new Date(), min = this._minDate, max = this._maxDate;  // No I18N
			if(this.options.value && this.options.value.getFullYear() === year && this._currentSelected && this._currentSelected.getFullYear() === year){
				classes += " "+$.zdatetimepicker._CLASSES.selected;  // No I18N
			}
			if(this._currentSelected && this._currentSelected.getFullYear() === year){
				classes += " "+$.zdatetimepicker._CLASSES.selected;  // No I18N
			}
			if(this.options.selectionType === "multiple" && this.options.values.length){
				for(var i=0, len = this._selectedDates.length; i<len;i++){
					if(year === this._selectedDates[i].getFullYear()){
						classes += " "+$.zdatetimepicker._CLASSES.selected;  // No I18N
					}
				}			
			}
			if(today.getFullYear() === year){
				classes += " "+$.zdatetimepicker._CLASSES.currentGrid;  // No I18N
			}
			if((min && year < min.getFullYear()) || (max && year > max.getFullYear()) || this.options.disabledYears && this.options.disabledYears.indexOf(year) > -1){
				classes += " "+$.zdatetimepicker._CLASSES.disabled;  // No I18N
			}
			return classes;	
		},
		_buildYearNavBar: function(){
			this._yearNavBar = $("<div class='"+$.zdatetimepicker._CLASSES.navBar+"'></div>"); // No I18N
			var curYear = this._viewDate.getFullYear();
			var yearStart = (Math.floor(curYear/10) * 10), yearEnd = yearStart + 9;
			var yearNav = "<div class='"+$.zdatetimepicker._CLASSES.monthYearNav+"'><span class='"+$.zdatetimepicker._CLASSES.yearNav+"'>"+yearStart+" - "+yearEnd+"</span></div>"; // No I18N
			this._yearDrillDownElement.append(this._yearNavBar);
			this._createNavButtons(this._yearNavBar, yearNav, 2);
			this._updateYearArrowState(2, yearStart);
			this._yearNavBar.find("."+$.zdatetimepicker._CLASSES.yearNav).data({start: yearStart});
			$("#"+this._elementId+"-left-month-2, #"+this._elementId+"-right-month-2").on("click."+this.eventPrefix, this._handleDecadeArrowClick.bind(this));
		},
		_handleDecadeArrowClick: function(orgEvent, element, viewDate){
			orgEvent.stopPropagation();
			var target = $(orgEvent.target), id = orgEvent.currentTarget.getAttribute("id");
			element = element || this.element;
			viewDate = viewDate || this._viewDate;
			if(!target.closest("."+$.zdatetimepicker._CLASSES.navButton).hasClass($.zdatetimepicker._CLASSES.disabled)){
				var navElement, moveBy, startFactor, year, curYear, yearStart, endFactor, yearEnd;
				navElement = element.find("."+(this._viewMode === 2 ? "zdatetimepicker__years" : "zdatetimepicker__decades")).find("."+$.zdatetimepicker._CLASSES.yearNav); // No I18N
				moveBy = id.indexOf(this._elementId+"-right-month") > -1 ? 1 : -1; // No I18N
				startFactor = this._viewMode === 2 ? 10 : 100;
				endFactor = this._viewMode === 2 ? 9 : 90;
				year = navElement.data("start") || viewDate.getFullYear();  // No I18N
				curYear = year + (startFactor * moveBy);
				element.find("."+(this._viewMode === 2 ? "zdatetimepicker__years" : "zdatetimepicker__decades")).find("."+$.zdatetimepicker._CLASSES.gridContainer).remove(); // No I18N
				this._viewMode === 2 ? this._buildYearNavBarBody(curYear) : this._buildDecadeNavBarBody(curYear);
				yearStart = (Math.floor(curYear/startFactor) * startFactor);
				yearEnd = yearStart + endFactor;
				navElement.text(yearStart+" -"+yearEnd); // No I18N
				navElement.data({start: yearStart});
				this._updateYearArrowState(this._viewMode, yearStart);
			}
			this._trigger(this._EVENTS[this._viewMode === 2 ? "DECADECHANGE" : "CENTURYCHANGE"], orgEvent, {viewDate: this._viewDate, value: this.options.value});  // No I18N
		},
		_createNavButtons: function(navBar, navElement, viewMode){
			var displayType = this.options.navigationBar.navigationButtonsDisplayPattern, leftNav, rightNav; 
			if(displayType === "split" || (displayType === "together" && this.options.navigationBar.togetherTypeNavigationButtonsPosition === "left")){  // No I18N
				leftNav =  $($.zdatetimepicker._LEFTNAV);
				displayType === "together" && navBar.addClass($.zdatetimepicker._CLASSES.navOnLeft);  // No I18N
			}
			if(displayType === "split" || (displayType === "together" && this.options.navigationBar.togetherTypeNavigationButtonsPosition === "right")){  // No I18N
				rightNav =  $($.zdatetimepicker._RIGHTNAV);
				displayType === "together" && navBar.addClass($.zdatetimepicker._CLASSES.navOnRight);  // No I18N
			}
			leftNav && navBar.append(leftNav);
			navBar.append(navElement);
			rightNav &&	navBar.append(rightNav);
			this._createMonthArrows(leftNav, rightNav, viewMode, true, true);
		},	
		_buildMonthNavBar: function(){
			this._monthNavBar = $("<div class='"+$.zdatetimepicker._CLASSES.navBar+"'></div>");
			var displayType = this.options.navigationBar.navigationButtonsDisplayPattern;
			var leftNav,rightNav;
			var yearNav = "<div class='"+$.zdatetimepicker._CLASSES.monthYearNav+"'><span class='"+$.zdatetimepicker._CLASSES.yearNav+"'>"+this._viewDate.getFullYear()+"</span></div>"; // No I18N
			this._monthDrillDownElement.append(this._monthNavBar);
			this._createNavButtons(this._monthNavBar, yearNav, 1);
			this._updateYearArrowState(1);
			$("#"+this._elementId+"-left-month-1, #"+this._elementId+"-right-month-1").on("click."+this.eventPrefix, this._handleYearClick.bind(this)); // No I18N
		},
		_handleYearClick: function(orgEvent, viewElement, viewDate){
			this._rowsCount = [];
			var target = $(orgEvent.target), id = orgEvent.currentTarget.getAttribute("id");
			if(!target.closest("."+$.zdatetimepicker._CLASSES.navButton).hasClass($.zdatetimepicker._CLASSES.disabled)){
				var moveBy = (id.indexOf(this._elementId+"-right-year")  > -1 || id.indexOf(this._elementId+"-right-month") > -1 && this._viewMode > 0) ? this.options.navigationBar.yearNavigationStep : -this.options.navigationBar.yearNavigationStep; // No I18N
				viewDate = viewDate || this._viewDate, viewElement = viewElement || this.element;
				viewDate.setFullYear(viewDate.getFullYear() + moveBy);
				this._viewDate = new Date(viewDate.getTime());
				this._fillNavBarContent(viewDate, viewElement.find(".zdatetimepicker__months"));
				this._updateYearArrowState(1);
				this._updateMonthClasses(viewElement);
			}
		},
		_updateYearArrowState: function(viewMode, year){
			year = year || this._viewDate.getFullYear();
			var factor;
			if(viewMode === 1){
				factor = 1;
			}else if(viewMode === 2){
				factor = 10;	
			}else if(viewMode === 3){
				factor = 100
			}
			var right = this._maxDate && year + factor > Math.floor(this._maxDate.getFullYear()/factor) * factor || false;
			$("#"+this._elementId+"-right-month-"+viewMode).toggleClass($.zdatetimepicker._CLASSES.disabled, right);   // No I18N
			var left = this._minDate && year - factor < Math.floor(this._minDate.getFullYear()/factor) * factor || false;
			$("#"+this._elementId+"-left-month-"+viewMode).toggleClass($.zdatetimepicker._CLASSES.disabled, left);	 // No I18N	
		},
		_createYearArrows: function(leftNav, rightNav, isLeft, isRight){
			var arrow1, arrow2, yearLeft, yearRight, leftIconEle, rightIconEle, navBar = this.options.navigationBar;
			if(isLeft){
				var yearLeftText;
				yearLeft = $($.zdatetimepicker._NAVBUTTON).attr("id", this._elementId+"-left-year"); // No I18N
				leftIconEle = yearLeft.find("."+$.zdatetimepicker._CLASSES.navIcon);  // No I18N
				var svgData = {
					props: {"viewBox": "0 0 12 12"},  // No I18N
					nodes: [{"polygon": {"points": "5.6,10.3 1.9,6.5 5.6,2.6 6.3,3.4 3.3,6.5 6.4,9.6"}},   // No I18N
							{"polygon": {"points": "9.6,10.3 5.9,6.5 9.6,2.6 10.3,3.4 7.3,6.5 10.4,9.6"}}]  // No I18N
				};
				this._handleIcon(leftIconEle, svgData, "leftyear", navBar.previousYearButtonIconClassName, navBar.previousYearButtonSVGIconId);  // No I18N
				if(navBar.navigationButtonsDisplayPattern === "split"){ // No I18N
					yearLeft.prependTo(leftNav);
				}else{
					if(navBar.togetherTypeNavigationButtonsPosition === "right"){ // No I18N
						yearLeft.prependTo(rightNav);
					}else{
						yearLeft.prependTo(leftNav);
					}
				}
				yearLeftText =  this._getI18N(this.eventPrefix, "prevYear" , this.options.keys);  // No I18N
				yearLeft.attr({"title": yearLeftText, "aria-label": yearLeftText});  // No I18N
			}
			if(isRight){
				var yearRightText;
				yearRight = $($.zdatetimepicker._NAVBUTTON).attr("id", this._elementId+"-right-year"); // No I18N
				rightIconEle = yearRight.find("."+$.zdatetimepicker._CLASSES.navIcon);  // No I18N
				var svgData = {
					props: {"viewBox": "1 0 12 12"},  // No I18N
					nodes: [{"polygon": {"points": "7.4,10.3 6.7,9.6 9.7,6.5 6.6,3.4 7.4,2.7 11.1,6.5"}},   // No I18N
							{"polygon": {"points": "3.4,10.3 2.7,9.6 5.7,6.5 2.6,3.4 3.4,2.7 7.1,6.5"}}]  // No I18N
				};
				this._handleIcon(rightIconEle, svgData, "rightyear", navBar.nextYearButtonIconClassName, navBar.nextYearButtonSVGIconId);  // No I18N
				if(navBar.togetherTypeNavigationButtonsPosition === "right" || navBar.navigationButtonsDisplayPattern === "split"){ // No I18N
					yearRight.appendTo(rightNav)
				}else if(navBar.togetherTypeNavigationButtonsPosition === "left"){ // No I18N
					yearRight.appendTo(leftNav)
				}
				yearRightText =  this._getI18N(this.eventPrefix, "nextYear" , this.options.keys);  // No I18N
				yearRight.attr({"title": yearRightText, "aria-label": yearRightText});  // No I18N
			}
		},
		_getMonthClasses: function(month){
			var classes = 'zdatetimepicker__monthview '+$.zdatetimepicker._CLASSES.grid, today = new Date(), min = this._minDate, max = this._maxDate;  // No I18N
			if(this.options.value && this.options.value.getMonth() === month && this.options.value.getFullYear() === this._viewDate.getFullYear()){
				if(this._currentSelected && this._currentSelected.getMonth() === month && this._currentSelected.getFullYear() === this._viewDate.getFullYear()){
					classes += " "+$.zdatetimepicker._CLASSES.selected;  // No I18N
				}			
			}
			if(this._currentSelected && this._currentSelected.getMonth() === month && this._currentSelected.getFullYear() === this._viewDate.getFullYear()){
				classes += " "+$.zdatetimepicker._CLASSES.selected;  // No I18N
			}	
			if(this.options.selectionType === "multiple"){ // No I18N
				for(var i=0, len = this._selectedDates.length; i<len;i++){
					if(this._viewDate.getFullYear() === this._selectedDates[i].getFullYear() && this._selectedDates[i].getMonth() === month){
						classes += " "+$.zdatetimepicker._CLASSES.selected;  // No I18N
					}
				}			
			}
			if(today.getMonth() === month && today.getFullYear() === this._viewDate.getFullYear()){
				classes += " "+$.zdatetimepicker._CLASSES.currentGrid;  // No I18N
			}
			if((min && (this._viewDate.getFullYear() === min.getFullYear() && month < min.getMonth() || this._viewDate.getFullYear() < min.getFullYear())) || (max && (this._viewDate.getFullYear() === max.getFullYear() && month > max.getMonth() || this._viewDate.getFullYear() > max.getFullYear())) || (this.options.disabledMonths instanceof Array && this.options.disabledMonths.indexOf(month) > -1) || (this.options.disabledYears instanceof Array && this.options.disabledYears.indexOf(this._viewDate.getFullYear()) > -1)){
				classes += " "+$.zdatetimepicker._CLASSES.disabled;  // No I18N
			}
			return classes;
		},
		_buildMonthNavBarBody: function(){
			var monthTable = $("<div class='"+$.zdatetimepicker._CLASSES.gridContainer+"'><table class='"+$.zdatetimepicker._CLASSES.monthYearTable+"'><tbody></tbody></table></div>"), monthHTML='', selected = ''; // No I18N
			var	months = this.options.navigationBar.monthFormatInSwitcher.indexOf("MMMM") > -1 ? this._getI18N(this.eventPrefix, "months", this.options.keys) : this._getI18N(this.eventPrefix, "monthsAbbreviated", this.options.keys); // No I18N
			monthTable.insertAfter(this._monthNavBar);
			monthHTML = "<tr role='row'>"; // No I18N
			for(var i=0;i<12;i++){
				var classes = this._getMonthClasses(i);
				monthHTML += "<td role='gridcell' class='"+classes+" ' data-month-index='"+i+"'>"+months[i]+"</td>"; // No I18N
				if(i+1 !== 12 && (i+1)%4 === 0){
					monthHTML += "<tr role='row'>"; // No I18N
				}
			}
			monthTable.find("tbody").append(monthHTML); // No I18N
		},
		_closeClickHandler: function(orgEvent){
			this._closePicker(orgEvent);
		},
		_selectClickHandler: function(orgEvent, ui, element){
			this._rowsCount = [];
			var selectedVal = Number(ui.selectedValue), monthChanged, yearChanged, count = this._monthsPerView;
			this._viewDate.setDate(1);
			if(ui.dropdownList){
				if(ui.dropdownList.attr("id").indexOf("month-header") > -1){ // No I18N
					this._viewDate.setMonth(selectedVal);
					monthChanged = true;
					this._buildDropdownNavElement(selectedVal);
				}else{
					this._viewDate.setFullYear(selectedVal || this._viewDate.getFullYear());
					yearChanged = true;
					this._buildDropdownNavElement(undefined, selectedVal || this._viewDate.getFullYear());
				}
			}
			if(this._minDate && ZDateUtil.isGreater(this._minDate, this._viewDate)){
				this._viewDate.setFullYear(this._minDate.getFullYear());
				while(ZDateUtil.isGreater(this._minDate, this._viewDate) && !ZDateUtil.areDatesEqual(this._minDate, this._viewDate)){
					if(this._viewDate.getMonth() === this._minDate.getMonth() && this._viewDate.getFullYear() === this._minDate.getFullYear()){
						this._viewDate.setDate(this._minDate.getDate());
					}else{
						this._viewDate.setFullYear(this._viewDate.getFullYear() + 1);
					}
				}
				this._yearHeader && this._yearHeader.zcombobox("setAttribute", "selectedValue", this._viewDate.getFullYear());  // No I18N
			}
			if(this._maxDate && ZDateUtil.isGreater(this._viewDate, this._maxDate)){
				this._viewDate.setFullYear(this._maxDate.getFullYear());
				while(ZDateUtil.isGreater(this._viewDate, this._maxDate) && !ZDateUtil.areDatesEqual(this._maxDate, this._viewDate)){
					this._viewDate.setFullYear(this._viewDate.getFullYear() - 1);
				}
				this._yearHeader && this._yearHeader.zcombobox("setAttribute", "selectedValue", this._viewDate.getFullYear());  // No I18N
			}
			for(var i=0; i<count; i++){
				var newDate = new Date(this._viewDate.getTime()), element = count === 1 ? element || this.element : $(this.element.find("."+$.zdatetimepicker._CLASSES.datepicker)[i]);
				newDate = this._moveMonth(this._viewDate, i);
				if(count > 1 && this.options.selectionType === "multiple" && i === 0 && this._yearHeader){   // No I18N
					newDate.setFullYear(this._yearHeader.zcombobox("getValue"));   // No I18N 
				}
				monthChanged = true;
				this._fillDates(newDate, element);
				(i === 0 || i === this._monthsPerView - 1) && this._updateArrowState(newDate, i);
				if(i !== 0){
					element.find("."+$.zdatetimepicker._CLASSES.monthNav).text(this._getI18N(this.eventPrefix, this.options.navigationBar.monthYearHeadingFormat.split(" ").indexOf("MMMM") > -1 ?  "months" : "monthsAbbreviated" , this.options.keys)[newDate.getMonth()]);  // No I18N
					element.find("."+$.zdatetimepicker._CLASSES.yearNav).text(newDate.getFullYear());  // No I18N	
				}
			}
			if(this._minDate || this._maxDate){
				this._checkOptions(selectedVal, element);
			}
			this._validateDisabledMonthYear();
			this._appendEmptyTd();
			this._trigger(monthChanged ? this._EVENTS.MONTHCHANGE : this._EVENTS.YEARCHANGE, orgEvent, {viewDate: this._viewDate, value: this.options.value, selectedValue: monthChanged ? this._viewDate.getMonth() : this._viewDate.getFullYear()}); 

		},
		_dateClickHandler: function(orgEvent, element){
			orgEvent.stopPropagation();
			orgEvent.preventDefault();
			var target = $(orgEvent.target), displayType = this.options.navigationBar.monthYearSwitcherType;
			if(target.closest("."+$.zdatetimepicker._CLASSES.date).length){  // No I18N
				target = target.closest("."+$.zdatetimepicker._CLASSES.date);  // No I18N
			}else if(target.closest("."+$.zdatetimepicker._CLASSES.adjacent).length){  // No I18N
				target = target.closest("."+$.zdatetimepicker._CLASSES.adjacent);   // No I18N
			}   
			var selectedDate;
			target.attr("data-time") && (selectedDate = new Date(parseInt(target.attr("data-time"))));  // No I18N
			if(target.hasClass($.zdatetimepicker._CLASSES.date) && selectedDate){
				this._setDate(orgEvent, target, selectedDate);
			}else if(this.options.allowSelectionOfAdjacentMonthDates && target.hasClass($.zdatetimepicker._CLASSES.adjacent) && selectedDate){
				var isSelected = target.hasClass("is-selected");  // No I18N
				this._setDate(orgEvent, target, selectedDate);
				this._viewDate = new Date(selectedDate.getTime());
				if(this._monthsPerView > 1 && this.options.selectedDateMonthViewIndex >= 0){
					this._viewDate = this._moveMonth(this.options.value, -this.options.selectedDateMonthViewIndex);
				}
				this._renderContent();
				this.options.selectionType === "single" || (this.options.selectionType === "multiple" && !isSelected) && this.element.find("[data-time='"+selectedDate.getTime()+"']").addClass($.zdatetimepicker._CLASSES.selected).attr("aria-selected", true);  // No I18N
			}else if(target.hasClass("zdatetimepicker__monthview") ||  target.hasClass("zdatetimepicker__year")){ // No I18N
				var oldDate = new Date(this._viewDate.getTime()), isMonth;
				if(target.hasClass("zdatetimepicker__monthview")){ // No I18N
					isMonth = true;
					this._viewDate.setMonth(parseInt(target.attr("data-month-index")));	 // No I18N
				}
				if(target.hasClass("zdatetimepicker__year")){ // No I18N
					this._viewDate.setFullYear(parseInt(target.text()));
				}
				if(this.options.navigationBar.updateDateOnMonthYearSwitch && this.options.immediateCommit){
					this._applyClickHandler(orgEvent, true);
				}
				if(this._viewMode !== 0){
					var viewMode = this._viewMode - 1;
					if(target.hasClass("zdatetimepicker__year")){
						if(!this.options.navigationBar.monthSwitcher){
							viewMode = 0;
						}
					}
					this._setViewMode(viewMode);
					if(this._viewMode === 0){
						this._renderContent(0);
					}
					if(this._viewMode === 1){
						this.element.find(".zdatetimepicker__months").find("."+$.zdatetimepicker._CLASSES.yearNav).text(this._viewDate.getFullYear()); // No I18N
						this._updateMonthClasses();
						this._updateYearArrowState(1);
					}
				}
				this._trigger(isMonth ? this._EVENTS.MONTHCHANGE : this._EVENTS.YEARCHANGE, orgEvent, {viewDate: this._viewDate, value: this.options.value, selectedValue: isMonth ? parseInt(target.attr("data-month-index")) : parseInt(target.text())});  // No I18N
			}else if(target.hasClass("zdatetimepicker__decade")){ // No I18N
				this._viewDate.setFullYear(parseInt(target.text()));
				if(this._viewMode !== 0){
					this._setViewMode(this._viewMode - 1);
					if(this._viewMode === 2){
						this._fillYears();
					}
				}
				this._trigger(this._EVENTS.DECADECHANGE, orgEvent, {viewDate: this._viewDate, value: this.options.value, selectedValue: parseInt(target.text())});
			}
		},
		_updateMonthClasses: function(element){
			element = element || this.element;
			var months = element.find(".zdatetimepicker__monthview");
			for(var i=0; i<12; i++){
				var classes = this._getMonthClasses(i);
				$(months[i]).attr("class", classes);
			}
		},
		_renderContent: function(startValue, container, updateNavBar, updateArrowState){
			updateNavBar = updateNavBar === undefined ? true : updateNavBar;
			updateArrowState = updateArrowState === undefined ? true : updateArrowState;
			container = container || this.element;
			startValue = startValue || 0;
			var element, displayType = this.options.navigationBar.monthYearSwitcherType;
			this.element.find("."+$.zdatetimepicker._CLASSES.disabledCalendar).removeClass($.zdatetimepicker._CLASSES.disabledCalendar);
			this._rowsCount = [];
			for(var i=startValue;i<this._monthsPerView;i++){
				element = this._monthsPerView > 1 ? $(container.find("."+$.zdatetimepicker._CLASSES.datepicker)[i]) : container;  // No I18N
				var newDate = new Date(this._viewDate.getTime());
				newDate = this._moveMonth(newDate, i);
				if(updateNavBar){
					if(i === 0){
						if(displayType === "dropdown"){   // No I18N
							var yearComboExists = this._yearHeader; 
							this._checkOptions();
					 		this._buildDropdownNavElement(this._viewDate.getMonth(), this._viewDate.getFullYear());
					 		if(!yearComboExists && this.options.navigationBar.yearSwitcher){
					 			this._yearHeader.zcombobox({ acceptNewValues: true, dropdownList: { width: 99,	height: 330, className: "zdatetimepicker--menu" } });   // No I18N
								this._yearHeader.on("zcomboboxchange",  this._selectClickHandler.bind(this)); // No I18N
								var selectElement = this._monthHeader.zselectbox("getElement");  // No I18N
								this._monthHeader && $(this._yearHeader.zcombobox("getElement")).insertAfter(selectElement);  // No I18N
					 		} 
						}
					}		
					(i>0 && displayType === "dropdown" ||  displayType !== "dropdown" ) && this._fillNavBarContent(newDate, element);   // No I18N
				}
				this._fillDates(newDate, element);	
				if(updateArrowState){
					(i === 0 || i === this._monthsPerView - 1) && this._updateArrowState(newDate, i);
				}
			}
			this._appendEmptyTd();
		},
		_appendEmptyTd: function(){
			//Added as a hook for the breakage in css border that appears as a partition for each month calendar view
			if(this._monthsPerView === 3){
				if(this._rowsCount[1] === 5 && this._rowsCount.indexOf(6) > -1){
					$(this.element.find("li")[1]).find("."+$.zdatetimepicker._CLASSES.monthContainer).find("tbody").append("<tr role='row'><td role='gridcell'></td></tr>");
				}
			}
		},
		_getClass: function(viewmode){
			var currentClass;
			switch(viewmode){
				case 0: currentClass = "days";  // No I18N
				this._rowsCount = [];
				break; 
				case 1: currentClass = "months"; break; // No I18N
				case 2: currentClass = "years"; break; // No I18N
				case 3: currentClass = "decades"; break; // No I18N
			}
			return currentClass;
		},
		_setViewMode: function(viewMode, preventAnimation, element){
			var currentClass, classes = $.zdatetimepicker._CLASSES;
			currentClass = this._getClass(this._viewMode);	
			element = element || this.element;
			if(this._viewMode === 0 && this.element.is(":visible")){
				this._width = element.find("."+$.zdatetimepicker._CLASSES.monthContainer).outerWidth();
			}
			switch(this._viewMode){
				case 0:
					var elementToAnimate = $(element.find("."+$.zdatetimepicker._CLASSES.monthContainer)[0]).find("table");  // No I18N
					elementToAnimate.removeClass("zeffects--zoomin"); // No I18N
					!preventAnimation && elementToAnimate.addClass("zeffects--zoomout");  // No I18N	
				break;
				default:
					var elementToAnimate = element.find(".zdatetimepicker__"+currentClass).find("."+$.zdatetimepicker._CLASSES.monthYearTable);  // No I18N
					elementToAnimate.removeClass("zeffects--zoomin");  // No I18N
					!preventAnimation && elementToAnimate.addClass("zeffects--zoomout");  // No I18N
				break;
			}
			this._viewMode = viewMode;
			var base = this;
			this._monthsPerView > 1 && this.element.find("li").nextAll().find("."+$.zdatetimepicker._CLASSES.dateView+",."+$.zdatetimepicker._CLASSES.weeknumbers+",."+$.zdatetimepicker._CLASSES.navBar).addClass($.zdatetimepicker._CLASSES.disabledCalendar);
			clearTimeout(this._animationTimeout);
			if(!preventAnimation){
				this._animationTimeout = setTimeout(this._animationHandler.bind(this, element, preventAnimation),300);
			}else{
				this._animationHandler(element, preventAnimation);
			}			
		},
		_animationHandler: function(element, preventAnimation){
			var classes = $.zdatetimepicker._CLASSES, className = this._getClass(this._viewMode);
			if(this._monthsPerView === 1){
				element = element.children("div:not(."+classes.footer+"):not(."+classes.header+"):not(."+classes.pointer+"):not(."+classes.timepicker+"):not(.zdatetimepicker--custom)").hide().filter(".zdatetimepicker__"+className);  // No I18N
			}else{
				element = $(this.element.find("ul").find("li")[0]).find("."+$.zdatetimepicker._CLASSES.datepicker).children().hide().filter(".zdatetimepicker__"+className);  // No I18N
			}
			switch(this._viewMode){
				case 0:
					var elementToAnimate = $(element.find("."+$.zdatetimepicker._CLASSES.monthContainer)[0]).find("table");  // No I18N
					elementToAnimate.removeClass("zeffects--zoomout"); // No I18N
					!preventAnimation && elementToAnimate.addClass("zeffects--zoomin");	// No I18N
				break;
				default:
					var elementToAnimate = element.find("."+$.zdatetimepicker._CLASSES.monthYearTable);  // No I18N
					elementToAnimate.removeClass("zeffects--zoomout"); // No I18N
					!preventAnimation && elementToAnimate.addClass("zeffects--zoomin");	// No I18N
				break;
			}
			this._width && this._viewMode !== 0 && element.width(this._width);
			element.show();
		},
		_setDate: function(orgEvent, target, date, valueSet){
			this.options.immediateCommit &&	(this._valueUpdate = false); // Delayed commit doesn't reset value on date select
			this._limitReached = false;
			var time = date.getTime(), oldDate = new Date(this._viewDate.getTime());
			var formattedDate = ZDateUtil.formatDate(date, this.options.format);
			this._reset && this._reset.length && this._reset.removeClass("is-disabled").removeAttr("disabled");  // No I18N
			if(this.options.selectionType === "single"){  // No I18N
				this.element.find("."+$.zdatetimepicker._CLASSES.selected).removeClass($.zdatetimepicker._CLASSES.selected).removeAttr("aria-selected"); // No I18N
				target.addClass($.zdatetimepicker._CLASSES.selected).attr("aria-selected", true);   // No I18N
				this._viewDate = new Date(time);
				this._currentSelected = new Date(time);
				if(this._hasTime){
					this._viewDate.setHours(oldDate.getHours(), oldDate.getMinutes(), oldDate.getSeconds());
				}
				if(this.options.immediateCommit){
					this.options.value =  new Date(time);
					this._applyClickHandler(orgEvent, true, valueSet);
				}
				this._trigger(this._EVENTS.DATESELECT, orgEvent, {valueString: formattedDate, value: this.options.value, selectedDate: this._viewDate});
			}else{
				if(target.hasClass("is-selected")){
					if((!orgEvent || (orgEvent && $(orgEvent.target).closest(".zdatetimepicker__todaylink").length === 0))){
						target.removeClass("is-selected").removeAttr("aria-selected");   // No I18N
						var index = this._getDateIndex(date), len = this._selectedDates.length;
						if(index !== -1){
							if(len === this.options.selectionLimit){
								this._queryString && this.element.find("."+$.zdatetimepicker._CLASSES.date+",."+$.zdatetimepicker._CLASSES.adjacent).filter(this._queryString).removeClass($.zdatetimepicker._CLASSES.disabled).removeAttr("aria-disabled");
							}
							this._selectedDates.splice(index, 1);
							this.options.immediateCommit && this.options.values.splice(index, 1);
						}
						if(len > 0 && this.options.immediateCommit){
							this._valueUpdate = true;
							this._applyClickHandler(orgEvent, true);
						}
					}
				}else{
					target.addClass($.zdatetimepicker._CLASSES.selected).attr("aria-selected", true);   // No I18N
					this._selectedTime && date.setHours(this._selectedTime.getHours(), this._selectedTime.getMinutes(), 0,0);
					this._selectedDates.push(new Date(time));	
					if(this._hasTime){
						this._viewDate.setHours(oldDate.getHours(), oldDate.getMinutes(), oldDate.getSeconds());
					}
					if(this.options.immediateCommit){
						this._valueUpdate = true;
						this._applyClickHandler(orgEvent, true);
					}
					this._queryString = "";   // No I18N
					if(this._selectedDates.length === this.options.selectionLimit){
						if(!this._queryString){
							this._queryString = ":not(";  // No I18N
							this._getQueryString();
						}
						this.element.find("."+$.zdatetimepicker._CLASSES.date+",."+$.zdatetimepicker._CLASSES.adjacent).filter(this._queryString).addClass($.zdatetimepicker._CLASSES.disabled).attr("aria-disabled", true);   // No I18N
						this._limitReached = true;
					}
				}
				this._reset && this._reset.length && this._reset[this._selectedDates.length ? "removeClass" : "addClass"]("is-disabled").attr("disabled", this._selectedDates.length ? false : true); // No I18N
				this._trigger(this._EVENTS.DATESELECT, orgEvent, {values: this.options.values, valuesObject: this._selectedDates});
			}
			if(this._hasTime && this.options.timeFieldType === "input"){ // No I18N
				this._setBoundaryValuesForTimeInput();
			}
		},
		_setBoundaryValuesForTimeInput: function(){
			if(this._minDateHasTime || this._maxDateHasTime){
				var shouldSetValue = false, tempDate = new Date(this._viewDate.getTime());
				tempDate.setHours(0,0,0,0);
				if(this._minDate){
					if(!ZDateUtil.areDatesEqual(this._minDate, tempDate)){
						shouldSetValue = true;
					}
				}
				if(this._maxDate){
					if(!ZDateUtil.areDatesEqual(this._minDate, tempDate)){
						shouldSetValue = true;
					}
				}
				if(shouldSetValue){
					var timeValue = this._timeElement.find("input").zdatetimefield("getAttribute", "value"), tempTime; // No I18N
					tempTime = new Date(timeValue.getTime());
					tempTime.setDate(this._viewDate.getDate());
					tempTime.setMonth(this._viewDate.getMonth());
					tempTime.setFullYear(this._viewDate.getFullYear());
					this._timeElement.find("input").zdatetimefield("setAttribute", "value", tempTime);   // No I18N
				}else{
					this._timeElement.find("input").zdatetimefield("setAttribute", "value", this._minTime);   // No I18N
				}
			}
		},
		_getQueryString: function(){
			for(var i=0,len=this._selectedDates.length; i<len;i++){
				var date = this._resetTime(this._selectedDates[i])
				this._queryString +="[data-time='"+date.getTime()+"']";  // No I18N
				if(i != len - 1){
					this._queryString += ",";  // No I18N
				}else{ 
					this._queryString += ", .zdisabled)";   // No I18N
				}
			}
		},
		_getDateIndex: function(date){
			for(var i=0, len = this._selectedDates.length; i<len;i++){
				if(ZDateUtil.areDatesEqual(date, this._selectedDates[i])){
					return i;
				}
			}
			return -1;
		},
		_handleYearArrowClick: function(orgEvent, element, viewDate){
			this._rowsCount = [];
			var target = $(orgEvent.target), id = orgEvent.currentTarget.getAttribute("id");
			if(!target.closest("."+$.zdatetimepicker._CLASSES.navButton).hasClass($.zdatetimepicker._CLASSES.disabled)){
				var moveBy = (id.indexOf(this._elementId+"-right-year")  > -1 || id.indexOf(this._elementId+"-right-month") > -1 && this._viewMode > 0) ? this.options.navigationBar.yearNavigationStep : -this.options.navigationBar.yearNavigationStep; // No I18N
				this._arrowClickHandler(moveBy, undefined, true, element, viewDate);
			}
			this._trigger(this._EVENTS.YEARCHANGE, orgEvent, {viewDate: this._viewDate, value: this.options.value});  
		},
		_fillNavBarContent: function(date, element){
			var element = element || this.element;
			element.find("."+$.zdatetimepicker._CLASSES.monthNav).text(this._getI18N(this.eventPrefix, this.options.navigationBar.monthYearHeadingFormat.split(" ").indexOf("MMMM") >  -1 ?  "months" : "monthsAbbreviated" , this.options.keys)[date.getMonth()]);  // No I18N
			element.find("."+$.zdatetimepicker._CLASSES.yearNav).text(date.getFullYear());  // No I18N
		},
		_handleMonthArrowClick: function(orgEvent, element, viewDate){
			this._rowsCount = [];
			var target = $(orgEvent.target), id = orgEvent.currentTarget.getAttribute("id"); // No I18N
			if(!target.closest("."+$.zdatetimepicker._CLASSES.navButton).hasClass($.zdatetimepicker._CLASSES.disabled)){
				var moveBy = id.indexOf(this._elementId+"-right-month") > -1 ? this.options.navigationBar.monthNavigationStep : -this.options.navigationBar.monthNavigationStep; // No I18N
				if(this._monthsPerView > 1 && this._currentSelected){
					viewDate = parseInt($(this.element.find("li").find(".zdatetimepicker__monthcontainer")[0]).find("td."+$.zdatetimepicker._CLASSES.date+"[data-time]")[0].getAttribute("data-time"));
					viewDate = new Date(viewDate);
				}
				this._arrowClickHandler(moveBy, true, undefined, element, viewDate);	
			}		
			this._trigger(this._EVENTS.MONTHCHANGE, orgEvent, {viewDate: this._viewDate, value: this.options.value}); 
		},
		_arrowClickHandler: function(moveBy, monthsChanged, yearChanged, viewElement, viewDate){
			var newDate, displayType = this.options.navigationBar.monthYearSwitcherType, 
				count = this._monthsPerView,
				viewDate = viewDate && !isNaN(viewDate.getTime()) ? viewDate : this._viewDate,
				viewElement = viewElement || this.element,
				oldDate = new Date(viewDate.getTime());
			for(var i=1; i<=count; i++){
				var element = count > 1 ? $(this.element.find("."+$.zdatetimepicker._CLASSES.datepicker)[i-1]) : viewElement; // No I18N
				if(monthsChanged){
					if(moveBy > 1){
						newDate = this._moveMonth(oldDate, i === 1 ? moveBy :  1);
					}else{
						newDate = this._moveMonth(viewDate, i === 1 ? moveBy : i - 1); 
					}
				} 
				if(yearChanged){
					if(count > 1){
						newDate = new Date(parseInt(element.find("td."+$.zdatetimepicker._CLASSES.date+"[data-time]")[0].getAttribute("data-time")));// No I18N
					}else{				
						!newDate &&	(newDate = new Date(viewDate));
					}	
					newDate.setFullYear(newDate.getFullYear() + moveBy);
				}
				if(this.options.navigationBar.monthNavigationStep > 1 || this.options.navigationBar.yearNavigationStep > 1){
					if(this._minDate && ZDateUtil.isGreater(this._minDate, newDate)){
						newDate = new Date(this._minDate.getTime());
					}
					if(this._maxDate && ZDateUtil.isGreater(newDate, this._maxDate)){
						newDate = new Date(this._maxDate.getTime());
					}
				}
				i === 1 && (this._viewDate = new Date(newDate.getTime()));
				this._fillDates(newDate, element);
				(i === 1 || i === this._monthsPerView) && this._updateArrowState(newDate, i-1);
				oldDate = new Date(newDate.getTime());
				if(i === 1 && displayType === "dropdown"){ // No I18N
					this._checkOptions(this._viewDate.getFullYear(), viewElement, true);
					// checkOptions method handles three different scenarios. So passing true as argument to take the actual value into account.
					this._buildDropdownNavElement(this._viewDate.getMonth(), this._viewDate.getFullYear());
				}else if(i > 1 || displayType !== "dropdown"){  // No I18N
					this._viewMode === 1 && (element = viewElement.find(".zdatetimepicker__months"));
					this._fillNavBarContent(newDate, element);
					if(yearChanged && this._viewMode === 1){
						this._updateYearArrowState(1);
						this._updateMonthClasses(viewElement);
					}
				}
				viewDate = this._viewDate;
			}
			this._appendEmptyTd();
			this.options.navigationBar.monthYearSwitcherType === "dropdown" && this._validateDisabledMonthYear();  // No I18N
		},
		_validateDisabledMonthYear: function(){
			var disabledMonths = this.options.disabledMonths;
			if(this._monthHeader && disabledMonths){
				for(var i=0; i<disabledMonths.length; i++){
					this._viewDate.getMonth() !== disabledMonths[i] && this._monthHeader.zselectbox("setOptionAttributes",  disabledMonths[i], "disabled", true);   // No I18N
				}
			}
			var disabledYears = this.options.disabledYears;
			if(this._yearHeader && disabledYears){
				for(var i=0; i<disabledYears.length;i++){
					this._viewDate.getFullYear() !== disabledYears[i] && this._yearHeader.zcombobox("setOptionAttributes", disabledYears[i], "disabled", true);  // No I18N
				}
			}
		},
		_isValidDate: function(date){
			return date && !(isNaN(date.getTime()));
		},
		_moveMonth: function(date, moveBy){
			if(!this._isValidDate(date)){
				return this._viewDate;
			}
			if(!moveBy){
				return date;
			}
			var newDate = new Date(date.valueOf()), day = newDate.getDate(), month = newDate.getMonth(), newMonth, checkMonth=true;
			if(moveBy < 0 || moveBy >= 1){
				newMonth = month + moveBy;
				newDate.setMonth(newMonth);
				newMonth = (newMonth + 12) % 12;
			}
			checkMonth = (moveBy < 0 ?  newDate.getMonth() === month && date.getFullYear() === newDate.getFullYear() : newDate.getMonth()  !== newMonth);
			while(checkMonth){
				newDate.setDate(--day);
				newDate.setMonth(newMonth);
				checkMonth = (moveBy < 0 ?  newDate.getMonth() === month : newDate.getMonth()  !== newMonth);
			}
			// var disabled = this.options.disabledMonths;
			// if(disabled && disabled instanceof Array && disabled.indexOf(newDate.getMonth()) > -1){
			// 	newDate  = this._moveMonth(newDate, moveBy > 0 ? this.options.navigationBar.monthNavigationStep : -this.options.navigationBar.monthNavigationStep);
			// }
			return newDate;
		},
		_placePicker: function(){
			this.element.finish().show();
			this.element.find("."+$.zdatetimepicker._CLASSES.datepicker).show();
			this.options.type === "popup" && this._positionPicker();
		},
		_showPicker: function(){
			if(ZComponents.openedPicker && ZComponents.openedPicker.element.is(":visible")){
				ZComponents.openedPicker._closePicker();
			}
			var returnValue = this._trigger(this._EVENTS.BEFOREOPEN, undefined, {viewMode: this._viewMode, element: this.element});
			if(returnValue){
				var animation = this.options.animation, effect, duration;
				if(animation && (animation.name || animation.className || animation.open)){				
					this._placePicker();
					if(animation.className || animation.open.className){
						var className = animation.open ? animation.open.className : animation.className, 
							closeClassName = animation.close ? animation.close.className : undefined
						closeClassName && this.element.removeClass(closeClassName);
						var base = this;
						this.element.addClass(className).on(this._ANIMATIONEVENTS, function(){
							base.element.off(base._ANIMATIONEVENTS);
						});
					}else{
						effect = animation.open ? animation.open.name : animation.name;
        				duration = animation.duration ? animation.duration : ( animation.open && animation.open.duration ? animation.open.duration : 400);
        				if(effect){
							this._placePicker();
							this.element.hide();
							if(typeof effect === "object"){		// No I18N
								this.element.animate(effect, duration);
							}else{
								this.element[animation.open.name](duration);
							}
						}
					}
				}else{
					this._placePicker()
				}
				ZComponents.openedPicker = this;
				this.element.attr({"aria-hidden": false, "aria-expanded": true});  // No I18N
				this._setFocus();
				this._trigger(this._EVENTS.OPEN, undefined, {viewMode: this._viewMode, element: this.element});		
			}
		},
		_setFocus: function(){
			if(this._trigger(this._EVENTS.BEFOREFOCUS, {},this.element)){ 
				setTimeout(this._focusHandler.bind(this), 100);
			}
		},
		_focusHandler: function(){
			this.element.focus();
		},
		_positionPicker: function(){
			if(this.options.offset){
				this.element.css(this.options.offset);
			}else{
				if(this.options.forElement){
								var position = this._getPosition();
								if(this.options.margin){
					    			position.elementPosition = this._retrieveMarginValues(position.elementPosition);
						    	}
								this.element.css(position.elementPosition);
								this._pointer && this._pointer.css(position.arrowPosition);
				}	
			}
		},
		_retrieveMarginValues: function(position){
			var margin = this.options.margin, top, left;
			if(typeof margin === "number"){	// No I18N
				top = margin + position.top;
				left = margin + position.left;
			}else{
				left = margin.left ? margin.left + position.left : position.left;
				top = margin.top ? margin.top + position.top : position.top;
			}
			top = top < 0 ? position.top : top;
			left = left < 0 ? position.left : left;
			position.top = top;
			position.left = left;
			return position;
		},
		_arrowCallback: function(element, direction){
			this.element.removeClass("zdatetimepicker--top zdatetimepicker--bottom zdatetimepicker--left zdatetimepicker--right"); // No I18N  
			this.element.addClass("zdatetimepicker--"+direction); // No I18N  
			this._calloutDirection = direction;
		},
		_getPosition: function(){
			var base = this;
			var position = ZPosition.get(this.options.forElement, this.element, { 
					direction: this.options.position,	
					bufferSpace : 6, 
					positionAlterable: this.options.positionAlterable,
					arrow: {
						element: this._pointer, 
						callback: this._arrowCallback.bind(base),
						margin:{left:-1, top:-1}
					}
				});
			return position;
		},
		_documentClickHandler: function(orgEvent){
			var target = $(orgEvent.target);
			if(this.options.type !== "inline" && this.options.forElement && target.closest("."+$.zdatetimepicker._CLASSES.datepicker).length === 0 && target.closest("."+$.zdatetimepicker._CLASSES.group).length === 0 && target.closest(this.options.forElement).length === 0 && orgEvent.currentTarget !== this.options.forElement[0] && target.closest(".zmenu").length === 0){	// No I18N
				 this._closePicker(orgEvent);
			}
		},
		_resetValues: function(){
			this._valueUpdate = false;
			this.options.value = undefined;
			if(this._hasDate){
				this.options.values = [];
				var className = $.zdatetimepicker._CLASSES.selected+" "+$.zdatetimepicker._CLASSES.disabled;  // No I18N
				this.element.find("."+$.zdatetimepicker._CLASSES.monthContainer).find('.'+$.zdatetimepicker._CLASSES.selected+",."+$.zdatetimepicker._CLASSES.disabled+":not(.zdisabled)").removeClass(className).removeAttr("aria-selected"); // No I18N
				this.element.find("."+$.zdatetimepicker._CLASSES.monthYearTable).find('.'+$.zdatetimepicker._CLASSES.selected+",."+$.zdatetimepicker._CLASSES.disabled+":not(.zdisabled)").removeClass(className).removeAttr("aria-selected"); // No I18N
				this._selectedDates = [];
				this._queryString = ""; // No I18N
				this._selectedTime = this._minTime ? new Date(this._minTime.getTime()) : undefined;
				//Added so that on picker close when the view date is modified, viewDate switches back to current date 
				this._viewDate = new Date(); 
				this._viewDate.setHours(0,0,0,0);
				var todayDate = new Date();
				todayDate.setHours(0,0,0,0);
				if(this._maxDate && ZDateUtil.isGreater(this._viewDate, this._maxDate) && !ZDateUtil.areDatesEqual(this._viewDate, this._maxDate)){
					this._viewDate = new Date(ZDateUtil.isGreater(this._maxDate, todayDate) ? todayDate.getTime() : (this._minDate ? this._minDate.getTime() : this._maxDate.getTime()));
				}
				if(this._minDate && ZDateUtil.isGreater(this._minDate, this._viewDate) && !ZDateUtil.areDatesEqual(this._minDate, this._viewDate)){
					this._viewDate = new Date(ZDateUtil.isGreater(todayDate, this._minDate) ? todayDate.getTime() : this._minDate.getTime());
				} 	
				this._setMonthToView();
				this._setYearToView();	
				if(this.options.monthToBeShownOnOpen || this.options.yearToBeShownOnOpen){
					this._validateViewDate();
				}
				this._minTime && this._viewDate.setHours(this._minTime.getHours(), this._minTime.getMinutes(), 0, 0);
				//this._applyButton && this._apply.addClass("is-disabled"); 
				this._reset && this._reset.length && this._reset.attr("disabled", true).addClass("is-disabled");	 // No I18N
			}
		},
		_validateViewDate: function(){
			if(this._maxDate && ZDateUtil.isGreater(this._viewDate, this._maxDate) && !ZDateUtil.areDatesEqual(this._viewDate, this._maxDate)){
				this._viewDate = new Date(this._minDate ? this._minDate.getTime() : this._maxDate.getTime());
			}
			if(this._minDate && ZDateUtil.isGreater(this._minDate, this._viewDate) && !ZDateUtil.areDatesEqual(this._minDate, this._viewDate)){
				this._viewDate = new Date(this._minDate.getTime());
			}
		},	
		_validateBoundaries: function(){
			var min = this._minDate, max = this._maxDate;
			var todayDate = new Date();
			todayDate.setHours(0,0,0,0);
			if(min && max && !ZDateUtil.isGreater(max, min)){
				this.options.maxDate = undefined;
				this._maxDate = undefined;
			}
			if(max){
				if(this.options.value){
					if(ZDateUtil.isGreater(this.options.value, max) && !ZDateUtil.areDatesEqual(this.options.value, max)){
						this.options.value = undefined;
					}
				}else if(this.options.selectionType === "multiple" && this._selectedDates.length){   //No I18N 
					for(var i=0; i< this._selectedDates.length;i++){
						if(ZDateUtil.isGreater(this._selectedDates[i], max)){
							this.options.values.splice(i, 1);
							this._selectedDates.splice(i, 1);
						}
					}
				}
				if(ZDateUtil.isGreater(this._viewDate, max) && !ZDateUtil.areDatesEqual(this._viewDate, max)){
					this._viewDate = new Date(ZDateUtil.isGreater(this._maxDate, todayDate) ? todayDate.getTime() : (this._minDate ? min.getTime() : max.getTime()));
				}
			}
			if(min){
				if(this.options.value){
					if(ZDateUtil.isGreater(min, this.options.value) && !ZDateUtil.areDatesEqual(this.options.value, min)){
						this.options.value = undefined;
					}
				}else if(this.options.selectionType === "multiple" && this._selectedDates.length){   //No I18N 
					for(var i=0; i< this._selectedDates.length;i++){
						if(ZDateUtil.isGreater(min, this._selectedDates[i])){
							this.options.values.splice(i, 1);
							this._selectedDates.splice(i,1);
						}
					}
				}
				if(ZDateUtil.isGreater(min, this._viewDate) && !ZDateUtil.areDatesEqual(min, this._viewDate)){
					this._viewDate = new Date(ZDateUtil.isGreater(todayDate, min) ? todayDate.getTime() : min.getTime());
				}
			}
		},
		_setSelectedTimeValues: function(valueCheck, element, timePickerElement, forceReset){
			element = element || this.element;
			timePickerElement = timePickerElement || element.find(".zdatetimepicker-timeinput");
			var value = valueCheck === false ? undefined : (this.options.selectionType === "single" || this.options.value ? this.options.value : (this.options.values.length ? this._parseDateValue(this.options.values[0], this.options.format).date : undefined)), date;
			if(value && !forceReset){
				date = new Date(this.options.value.getTime());
				date.setHours(value.getHours(), value.getMinutes(), 0, 0);
			}
			if(this.options.timeFieldType === "multiple-select-box"){     // No I18N
				if(this.options.timeMultipleSelectBoxType === "h-m-t"){	// No I18N
					var hour, minute;
					hour = this._hourElement.zselectbox("getAttribute", "selectedValue");  // No I18N
					if(hour.length === 0 || value || forceReset){
						var selectedH = value && !forceReset ? this._normalizeHourValue(value.getHours())  : (this._minTime ? this._normalizeHourValue(this._minTime.getHours()) : (this._is12HourFormat ? 12 : 0)), step = this.options.hourStep;
						this._hourElement.zselectbox("setAttribute", "selectedValue", Math.ceil(selectedH/step) * step); // No I18N
					}
					minute = this._minuteElement.zselectbox("getAttribute", "selectedValue");  // No I18N
					if(minute.length === 0  || value || forceReset){
						var minuteValue = (value && !forceReset ? value.getMinutes() : (this._minTime ? this._minTime.getMinutes() : 0)), step = this.options.minuteStep;
						this._minuteElement.zselectbox("setAttribute", "selectedValue", Math.ceil(minuteValue/step) * step); // No I18N
					}
					if(this._is12HourFormat){
						var period = this._periodElement.zselectbox("getAttribute", "selectedValue");  // No I18N
						if(period.length === 0 || value || forceReset){
							var hourValue = value && !forceReset ? value.getHours() : (this._minTime ? this._minTime.getHours() : undefined);
							this._periodElement && this._periodElement.zselectbox("setAttribute", "selectedValue", hourValue >= 12 ? "PM" : "AM");		  // No I18N
						}
					}
				}
				// else if(this.options.timeMultipleSelectBoxType === "hm-t"){  // No I18N
				// 	if(date){
				// 		this._combinedTimeElement.zselectbox("setAttribute", "selectedValue", )
				// 	}
				// }
			}else if(this.options.timeFieldType === "input"){  // No I18N
				timePickerElement.zdatetimefield("setAttribute", "value", date ? date : (this._is12HourFormat ? "12:00 AM" : "00:00"));  // No I18N
			}else if(this.options.timeFieldType === "single-select-box"){   // No I18N
				this._singleTimeSelect.zselectbox("setAttribute", "selectedValue", date ? date.getTime() : this._singleTimeSelect.find("option")[0].value);  // No I18N
			}
		},
		_closePicker: function(orgEvent, element, timePickerElement, updateArrowState){
			if(this.options.selectionType === "multiple" && this.options.values.length === 0 && this.options.immediateCommit){   // No I18N
				this._valueUpdate = false;
			}
			element = element || this.element;
			this._oldDate = new Date(this._viewDate.getTime());
			this._currentSelected = this.options.value ? new Date(this.options.value.getTime()) : undefined;
			if(!this._valueUpdate){
				this._resetValues();
				if(this._hasTime && this.options.timeFieldType === "multiple-select-box" && this.options.timeMultipleSelectBoxType === "h-m-t"){  // No I18N
					this._checkTimeOptions();
				}
				if(this._hasTime){  
					this._setSelectedTimeValues(undefined, element, timePickerElement, true);
				}
			}else{
				var valLen, selectedLen;
				if(this.options.selectionType === "multiple" && this._hasDate){  // No I18N
					this._handleMultipleSelectOnClose(element);
				}			
				valLen = this.options.values.length;
				selectedLen = this._selectedDates.length;
				var date = new Date();
				this._minTime ? date.setHours(this._minTime.getHours(), this._minTime.getMinutes(), 0,0) : date.setHours(0,0,0,0);
				this._viewDate =  this.options.value ? new Date(this.options.value.getTime()) : (this.options.values && valLen && selectedLen ? new Date(this._selectedDates[selectedLen - 1].getTime()) : date);	
				this._validateBoundaries();
				if(!this.options.immediateCommit && this._hasTime){
					this._setSelectedTimeValues(undefined, element, timePickerElement);
				}
			}
			if(this.options.type !== "inline" || this._manualClose){  // No I18N
				var returnValue = this._trigger(this._EVENTS.BEFORECLOSE, orgEvent, {viewMode: this._viewMode, element: this.element});
				if(returnValue){
					this.element.finish();
					var animation = this.options.animation;
					if(animation && (animation.name || animation.className || animation.close)){
						if(animation.close && animation.close.className || animation.className){	
							var closeClass = animation.close ? animation.close.className : animation.className;
							if(animation.open && animation.open.className){	 
								this.element.removeClass(animation.open.className);
							}
							var base = this;
							this.element.addClass(closeClass).on(this._ANIMATIONEVENTS, function(){
								base.element.off(base._ANIMATIONEVENTS);
							});
						}else{
							var effect = animation.name ? animation.name : (animation.close && animation.close.name),
							duration = animation.duration ? animation.duration : ( animation.close && animation.close.duration ? animation.close.duration : 400);
							if(effect){
								var onComplete =  function(){
									base.element.hide();
									ZComponents.openedPicker = undefined;
									base.element.attr({"aria-hidden": true, "aria-expanded": false});  // No I18N
									base._trigger(base._EVENTS.CLOSE, orgEvent, {viewMode: base._viewMode, element: base.element});
								};
								if(typeof effect === "object"){  // No I18N
									this.element.animate(effect,duration,onComplete);	 // custom animation properties
								}else{ // predefined effects like slide and fade. 
									this.element[animation.close.name](duration,onComplete);
								}	
							}
						}
					}
					if(!animation || animation &&  !animation.name){
						this.element.hide();
						ZComponents.openedPicker = undefined;
						this.element.attr({"aria-hidden": true, "aria-expanded": false});  // No I18N
						this._trigger(this._EVENTS.CLOSE, orgEvent, {viewMode: this._viewMode, element: this.element});
					}				
				}
			}
			if(this._hasDate){
				var displayType = this.options.navigationBar.monthYearSwitcherType, viewmode;
				if(displayType === "drilldown"){  // No I18N
					viewmode = this._getViewMode();
				}
				if(viewmode !== this._viewMode || !ZDateUtil.areDatesEqual(this._oldDate, this._viewDate)){
					displayType === "drilldown" && this._setViewMode(viewmode, true, element);   // No I18N
					this._renderContent(undefined, element, undefined, updateArrowState); 
					if(displayType === "drilldown" && this.options.drilldownLevelOnOpen !== "dates" && this._viewMode !== 0){  // No I18N
						element.find("li").nextAll().find("."+$.zdatetimepicker._CLASSES.dateView+",."+$.zdatetimepicker._CLASSES.weeknumbers+",."+$.zdatetimepicker._CLASSES.navBar).addClass($.zdatetimepicker._CLASSES.disabledCalendar);  // No I18N
					}
				}
				if(this.options.selectedDateMonthViewIndex !== undefined){
					this._updateSelectedDatePosition();	
				}
				if(this.options.value && this._viewDate){
					var date = this._resetTime(this.options.value);
					this.element.find("[data-time="+date.getTime()+"]").addClass("is-selected");
					this._reset && this._reset.length && this._reset.removeClass("is-disabled").removeAttr("disabled");  // No I18N
				}
			}
			this.element.find(".zeffects--zoomin").removeClass("zeffects--zoomin");   // No I18N
			this.element.find(".zeffects--zoomout").removeClass("zeffects--zoomout"); // No I18N
		},
		_resetTime: function(datesObject){
			if(datesObject instanceof Date){
				var date = new Date(datesObject.getTime());
				date.setHours(0,0,0,0);
				return date;
			}
		},
		_handleMultipleSelectOnClose: function(element){
			var valLen = this.options.values.length, selectedLen = this._selectedDates.length, extraElements = [];
			if(selectedLen !== valLen){
				if(selectedLen > valLen){
					extraElements = this._selectedDates.splice(valLen);
					this._selectedDates.length = valLen;
					for(var i=0;i<extraElements.length;i++){
						var date = this._resetTime(extraElements[i]);
						this.element.find("[data-time='"+date.getTime()+"']").removeClass($.zdatetimepicker._CLASSES.selected).removeAttr("aria-selected");  // No I18N
					}
				}else{
					this._selectedDates = [];
					for(var i=0; i<valLen;i++){
						this._selectedDates[i] = this._parseDateValue(this.options.values[i], this.options.format).date;
					}
					for(var i=0;i<this._selectedDates.length;i++){
						var date = this._resetTime(this._selectedDates[i])
						this.element.find("[data-time='"+date.getTime()+"']").addClass($.zdatetimepicker._CLASSES.selected).attr("aria-selected", true);  // No I18N
					}
				}
				if(this.options.selectionLimit !== valLen){
					if(this._limitReached){
						this._limitReached = false;
						var elements = element.find("."+$.zdatetimepicker._CLASSES.date+",."+$.zdatetimepicker._CLASSES.adjacent);  // No I18N
						elements.filter(this._queryString).removeClass($.zdatetimepicker._CLASSES.disabled).removeAttr("aria-disabled");   // No I18N
						this._queryString = "";    // No I18N
					}
				}else if(this.options.selectionLimit === valLen){
					this._queryString = ":not(";  // No I18N
					this._getQueryString();
					this.element.find("."+$.zdatetimepicker._CLASSES.date+",."+$.zdatetimepicker._CLASSES.adjacent).filter(this._queryString).addClass($.zdatetimepicker._CLASSES.disabled).attr("aria-disabled", true);   // No I18N
				}
			}
			if(this._selectedDates && this._selectedDates.length){
				this._reset && this._reset.length && this._reset.removeClass("is-disabled").removeAttr("disabled");  // No I18N
			}
		},
		_updateSelectedDatePosition: function(){
			if(this._monthsPerView > 1 && this.options.selectedDateMonthViewIndex >= 0 && this.options.value){
				this._viewDate = this._moveMonth(this.options.value, -this.options.selectedDateMonthViewIndex);
				this._renderContent();
			}	
		},
		_dateWithInRange: function(date){
			var dateTime = date.getTime();
			return (this._minDate ?  dateTime >= this._minDate.getTime() : true) && (this._maxDate ? dateTime <= this._maxDate.getTime() : true);
		},
		_generateOptions: function(start, end, isMin, isMax){
			var selected = parseInt(this._monthHeader.zselectbox("getValue")), selectedYear = parseInt(this._yearHeader.zcombobox("getValue")),  // No I18N
				maxYear = this._maxDate ? this._maxDate.getFullYear() : undefined, minYear = this._minDate ? this._minDate.getFullYear() : undefined, 
				disabledMonths = this.options.disabledMonths; 			
			for(var i=start; i < end; i++){
				this._monthHeader.zselectbox("setOptionAttributes", i, "disabled", (this._minDate && this._minDate.getFullYear() === this._viewDate.getFullYear() &&  i <  this._minDate.getMonth() || this._maxDate && this._maxDate.getFullYear() === this._viewDate.getFullYear() && i > this._maxDate.getMonth()) || (disabledMonths && disabledMonths.indexOf(i) > -1 && this._viewDate.getMonth() !== i)   ? true : false);  // No I18N				
			}
			if(maxYear){
				this._monthHeader && this._yearHeader.zcombobox("setOptionAttributes", maxYear, "disabled", this._viewDate.getMonth() > this._maxDate.getMonth());  // No I18N
			}
			if(minYear){
				this._yearHeader.zcombobox("setOptionAttributes", minYear, "disabled",  this._viewDate.getMonth() < this._minDate.getMonth()); // No I18N
			}
			this._monthHeader.zselectbox("setValue", this._viewDate.getMonth()); // No I18N
			this._yearHeader.zcombobox("setValue", this._viewDate.getFullYear());   // No I18N
		},
		_checkOptions: function(year){
			if(this._monthHeader && this._yearHeader){
				 this._generateOptions(0, 12, true)
			}		
		},
		_buildDropdownNavElement: function(monthChanged, yearChanged, element){
			var options = this.options, value = this.options.value, changeMonth = this.options.navigationBar.monthSwitcher, changeYear = this.options.navigationBar.yearSwitcher, month = this._viewDate.getMonth(), year = this._viewDate.getFullYear();
			this._validateDisabledMonthYear();
			if(changeMonth && $("#"+this._elementId+"-month-header").length === 0){ // No I18N
				this._generateMonthDropdown(element);
			}else{
				if(changeMonth && typeof monthChanged === "number"){ // No I18N
					this._monthHeader.zselectbox("option","selectedValue", monthChanged);	// No I18N
				}else if(!changeMonth){
					this.element.find("."+$.zdatetimepicker._CLASSES.monthNav).text(this._getI18N(this.eventPrefix, this.options.navigationBar.monthYearHeadingFormat.split(" ").indexOf("MMMM") > -1 ?  "months" : "monthsAbbreviated" , this.options.keys)[month]);  // No I18N
				}
			}
			if(this.options.navigationBar.yearSwitcher && $("#"+this._elementId+"-year-header").length === 0){ // No I18N
				this._generateYearDropdown();
			}else{
				if(changeYear &&  typeof yearChanged === "number"){ // No I18N
					this._yearHeader.zcombobox("option","selectedValue", yearChanged);	// No I18N
				}else if(!changeYear){
					this.element.find("."+$.zdatetimepicker._CLASSES.yearNav).text(this._viewDate.getFullYear());  // No I18N
				}
			}
		},
		_generateMonthDropdown: function(element){
			var leftNav, navBarEle, rightNav, monthYearNav;
			leftNav = this._leftNav
			navBarEle = this._navBar;
			rightNav = this._rightNav;
			monthYearNav = this._monthYearNav;
			var options = this.options, month = this._viewDate.getMonth(), year = this._viewDate.getFullYear(), min = this.options.minDate, max = this.options.maxDate, 
				value = this.options.value, changeMonth = this.options.navigationBar.monthSwitcher, changeYear = this.options.navigationBar.yearSwitcher, navBar = this.options.navigationBar, isSameAsMinYear, isSameAsMaxYear, 
				disabledMonths = this.options.disabledMonths;
			var monthVal = options.navigationBar.monthYearHeadingFormat.split(" "), months, monthHTML;
			this._yearIndex = monthVal.indexOf("yyyy");   // No I18N
			months = monthVal.indexOf("MMMM") > -1 ? this._getI18N(this.eventPrefix, "months", this.options.keys) : this._getI18N(this.eventPrefix, "monthsAbbreviated", this.options.keys); // No I18N
			monthHTML = "<select id='"+this._elementId+"-month-header'>"; // No I18N
			if(min && min.getFullYear() === this._viewDate.getFullYear()){
				isSameAsMinYear = true;
			}
			if(max && max.getFullYear() === this._viewDate.getFullYear()){
				isSameAsMaxYear = true;
			}
			var disabled;
			for(var i=0; i<months.length;i++){
				disabled = ((isSameAsMinYear && min && i < min.getMonth()) || (isSameAsMaxYear && max && i > max.getMonth())) || disabledMonths && disabledMonths.indexOf(i) > -1 && this._viewDate.getMonth() !== i ? "disabled" : ""; // No I18N
				var optionVal =  monthVal.indexOf("MMMM") > -1 ? this.options.keys.months.indexOf(months[i]) : this.options.keys.monthsAbbreviated.indexOf(months[i]); // No I18N
				monthHTML += "<option value="+optionVal+" "+(month === optionVal ? "selected" : "")+" "+disabled+">"+months[i]+"</option>";	// No I18N
			}
			monthHTML += "</select>";	// No I18N
			monthHTML = $(monthHTML);
			if(this._yearIndex === 0){
				if(navBar.navigationButtonsDisplayPattern === "together"){  // No I18N
					if(navBar.togetherTypeNavigationButtonsPosition === "left"){  // No I18N
						monthHTML.appendTo(navBarEle);
					}else if(navBar.togetherTypeNavigationButtonsPosition === "right"){  // No I18N
						if(rightNav){
							monthHTML.insertBefore(rightNav);
						}else{
							monthHTML.appendTo(navBarEle);
						}						
					}
				}else{
					if(rightNav){
						monthHTML.insertBefore(rightNav);
					}else{
						monthHTML.appendTo(navBarEle);
					}
				}
			}else if(!leftNav){ 
				monthHTML.prependTo(element.find("."+$.zdatetimepicker._CLASSES.navBar));
			}else{
				monthHTML.insertAfter(leftNav);
			}
			this._monthHeader = $("#"+this._elementId+"-month-header"); // No I18N
		},
		_generateYearDropdown: function(leftNav, rightNav, navBar, monthYearNav){
			leftNav = leftNav || this._leftNav;
			navBar = navBar || this._navBar;
			rightNav = rightNav || this._rightNav;
			monthYearNav = monthYearNav || this._monthYearNav;
			var navBar = this.options.navigationBar, yearHTML =  "<select id='"+this._elementId+"-year-header'>", currentYear = new Date().getFullYear(),
				year = this._viewDate.getFullYear(), min = this._minDate, max = this._maxDate, 
				value = this.options.value, startOffset = navBar.dropdownStartYear, endOffset = navBar.dropdownEndYear,
			 	disabledYears = this.options.disabledYears;
			startOffset = ZDateUtil.convertOffsetToValue(startOffset.substring(9));  
			endOffset = ZDateUtil.convertOffsetToValue(endOffset.substring(9));
			var endValue = currentYear + endOffset, startValue = currentYear + startOffset;
			if(endValue < startValue){
				var start = startValue;
				startValue = endValue;
				endValue = start;
			}
			if(value){
				endValue = value.getFullYear() + endOffset;
				startValue = value.getFullYear() + startOffset;
			}
			if(min){
				var oldStart = startValue;
				startValue = min.getFullYear() > startValue ? min.getFullYear() : startValue;
				endValue = min.getFullYear() > oldStart ? min.getFullYear() + endOffset : endValue;
			}else if(value && startValue > value.getFullYear()){
				startValue = value.getFullYear();
				endValue = value.getFullYear() + endOffset;
			}
			max && (endValue = max.getFullYear());
			var disabled, month = this._viewDate.getMonth();
			for(var i=startValue; i <= endValue; i++){
				disabled = this._monthHeader && (max && max.getFullYear() === i && month > max.getMonth()) || this._viewDate.getFullYear() !== i && disabledYears && disabledYears.indexOf(i) >  -1 ? "disabled" : "";   // No I18N
				yearHTML += "<option value="+i+" "+(year === i ? "selected" : "")+" "+disabled+">"+i+"</option>";	// No I18N
			}
			yearHTML += "</select>";	// No I18N
			yearHTML = $(yearHTML);
			if(this._monthHeader){
				 this._yearIndex === 0 ? yearHTML.insertBefore(this._monthHeader) : yearHTML.insertAfter(this._monthHeader)
			}else{
				if(leftNav){
					monthYearNav ? yearHTML.insertAfter(monthYearNav) : yearHTML.insertAfter(leftNav)
				}else if(navBar.navigationButtonsDisplayPattern === "together" && !this._leftNav){   // No I18N
					monthYearNav ? yearHTML.insertAfter(monthYearNav) : yearHTML.prependTo(navBar);	
				}else{
					yearHTML.insertBefore(rightNav);
				}				
			}
			this._yearHeader = $("#"+this._elementId+"-year-header"); // No I18N
		},
		_fillNavBarElements: function(index){
			if(!this.options.navigationBar.monthSwitcher || this.options.navigationBar.monthYearSwitcherType !== "dropdown" || (index && index !== 0)){ // No I18N
				this._monthYearNav.append("<span class='"+$.zdatetimepicker._CLASSES.monthNav+"'></span>"); // No I18N
			}
			if(!this.options.navigationBar.yearSwitcher || this.options.navigationBar.monthYearSwitcherType !== "dropdown" || (index && index !== 0)){ // No I18N
				this._monthYearNav.append("<span class='"+$.zdatetimepicker._CLASSES.yearNav+"'></span>"); // No I18N
			}
		},
		_getKey: function(viewMode){
			var value;
			switch(viewMode){
				case 0: value = "Month"; break;    // No I18N
				case 1: value = "Year"; break;  // No I18N
				case 2: value = "Decade"; break;  // No I18N
				case 3: value = "Century"; break;   // No I18N
			}
			return value;
		},
		_createMonthArrows: function(leftNav, rightNav, viewMode, isLeft, isRight){
			var arrow1, arrow2, monthLeft, monthRight, leftIconEle, rightIconEle, navBar = this.options.navigationBar;
			if(isLeft){
				var monthLeftText;
				monthLeft = $($.zdatetimepicker._NAVBUTTON).attr("id", this._elementId+"-left-month-"+viewMode); // No I18N
				leftIconEle = monthLeft.find("."+$.zdatetimepicker._CLASSES.navIcon);   // No I18N
				var svgData = {
					props: {"viewBox": "0 0 12 12"},  // No I18N
					nodes: [{"polygon": {"points": "6.6,10.3 2.9,6.5 6.6,2.7 7.4,3.4 4.3,6.5 7.4,9.6"}}]  // No I18N
				};
				this._handleIcon(leftIconEle, svgData, "leftmonth", navBar.previousMonthButtonIconClassName, navBar.previousMonthButtonSVGIconId);  // No I18N
				if(navBar.navigationButtonsDisplayPattern === "split"){ 	// No I18N
					monthLeft.appendTo(leftNav);
				}else{
					if($("#"+this._elementId+"-left-year").length && viewMode === 0){
						monthLeft.insertAfter($("#"+this._elementId+"-left-year"));
					}else if(navBar.togetherTypeNavigationButtonsPosition === "left"){  // No I18N
						monthLeft.prependTo(leftNav);
					}else{
						monthLeft.prependTo(rightNav);
					}
				}
				monthLeftText =  this._getI18N(this.eventPrefix, "prev"+this._getKey(viewMode) , this.options.keys);  // No I18N
				monthLeft.attr({"title" : monthLeftText, "aria-label": monthLeftText});  // No I18N
			}
			if(isRight){
				var monthRightText;
				monthRight = $($.zdatetimepicker._NAVBUTTON).attr("id", this._elementId+"-right-month-"+viewMode); // No I18N
				rightIconEle = monthRight.find("."+$.zdatetimepicker._CLASSES.navIcon);  // No I18N
				var svgData = {
					props: {"viewBox": "1 0 12 12"},  // No I18N
					nodes: [{"polygon": {"points": "4.4,10.3 3.7,9.6 6.7,6.5 3.6,3.4 4.4,2.7 8.1,6.5"}}]  // No I18N
				};
				this._handleIcon(rightIconEle, svgData, "rightmonth", navBar.nextMonthButtonIconClassName, navBar.nextMonthButtonSVGIconId);  // No I18N		
				if(navBar.navigationButtonsDisplayPattern  === "split"){  // No I18N
					monthRight.prependTo(rightNav)
				}else{
					monthRight.insertAfter(monthLeft);					
				}
				monthRightText = this._getI18N(this.eventPrefix, "next"+this._getKey(viewMode), this.options.keys);  // No I18N
				monthRight.attr({"title" : monthRightText, "aria-label": monthRightText});  // No I18N
			}
		},
		_fillNavBar: function(date, group){
			var element = group.element || this.element, navBar = this.options.navigationBar;
			var arrow2, arrow3, button1, button2, button3, button4;
			var displayType = this.options.navigationBar.monthYearSwitcherType;
			this._navBar = $(element.find("."+$.zdatetimepicker._CLASSES.navBar)[0]);
			if(navBar.navigationButtonsDisplayPattern === "together"){  // No I18N
				switch(navBar.togetherTypeNavigationButtonsPosition){
					case "right":
						this._navBar.addClass($.zdatetimepicker._CLASSES.navOnRight);
					break;
					case "left":
						this._navBar.addClass($.zdatetimepicker._CLASSES.navOnLeft);
				}
			}
			if(group.left && (navBar.navigationButtonsDisplayPattern === "split" || (navBar.navigationButtonsDisplayPattern === "together" && navBar.togetherTypeNavigationButtonsPosition === "left"))){ // No I18N
				this._leftNav = $($.zdatetimepicker._LEFTNAV).prependTo(this._navBar);
			}
			if(group.right && (navBar.navigationButtonsDisplayPattern === "split" || (navBar.navigationButtonsDisplayPattern === "together" && navBar.togetherTypeNavigationButtonsPosition === "right"))){ // No I18N
				this._rightNav = $($.zdatetimepicker._RIGHTNAV).appendTo(this._navBar);			
			}
			if(navBar.yearNavigationButtons){ 
				displayType === "dropdown" && this.options.navigationBar.monthNavigationButtons && this.element.addClass($.zdatetimepicker._CLASSES.dropdown); // No I18N
				this._createYearArrows(this._leftNav, this._rightNav, group.left, group.right); 
			}
			navBar.monthNavigationButtons && this._createMonthArrows(this._leftNav, this._rightNav, 0, group.left, group.right);
			if(!this._monthYearNav && ((displayType !== "dropdown" || !this.options.navigationBar.monthSwitcher || !this.options.navigationBar.yearSwitcher) || (group && group.index && group.index !== 0))){ // No I18N
				this._monthYearNav = $("<div class='"+$.zdatetimepicker._CLASSES.monthYearNav+"'></div>");
				if(this._leftNav){
					this._monthYearNav.insertAfter(this._leftNav); 
				}else{
					this._monthYearNav.prependTo(element.find("."+$.zdatetimepicker._CLASSES.navBar));	
				}
			}
			this._monthYearNav && this._fillNavBarElements(group.index);
			if(displayType === "dropdown" && (group && group.index === 0 || !group || !group.index)){  // No I18N
				this._buildDropdownNavElement(undefined, undefined, group.element);
			}
			if(displayType !== "dropdown" || !this.options.navigationBar.yearSwitcher || !this.options.navigationBar.monthSwitcher || (group && group.index  && group.index !== 0)){ // No I18N
				this._fillNavBarContent(date || this._viewDate, element);	
			}		
		},
		_fillDates: function(date, element, index){
			var element = element || this.element;
			var value = new Date(date || this._viewDate), year = value.getFullYear(), month = value.getMonth(), date = value.getDate(), prevDate;
			var prevMonth = new Date(year, month), nextMonth, dates='', prevDate = prevMonth.getDate(), index, firstDay = prevMonth.getDay(), rowCount = 0;
			//Added since Date Object considers two digit year in 1900's 
			if(year < 100){
				prevMonth.setFullYear(year);
			}
			prevMonth.setDate(prevDate - (prevMonth.getDay() - this.options.firstDayOfWeek + 7)%7);	
			index = typeof index === "number" ? index : (index === undefined ? element.closest("li").index() : index);	   // No I18N	
			nextMonth = new Date(prevMonth);
			if(index === -1 || index === 1 || index === 2 || (index === 0 && !this.options.displayAdjacentMonthDates)){
				nextMonth.setDate(nextMonth.getDate() + 42);		
			}else{
				if(this._monthsPerView > 1 && this.options.displayAdjacentMonthDates){				
					if(index === 0){
						var prevMonthVal = prevMonth.getMonth(), 
							noOfDaysInPrev = new Date(year, prevMonthVal + 1, 0).getDate();
						var noOfDays = new Date(year, month+1, 0).getDate();
						nextMonth.setDate((firstDay !== this.options.firstDayOfWeek ? noOfDaysInPrev : 0) + noOfDays + 1);
					}
				}			
			}
			nextMonth.setHours(0,0,0,0);
			prevMonth.setHours(0,0,0,0);
			var monthVal = nextMonth.getMonth();
			nextMonth = nextMonth.valueOf();
			var flag = false, first = this.options.firstDayOfWeek, noOfTd = (prevMonth.getDay() - this.options.firstDayOfWeek + 7)%7;
			var weeknumbers, weekContainer;
			element.find("."+$.zdatetimepicker._CLASSES.weeknumbers).remove();
			if(this.options.displayWeekNumbers){
				weekContainer = $($.zdatetimepicker._WEEKNUMBER).prependTo(element.find("."+$.zdatetimepicker._CLASSES.monthContainer));  // No I18N
				weekContainer.find("th."+$.zdatetimepicker._CLASSES.weeknumber).text(this.options.weekHeading);	  // No I18N
			}
			for(var i=prevMonth; i.valueOf() < nextMonth; i.setDate(i.getDate() + 1)){
				var weekDay = i.getDay();
				i.setHours(0,0,0,0);
				var shouldAddElement = (this.options.displayAdjacentMonthDates && (index === -1 || index === 0 || index === 2 || index === 1 && this._monthsPerView === 2)) || i.getMonth() <= value.getMonth() && i.getFullYear() === value.getFullYear() || i.getFullYear() < value.getFullYear();
				if(weekDay === first){	
					if(this.options.displayWeekNumbers && shouldAddElement){
						// Week number calculated as per IS0 8601 standard.
						var weekStart = new Date(i.getTime() + (this.options.firstDayOfWeek - weekDay - 7) % 7 * 86400000), 
							thursdayWeek = new Date(weekStart.getTime() + (7 + 4 - weekStart.getDay()) % 7 * 86400000),
							firstThursday = new Date(Number(firstThursday = new Date(thursdayWeek.getFullYear(), 0, 1)) + (7 + 4 - firstThursday.getDay()) % 7 * 86400000),
							weekNumber = (thursdayWeek - firstThursday) / 86400000 / 7 + 1;
						var weekElement = $("<tr role='row'><td role='gridcell' class='"+$.zdatetimepicker._CLASSES.weeknumber+"'>"+weekNumber+"</td>");  // No I18N
						weekElement.appendTo(weekContainer.find("tbody")); // No I18N
					}
					if(shouldAddElement){
						dates += "<tr role='row'>";  // No I18N	
						rowCount++;		
					}
				}			
				if(!this.options.displayAdjacentMonthDates || index === 1 && index !== this._monthsPerView -1 || index === this._monthsPerView - 1){
					if( i.getMonth() < value.getMonth() && i.getFullYear() === value.getFullYear() || i.getFullYear() < value.getFullYear()){
						dates += "<td role='gridcell'> </td>"
						continue;
					}else if((i.getMonth() > value.getMonth() && i.getFullYear() === value.getFullYear() || i.getFullYear() > value.getFullYear()) && (index === -1 || (this.options.displayAdjacentMonthDates && (index === 0 || index === 1 && index !== this._monthsPerView - 1)) || !this.options.displayAdjacentMonthDates)){
						break;
					}	
				}
				var classNames = this._getClasses(i, value)				
				var dateValue = i.getDate();
				var val = "<td role='gridcell' class='"+classNames+"' data-time='"+i.getTime()+"'><span class='"+$.zdatetimepicker._CLASSES.dateText+"'>"+dateValue+"</span></td>";  // No I18N
				if(this.options.disabledDates.length || this.options.specialDates.length){
					var returnValue = this._shouldAddClass(i, ["disabledDates", "disabledDaysOfWeek", "specialDates", "specialDaysOfWeek"]);  // No I18N
					if(typeof returnValue === "object" || typeof returnValue === "boolean"){   // No I18N
						var stringIndex;
						if(typeof returnValue === "object"){   // No I18N
							if(returnValue.className){
								stringIndex = val.indexOf("class='");   // No I18N
								val = val.slice(0, stringIndex+7) + " "+returnValue.className+" "+ val.slice(stringIndex+7);   // No I18N
							}
							if(returnValue.title){
								stringIndex = val.indexOf("class");   // No I18N
								val = val.slice(0, stringIndex) + " title='"+returnValue.title+"' " + val.slice(stringIndex);   // No I18N
							}
						}
						var disabledInfo = this.options.disabledDateInformativeText, highlightInfo = this.options.highlightedDatesInformativeText 
						if(returnValue.informativeText || (typeof returnValue === "boolean" && disabledInfo || highlightInfo)){   // No I18N					
							var finalVal;  
							if(returnValue.informativeText !== undefined){
								finalVal = returnValue.informativeText;
							}else if(classNames.indexOf($.zdatetimepicker._CLASSES.disabled) > -1 && disabledInfo){
								finalVal = disabledInfo;
							}else if(classNames.indexOf($.zdatetimepicker._CLASSES.highlighted) > -1 && highlightInfo){
								finalVal = highlightInfo;
							}
							if(finalVal !== undefined){
								stringIndex = val.indexOf("</td>");   // No I18N
								val = val.slice(0, stringIndex) + "<span class='zdatetimepicker__secondaryinfo'>"+finalVal+"</span> "+val.slice(stringIndex); // No I18N
							}
						}
					}
				}
				var cellContent = {dateCell: val};
				this._trigger(this._EVENTS.BEFOREDATECELLRENDER, undefined, cellContent);		
				if(cellContent.modified){
					val = cellContent.dateCell;
				}
				dates += val;
			}
			this._rowsCount.push(rowCount);
			element.find("."+$.zdatetimepicker._CLASSES.dateView+" tbody").html(dates);  // No I18N
			if(!this.options.allowSelectionOfAdjacentMonthDates){
				element.find("table."+$.zdatetimepicker._CLASSES.dateView).addClass($.zdatetimepicker._CLASSES.readonlyAdjacent);
			}
		},
		_updateArrowState: function(date, index){
			var updateInBatch = this._monthsPerView > 1;
			date = date || this._viewDate;
			var minDate = this._minDate, maxDate = this._maxDate,
				year = date.getFullYear(), month = date.getMonth(), minYear = minDate && minDate.getFullYear(), 
				minMonth = minDate && minDate.getMonth(), maxYear = maxDate && maxDate.getFullYear(), maxMonth = maxDate && maxDate.getMonth(),
				prev = year < minYear || (year === minYear && month - 1 < minMonth),
				next = year > maxYear || (year === maxYear && month + 1 > maxMonth),
				yearPrev = ((year - 1 < minYear) || year - 1 === minYear && month < minMonth), yearNext = ((year + 1 > maxYear) || year + 1 === maxYear && month > maxMonth);
			var disabledCl = $.zdatetimepicker._CLASSES.disabled;
			if(!updateInBatch || (updateInBatch && index === 0)){
			 	$("#"+this._elementId+"-left-month-0")[prev ? "addClass" : "removeClass"](disabledCl);	// No I18N
			 	$("#"+this._elementId+"-left-year")[yearPrev ? "addClass" : "removeClass"](disabledCl); // No I18N	
			}
			if(!updateInBatch || (updateInBatch && index === this._monthsPerView - 1)){
				$("#"+this._elementId+"-right-month-0")[next ? "addClass" : "removeClass"](disabledCl);	// No I18N
				$("#"+this._elementId+"-right-year")[yearNext ? "addClass" : "removeClass"](disabledCl); // No I18N
			}
		},
		_getClasses: function(date, dateToCompare){
			dateToCompare = dateToCompare || this._viewDate;
			var secondYear = dateToCompare.getFullYear(), secondMonth = dateToCompare.getMonth(), secondDate = dateToCompare.getDate(),
				firstYear = date.getFullYear(), firstMonth = date.getMonth(), firstDate = date.getDate(), today = new Date(), classes='';  // No I18N
			if((firstYear < secondYear || (firstYear === secondYear && firstMonth < secondMonth)) || ((firstYear === secondYear && firstMonth > secondMonth) || (firstYear > secondYear))){
				classes += " "+$.zdatetimepicker._CLASSES.adjacent;  // No I18N
			}else{
				classes += " "+$.zdatetimepicker._CLASSES.date;  // No I18N
			} 
			if(ZDateUtil.areDatesEqual(date, today)){
				classes += " "+$.zdatetimepicker._CLASSES.today;  // No I18N
			}
			if(this._currentSelected && ZDateUtil.areDatesEqual(date, this._currentSelected) || (this.options.value && ZDateUtil.areDatesEqual(date, this.options.value) && this._currentSelected && ZDateUtil.areDatesEqual(date, this._currentSelected))){
				classes += " "+$.zdatetimepicker._CLASSES.selected;
			}
			if(this._selectedDates.length && this.options.selectionType === "multiple"){  // No I18N
				var isSelected = false;
				for(var i=0, len=this._selectedDates.length; i<len; i++){
					if(this._selectedDates[i] && ZDateUtil.areDatesEqual(date, this._selectedDates[i])){
						classes += " "+$.zdatetimepicker._CLASSES.selected;   // No I18N
						isSelected = true;
					}
				}
				if(!isSelected && this.options.selectionLimit === this._selectedDates.length){
					classes += " "+$.zdatetimepicker._CLASSES.disabled;   // No I18N
				}
			}
			if(this._weekEnds.indexOf(date.getDay().toString()) > -1){
				classes += " "+$.zdatetimepicker._CLASSES.weekend;  // No I18N
			}
			var optionsArray = ["disabledDaysOfWeek", "disabledDates"];  // No I18N
			if(!this._dateWithInRange(date) || this._shouldAddClass(date, optionsArray) || this.options.disabledMonths && this.options.disabledMonths.indexOf(date.getMonth()) > -1 || this.options.disabledYears && this.options.disabledYears.indexOf(date.getFullYear()) > -1){
				classes += " "+$.zdatetimepicker._CLASSES.disabled+" zdisabled";
			}
			var optionsArray = ["specialDaysOfWeek", "specialDates"];  // No I18N
			if(this._shouldAddClass(date, optionsArray)){
				classes += " "+$.zdatetimepicker._CLASSES.highlighted;
			}
			return classes;
		},
		_shouldAddClass: function(date, options){
			for(var i=0, len = options.length; i < len; i++){
				var optionVal = this.options[options[i]];
				if(optionVal){
					if($.inArray(date.getDay(), optionVal) > -1){
					 	return true;
					}
					for(var j=0, length = optionVal.length; j < length; j++){
						var value = optionVal[j];
						if(typeof value === "object"){  // No I18N
							if(value.date instanceof Date){
								if(ZDateUtil.areDatesEqual(value.date, date)){
									return true;
								}
							}else{
								if(value.date){
									var dateToCheck = new Date(value.date.date.getTime());
									value.repeatEveryYear && dateToCheck.setFullYear(date.getFullYear());
									value.repeatEveryMonth && dateToCheck.setMonth(date.getMonth());
									if(ZDateUtil.areDatesEqual(dateToCheck, date)){
										return value;
									}
								}else if(value.startDate && value.endDate){
									var startDate = new Date(value.startDate.date.getTime()), endDate = new Date(value.endDate.date.getTime());
									if(value.repeatEveryYear){
										startDate.setFullYear(date.getFullYear());
										endDate.setFullYear(date.getFullYear());
									}
									if(value.repeatEveryMonth){
										startDate.setMonth(date.getMonth());
										endDate.setMonth(date.getMonth());
									}
									if(ZDateUtil.isGreater(date, startDate) || ZDateUtil.areDatesEqual(startDate, date)){
										if(ZDateUtil.isGreater(endDate, date)){
											return value;	
										}
									}
								}							
							}
						}
					}
				}
			}
		},
		_parseDateValue: function(date, pattern){
			var val, parsedDate = {}, pattern, formattedDate, matchFound = false, finalValue;
          	var patterns = [];
          	if(date instanceof Date){
          		return {date: date, isValid: true};
          	}
          	if(this.options.otherInputFormats.length){
				 patterns = this.options.otherInputFormats.slice();
          	}
			patterns.unshift(pattern);
			var date1 = date;
			var dateParts = date.match(/[^ -/:-@\u5e74\u6708\u65e5[-`{-~\t\n\r]+/g) || []
			for(var j=0, len = patterns.length; j < len; j++){
				date = date1;
				typeof patterns[j] === "string" && (patterns[j] = ZDateUtil.parsePattern(patterns[j]));	// No I18N	 
				finalValue = ZDateUtil.parseDate(date, patterns[j]);
				if(finalValue.isValid){
					matchFound = true;
					break;
				}
			}	
          	if(!matchFound){
          		patterns[0].values = dateParts;
  				finalValue = ZDateUtil.getDateFromOffset(date1, finalValue.date, patterns[0]);
          	}
            return finalValue;
		},
		_fillDayOfWeek: function(element){
			var weekHTML='', start = this.options.firstDayOfWeek, classes = "", weekend = this.options.weekendDays.split(",");  // No I18N
			element = element || this.element;
			for(var i=start; i<start + 7; i++){
				classes ="";
				if(i % 7 === parseInt(weekend[0]) || i % 7 === parseInt(weekend[1])){
					classes += $.zdatetimepicker._CLASSES.weekend;
				}
				weekHTML += "<th class='"+$.zdatetimepicker._CLASSES.day+" "+classes+"'>"+this._getI18N("ZDatetimepicker", "daysAbbreviated", this.options.keys)[i % 7]+"</th>";  // No I18N
			}
			element.find("."+$.zdatetimepicker._CLASSES.days).append(weekHTML);  // No I18N
		},
		_parseValue: function(optionName, value){
			var isModified, dateInfo;
			if(typeof value === "string"){ // No I18N
				if(value === "TODAY" || value === "NOW"){  // No I18N
					if(value === "NOW" && (optionName === "minDate" || optionName === "maxDate")){  // No I18N
						this["_"+optionName+"HasTime"] = true;  // No I18N
					}
					this.options[optionName]=  new Date();
				}else{
					dateInfo = this._parseDateValue(value, this.options.format);
					if(optionName === "minDate" || optionName === "maxDate"){  // No I18N
						if(this._hasTime){
							if(!dateInfo.isValid){
								this["_"+optionName+"HasTime"] = false;  // No I18N
								dateInfo = this._parseDateValue(value, this._dateFormat);
							}else{
								this["_"+optionName+"HasTime"] = true;  // No I18N
							}
						}
					}
					this.options[optionName]= dateInfo ? dateInfo.date : undefined;
				}
				isModified = true;
			}else if(value instanceof Date){
				this.options[optionName] = value;
				isModified = true;
			}else{
				this._oldValueOption && (isModified = true);
				this.options[optionName] = undefined;
			}
			return isModified;
		},
		open: function(){
			if(this.options.type === "popup" && (this.options.forElement || this.options.offset) || this.options.type === "inline"){  // No I18N
				this._showPicker();
			}
		},
		close: function(){
			this._manualClose = true;
			this._closePicker();
			this._manualClose = false;
		},
		_removeTimeBar: function(){
			if(this._timeElement && this._timeElement.length){
				this.element.find("."+$.zdatetimepicker._CLASSES.timepicker).remove();
				this._timeElement = this._hourElement = this._minuteElement = this._periodElement = undefined;
			}
		},
		_setValue: function(value){
			this._rowsCount = [];
			this._valueUpdate = true;
			var isModified = this._parseValue("value", value); // No I18N
			this._hasTime = this.options.selectionType === "multiple" ? false : this._checkIfDateHasTime();  // No I18N
			if(this.options.value && !this._hasTime && isModified){
				this.options.value.setHours(0,0,0,0);
			}
			this._performValidations();
			this._currentSelected = this.options.value ? new Date(this.options.value.getTime()) : undefined;
			if(isModified){
				var date = this.options.value || new Date();
				this._viewDate = new Date(date.getTime());	
				this._viewDate.setHours(0,0,0,0);			
			}
			if(this.options.navigationBar.monthYearSwitcherType === "dropdown"){  // No I18N
				this._yearHeader && this._yearHeader.zcombobox("destroy"); // No I18N
				$("#"+this._elementId+"-year-header").remove(); // No I18N
				this._yearHeader = undefined;
			}
			this._renderContent();
			this._removeTimeBar();
			if(this._hasTime){	
				this._buildTimePicker();
			}
			if(this.options.value){
				var newDate = this._resetTime(this.options.value);
				var target = this.element.find("[data-time='"+newDate.getTime()+"']");  // No I18N
				this._setDate(undefined, target, this.options.value, true);
			}
			this._reset && this._reset.length && this._reset[this.options.value ? "removeClass" : "addClass"]("is-disabled").attr("disabled", this.options.value ? false : true);  // No I18N	
		},
		_addAprropriateClasses: function(){
			if(this._footer && this._footer.length){
				if(this._timeElement && this._timeElement.length){
					this.element.addClass($.zdatetimepicker._CLASSES.triple);	
					this._timeElement.removeClass("h-aligncenter h-alignright h-alignleft").addClass("h-align"+(this.options.buttonsAlignment === "left" ? "right" : "left"));   // No I18N	
				}else{
					this.element.removeClass($.zdatetimepicker._CLASSES.triple);
				}
			}else if(this._timeElement && this._timeElement.length){
				this.element.removeClass($.zdatetimepicker._CLASSES.triple);
			 	this._timeElement.removeClass("h-aligncenter h-alignright h-alignleft").addClass("h-aligncenter");   // No I18N
			}	
		},
		_refreshClassNames: function(pickerEle, className, optionsArray){
			var base = this;
			pickerEle.find("td."+$.zdatetimepicker._CLASSES.date+",td."+$.zdatetimepicker._CLASSES.adjacent).filter(function(ele, value){  // No I18N
				$(value).hasClass(className) && $(value).removeClass(className);
				var date = new Date(parseInt(value.getAttribute("data-time")));  // No I18N
				if(base._shouldAddClass(date, optionsArray)){
					$(value).addClass(className);
				}	
			});
		},
		_setAttribute: function(optionName, value, pickerEle){
			pickerEle = pickerEle || this.element;
			this._oldValue = this.options[optionName];
			var buttonOptions = ["todayButton", "clearButton", "hideCancelButton"];  // No I18N
			if(typeof value === "object" && !(value instanceof Array) && !(value instanceof Date)){  // No I18N
				this._yearNavigation = value.yearNavigationButtons; 
				if(optionName === "commandBar"){  // No I18N
					this.options.commandBar = value;
				}else{
					value = $.extend(true, {}, this.options[optionName], value);
				}
			}
			this._oldValueOption = this.options.value;
			this.options[optionName] = value;
			if(this._yearNavigation == undefined){
				this._yearNavigation = this.options.navigationBar.yearNavigationButtons =  /^(drilldown|none)$/.test(this.options.navigationBar.monthYearSwitcherType) ? true : false;
			}
			if(optionName === "value"){ // No I18N
				this._setValue(this.options.value);
			}else if(optionName === "values"){  // No I18N
				this.setValues(this.options.values);
			}else if(optionName === "format"){  // No I18N
				if(this.options.value){
					var newDate = this._resetTime(this.options.value);
					var target = pickerEle.find("[data-time='"+newDate.getTime()+"']");  // No I18N
					this._setDate(undefined, target, this.options.value);
				}
				this._hasTime = this._checkIfDateHasTime();
				this._removeTimeBar();
				if(this._hasTime){
					this._buildTimePicker();
				}
				if(this._monthsPerView === 3){
					this._addAprropriateClasses();
				}
			}else if(optionName === "minDate" || optionName === "maxDate" && this._hasDate){  // No I18N
				this._parseValue(optionName, value);
				this["_"+optionName] = this.options[optionName];  // No I18N
				if(this.options.navigationBar.monthYearSwitcherType === "dropdown"){  // No I18N
					this._yearHeader && this._yearHeader.zcombobox("destroy"); // No I18N
					$("#"+this._elementId+"-year-header").remove(); // No I18N
					this._yearHeader = undefined;
				}
				if(!this.options.value && this.options.values.length === 0){
					this._viewDate = new Date();
					this._viewDate.setHours(0,0,0,0);
				}
				this._validateBoundaries();
				if(!this.options.value && this.options.values.length === 0){
					this._setMonthToView();
					this._setYearToView();
				}
				this._renderContent();
				if(this._monthHeader){
					this._checkOptions();
				}
			}else if(optionName === "title"){  // No I18N
				if(value && value.length){
					var title = pickerEle.find("."+$.zdatetimepicker._CLASSES.title);
					if(title.length === 0){
						pickerEle.prepend($($.zdatetimepicker._HEADER));
					}
					pickerEle.find("."+$.zdatetimepicker._CLASSES.title).html(this.options.isTitleHTMLEncoded ? value : ZComponents.encodeHTML(value));  // No I18N
					if(this.options.type !== "inline"){  // No I18N
						this.options.closeButton && !this._closeButton && this._createCloseButton(); 
						this.options.draggable && !pickerEle.data("zdraggable") && this._initDraggable();  // No I18N
					}
				}else{
					pickerEle.find("."+$.zdatetimepicker._CLASSES.header).remove();  // No I18N
				}
			}else if(optionName === "closeButton"){  // No I18N
				if(value){
					this.options.title && this.options.type !== "inline" && this._createCloseButton();  // No I18N
				}else{
					if(this._closeButton){
						this._closeButton.remove();
						this._closeButton = undefined;
					}
				}
			}else if(optionName === "closeSVGIconId" || optionName === "closeIconClassName"){   // No I18N
				this._createCloseButton();
			}else if(optionName === "position"){   // No I18N
				this._isPositionModified = true;
				this._performValidations();
			}else if(optionName === "displayType"){   // No I18N
				this._performValidations();
				if(value === "box" && this._pointer){   // No I18N
					this._pointer.remove();
					this._pointer = undefined;
					!this._isPositionModified && (this.options.position = "bottom-left");   // No I18N
				}else{
					this._constructPointer();
				}
			}else if(optionName === "forElement"){   // No I18N
				this.options.forElement = value ? $(value) : undefined;
			}else if(optionName === "customHTMLAboveNavigationBar"){   // No I18N
				value ? this._insertHTMLAboveNavbar() : this._oldValue && $(this._oldValue).length && $(this._oldValue).appendTo(this._aboveNavbarParent);
			}else if(optionName === "customHTMLBelowCalendar"){   // No I18N
				value ? this._insertHTMLBelowCalendar() : this._oldValue && $(this._oldValue).length && $(this._oldValue).appendTo(this._belowCalendarParent);
			}else if(optionName === "customHTMLAboveCalendar"){   // No I18N
				value ? this._insertHTMLAboveCalendar() : this._oldValue && $(this._oldValue).length && $(this._oldValue).appendTo(this._aboveCalendarParent);
			}else if(optionName === "displayWeekNumbers"){   // No I18N
				this._renderContent();
			}else if(optionName === "weekHeading" && this._hasDate && this.options.displayWeekNumbers){  // No I18N
				pickerEle.find("th."+$.zdatetimepicker._CLASSES.weeknumber).text(this.options.weekHeading);
			}else if(optionName === "type"){  // No I18N
				if(this.options.type ===  "popup"){    // No I18N
					(this.options.forElement || this.options.offset) && this._showPicker();
				}else{
					if(this._closeButton){
						this._closeButton.remove();
						this._closeButton = undefined
					}
					if(this._cancel){
						this._cancel.remove();
						this._cancel = undefined;
					}
				}
			}else if(optionName === "selectionType"){  // No I18N
				this._currentSelected = false;
				this._resetValues();
				this._hasDate && this._renderContent();
				if(this._hasTime){
					this._removeTimeBar();
					this._buildTimePicker();
				}
				var calendar = this.element.find("."+$.zdatetimepicker._CLASSES.dateView);
				this.options.selectionType === "multiple" ? calendar.attr("aria-multiselectable", true) : calendar.removeAttr("aria-multiselectable");  // No I18N
			}else if(optionName === "selectionLimit" && this.options.selectionType === "multiple" && this._hasDate){  // No I18N
				var len = this._selectedDates.length;
				if(len > this.options.selectionLimit){
					var diff = len - this.options.selectionLimit, pos = len - diff;
					for(var i=pos; i<(pos + diff);i++){
						var date = this._resetTime(this._selectedDates[i]);
						pickerEle.find("[data-time='"+date.getTime()+"']").removeClass($.zdatetimepicker._CLASSES.selected).removeAttr("aria-selected").addClass($.zdatetimepicker._CLASSES.disabled).attr("aria-disabled", true);   // No I18N
					}
					this._selectedDates.splice(pos, diff);
					this.options.values.splice(pos, diff);
					this._trigger(this._EVENTS.APPLY, undefined, {valuesObject: this._selectedDates, valueString: this.options.values});
					if(this._selectedDates.length === this.options.selectionLimit){
						this._limitReached = true;
					}
				}else if(this.options.selectionLimit > len && this._limitReached){
					this._limitReached = false;
					pickerEle.find("."+$.zdatetimepicker._CLASSES.date+",."+$.zdatetimepicker._CLASSES.adjacent).filter(this._queryString).removeClass($.zdatetimepicker._CLASSES.disabled).removeAttr("aria-disabled");
				}else if(this.options.selectionLimit === len){
					this._limitReached = true;
				}
				if(this._limitReached){
					this._queryString = ":not(";  // No I18N
					this._getQueryString();
					pickerEle.find("."+$.zdatetimepicker._CLASSES.date+",."+$.zdatetimepicker._CLASSES.adjacent).filter(this._queryString).addClass($.zdatetimepicker._CLASSES.disabled).attr("aria-disabled", true);   // No I18N
				}
				if(this._selectedDates && this._selectedDates.length){
					this._viewDate = new Date(this._selectedDates[this._selectedDates.length - 1].getTime());
				}
				if(this._oldDate && !ZDateUtil.areDatesEqual(this._viewDate, this._oldDate)){
					this._renderContent();
				}
			}else if(buttonOptions.indexOf(optionName) > -1 || optionName === "immediateCommit" || optionName === "commandBar"){  // No I18N
				this._reBuildCommandBar(); 
 				if(this._monthsPerView === 3){
 					this._addAprropriateClasses();
 				}
			}else if(optionName === "clearButtonLabel"){  // No I18N
				this._reset && this._reset.find(".zbutton__text").text(this.options.clearButtonLabel);  // No I18N
			}else if(optionName === "todayButtonLabel"){  // No I18N
				this._today && this._today.text(this.options.todayButtonLabel); 
			}else if(optionName === "cancelButtonLabel"){  // No I18N
				this._cancel && this._cancel.find(".zbutton__text").text(this.options.cancelButtonLabel);  // No I18N
			}else if(optionName === "OKButtonLabel"){  // No I18N
				this._apply && this._apply.find(".zbutton__text").text(this.options.OKButtonLabel);  // No I18N
			}else if(optionName === "monthsPerView" || optionName === "locale" || optionName === "navigationBar" || optionName === "drilldownLevelOnOpen"){  // No I18N
				this.destroy();
				this.element[this.eventPrefix](this.options);
			}else if(optionName === "weekendDays" && this._hasDate){    // No I18N
				this._weekEnds = this.options.weekendDays.split(",");   // No I18N
				var tdElements = pickerEle.find("td."+$.zdatetimepicker._CLASSES.date+",td."+$.zdatetimepicker._CLASSES.adjacent).removeClass($.zdatetimepicker._CLASSES.weekend), tdLength = tdElements.length;
				for(var i=0;i<tdLength;i++){
					var element = $(tdElements[i]), value = parseInt(element.attr("data-time")), dayValue = new Date(value).getDay();  // No I18N
					if(this._weekEnds.indexOf(dayValue.toString()) > -1){
						element.addClass($.zdatetimepicker._CLASSES.weekend);
					}
				}
			}else if(optionName === "timeLabelType"){   // No I18N
				if(this._hasTime){
					var ele = pickerEle.find(".zdatetimepicker--multipleselectbox");   // No I18N
					ele = ele.length ? ele : undefined;
					this._buildLabel(ele);
					var icon = this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeIcon),
						label = this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeLabel);   // No I18N
					if(value === "text" || value === "none"){   // No I18N
						icon.length && icon.remove();
					}
					if(value === "icon" || value === "none"){  // No I18N
						label.length && label.remove();
					}
				}
			}else if(optionName === "draggable"){  // No I18N
				if(this.options.title && this.options.draggable && $.fn.zdraggable){  
					this._initDraggable();
				}else{
					this.element.data("zdraggable") && this.element.zdraggable("destroy");   // No I18N
				}
			}else if(optionName === "monthToBeShownOnOpen" || optionName === "yearToBeShownOnOpen" && this._hasDate){  // No I18N
				optionName === "monthToBeShownOnOpen" ? this._setMonthToView() : this._setYearToView();   // No I18N
				this._validateViewDate();
				this._renderContent();
			}else if(optionName === "disabledDaysOfWeek" || optionName === "specialDaysOfWeek" || optionName === "specialDaysOfWeek" || optionName === "specialDates" || optionName === "disabledDates" && this._hasDate){   // No I18N
				var className;
				if(optionName === "disabledDates" || optionName === "specialDates"){   // No I18N
					var datesObject = {}; 
					datesObject[optionName] = this.options[optionName];
					this._convertStringToObject(datesObject)
				}
				className = $.zdatetimepicker._CLASSES.disabled+" zdisabled";   // No I18N
				this._refreshClassNames(pickerEle, className, ["disabledDaysOfWeek", "disabledDates"]);   // No I18N
				className = $.zdatetimepicker._CLASSES.highlighted;
				this._refreshClassNames(pickerEle, className, ["specialDaysOfWeek", "specialDates"]);   // No I18N
			}else if(optionName === "disabledMonths" && this._hasDate){   // No I18N
				if(this.options.disabledMonths.indexOf(this._viewDate.getMonth()) > -1){
					pickerEle.find("td").addClass($.zdatetimepicker._CLASSES.disabled+" zdisabled").attr("aria-disabled", true); // No I18N		
				}else{
					if(this.options.navigationBar.monthYearSwitcherType === "dropdown"){   // No I18N
						if(this._monthHeader){
							this._monthHeader.zselectbox("setOptionAttributes", this._oldValue, "disabled", false);   // No I18N	
							this._monthHeader.zselectbox("setOptionAttributes", this.options.disabledMonths, "disabled", true);   // No I18N
						}	
					}else{
						this._monthDrillDownElement && this._monthDrillDownElement.find("td").addClass($.zdatetimepicker._CLASSES.disabled).attr("aria-disabled", true); // No I18N	
					}
				}
			}else if(optionName === "disabledYears" && this._hasDate){    // No I18N
				if(this.options.disabledYears.indexOf(this._viewDate.getFullYear()) > -1){
					if(this.options.navigationBar.monthYearSwitcherType === "drilldown"){  // No I18N
						pickerEle.find("td").addClass($.zdatetimepicker._CLASSES.disabled+" zdisabled").attr("aria-disabled", true); // No I18N		
					}
				}else{
					if(this.options.navigationBar.monthYearSwitcherType === "dropdown"){   // No I18N	
						if(this._yearHeader){
							this._yearHeader.zcombobox("setOptionAttributes", this._oldValue, "disabled", false);   // No I18N	
							this._yearHeader.zcombobox("setOptionAttributes", this.options.disabledYears, "disabled", true);   // No I18N	
						}
					}else{
						this._yearDrillDownElement && this._yearDrillDownElement.find("td").addClass($.zdatetimepicker._CLASSES.disabled).attr("aria-disabled", true); // No I18N	
					}
				}
			}else if(optionName === "timeFieldType" || optionName === "timeMultipleSelectBoxType" || optionName === "minTime" || optionName === "maxTime" || optionName === "hourStep" || optionName === "minuteStep" || optionName === "disabledTimeList" || optionName === "fixedTimeOptions"){  // No I18N
				this._hasTime = this._checkIfDateHasTime();
				this._validateTimeOptions();
				this._removeTimeBar();
				this._hasTime && this._buildTimePicker();
			}else if(optionName === "timeLabel"){  // No I18N
				this._timeElement && this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeLabel).text(this.options.timeLabel);  // No I18N
			}else if(optionName === "timeLabelIconClassName" || optionName === "timeLabelSVGIconId"){   // No I18N
        	    this._timeElement && this._handleIcon(this._timeElement.find("."+$.zdatetimepicker._CLASSES.timeIcon),  undefined,"time",this.options.timeLabelIconClassName,this.options.timeLabelSVGIconId);  // No I18N
			}else if(optionName === "displayAdjacentMonthDates" && this._hasDate){  // No I18N
				this._renderContent(undefined, undefined, false);
			}else if(optionName === "selectedDateMonthViewIndex" && this._hasDate){  // No I18N
				if(this.options.value){
					this._viewDate = new Date(this.options.value.getTime());
					this._updateSelectedDatePosition();
				}
			}else if(optionName === "allowSelectionOfAdjacentMonthDates" && this._hasDate){  // No I18N
				this.element.find("table."+$.zdatetimepicker._CLASSES.dateView)[ value ? "removeClass" : "addClass" ]($.zdatetimepicker._CLASSES.readonlyAdjacent);  // No I18N
			}else if(optionName === "width"){  // No I18N
				this.options.width && this.element.width(this.options.width);
			}else if(optionName === "height"){  // No I18N
				this.options.height && this.element.height(this.options.height);
			}else if(optionName === "className"){  // No I18N
				this.element.removeClass(this._oldValue)
				value && this.element.addClass(value);
			}else if(optionName === "offset"){  // No I18N
				this.element.css(this.options.offset);
			}else if(optionName === "margin"){  // No I18N
				if(this.element.is(":visible")){  // No I18N
					var position = {};
					position.left = parseInt(this.element.css("left"));  // No I18N
					position.top = parseInt(this.element.css("top"));  // No I18N
					position = this._retrieveMarginValues(position);
					this.element.css(position);
				}
			}
		},
		_reBuildCommandBar: function(){
			var command = this.options;
			this.options.OKButton =  !this.options.immediateCommit;
			this.options.cancelButton = !this.options.hideCancelButton && !this.options.immediateCommit;  
			if(this._footer){
				this._unBindButtonEvents();
				this._footer.empty()
			}	
			var columnExists = this._checkIfColumnExists();
			if(command.todayButton || command.OKButton || command.cancelButton || command.clearButton || columnExists){				
				this._createButtons();
				this._bindButtonEvents();
			}
			if(this._footer && this._footer.children().length === 0){
				this._footer.remove();
				this._footer = undefined;
			}
			this._monthsPerView ===  3 && this._footer && this._footer.length && this._hasTime && this.element.addClass($.zdatetimepicker._CLASSES.triple);		
		},
		_checkIfColumnExists: function(){
			var columnExists = false;
			if(this.options.commandBar){
				var columns = ["leftColumn", "centerColumn", "rightColumn"];  // No I18N
				for(var i=0;i<columns.length;i++){
					if(this.options.commandBar.hasOwnProperty(columns[i])){
						columnExists = true;
						break;
					}
				}
				return columnExists;
			}
		},
		_bindArrowEvents: function(){
			$("#"+this._elementId+"-right-month-0, #"+this._elementId+"-left-month-0").on("click."+this.eventPrefix, this._handleMonthArrowClick.bind(this)); // No I18N
			this.options.navigationBar.yearNavigationButtons && $("#"+this._elementId+"-left-year, #"+this._elementId+"-right-year").on("click."+this.eventPrefix, this._handleYearArrowClick.bind(this)); // No I18N
		},
		getValue: function(){
			var formattedDate = ZDateUtil.formatDate(this.options.value, this.options.format);
			return {valueObject: this.options.value, dateString: formattedDate};
		},
		getValues: function(){
			var selectedDates = [];
			for(var i=0; i<this.options.values.length;i++){
				selectedDates[i] = ZDateUtil.parseDate(this.options.values[i], this.options.format).date;
			}
			return {values: this.options.values, valuesObject: selectedDates};
		},
		setValue: function(dateString){
			if(this.options.selectionType === "single"){  // No I18N
				this._setValue(dateString);
			}
		},
		setValues: function(datesArray){
			if(this.options.selectionType === "multiple"){  // No I18N
				this._rowsCount =[];
				this.options.values = datesArray;
				this._setValues();
				this._performValidations();
				if(this._oldDate && !ZDateUtil.areDatesEqual(this._oldDate, this._viewDate) || !this._oldDate){
					this._renderContent();
				}
			}
		},
		getElement: function(){
			return this.element;
		},
		clear: function(date){
			if(this.options.selectionType === "multiple" && date){  // No I18N
				var index;
				if(typeof date === "string"){  // No I18N
					index = this.options.values.indexOf(date);
				}else if(date instanceof Date){
					date.setHours(0,0,0,0);
					date = ZDateUtil.formatDate(date, this.options.format);
					index = this.options.values.indexOf(date);
				}
				if(index > -1){
					var date = this._resetTime(this._selectedDates[index]);
					this.element.find("[data-time='"+date.getTime()+"']").removeClass("is-selected").removeAttr("aria-selected"); // No I18N
					this.options.values.splice(index, 1);
					this._selectedDates.splice(index, 1);	
					if(this.options.values.length === 0){
						this._viewDate = new Date();
						this._viewDate.setHours(0,0,0,0);
					}
					this._renderContent();
				} 
			}
		},
		clearAll: function(){
			this._resetClickHandler();
			this.options.values = [];
			this._selectedDates = [];
		},
		destroy: function(){
			this.element.removeData(this.eventPrefix);
			this.element.off("."+this.eventPrefix);  // No I18N
			this.element.removeClass($.zdatetimepicker._CLASSES.datepicker+" "+$.zdatetimepicker._CLASSES.group+" "+$.zdatetimepicker._CLASSES.dropdown+" "+$.zdatetimepicker._CLASSES.triple);  // No I18N
			this._monthHeader && this._monthHeader.zselectbox("destroy");  // No I18N
			this._yearHeader && this._yearHeader.zcombobox("destroy");  // No I18N
			if(this._hasTime){
				var input = this.element.find(".zdatetimepicker-timeinput");  // No I18N
				input.length && input.zdatetimefield("destroy");  // No I18N
			}
			this.options.customHTMLAboveCalendar && $(this.options.customHTMLAboveCalendar).appendTo(this._aboveCalendarParent);
			this.options.customHTMLBelowCalendar && $(this.options.customHTMLBelowCalendar).appendTo(this._belowCalendarParent);
			this.options.customHTMLAboveNavigationBar && $(this.options.customHTMLAboveNavigationBar).appendTo(this._aboveNavbarParent);
			this.element.empty();
			if(this.options.draggable && this.element.data("zdraggable")){   // No I18N
				this.element.zdraggable("destroy");   // No I18N
			}
			this._rowsCount = [];
			this._minDate = undefined;
			this._maxDate = undefined;
			this._monthsPerView = undefined;
			this._currentSelected = undefined;
			this._selectedDates = [];
			this._navBar = this._monthHeader = this._monthYearNav = this._monthNavBar = this._yearNavBar = this._yearDrillDownElement = this._monthDrillDownElement = this._decadeDrillDownElement = this._leftNav = this._rightNav = this._decadeNavBar = this._reset = this._today = this._cancel = this._apply = this._singleTimeSelect = this._timeElement = undefined;
			this._combinedPeriodElement = this._combinedTimeElement = this._hourElement = this._minuteElement = this._periodElement = this._footer = undefined;
		}
	};
	ZComponents.$document.on("click.zdatetimepicker", function(orgEvent){  // No I18N
		if(ZComponents.openedPicker && ZComponents.openedPicker.options.closeOnBodyClick && ZComponents.openedPicker.element.is(":visible")){
			ZComponents.openedPicker._documentClickHandler(orgEvent);
		}
	});
	ZComponents.registerComponent("zdatetimepicker", dateTimePickerPrototype); // No I18N
	$.zdatetimepicker._CLASSES = {
		triple: "zdatetimepicker--triplecalendar",  // No I18N
		weeknumbers: "zdatetimepicker__weeknumbers",  // No I18N
		list: "zdatetimepicker__list",   // No I18N
		weeknumber: "zdatetimepicker__weeknumber",  // No I18N
		dropdown:"zdatetimepicker--dropdownyearbutton",  // No I18N
		dateText: "zdatetimepicker__text", // No I18N
		leftNav: "zdatetimepicker__leftnav", // No I18N
		highlighted: "zdatetimepicker--special",  // No I18N
		container: "zdatetimepicker__container",  // No I18N
		monthContainer: "zdatetimepicker__calendar",  // No I18N
		group: "zdatetimepicker--group",  // No I18N
		weekend: "zdatetimepicker--weekend",  // No I18N
		pointer: "zdatetimepicker__pointer",  // No I18N
		navOnRight: "zdatetimepicker__navbaractionsonright", // No I18N
		navOnLeft: "zdatetimepicker__navbaractionsonleft", // No I18N
		gridContainer: "zdatetimepicker__drilldownview", // No I18N
		monthYearTable: "zdatetimepicker__drilldowncell", // No I18N
		currentGrid: "zdatetimepicker--currentcell",   // No I18N
		grid: "zdatetimepicker__monthyeargrid", // No I18N
		timeIcon: "zdatetimepicker__timeicon",  // No I18N
		timeLabel: "zdatetimepicker__timelabel",  // No I18N
		rightNav: "zdatetimepicker__rightnav",// No I18N
		disabled: "is-disabled",  // No I18N
		selected: "is-selected",  // No I18N
		header: "zdatetimepicker__titlebar",  // No I18N
		title: "zdatetimepicker__title", // No I18N
		close: "zdatetimepicker__close", // No I18N
		datepicker: "zdatetimepicker",  // No I18N
		timepicker: "zdatetimepicker__timebar",  // No I18N
		body: "zdatetimepicker__monthcontainer",  // No I18N
		navBar: "zdatetimepicker__navbar",  // No I18N
		navButton: "zdatetimepicker__navbutton",  // No I18N
		navIcon: "zdatetimepicker__icon",  // No I18N
		monthYearNav: "zdatetimepicker__monthyearnav", // No I18N
		monthNav: "zdatetimepicker__monthnav", // No I18N
		yearNav: "zdatetimepicker__yearnav",  // No I18N
		dateView: "zdatetimepicker__month",  // No I18N
		days: "zdatetimepicker__week",   // No I18N
		day: "zdatetimepicker__day",  // No I18N
		date: "zdatetimepicker__date",  // No I18N
		today: "zdatetimepicker--today",  // No I18N
		adjacent: "zdatetimepicker__adjacentmonthdate",   // No I18N
		footer: "zdatetimepicker__commandbar", // No I18N
		disabledCalendar: "zdatetimepicker--disabledcalendar",  // No I18N
		readonlyAdjacent: "zdatetimepicker--adjacentmonthdatereadonly"  // No I18N
	}
	$.zdatetimepicker._LEFTNAV = "<div class='"+$.zdatetimepicker._CLASSES.leftNav+"'></div>";  // No I18N
	$.zdatetimepicker._RIGHTNAV = "<div class='"+$.zdatetimepicker._CLASSES.rightNav+"'></div>";  // No I18N
	$.zdatetimepicker._HEADER = "<div class='"+$.zdatetimepicker._CLASSES.header+"' role='heading'><span class='"+$.zdatetimepicker._CLASSES.title+"'></span></div>";
	$.zdatetimepicker._NAVBUTTON = "<button role='button' class='"+$.zdatetimepicker._CLASSES.navButton+"'><i class='"+$.zdatetimepicker._CLASSES.navIcon+"'></i></button></div>";  // No I18N
	$.zdatetimepicker._NAVITEM = "<div class='"+$.zdatetimepicker._CLASSES.monthYearNav+"'><span class='"+$.zdatetimepicker._CLASSES.monthNav+"'></span><span class='"+$.zdatetimepicker._CLASSES.yearNav+"'></span></div>";  // No I18N
	$.zdatetimepicker._MONTH = "<div class='"+$.zdatetimepicker._CLASSES.monthContainer+"'><table class='"+$.zdatetimepicker._CLASSES.dateView+"'><thead><tr role='row' class='"+$.zdatetimepicker._CLASSES.days+"'></tr></thead><tbody></tbody></table></div>";  // No I18N
	$.zdatetimepicker._TEMPLATE = "<div class='"+$.zdatetimepicker._CLASSES.body+" zdatetimepicker__days'><div class='"+$.zdatetimepicker._CLASSES.navBar+"'></div>"+$.zdatetimepicker._MONTH+"</div></div>";  // No I18N
	$.zdatetimepicker._WEEKNUMBER = "<table role='grid' class='"+$.zdatetimepicker._CLASSES.weeknumbers+"'><thead><tr role='row'><th class='"+$.zdatetimepicker._CLASSES.weeknumber+"'></th></tr></thead><tbody></tbody></table>";
}(jQuery));
