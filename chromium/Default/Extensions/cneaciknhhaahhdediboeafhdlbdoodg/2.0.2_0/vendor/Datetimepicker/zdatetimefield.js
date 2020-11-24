/* $Id$ */
(function($){  
	ZComponents.zdatetimefield = {
		DEFAULTS: {
		/** @member {String}
				[datetime-field.locale] - Locale that is to be used for displaying dates in standard format. Locale can be set in three scopes: Instance, Component and Global level respectively. The order of precendence of locale would be instance -> component -> global
				 @example <caption> Example </caption>

	Specify Locale at Instance level  

	    $("#demoField").zdatetimefield({
	       locale: "en-US"
	    });

	Specify locale at Component level 

	    ZDatetimefield.DEFAULTS.locale = "en-US"

	Specify locale at Global level

	    ZComponents.locale = "en-US"
			*/
			"locale": undefined,   // No I18N
			/** @member {String}
				[datetime-field.placeholerType = "date-format"] - Indicates the type of place holder to be used when there is no value in the date time field. To view the visual representation, refer Placeholder Type under Properties section in Demo Tab.
	            
	            "underscore" - This is used to display the format with underscore character. For example, If the date format is "dd/MMM/yyyy", then the placeholder for
	            the date time input would be "__/___/____".                                                                                                                                                                                                                                                                                                           

	            "date-format" - This value will display the actual format as placeholder. 

	            "date-format-in-lower" - This will display the actual format in lower case as placeholder. For example, if the date format is "dd-MM-yyyy", then the placeholder
	            would be "dd-mm-yyyy"

	            "date-format-in-upper" - This will display the actual format in upper case as placeholder. For example, if the date format is "dd.MMM.yyyy", then the placeholder
	            would be "DD.MMM.YYYY"

	            "custom" - This will allow the user to provide their own values for each of the date time segments. Individual segment values can be provided in the "placeholder" option. For
	            more details, refer that option.

				@allowedValues {("underscore"|"date-format"|"date-format-in-lower"|"date-format-in-upper"|"custom")} 
			*/
			"placeholderType": "date-format", 	// No I18N
			/** @member {Object}
				[datetime-field.placeholder] - The individual segments placeholder for date and time can be customized. The user has to set "placeholderType" option to "custom" for this to be effective.
				@example <caption> Example </caption>

	            $("#demoField").zdatetimefield({
	                placeholderType: "custom",
	                placeholder: {
	                    "weekDay": "day of the week",
	                    "period": "AM or PM"
	                }
	            })
			*/
			"placeholder": {  // No I18N
				/** @member {String}
					[datetime-field.placeholder.year = 'year']  - Custom value for year.
				*/
				"year": "year",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.month = 'month']  - Custom value for month.
				*/
				"month": "month",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.date = 'date']  - Custom value for date.
				*/
				"date": "date",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.hour = 'hour']  - Custom value for hour.
				*/
				"hour": "hours",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.minute = 'minute']  - Custom value for minute.
				*/
				"minute": "minutes",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.second = 'second']  - Custom value for seconds.
				*/
				"second": "seconds",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.weekDay = 'day']  - Custom value for week day.
				*/
				"weekDay": "day",	// No I18N
				/** @member {String}
					[datetime-field.placeholder.period = 'AM/PM']  - Custom value for AM/PM.
				*/
				"period": "AM/PM",	// No I18N
				"AM": "AM",	// No I18N
				"PM": "PM"	// No I18N
			},
			/** @member {String}
				[datetime-field.value] - The default value that has to be shown on initialization. 		
			*/
			"value": undefined,      // No I18N
			/** @member {String}
				[datetime-field.format = "dd/MM/yyyy"] - Date format that is used to parse the user input.	The same format is used for rendering the field as well.
				@allowedValues {("custom-format"|"date-short"|"date-medium"|"date-long"|"time-short"|"time-medium"|"time-long"|"datetime-short"|"datetime-medium"|"datetime-long")}	
	             
	            "custom-format" - Refer the Date format option under DISPLAY FORMAT heading in properties tab to know more about the standard text patterns for date format.

	            "date-short", "date-medium", "date-long", "time-short", "time-medium", "time-long", "datetime-short", "datetime-long" values are standard date formats available whose values are rendered based on the locale provided.

	            @example <caption> Example </caption>
	            
	  Custom format

	    $("#demoField").zdatetimefield({
	        format: "MM.dd.yyyy HH:mm"
	    })

	  If you wish to add custom text in between format, it should be enclosed between '' as follows
	   
	   $("#demoField").zdatetimefield({
		    format: "dd/MM/yyyy 'at' hh:mm tt"
	   })

	  Standard format
	            
	    $("#demoField").zdatetimefield({
	        format: "date-long",
	        locale: "en-US"
	    })

	If the format is provided as "date-long", then the corresponding value of the format will be retrieved based on the locale. In the above case, "date-long" for the locale "en-US" would be "ddd dd-MMMM-yyyy". This value will be retrieved from zlocale.js

			*/
			"format": "dd/MM/yyyy",   // No I18N
			/** @member {String}
				[datetime-field.otherInputFormats = []] - The list of formats to be used apart from the format provided in "format" option. These formats are used to parse the values provided for options "value", "min" and "max". The provided value will be parsed with the value provided in the "format" option. If that fails, then the provided value will be parsed in the order in which each of the values appears in otherInputFormats array. 	

				@example <caption> Example </caption>


	            $("#demoField").zdatetimefield({
	                   format: "dd/MM/yyyy, hh:mm:ss tt",
	                   otherInputFormats: ["MM-dd-yyyy, HH:mm:ss", "yyyy-dd-MM, hh:mm:ss tt"]  
	            });
			*/
			"otherInputFormats": [],   // No I18N
			/** @member {Integer}
				[datetime-field.century = 21] - It is used to determine the century when the date format has two digit representation for date. 

				@example <caption> Example </caption>

	 In the below example, the date would be taken as "25/07/1993"

	            $("#demoField").zdatetimefield({
	                 format: "dd/MM/yy",
	                 century: 20,
	                 value: "25/07/93"
	            });
			*/
			"century": 21,	// No I18N
			/** @member {String}
				[datetime-field.min] - Minimum value for the date time input.

				@example <caption> Example </caption>

	 In the below example, Minimum value this field can have is "12/01/2017". User cannot enter dates lesser than this.

	            $("#demoField").zdatetimefield({
	                  value: "12/07/2019",
	                  min: "12/01/2017"
	            })
			*/
			"min": undefined,   // No I18N
			/** @member {String}
				[datetime-field.max] - Maximum value for the date time input.

				@example <caption> Example </caption>

	 In the below example, Maximum value this field can have is "12/12/2017". User cannot enter dates more than this.

	            $("#demoField").zdatetimefield({
	                  value: "12/02/2019",
	                  max: "12/12/2019"
	            })
			*/
			"max": undefined,   // No I18N
			/** @member {Number}
				[datetime-field.dateStep = 1] - The date segment will be incremented by the number specified. If the dateStep is provided as 2, then date segment will be incremented/decremented in steps of 2.
			*/
			"dateStep": 1,   // No I18N
			/** @member {Number}
				[datetime-field.monthStep = 1] - The month segment will be incremented by the number specified. If the monthStep is provided as 3, then month segment will be incremented/decremented in steps of 3.
			*/
			"monthStep": 1,   // No I18N
			/** @member {Number}
				[datetime-field.yearStep = 1] - The year segment will be incremented by the number specified. If the yearStep is provided as 5, then year segment will be incremented/decremented in steps of 5.
			*/
			"yearStep": 1,   // No I18N
			/** @member {Number}
				[datetime-field.hourStep = 1] - The hour segment will be incremented by the number specified. If the hourStep is provided as 2. then hour segment alone will be incremented/decremented in steps of 2.
			*/
			"hourStep": 1,   // No I18N
			/** @member {Number}
				[datetime-field.minuteStep = 1] - The minute segment will be incremented by the number specified. If the minuteStep is provided as 2, then minute segment alone will be incremented/decremented in steps of 2.
			*/
			"minuteStep": 1,   // No I18N
			/** @member {Number}
				[datetime-field.secondStep = 1] - The second segment will be incremented by the number specified. If the secondStep is provided as 2, then second segment alone will be incremented/decremented in steps of 2.
			*/
			"secondStep": 1,   // No I18N
			/** @member {Boolean}
				[datetime-field.jumpOnComplete = true] - Indicates whether the focus should be moved to the next segment once the maximum edit for the segment is completed. 

	For example, If the user types the value "1" in the date segment, focus will remain in the date segment where as if the user enters "12", then the focus will be moved to the next segment that is present since the maximum edit for that segment is completed. Similarly, if the user types "ma" focus will stay on the month segment, where as when the user types "mar" the focus will be shifted to the next segment.
			*/
			"jumpOnComplete": true, 	// No I18N
			/** @member {Boolean}
				[datetime-field.incrementOnWrapAround = true] - Indicates whether the nearby segments should be incremented to the next possible value, when the current segment value reaches its maximum.  

	For example, If its value is true, and the date is 31/12/2019 and the focus is on the date segment. Now, when the user presses up arrow, the date will be changed to 01/01/2020. The same effect will be applied for down arrow as well. If it is false, date will be changed to 01/12/2019. The date will wrao around and takes the value "01".
			*/
			"incrementOnWrapAround": true,  // No I18N
			/** @member {Boolean}
				[datetime-field.clearButton = "focus"] - Clear Button is used to clear the values of the all the parts of the date and time. 
				@allowedValues{("always" | "focus")}
				
			*/
			"clearButton": "focus",  // No I18N
			/** @member {String}
				[datetime-field.clearButtonSVGIconId] - The clear button icon can be changed to be a SVG icon provided by the user. Its value should be SVG element Id followed by space separated CSS class names.
				@example <caption> Example </caption> 

	 In the below example, clear-icon is the ID of the svg element where as custom__class refers to the extra classes to be appenedd for the icon element. The default clear buttton provided will be overwritten with this value.

	            $("#demoField").zdatetimefield({
	                   clearButtonSVGIconId: "clear-icon custom__class"
	            })

			*/
			"clearButtonSVGIconId": undefined,  // No I18N
			/** @member {String}
				[datetime-field.clearButtonIconClassName] - The clear button icon can be customized and changed to sprite CSS class.
				@example <caption> Example </caption> 

	 In the below example, clear__icon is the sprite CSS class for the clear button. The default clear buttton provided will be overwritten with this value.
	            
	            $("#demoField").zdatetimefield({
	                   clearButtonIconClassName: "clear__icon"
	            })
			*/
			"clearButtonIconClassName": undefined,  // No I18N
			/** @member {Boolean}
				[datetime-field.spinButtons = "always"] - Indicates whether increment and decrement buttons should be shown. These buttons can also be used to increment/decrement values in each of the segments.
				@allowedValues{("always" | "focus")}
				
			*/
			"spinButtons": "always", // No I18N
			/** @member {Number}
				[datetime-field.spinButtonsOrientation = "vertical"] - Increment/Decrement buttons position. To get visual clue, refer Properties tab. spinButtons option should be enabled for this to have effect.
				@allowedValues{("vertical"|"horizontal")}
			*/
			"spinButtonsOrientation": "vertical", 	// No I18N	
			/** @member {String}
				[datetime-field.incrementButtonSVGIconId] - The increment button icon can be changed to be a SVG icon provided by the user. Its value should be SVG element Id followed by space separated CSS class names.
				@example <caption> Example </caption> 

	 In the below example, increment-icon is the ID of the svg element where as custom__class refers to the extra classes to be appenedd for the icon element. The default increment buttton provided will be overwritten with this value.

	            $("#demoField").zdatetimefield({
	                   incrementButtonSVGIconId: "increment-icon custom__class"
	            })

			*/
			"incrementButtonSVGIconId": undefined,  // No I18N
			/** @member {String}
				[datetime-field.incrementButtonIconClassName] - The increment button icon can be customized and changed to sprite CSS class.
				@example <caption> Example </caption> 

	 In the below example, increment__icon is the sprite CSS class for the increment button. The default increment buttton provided will be overwritten with this value.
	            
	            $("#demoField").zdatetimefield({
	                   incrementButtonIconClassName: "increment__icon"
	            })
			*/
			"incrementButtonIconClassName": undefined,  // No I18N
			/** @member {String}
				[datetime-field.decrementButtonSVGIconId] - The decrement button icon can be changed to be a SVG icon provided by the user. Its value should be SVG element Id followed by space separated CSS class names.
				@example <caption> Example </caption> 

	 In the below example, decrement-icon is the ID of the svg element where as custom__class refers to the extra classes to be appenedd for the icon element. The default decrement buttton provided will be overwritten with this value.

	            $("#demoField").zdatetimefield({
	                   decrementButtonSVGIconId: "decrement-icon custom__class"
	            })
			*/
			"decrementButtonSVGIconId": undefined,  // No I18N
			/** @member {String}
				[datetime-field.decrementButtonIconClassName] - The decrement button icon can be customized and changed to sprite CSS class.
				@example <caption> Example </caption> 

	 In the below example, decrement__icon is the sprite CSS class for the increment button. The default decrement buttton provided will be overwritten with this value.
	            
	            $("#demoField").zdatetimefield({
	                   decrementButtonIconClassName: "decrement__icon"
	            })
			*/
			"decrementButtonIconClassName": undefined,  // No I18N
			/** @member {Boolean}
				[datetime-field.picker = false] - Indicates whether the date picker should be attached to the field and shown when the field gains focus. If pickerId and pickerOptions are not provided, then the picker with default options will be binded to the element. 

				@example <caption> Example </caption>
	            
	            $("#demoField").zdatetimefield({
	                    picker: true
	            });
			*/
			"picker": false,  // No I18N
			/** @member {String}
				[datetime-field.pickerId] - Id of the picker instance can also be provided.
				@example <caption> Example </caption>

	    <div id="startdatepicker" data-ctype=“zdatetimepicker" data-postion="top" data-title="Event Start Date">

	    $("#demoField").zdatetimefield({
	        pickerId: "startdatepicker"
	    }) 
			*/
			"pickerId": undefined,  // No I18N
			/** @member {Object}
				[datetime-field.pickerOptions] - The default picker can be customized. All the options of date time picker component can be provided here.
			
			    @example <caption> Example </caption>

	            $("#demoField").zdatetimefield({
	                    picker: true,
	                    pickerOptions: {
		                      displayAdjacentMonthDates: true,
		                      displayWeekNumbers: true
	                    }
	            });

			*/
			"pickerOptions": {},  // No I18N
			/** @member {Boolean}
				[datetime-field.calendarIcon = false] - Indicates whether the date picker icon should be shown. 
			*/
			"calendarIcon": false,  // No I18N
			/** @member {String}
				[datetime-field.calendarSVGIconId] -  The picker icon can be changed to be a SVG icon provided by the user. Its value should be SVG element Id followed by space separated CSS class names. This can be modified in the same way as that of incrementButtonSVGIconId
			*/
			"calendarSVGIconId": undefined,  // No I18N
	        /** @member {String}
	        	[datetime-field.calendarIconClassName] - The picker icon can be customized and changed to sprite CSS class. This can be modified in the same way as incrementButtonIconClassName
	        */
			"calendarIconClassName": undefined,  // No I18N
			/** @member {String}
				[datetime-field.calendarIconAlignment = "right"] - Position of the calendar icon. This option will have effect only when "calendarIcon" option value is set as true.
				@allowedValues{("right" | "left")}

				@example <caption> Example </caption>
	            $("#demoField").zdatetimefield({
	                    calendarIcon: true,
	                    calendarIconAlignment: "left"
	            });
			*/
			"calendarIconAlignment": "right",  // No I18N
			/** @member {String}
				[datetime-field.calendarIconUIType = "label"] - Indicates the type of calendar icon to be used. This option is valid only when "calendarIcon" option is set to true. If the value is "button", the picker will open on button click by default. If the user wishes to open picker on field focus, showPickerOnFocus should be set to true.
				@allowedValues{("label" | "button")}

				@example <caption> Example </caption>
	            $("#demoField").zdatetimefield({
	                    calendarIcon: true,
	                    calendarIconUIType: "button"
	            });
			*/
			"calendarIconUIType": "label", // No I18N
			"spinEventTriggerDelay": 0,  // No I18N
			/** @member {String}
				[datetime-field.showPickerOnFocus = false] - This option is applicable only when calendarUIType has value "button". 
				@allowedValues{("label" | "button")}

				@example <caption> Example </caption>
	            $("#demoField").zdatetimefield({
	                    calendarIcon: true,
	                    calendarIconUIType: "button",
	                    showPickerOnFocus: true,
	            });
			*/
			"showPickerOnFocus": false,  // No I18N
			/** @member {Object}
				[datetime-field.keys] -  i18n keys to be used for various languages
			*/
			"keys": {	// No I18N
				/** @member {Array}
					[datetime-field.keys.days] -  Days in full form */			
				"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],	// No I18N
				/** @member {Array}
					[datetime-field.keys.daysAbbreviated] -  Days in abbreviated form */	
				"daysAbbreviated": ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"],	// No I18N
				/** @member {Array}
					[datetime-field.keys.months] - Month in full form */		
				"months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],	// No I18N
				/** @member {Array}
					[datetime-field.keys.monthsAbbreviated] - Months in abbreviated form */	
				"monthsAbbreviated": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],	// No I18N
				"period": "AM/PM",	// No I18N
				"AM": "AM",	// No I18N
				"PM": "PM",	// No I18N
				"invalidInput": "Invalid date/time provided. Please provide correct input",  // No I18N
				"invalidNumber": "Not a number" // No I18N
			},
			/** @member {Boolean}
				[datetime-field.className] - Custom class for the date time field.
			*/
			"className": undefined,  // No I18N
			/** @member {Boolean}
				[datetime-field.disabled = false] - Indicates whether the date time field should be disabled.
			*/
			"disabled": false,  // No I18N
			/** @member {Boolean}
				[datetime-field.readonly = false] - Indicates whether the date time field should be made readonly.
			*/
			"readonly": false,  // No I18N
			/** @member {Number}
				[datetime-field.width] -  Width of the Date time field
			*/
			"width": undefined  // No I18N
		}
	};
	/** @components datetime-field - Allows user to easily enter date and time. The individual segments are separated from one and another allowing easy input.
	    @eventPrefix zdatetimefield */
	var datetimeFieldPrototype = {
		_create: function(element, options, userOptions){
			userOptions = $.extend(true, {}, userOptions, this.element.data());
			var locale = userOptions.locale || ZComponents.zdatetimefield.DEFAULTS.locale || ZComponents.locale;
			this.options.locale =locale;
			this._initialize(element, options);
			this._bindEvents();
		},
		options: $.extend({}, ZComponents.zdatetimefield.DEFAULTS),
		eventPrefix: "zdatetimefield",  // No I18N
		_EVENTS: {
			/** Triggered when the date time field gains focus.
				@event datetime-field.focus
				@param {Object} event eventObject 
				@param {Object} customObject containing additional information about the element and the options.
			*/
			"FOCUS": "focus",   // No I18N
			/** Triggered when the date time field loses focus.
				@event datetime-field.blur
				@param {Object} event eventObject 
				@param {Object} customObject containing additional information about the element and the options.
				@example <caption> Example </caption>
        $("#demoField").on("zdatetimefieldblur", function(orgEvent, ui){
            console.log(ui.value);
        })
    		
    Events can be listened through callbacks 

        $("#demoField").zdatetimefield({
           value: "12-07-2018",
           format: "MM-dd-yyyy",
           blur: fuction(ev, ui){
                console.log(ev, ui);
           }
        });
			*/
			"BLUR": "blur",     // No I18N
			/** Triggered when the value in the field is modified.
				@event datetime-field.change
				@param {Object} event eventObject 
				@param {Object} customObject containing additional information about the changed value.
			*/
			"CHANGE": "change",  // No I18N
			/** Triggered when the values are modified continously with up and down arrows / increment & decrement buttons or during mouse wheel.
				@event datetime-field.spin
				@param {Object} event eventObject 
				@param {Object} customObject containing additional information about the element and the options.
			*/
			"SPIN": "spin",	// No I18N
			/** Triggered when the value in the field is modified.
				@event datetime-field.spinstart
				@param {Object} event eventObject 
				@param {Object} customObject containing additional information about the changed value.
			*/
			"SPINSTART": "spinstart",  // No I18N
			/** Triggered when the value in the field is modified.
				@event datetime-field.spinend
				@param {Object} event eventObject 
				@param {Object} customObject containing additional information about the changed value.
			*/
			/**	Triggered when the today button is clicked
	@event datetime-field.pickertodaybuttonclick
	@param {object} event eventObject
	@param {object} customObject containing additional information about the picker. */
/**	Triggered when the cancel button is clicked
	@event datetime-field.pickercancel
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values. */
/**	Triggered when the clear button is clicked
	@event datetime-field.pickerclear
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
	/**	Triggered when the hour value is modified
	@event datetime-field.pickerhourchange
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
/**	Triggered when the minute value is modified
	@event datetime-field.pickerminutechange
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
/**	Triggered when the period value is modified
	@event datetime-field.pickerperiodchange
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
/**	Triggered when a date is selected in the calendar view.
	@event datetime-field.pickerdateselect
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
/**	Triggered when the month value is modified
	@event datetime-field.pickermonthchange
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
/**	Triggered when the year value is modified
	@event datetime-field.pickeryearchange
	@param {object} event eventObject
	@param {object} customObject containing additional information about the selected values */
/**	Triggered when a date is hovered
	@event datetime-field.pickerdatemouseover
	@param {object} event eventObject
	@param {object} customObject containing additional information about the hovered date. */
/**	Triggered just before when the user drilldowns to a level inside the picker
	@event datetime-field.pickerbeforedrilldown
	@param {object} event eventObject
	@param {object} customObject containing additional information about the level being clicked and the level to be opened. */
/**	Triggered after opening the drilldown view for a click
	@event datetime-field.pickerdrilldown
	@param {object} event eventObject
	@param {object} customObject containing additional information about the level being clicked and the level that has been opened. */
/**	Triggered before constructing a date cell value.
	@event datetime-field.pickerbeforedatecellrender
	@param {object} event eventObject
	@param {object} customObject containing additional information about the date cell being constructed. */
/** Triggered before the picker is opened.
	@event datetime-field.pickerbeforeopen
	@param {object} event eventObject
	@param {object} customObject containing additional information about the picker. */
/** Triggered after the picker is opened.
	@event datetime-field.pickeropen
	@param {object} event eventObject
	@param {object} customObject containing additional information about the picker. */	
/**	Triggered before the picker is closed.
	@event datetime-field.pickerbeforeclose
	@param {object} event eventObject
	@param {object} customObject containing additional information about the picker. */ 
/**	Triggered after the picker is closed.
	@event datetime-field.pickerclose
	@param {object} event eventObject */
			"SPINEND": "spinend",  // No I18N
			"BEFOREOPEN": "pickerbeforeopen",  // No I18N
			"OPEN": "pickeropen",  // No I18N
			"BEFORECLOSE": "beforeclose",  // No I18N
			"CLOSE": "close",  // No I18N
			"BEFOREDATECELLRENDER": "beforedatecellrender",  // No I18N
			"DATECELLRENDER": "datecellrender",	// No I18N
			"BEFOREMONTHOPEN": "beforemonthopen",  // No I18N
			"BEFOREDRILLDOWN": "beforedrilldown", // No I18N
			"DRILLDOWN": "drilldown",  // No I18N
			"DATEMOUSEOVER": "datemouseover",  // No I18N
			"DATESELECT": "dateselect",  // No I18N
			"MONTHCHANGE": "monthchange",  // No I18N
			"YEARCHANGE": "yearchange",  // No I18N
			"HOURCHANGE": "hourchange",  // No I18N
			"MINUTECHANGE": "minutechange",  // No I18N
			"PERIODCHANGE": "periodchange",  // No I18N
			"TIMECHANGE": "timechange",	// No I18N
			"DECADECHANGE": "decadechange",  // No I18N
			"CANCEL": "cancel",   // No I18N
			"RESET": "reset", // No I18N
			"TODAYBUTTONCLICK": "todaybuttonclick"  // No I18N
		},
		_initialize: function(element, options){
			this._currentDate = new Date();
			this._format = this.options.format;
			this._changeLocaleSpecifierToDateFormat();
			this.element = element;
			this._allowedChars = "dMyHhmstz";	// No I18N 
			if(this.options.calendarIcon){
				var isPositionCorrect = /^(right|left)$/.test(this.options.calendarIconAlignment);  
				this.options.calendarIconAlignment = isPositionCorrect ? this.options.calendarIconAlignment : "right"; // No I18N
			}
			this._constructBaseElement();
			this._hasTime = this._checkIfDateHasTime();
			var options = ["min", "max", "value"];  // No I18N 
			for(var i=0,len=options.length; i<len;i++){
				var value = this.options[options[i]];
				if(value){
					if(typeof value === "string"){  // No I18N 
						if(value === "TODAY" || value === "NOW"){   // No I18N 
							this.options[options[i]] = new Date();
						}else{
							 var dateInfo = this._parseDateValue(value, this.options.format);	
							 this.options[options[i]] =	dateInfo ? dateInfo.date : undefined;					
						}
					}else if(!(value instanceof Date)){
						this.options[options[i]] = undefined;
					}
					options[i] === "value" && this.options.value !== undefined && !this._viewDate && (this._viewDate = new Date(this.options.value.getTime()));  // No I18N 
				}
				if(options[i] === "value"){   // No I18N 
					if(!this._viewDate){
						var format = this.options.format;
						if((this.options.min || this.options.max) && format.indexOf("d") === -1 && (format.indexOf("H") > -1 || format.indexOf("m") > -1 || format.indexOf("h") > -1)){
							this._viewDate = new Date();
							this._viewDate.setHours(0,0,0,0);
						}else{
							this._viewDate = this._resetViewDate();
						}
					}
				}			
			}
			this._performValidations();
			if(this.options.value){
				this._viewDate = new Date(this.options.value.getTime());
				this._input.attr("aria-valuenow", ZDateUtil.formatDate(this.options.value, this.options.format));  // No I18N
			}
			if(this.options.min){
				this._input.attr("aria-valuemin", ZDateUtil.formatDate(this.options.min, this.options.format));  // No I18N
			}
			if(this.options.max){
				this._input.attr("aria-valuemax", ZDateUtil.formatDate(this.options.max, this.options.format));  // No I18N
			}
			this._dateModified = this._minutesModified = this._yearModified = this._monthModified = this._secondsModified = this._hoursModified = true;
			for(var i=0; i<this.options.format.length; i++){
				this._isPartModified(this.options.format[i], this.options.value ? true : false);
			}
			this._updateElementValue();	
			this._hasPicker = this.options.picker;
			if(this.options.picker && !this.options.pickerId){
				this._initPicker();
			}		
			if(this.options.pickerId){
				var picker = $("#"+this.options.pickerId);  // No I18N
				if(picker.length){
					var data = picker.data("zdatetimepicker");  // No I18N
					if(Object.keys(data).length){
						this._hasPicker = true;
						this._picker = picker;
						this._picker.zdatetimepicker("setAttribute", "forElement", this._baseElement);  // No I18N
					} 
				}
			}
			if(this.options.calendarIcon){
				this._createCalendarIcon();
			}
			this._hasDate = this._checkIfFormatHasDate();
			if(!this._hasDate){
				this._hasPicker = false;
			}
			this._hasPicker && (this._immediateCommit = this._picker.zdatetimepicker("getAttribute", "immediateCommit")); // No I18N
			this._checkIfAPartIsModified();
		},
		_checkIfFormatHasDate: function(){
			var format = this.options.format;
			return (format.indexOf("d") > -1 || format.indexOf("dd") > -1);  // No I18N
		},
		_initPicker: function(){
			this._picker = $("<div id='"+this._baseElement.attr("id")+"-picker"+"'>").appendTo("body");  // No I18N
			var min, max;
			if(this.options.min){
				min = new Date(this.options.min.getTime());
				min.setHours(0,0,0,0);
			}
			if(this.options.max){
			 	max = new Date(this.options.max.getTime());
				max.setHours(0,0,0,0);
			}
			var pickerOptions = this.options.pickerOptions;
			pickerOptions.timeFieldType = pickerOptions.timeFieldType || "multiple-select-box";    // No I18N 
			pickerOptions.forElement = this._baseElement;
			pickerOptions.minDate = min;
			pickerOptions.maxDate = max;
			pickerOptions.value = this.options.value;
			pickerOptions.valueFormat = this.options.format;
			pickerOptions.hourStep = this.options.hourStep;
			pickerOptions.minuteStep = this.options.minuteStep;
			this._picker.zdatetimepicker(pickerOptions);
		},
		_changeLocaleSpecifierToDateFormat: function(){
			var format = this._format, isFormatSpecifier = /^(date-short|date-long|date-medium|time-short|time-medium|time-long|datetime-short|datetime-medium|datetime-long|datetime-full)$/.test(format);  
			if(isFormatSpecifier){
				this.options.keys.days = ZComponents.localeInfo[this.options.locale].days;
				this.options.keys.daysAbbreviated = ZComponents.localeInfo[this.options.locale].daysAbbreviated;
				this.options.keys.months = ZComponents.localeInfo[this.options.locale].months;
				this.options.keys.monthsAbbreviated = ZComponents.localeInfo[this.options.locale].monthsAbbreviated;
				var parts = format.split("-");  // No I18N 
				switch(parts[0]){
					case "date":   // No I18N 
						format = format.replace("date", "dateFormat");   // No I18N 
					break;
					case "time":   // No I18N 
						format = format.replace("time", "timeFormat");  // No I18N 
					break;
					case "datetime":   // No I18N 
						format = format.replace("datetime", "dateTimeFormat");   // No I18N 
					break;
				}
				parts = format.split("-");		   // No I18N 	
				var localeObject = ZComponents.localeInfo[this.options.locale], type = localeObject[parts[0]], format = type[parts[1]];
				this.options.format = localeObject && type && format ? format : "dd/MM/yyyy"; // No I18N 
			}
		},
		_createClearButton: function(){
			this._clearButton = $("<div class='zinputfield__clearbutton' tabindex=-1/>");
			var clearIcon = $("<i class='zinputfield__icon'>").appendTo(this._clearButton), buttons = this._baseElement.find(".zinputfield__spinbuttonpane");
			this._updateClearIcon(clearIcon);
			this.options.spinButtons !== "none" ? (this.options.spinButtonsOrientation === "vertical" ? this._clearButton.insertAfter(buttons) : this._clearButton.insertAfter(this._baseElement.find(".zinputfield__spinbutton").last())) : this._clearButton.insertAfter(this._input);   // No I18N
			this._clearButton.on("mouseup."+this.eventPrefix, this._clearButtonClickHandler.bind(this))  // No I18N 
							 .on("mousedown."+this.eventPrefix, this._clearButtonMousedownHandler.bind(this));  // No I18N 
		},
		_clearButtonMousedownHandler: function(orgEvent){
			orgEvent.stopPropagation();
			orgEvent.preventDefault();
			clearInterval(this._mouseDownTimer);
			this._mouseDown = false;	
			this._getSegment();				
		},
		_getSegment: function(){
			var lastSelected = [this._input[0].selectionStart, this._input[0].selectionEnd];
			for(var i=lastSelected[0], j = lastSelected[0] - 1, len =this._dateFormat.length; i<len || j >=0; i++, j--){
				if(i < this._dateFormat.length && this._allowedChars.indexOf(this._dateFormat[i]) !== -1){
					this._segment = this._dateFormat[i];
					return;
				}
				if(j >=0 && this._allowedChars.indexOf(this._dateFormat[j]) !== -1){
					this._segment = this._dateFormat[i];
					return;
				}
			}
		},
		_clearButtonClickHandler: function(orgEvent){
			if(this._isClearButtonVisible){
				orgEvent.preventDefault();
				clearInterval(this._mouseDownTimer);
				this._mouseDown = false;
				this._clearActionHandler();
				return false;
			}else{
				this._mouseUpHandler();				
			}	
		},
		_clearActionHandler: function(){
			this._input[0].value = "";  // No I18N 
			var tempEvent = {type: "input", keyCode: ZComponents.keyCode.BACKSPACE, preventDefault: function() {}};  // No I18N 
			if(document.activeElement !== this._input[0]){
				this._input.focus();
			}
			this._keyUpHandler(tempEvent);
			this._selectText(this._segment);
			this._mouseUpHandler();
			if(this._immediateCommit){
				this._lastValue = undefined;
			}
			this.options.value = undefined;
			this._picker && this._picker.zdatetimepicker("setAttribute", "value", undefined);  // No I18N 
		},
		_constructBaseElement: function(){
			this._baseElement = $("<div class='zinputfield'>");
			this.options.className && this._baseElement.addClass(this.options.className);
			this.element.attr("title") && this._baseElement.attr("title", this.element.attr("title"));  // No I18N
			this._input = $("<input class='zinputfield__textbox'>");
			this.element.attr("tabindex") && this._input.attr("tabindex", this.element.attr("tabindex"));   // No I18N
			this._baseElement.append(this._input);
			this._baseElement.insertAfter(this.element.hide());
			if(this.options.spinButtons !== "none"){  // No I18N
				this._createSpinButtons();
				this._baseElement.attr("role","spinbutton");  // No I18N
			}
			if(this.options.clearButton !== "none"){   // No I18N
				this._createClearButton();
			}
			if(this.options.readonly || this.options.disabled){
				if(this.options.readonly){
					this._input.attr({"readonly": true, "aria-readonly": true});  // No I18N
					this._baseElement.addClass("is-readonly");
				}
				if(this.options.disabled){
					this._input.attr({"disabled": true, "aria-disabled": true});   // No I18N
				}
				this._baseElement.addClass("is-disabled");
			}
        	this._baseElement.attr("id",(this.element.attr("id") ? this.element.attr("id") : Math.floor(Math.random() * 1000000))+"_"+this.eventPrefix);	// No I18N
			this._baseElement.outerWidth(this.options.width || this.element.width());
			this._input.addClass("h-textboxwidth");
			(!ZComponents.Browser.isIE() && !this.options.disabled) && this._input.addClass("h-hidecursor");			
		},
		_createCalendarIcon: function(){
			this._baseElement.addClass("zdatetimefield");
			var svgProps = {
					props: {"viewBox": "0 0 14 14"},  // No I18N
					nodes: [{rect: {x: "-22.5", y: "3.5", width: "13", height: "10"}},   // No I18N
							{path: {d: "M-10,4v9h-12V4H-10 M-9,3h-14v11h14V3L-9,3z"}},   // No I18N
							{rect: {x: "-20.6", y: "1.4", width: "1.2", height: "3.2"}},   // No I18N
							{path: {d: "M-19.8,1.8v2.5h-0.5V1.8H-19.8 M-19,1h-2v4h2V1L-19,1z"}},   // No I18N
							{rect: {x: "-20.6", y: "7.4", width: "1.2", height: "1.2"}},   // No I18N
							{path: {d: "M-19.8,7.8v0.5h-0.5V7.8H-19.8 M-19,7h-2v2h2V7L-19,7z"}},   // No I18N
							{rect: {x: "-16.6", y: "1.4", width: "1.2", height: "3.2"}},   // No I18N
							{path: {d: "M-15.8,1.8v2.5h-0.5V1.8H-15.8 M-15,1h-2v4h2V1L-15,1z"}},   // No I18N
							{rect: {x: "-12.6", y: "1.4", width: "1.2", height: "3.2"}},   // No I18N
							{path: {d: "M-11.8,1.8v2.5h-0.5V1.8H-11.8 M-11,1h-2v4h2V1L-11,1z"}},   // No I18N
							{rect: {x: "-16.6", y: "7.4", width: "1.2", height: "1.2"}},   // No I18N
							{path: {d: "M-15.8,7.8v0.5h-0.5V7.8H-15.8 M-15,7h-2v2h2V7L-15,7z"}},   // No I18N
							{rect: {x: "-12.6", y: "7.4", width:"1.2", height: "1.2"}},   // No I18N
							{path: {d: "M-11.8,7.8v0.5h-0.5V7.8H-11.8 M-11,7h-2v2h2V7L-11,7z"}},   // No I18N
							{rect: {x: "-20.6", y: "10.4", width: "1.2", height: "1.2"}},   // No I18N
							{path: {d: "M-19.8,10.8v0.5h-0.5v-0.5H-19.8 M-19,10h-2v2h2V10L-19,10z"}},   // No I18N
							{rect: {x: "-16.6", y: "10.4", width: "1.2", height: "1.2"}},   // No I18N
							{path: {d: "M-15.8,10.8v0.5h-0.5v-0.5H-15.8 M-15,10h-2v2h2V10L-15,10z"}},   // No I18N
							{rect: {x: "-12.6", y: "10.4", width: "1.2", height: "1.2"}},   // No I18N
							{path: {d: "M-11.8,10.8v0.5h-0.5v-0.5H-11.8 M-11,10h-2v2h2V10L-11,10z"}},   // No I18N
							{path: {d: "M4,3c0.6,0,1-0.4,1-1V1H3v1C3,2.6,3.4,3,4,3z"}},   // No I18N
							{rect: {x: "2", y: "7", width: "2", height: "2"}},   // No I18N
							{rect: {x: "2", y: "10", width: "2", height: "2"}},   // No I18N
							{rect: {x: "6", y: "7", width: "2",height: "2"}},   // No I18N
							{rect: {x: "6", y: "10", width: "2", height: "2"}},   // No I18N
							{rect: {x: "10", y: "7", width: "2", height: "2"}},   // No I18N
							{rect: {x: "10", y: "10", width: "2", height: "2"}},   // No I18N
							{path: {d: "M12.8,2c0,1-0.8,1.8-1.8,1.8S9.2,3,9.2,2H5.8C5.8,3,5,3.8,4,3.8S2.2,3,2.2,2H0v3v9h14V5V2H12.8z M13,13H1V6h12V13z"}},   // No I18N
							{path: {d: "M11,3c0.6,0,1-0.4,1-1V1h-2v1C10,2.6,10.4,3,11,3z"}}   // No I18N
						]
			};  
			if(this.options.calendarIconUIType === "label"){  // No I18N
				this._calendarIcon = $("<div class='zdatetimefield__iconlabel'><i class='zdatetimefield__icon'></i></div>")[this.options.calendarIconAlignment === "right" ? "insertAfter" : "insertBefore"](this._input);  // No I18N
			}else{
				this._baseElement.addClass("h-hasiconbutton");  // No I18N
				this._calendarIcon = $("<button class='zdatetimefield__iconbutton'><i class='zdatetimefield__icon'></i></button>")[this.options.calendarIconAlignment === "right" ? "insertAfter" : "insertBefore"](this._input);  // No I18N
			}
			var innerIcon = this._calendarIcon.find(".zdatetimefield__icon");  // No I18N
			this._handleIcon(innerIcon, svgProps, "calendarlabel", this.options.calendarIconClassName, this.options.calendarSVGIconId);  // No I18N
			this.options.spinButtons === "focus" || this.options.spinButtons === "none" && this._baseElement.addClass("zdatetimefield--buttonsonhover");  // No I18N
			if(this.options.calendarIconUIType === "button" && this._hasPicker){   // No I18N
				this._calendarIcon.on("click."+this.eventPrefix, this._calendarIconClickHandler.bind(this));   // No I18N
			}
		},
		_calendarIconClickHandler: function(orgEvent){
			orgEvent.preventDefault();
			if(this._picker && this._picker.is(":visible")){  // No I18N
				this._picker.zdatetimepicker("close");  // No I18N
			}else{
				this._pickerOpenHandler(orgEvent);	
			}
			this._input.focus();
			this._selectCaretPosition(this._input[0], 0, 0);
			this._mouseUpHandler(orgEvent);	
			this._baseElement.addClass("has-focus");
		},
		_compareDates: function(firstDate, secondDate){
			if(firstDate.getTime() < secondDate.getTime()){
				return false;
			}
			return true;
		},
		_performValidations: function(){
			var stepOptions = ["dateStep", "monthStep", "yearStep", "hourStep", "minuteStep", "secondStep"];   // No I18N
			for(var i=0, len = stepOptions.length; i<len; i++){
				this.options[stepOptions[i]] = Number(this.options[stepOptions[i]]);
				if(this.options[stepOptions[i]] <= 0){
					this.options[stepOptions[i]] = 1;
				}
			}		
			if(this.options.min && this.options.max && !this._compareDates(this.options.max, this.options.min)){
				this.options.max = undefined;
			}
			if(this.options.max && this.options.value && this._compareDates(this.options.value, this.options.max)){
				this.options.value = this.options.max;
			}
			if(this.options.min && this.options.value && this._compareDates(this.options.min, this.options.value)){
				this.options.value = this.options.min;
			}
		},
		_createSpinButtons: function(){
			var up = $("<button class='zinputfield__spinbutton h-up' tabindex=-1>"),
				innerUp = $("<i class='zinputfield__icon' tabindex=-1>"),
				down = $("<button class='zinputfield__spinbutton h-down' tabindex=-1>"),
				innerDown = $("<i class='zinputfield__icon'>"), timer, svgEle;
			innerUp.appendTo(up);
			innerDown.appendTo(down);
			this._updateIcons(innerUp, innerDown);	
			if(this.options.spinButtonsOrientation === "vertical"){ // No I18N
				var buttons = $("<div class='zinputfield__spinbuttonpane'>").append(up).append(down); 
				buttons.insertAfter(this._calendarIcon && this.options.calendarIconAlignment === "right" ? this._calendarIcon : this._input);  // No I18N
			}
			else{
				this._baseElement.addClass("zinputfield--split");
				if(this._calendarIcon && this.options.calendarIconAlignment === "right"){  // No I18N	
					up.insertAfter(this._calendarIcon);
					down.insertAfter(up);
				}else{
					this._baseElement.append(up, down);
				}
			}
			this._buttonPane = this._baseElement.find(".zinputfield__spinbuttonpane");
			this.options.spinButtons === "focus" && this._buttonPane.hide();   // No I18N
			this._baseElement.find(".h-up,.h-down").on("mousedown."+this.eventPrefix, this._spinButtonsMouseDownHandler.bind(this))  // No I18N	
			.on("mouseup."+this.eventPrefix, this._spinButtonsMouseUpHandler.bind(this)); // No I18N												   							    
		},
		_spinButtonsMouseUpHandler: function(orgEvent){
			this._mouseUp = true;
			this._checkForChange(orgEvent, this._EVENTS.SPINEND);
		},
		_updateClearIcon: function(clearIcon){
			var svgEle;
			clearIcon.removeAttr("class").empty().attr("class", "zinputfield__icon"); // No I18N
			var svgData = {
				props: {"viewBox": "0 0 21.9 21.9"},  // No I18N
				nodes: [{"path": {"d": "M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"}}]  // No I18N
			};
            this._handleIcon(clearIcon, svgData, "clear", this.options.clearButtonSVGIconId, this.options.clearButtonIconClassName);
		},
		_updateIcons: function(upIconElement, downIconElement){ // creating up and down svg icons
			var svgEle;
			upIconElement.removeAttr("class").empty().attr("class", "zinputfield__icon"); // No I18N
			downIconElement.removeAttr("class").empty().attr("class", "zinputfield__icon");// No I18N
        	if(this.options.spinButtonsOrientation === "vertical"){ // No I18N
        		var upSVGData = {
        			props: {"class":"zinputfield__svg","viewBox":"0 0 48 48","width":"100%","height":"100%"},  // No I18N
        			nodes: [{"path":{"class":"cls-1","d":"M6,32l5,4L24,22,38,36l4-4L24,13Z"}}]  // No I18N
        		};
      			this._handleIcon(upIconElement, upSVGData, "upicon", this.options.incrementButtonIconClassName, this.options.incrementButtonSVGIconId);   // No I18N
        		var downSVGData = {
					props: {"viewBox": "0 0 48 48","width":"100%","height":"100%"},   // No I18N
					nodes: [{"path": {"class": "cls-1", "d": "M11.76,13L24,26.521,37.147,13,41,16.9,24,35,7,16.9Z"}}]   // No I18N
				};
      			this._handleIcon(downIconElement, downSVGData, "downicon", this.options.decrementButtonIconClassName, this.options.decrementButtonSVGIconId);    // No I18N
			}else{
				var rightSVGData = {
					props: {"viewBox": "1 2 9 9", "class": "zinputfield__svg"},   // No I18N
					nodes: [{"polygon": {"points" : "6.6,10.3 2.9,6.5 6.6,2.7 7.4,3.4 4.3,6.5 7.4,9.6"}}] // No I18N
				};
				var leftSVGData = {
      				props: {"viewBox": "1 2 9 9", "class" : "zinputfield__svg"},   // No I18N
      				nodes: [{"polygon": {"points" : "4.4,10.3 3.7,9.6 6.7,6.5 3.6,3.4 4.4,2.7 8.1,6.5"}}]   // No I18N
      			};
      			this._handleIcon(upIconElement, leftSVGData, "lefticon", this.options.incrementButtonIconClassName, this.options.incrementButtonSVGIconId);   // No I18N  			
      			this._handleIcon(downIconElement, rightSVGData, "righticon", this.options.decrementButtonIconClassName, this.options.decrementButtonSVGIconId);   // No I18N
			}         
		},
		_spinButtonsMouseDownHandler: function(orgEvent){		
			if(this._handleMousedownOnControls(orgEvent)){
				orgEvent.preventDefault();
				this._checkForChange(orgEvent, this._EVENTS.SPINSTART);
				if(this._input[0].selectionStart === (0 || this._input[0].value.length) && this._input[0].selectionEnd === this._input[0].value.length){
					this._selectCaretPosition(this._input[0], 0, 0);
					this._mouseUpHandler(orgEvent);	
				} 
				var ev = {keyCode:$(orgEvent.target).closest(".h-up").length ? ZComponents.keyCode.UP : ZComponents.keyCode.DOWN , preventDefault: function() { }};	
				this._keyDownHandler(ev);	
				clearTimeout(this._mouseDownInitializeTimer);
				this._mouseDownInitializeTimer = setTimeout(this._continousMouseDownHandler.bind(this, orgEvent), 250);
				ZComponents.$document.off("mouseup."+this.eventPrefix).on("mouseup."+this.eventPrefix, this._documentMouseUpHandler.bind(this));  // No I18N
			}else if($(orgEvent.target).closest(".zinputfield__spinbutton").hasClass("is-disabled")){
				orgEvent.preventDefault();
			}
		},
		_continousMouseDownHandler: function(orgEvent){
			this._mouseDownTimer = setInterval(this._repititiveMouseDownHandler.bind(this, orgEvent), 100);
		},
		_documentMouseUpHandler: function(){
			clearInterval(this._mouseDownTimer);
			ZComponents.$document.off("mouseup."+this.eventPrefix);   // No I18N
			this._mouseDown = false;
		},
		_repititiveMouseDownHandler: function(orgEvent){
			if(this._mouseDown){
				var ev = {keyCode:$(orgEvent.target).closest(".h-up").length ? ZComponents.keyCode.UP : ZComponents.keyCode.DOWN , preventDefault: function() { }};	
				this._keyDownHandler(ev);
			}else{
				clearInterval(this._mouseDownTimer);
			}
		},
		_handleMousedownOnControls: function(orgEvent){
			if(this.options.disabled || orgEvent.which > 1 || this.options.readonly || $(orgEvent.target).closest(".zinputfield__spinbutton").hasClass("is-disabled")){
                return false;
			}
			this._mouseDown = true;
			this._baseElement.addClass("has-focus"); // No I18N
			return true;
		},
		_isPartModified: function(character, value){
			switch(character){
				case "y":  // No I18N 
					this._yearModified = value;
				break;
				case "M":  // No I18N
					this._monthModified = value;
					if(!value){
						this._typedMonthChar = "";
					}
				break;
				case "d": // No I18N
					this._dateModified = value;
				break;
				case "H":  case "h":  // No I18N			
					this._hoursModified = value;
					if(!value){
						this._typedPeriodChar = "";
					}
				break;
				case "m":  // No I18N
					this._minutesModified = value;
				break;
				case "s":  // No I18N
					this._secondsModified = value;
				break;
			}
		},
		_bindEvents: function(){
			if(this.options.clearButton === "focus" || (this.options.spinButtons === "focus" && this.options.spinButtonsType === "together")){  // No I18N
				this._baseElement.off("mouseenter."+this.eventPrefix).on("mouseenter."+this.eventPrefix, this._mouseEnterHandler.bind(this))  // No I18N
								 .off("mouseleave."+this.eventPrefix).on("mouseleave."+this.eventPrefix, this._mouseLeaveHandler.bind(this));  // No I18N
			}
			if(this.options.picker){
				this._bindPickerEvents();
			}
			this._hasPicker && (this.options.calendarIconUIType === "label" || (this.options.calendarIconUIType === "button" && this.options.showPickerOnFocus)) && this._baseElement.on("click."+this.eventPrefix, this._pickerOpenHandler.bind(this)); // No I18N
			this._input.on("focus."+this.eventPrefix, this._focusHandler.bind(this))
						.on(ZComponents.Browser.isFirefox() ? "click."+this.eventPrefix : "mouseup."+this.eventPrefix, this._mouseUpHandler.bind(this))	// No I18N
						.on(ZComponents.Browser.isIE() && ZComponents.Browser.getIEVersion() === 9 ? "keyup."+this.eventPrefix :  "input."+this.eventPrefix, this._keyUpHandler.bind(this))	// No I18N
						.on("keydown."+this.eventPrefix, this._keyDownHandler.bind(this))	// No I18N
						.on("keyup."+this.eventPrefix, this._spinKeyupHandler.bind(this))
						.on(ZComponents.Browser.isIE() && ZComponents.Browser.getIEVersion() === 9 ? "focus."+this.eventPrefix : "focusin."+this.eventPrefix, this._focusInHandler.bind(this))	// No I18N
						.on(ZComponents.Browser.isIE() && ZComponents.Browser.getIEVersion() === 9 ? "blur."+this.eventPrefix : "focusout."+this.eventPrefix, this._focusOutHandler.bind(this))  // No I18N
						.on("contextmenu."+this.eventPrefix, this._preventDefault.bind(this))
						.on("paste."+this.eventPrefix, this._pasteHandler.bind(this))
						.on("mousewheel."+this.eventPrefix+" DOMMouseScroll."+this.eventPrefix+"  MozMousePixelScroll."+this.eventPrefix, this._mouseWheelHandler.bind(this));			
		},
		_bindPickerEvents: function(){
			var base = this;
			this._picker.off("zdatetimepickerbeforefocus zdatetimepickerchange zdatetimepickerclear zdatetimepickerclose zdatetimepickeropen zdatetimepickerbeforeclose zdatetimepickerbeforeopen");  // No I18N 
			this._picker.on("zdatetimepickerbeforefocus", function(orgEvent){   // No I18N 
				orgEvent.preventDefault();
			})
			.on("zdatetimepickerchange", this._applyHandler.bind(this))   // No I18N
			.on("zdatetimepickerclear", this._clearHandler.bind(this))   // No I18N
			.on("zdatetimepickerclose", this._closeHandler.bind(this))   // No I18N
			.on("zdatetimepickeropen", this._openHandler.bind(this))   // No I18N
			.on("zdatetimepickerbeforeclose", this._beforeCloseHandler.bind(this))   // No I18N
			.on("zdatetimepickerbeforeopen", this._beforeOpenHandler.bind(this))  // No I18N
			.on('zdatetimepickerbeforedatecellrender.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.BEFOREDATECELLRENDER, e, ui);	
			}).on('zdatetimepickerbeforedrilldown.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.BEFOREDRILLDOWN, e, ui);	
			}).on('zdatetimepickerdrilldown.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.DRILLDOWN, e, ui);	
			}).on('zdatetimepickerdatemouseover.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.DATEMOUSEOVER, e, ui);	
			}).on('zdatetimepickerdateselect.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.DATESELECT, e, ui);	
			}).on('zdatetimepickermonthchange.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.MONTHCHANGE, e, ui);	
			}).on('zdatetimepickeryearchange.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.YEARCHANGE, e, ui);	
			}).on('zdatetimepickerhourchange.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.HOURCHANGE, e, ui);
			}).on('zdatetimepickerminutechange.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.MINUTECHANGE, e, ui);	
			}).on('zdatetimepickerperiodchange.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.PERIODCHANGE, e, ui);	
			}).on('zdatetimepickertimechange.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.TIMECHANGE, e, ui);	
			}).on('zdatetimepickerreset.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.RESET, e, ui);	
			}).on('zdatetimepickertodaybuttonclick.'+base.eventPrefix,function(e,ui){	// No i18n
				base._trigger(base._EVENTS.TODAYBUTTONCLICK,e, ui);	
			});
		},  
		_openHandler: function(orgEvent){
			this._trigger(this._EVENTS.OPEN, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
		},
		_beforeCloseHandler: function(orgEvent){
			this._trigger(this._EVENTS.BEFOREOPEN, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
		},
		_beforeOpenHandler: function(orgEvent){
			var returnValue = this._trigger(this._EVENTS.BEFORECLOSE, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
			return returnValue;
		},
		_closeHandler: function(orgEvent){
			this._getSegmentValue();
			if(!this._immediateCommit){
				this.setAttribute("value", !this._applyClicked ? this._lastValue : this.options.value);   // No I18N
			}
			this._selectText(this._segment);
			this._mouseUpHandler();
			this._applyClicked = false;
			this._trigger(this._EVENTS.CLOSE, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
		},
		_applyHandler: function(orgEvent, ui){
			this._applyClicked = true;
			this._lastValue = ui.valueString;
			this._getSegmentValue();
			this.setAttribute("value", ui.value ? ui.valueString : undefined);   // No I18N
			this._selectText(this._segment);
			this._mouseUpHandler();			
		},
		_getSegmentValue: function(){
			this._getSegment();
			if(!this._segment){
				this._selectCaretPosition(this._input[0],0,0);
				this._getSegment();
			}
		},
		_clearHandler: function(orgEvent, ui){
			this.setAttribute("value", undefined);   // No I18N
			this._clearActionHandler();
		},
		_pickerOpenHandler: function(orgEvent){
			orgEvent.preventDefault();
			if(this._picker && !this._picker.is(":visible") && !this.options.readonly && !this.options.disabled){
				this.options.pickerId && this._bindPickerEvents();
				this._picker.zdatetimepicker("setAttributes", {"forElement": this._baseElement, "value": this.options.value});   // No I18N
				this._picker.zdatetimepicker("open"); // No I18N
			}
		},
		_mouseEnterHandler: function(orgEvent){
			if(document.activeElement !== this._input[0] && !this.options.readonly && !this.options.disabled){
				if(this.options.spinButtons === "focus"){   // No I18N
					if(this._buttonPane){
						this._buttonPane.show();
						this.options.calendarIcon && this._baseElement.removeClass("zdatetimefield--buttonsonhover");
						this._clearButton && this._clearButton.removeClass("h-right");	
					} 
				}
				if(this.options.clearButton === "focus"){    // No I18N
					this._clearButton && this._checkIfAPartIsModified();
				}
			}
		},
		_mouseLeaveHandler: function(orgEvent){
			if(document.activeElement !== this._input[0]){
				if(this.options.spinButtons === "focus"){   // No I18N
					this._buttonPane && this._buttonPane.hide();
					this._clearButton && this._clearButton.addClass("h-right");
					this.options.calendarIcon && this._baseElement.addClass("zdatetimefield--buttonsonhover");
				}
				if(this.options.clearButton === "focus"){  // No I18N
					this._clearButton && this._clearButton.hide();
				}
			}
		},
		_spinKeyupHandler: function(orgEvent){
			this._keyUp = true;
			if(orgEvent.keyCode !== ZComponents.keyCode.LEFT && orgEvent.keyCode !== ZComponents.keyCode.RIGHT){
				this._checkForChange(orgEvent, this._EVENTS.SPINEND);
			}
		},
		_pasteHandler: function(orgEvent){
			this._pasteAction = false;
			var pastedText = orgEvent.originalEvent.clipboardData.getData('Text'), caretPosition = this._selectCaretPosition(this._input[0]), selectedTextLen;
			caretPosition[0] !== undefined && caretPosition[1] !== undefined && (selectedTextLen = caretPosition[1] - caretPosition[0]);
			if(selectedTextLen && selectedTextLen === this._input[0].value.length){
				this._pasteAction = true;				
				orgEvent.stopPropagation();
				orgEvent.preventDefault();
				this._input[0].value = pastedText;
				clearTimeout(this._pasteTimeout);
				this._pasteTimeout = setTimeout(this._pasteTimeoutHandler.bind(this, pastedText, orgEvent), 500);			
			}else{
				orgEvent.preventDefault();
			}
		},
		_pasteTimeoutHandler: function(pastedText, orgEvent){
			var dateInfo = this._parseDateValue(pastedText, this.options.format);
			//if(dateInfo !== undefined && dateInfo.isValid){
			dateInfo !== undefined && dateInfo.isValid && (this._viewDate = dateInfo.date);
			for(var i=0; i<this.options.format.length; i++){
				this._isPartModified(this.options.format[i], dateInfo.isValid ? true : false);
			}
			this._updateElementValue();
			//}
			this._selectCaretPosition(this._input[0],0,0);
			this._mouseUpHandler(orgEvent);
			this._pasteAction = false;
		},
		_preventDefault: function(orgEvent){
			orgEvent.preventDefault();
		},
		_mouseWheelHandler: function(orgEvent){
			var newEvent = {preventDefault: function(){ }, type: "mousewheel"};   // No I18N
			this._preventDefault(orgEvent);
			orgEvent.stopPropagation();
            var isIncrement = orgEvent.originalEvent.detail !== 0 ? orgEvent.originalEvent.detail > 0 : orgEvent.originalEvent.wheelDelta < 0;
			newEvent.keyCode = !isIncrement ? 40 : 38;
			this._keyDownHandler(newEvent);
		},
		_focusHandler: function(orgEvent){
			if(this.options.disabled){
				return false;
			}
			if(ZComponents.Browser.isFirefox() || ZComponents.Browser.isSafari() || ZComponents.OS.isLinux()){
				setTimeout(this._selectionFocusHandler.bind(this), 0);
			}else{
				this._input[0].setSelectionRange(0,0);	
			}
			if(this.options.clearButton === "focus" && !this.options.readonly){  // No I18N
				this._checkIfAPartIsModified();
			} 
			if(this.options.spinButtons !== "none"){    // No I18N
				this._buttonPane.show();
				this.options.calendarIcon && this._baseElement.removeClass("zdatetimefield--buttonsonhover");
				this._clearButton && this._clearButton.removeClass("h-right");
			}
			this._isClearButtonVisible = false;
			clearTimeout(this._clearButtonTimeout);
			this._clearButtonTimeout = setTimeout(this._clearButtonVisibilityHandler.bind(this),1000);
			this._trigger(this._EVENTS.FOCUS, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
		},
		_clearButtonVisibilityHandler: function(){
			this._isClearButtonVisible = this.options.clearButton !== "none" && this._clearButton.is(":visible"); // No I18N
			//this._selectCaretPosition(this._input[0], 0, 0);
		},
		_selectionFocusHandler: function(){
			this._input[0].setSelectionRange(0,0);	
		},
		_focusInHandler: function(orgEvent){
			if(this.options.disabled){
				return false;
			}
			this._baseElement.addClass("has-focus");
			this._input[0].setSelectionRange(0,0);
			this._focusTimeout = setTimeout(this._focusTimeoutHandler.bind(this),10);	
		},
		_focusTimeoutHandler: function(){
			ZComponents.$window.off("keydown."+this.eventPrefix).on("keydown."+this.eventPrefix, this._windowsKeyDownHandler.bind(this)); // No I18N
			ZComponents.$window.on("keyup."+this.eventPrefix, this._windowKeyUpHandler.bind(this));  // No I18N
		},
		_windowsKeyDownHandler: function(orgEvent){
			this._reverseShiftKey = orgEvent.keyCode === ZComponents.keyCode.TAB && orgEvent.shiftKey;
			this._tabKey = orgEvent.keyCode === ZComponents.keyCode.TAB;
		},
		_windowKeyUpHandler: function(orgEvent){
			if((orgEvent.keyCode === ZComponents.keyCode.TAB && orgEvent.shiftKey || this._reverseShiftKey) && !this._reverseFocusset){
				this._reverseFocusset = this._focusout = true;
				this._selectText(this._dateFormat[this._dateFormat.length - 1]);
			}
			else if((orgEvent.keyCode === ZComponents.keyCode.TAB || this._tabKey ) && !this._focusset){
				this._focusset = this._focusout = true;
				ZComponents.OS.isLinux() && this._input[0].setSelectionRange(0,0);
				this._mouseUpHandler();	
			}	
			ZComponents.$window.off("keyup."+this.eventPrefix);	   // No I18N
		},
		_focusOutHandler: function(orgEvent){
			this._focusset = this._longPress = this._reverseFocusset = this._reverseShiftKey =  this._tabKey = false;
			this._focusout = true;
			window.getSelection().removeAllRanges();
			this._baseElement.removeClass("has-focus");	
			this._viewDate = this._checkMinMaxLimit(this._viewDate, undefined, undefined, false);
			this._baseElement.find(".h-up, .h-down").removeClass("is-disabled")
			this._updateElementValue();
			if(!(ZComponents.Browser.isIE() || ZComponents.Browser.isSafari() || ZComponents.OS.isLinux()) || ZComponents.Browser.isIE() && ZComponents.Browser.getIEVersion !== 9){
				this._input[0].selectionStart = 0;
			}
			this._checkForChange(orgEvent, "change"); // No I18N
			if(this.options.clearButton === "focus"){  // No I18N
				this._clearButton.hide();
			}
			if(this.options.spinButtons === "focus"){  // No I18N
				if(this._buttonPane){
					this._buttonPane.hide();	
					this._clearButton && this._clearButton.addClass("h-right");	
					this.options.calendarIcon && this._baseElement.addClass("zdatetimefield--buttonsonhover");		
				} 
			}
			this._trigger(this._EVENTS.BLUR, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
		},
		_getDateValue: function(){
			var value;
			if(this._dateModified && this._monthModified && this._yearModified && this._hoursModified && this._minutesModified && this._secondsModified){
				value = new Date(this._viewDate.getTime());
			}else{
				value = undefined;
			} 
			return value;
		},
		_mouseUpHandler: function(orgEvent){
			this.options.clearButton !== "none" && (this._isClearButtonVisible = this._clearButton.is(":visible")); // No I18N
			var caretPosition = this._selectCaretPosition(this._input[0]);
			if(caretPosition[0] === caretPosition[1]){
				for(var i=caretPosition[0], j = caretPosition[0] - 1, len =this._dateFormat.length; i<len || j >=0; i++, j--){
					if(i < this._dateFormat.length && this._allowedChars.indexOf(this._dateFormat[i]) !== -1){
						this._selectText(this._dateFormat[i]);
						return;
					}
					if(j >=0 && this._allowedChars.indexOf(this._dateFormat[j]) !== -1){
						this._selectText(this._dateFormat[j]);
						return;
					}
				}
			}else{
				//orgEvent && orgEvent.type === "mouseup" && this._selectText(this._dateFormat[caretPosition[0]]);
				orgEvent && orgEvent.type === "mouseup" && window.getSelection().removeAllRanges();
			}

		},
		_keyDownHandler: function(orgEvent){
			if(this.options.disabled){
				return false;
			}
			var selection;
			if(orgEvent.keyCode === ZComponents.keyCode.RIGHT || orgEvent.keyCode === ZComponents.keyCode.LEFT  || orgEvent.keyCode === ZComponents.keyCode.TAB){
				orgEvent.keyCode !== ZComponents.keyCode.TAB && orgEvent.preventDefault();
				selection = this._selectCaretPosition(this._input[0]);
				this._viewDate = this._checkMinMaxLimit(this._viewDate);
				if(this._isModified){
					this._updateElementValue();
					this._selectCaretPosition(this._input[0], selection[0], selection[1]);
				}
				if(selection[0] !== selection[1]){
					this._mouseUpHandler();
				}
				var direction = (orgEvent.keyCode === ZComponents.keyCode.RIGHT || (orgEvent.keyCode === ZComponents.keyCode.TAB && !orgEvent.shiftKey)) ? 1 : -1;
				if(orgEvent.keyCode === ZComponents.keyCode.TAB && orgEvent.shiftKey){
					this._focusout = true;
					direction = -1;
				}
				selection = this._selectCaretPosition(this._input[0]);
				var currentIndex = direction === -1 ? selection[0] - 1 : selection[1] + 1;
				while(currentIndex >=0 && currentIndex < this._dateFormat.length){
					var character = this._dateFormat[currentIndex], lastIndex = this.options.format.lastIndexOf(character);
					if(this._allowedChars.indexOf(character) >= 0){
						if(orgEvent.keyCode === ZComponents.keyCode.TAB && (lastIndex !== this.options.format.length || lastIndex + 1 !== this.options.format.length)){
							orgEvent.preventDefault();
							this._focusout = true;
						}
						this._selectText(this._dateFormat[currentIndex]);
						break;
					}
					currentIndex += direction;
				} 
			}
			if(orgEvent.keyCode === ZComponents.keyCode.UP || orgEvent.keyCode === ZComponents.keyCode.DOWN){
				orgEvent.preventDefault();
				selection = this._selectCaretPosition(this._input[0]);
				var character = this._dateFormat[selection[0]];
				if(this._allowedChars.indexOf(character) >= 0){
					this._modifyPartValue(character, orgEvent.keyCode === ZComponents.keyCode.UP ? 1 : -1);
					this._updateElementValue();
					this._clearButton && this._checkIfAPartIsModified();
					this._selectText(character);
				}				
				this._checkForChange(orgEvent, this._keyUp ? "spinstart" : "spin");   // No I18N
				this._keyUp = false;
			}
			if(orgEvent.metaKey || orgEvent.ctrlKey){
				switch(orgEvent.keyCode){
					case 88:
						var caretPosition = this._selectCaretPosition(this._input[0]), length;
						caretPosition[0] !== undefined && caretPosition[1] !== undefined && (length = caretPosition[1] - caretPosition[0]);
						if(length !== this._input[0].value.length){
							orgEvent.preventDefault();
						}
					break;
					case 90:
						orgEvent.preventDefault();
					break;
					case ZComponents.keyCode.DOWN:
						if(this._hasPicker && !this._picker.is(":visible")){   // No I18N
							this._picker.zdatetimepicker("open");    // No I18N
						}
					break;
				}
			}
			if(orgEvent.keyCode === ZComponents.keyCode.ESCAPE || orgEvent.keyCode === ZComponents.keyCode.ENTER){
				if(this._hasPicker && this._picker.is(":visible")){   // No I18N
					this._picker.zdatetimepicker("close");    // No I18N
				}
			}
		},
		_checkForChange: function(orgEvent, eventName){
			var notFullyModified = this._getDateValue() !== undefined ? false : true, changed; 
			if(!notFullyModified){
				var date = this._viewDate.getDate(), month = this._viewDate.getMonth(), year = this._viewDate.getFullYear(),
				hour = this._viewDate.getHours(), minutes = this._viewDate.getMinutes(), seconds = this._viewDate.getSeconds();
				if(date === 1 && month === 0 && year === new Date().getFullYear() && hour === 0 && minutes === 0 && seconds === 0){
					changed = true;
				}
			}
			if(!notFullyModified && (changed || (this._viewDate && this._oldDateValue && this._oldDateValue.getTime() !== this._viewDate.getTime()))){
				if(eventName === "spinend"){   // No I18N
					this._trigger(this._EVENTS.SPINEND, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
				}else if(eventName === "spinstart"){  // No I18N
					this._trigger(this._EVENTS.SPINSTART, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
				}else if(eventName === "spin"){ // No I18N
					clearTimeout(this._spinTimeout);
					this._spinTimeout = setTimeout(this._spinTimeoutHandler.bind(this, orgEvent), this.options.spinEventTriggerDelay);
				}else if(eventName === "change"){   // No I18N
					this._trigger(this._EVENTS.CHANGE, orgEvent, {value: this._input[0].value, dateValue: this.options.value});				
					this._oldDateValue = new Date(this._viewDate.getTime());
				}
				if(this._hasPicker){
					this._picker.zdatetimepicker("setValue", this.options.value);  // No I18N
				} 
			}
		},
		_spinTimeoutHandler: function(orgEvent){
			this._trigger(this._EVENTS.SPIN, orgEvent, {value: this._input[0].value, dateValue: this.options.value});
		},

		_modifyPartValue: function(character, offset, disabledCheck){
			var newDate = new Date(this._viewDate.getTime()), part, isValueComplete = this._getDateValue();
			switch(character){
				case "y":   // No I18N
					part = "_yearModified";   // No I18N
					offset = offset === 1 ? this.options.yearStep : -this.options.yearStep;
					var newYearValue = newDate.getFullYear() + offset;
					if(newYearValue < 0){
						newYearValue += 9999
					}else if(newYearValue > 9999){
						newYearValue %= 10000;
					}
					newYearValue === 0 && (newYearValue = 1);
					this._yearModified && newDate.setFullYear(newYearValue);
					break;
				case "M":   // No I18N
					offset = offset === 1 ? this.options.monthStep : -this.options.monthStep;
					part = "_monthModified";   // No I18N
					if(this._monthModified){
						var newMonth = newDate.getMonth() + offset;
						if(this.options.incrementOnWrapAround &&  isValueComplete !== undefined){
							newDate.setMonth(newMonth);
							if(newDate.getMonth() % 12 !== (newMonth + 12) % 12){
								newDate.setDate(1);
								newDate.setMonth(newMonth);
							}
						}else{
							if(newMonth < 0){
								newMonth +=12;
							}else if(newMonth > 11){
								newMonth %= 12;
							}
							var numberOfDays = new Date(newDate.getFullYear(), newMonth + 1, 0).getDate(), isDateLimitExceeded;
							if(newDate.getDate() > numberOfDays){
								isDateLimitExceeded = true;
							}
							isDateLimitExceeded && newDate.setDate(numberOfDays);
							newDate.setMonth(newMonth);
						}
					}else{
						offset < 0 && newDate.setMonth(11);
					}			
				break;
				case "d": // No I18N
					part = "_dateModified";   // No I18N
					offset = offset === 1 ? this.options.dateStep : -this.options.dateStep;
					var dateValue = newDate.getDate() + offset;	
					if(!this.options.incrementOnWrapAround || !isValueComplete){
						var numberOfDays = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
						if(dateValue < 1){
							dateValue = numberOfDays;
						}else if(dateValue > numberOfDays){
							dateValue %= numberOfDays;
						}
					}
					if(this._dateModified){
						newDate.setDate(dateValue);
					}else{
						offset < 0 && newDate.setDate(31);
					}
				break;
				// this._hoursModified, this._minutesModified and this._secondsModified check are to show 0 when up arrow is pressed
				case "h": case "H":  // No I18N		
					part = "_hoursModified";		  // No I18N
					offset = offset === 1 ? this.options.hourStep : -this.options.hourStep;
					var hourValue = newDate.getHours() + offset;
					if(!this.options.incrementOnWrapAround || !isValueComplete){
						hourValue > 23 && (hourValue %= 24);
						hourValue < 0 && (hourValue += 24);
					}
					if(this._hoursModified){
						newDate.setHours(hourValue);
					}else{
						offset < 0 && newDate.setHours(hourValue)
					} 
				break;
				case "m": // No I18N
					part = "_minutesModified";  // No I18N
					offset = offset === 1 ? this.options.minuteStep : -this.options.minuteStep;
					var minuteValue = newDate.getMinutes() + offset;
					if(!this.options.incrementOnWrapAround || !isValueComplete){
						minuteValue > 59 && (minuteValue %= 60);
						minuteValue < 0 && (minuteValue += 60);
					}
					if(this._minutesModified){
						newDate.setMinutes(minuteValue);	
					}else{
						offset < 0 && newDate.setMinutes(minuteValue);
					}
				break;
				case "s": // No I18N
					part = "_secondsModified";  // No I18N
					offset = offset === 1 ? this.options.secondStep : -this.options.secondStep;
					var secondValue = newDate.getSeconds() + offset;
					if(!this.options.incrementOnWrapAround || !isValueComplete){
						secondValue > 59 && (secondValue %= 60);
						secondValue < 0 && (secondValue += 60);						
					}
					if(this._secondsModified){
						newDate.setSeconds(secondValue);
					}else{
						offset < 0 && newDate.setSeconds(secondValue);
					}
				break;
				case "t": // No I18N
					newDate.setHours((newDate.getHours() + 12) % 24);

				break;
			}
			newDate = this._validateDateValues(newDate);
			if(!disabledCheck){
				newDate = this._checkMinMaxLimit(newDate, part, offset);
				newDate = this._checkForDisabledDates(newDate, offset);
				this._isPartModified(character, true);
				this._oldDateValue = new Date(this._viewDate.getTime());
				this._viewDate = newDate;	
			}else{
				return newDate;
			}		
		},
		_validateDateValues: function(newDate){
			if(this.options.incrementOnWrapAround && !this._hasDate){
				var today = this.options.value ? new Date(this.options.value.getTime()) : new Date();
				newDate.setDate(today.getDate());
				newDate.setMonth(today.getMonth());
				newDate.setFullYear(today.getFullYear());
			}
			return newDate;
		},
		_checkForDisabledDates: function(newDate, offset){
			offset = offset || 1;
			var disabled, preserveDate = new Date(newDate.getTime());	
			if(this._hasPicker){
				disabled = this._picker.zdatetimepicker("getAttribute", "disabledDates");  // No I18N
			}
			if(disabled){
				var newDateVal = new Date(newDate.getTime());
				newDateVal.setHours(0,0,0,0);
				var step = offset === 1 ? this.options.dateStep : -this.options.dateStep;
				for(var i=0, len = disabled.length; i<len;i++){
					var dateToCheck, disabledObj = disabled[i], changeValue;
					if(disabledObj.date instanceof Date){
						dateToCheck = disabledObj.date;
					}else{
						if(disabledObj.date){
							changeValue = false;
							dateToCheck = disabledObj.date.date;
							disabledObj.repeatEveryYear &&	dateToCheck.setFullYear(newDate.getFullYear());								
							disabledObj.repeatEveryMonth &&	dateToCheck.setMonth(newDate.getMonth());
						}else if(disabledObj.startDate && disabledObj.endDate){
							var startDate = disabledObj.startDate.date, endDate = disabledObj.endDate.date;
							if(disabledObj.repeatEveryYear){
								startDate.setFullYear(newDate.getFullYear());
								endDate.setFullYear(newDate.getFullYear());
							}
							if(disabledObj.repeatEveryMonth){
								startDate.setMonth(newDate.getMonth());
								endDate.setMonth(newDate.getMonth());
							}
							if(ZDateUtil.isGreater(newDateVal, startDate) || ZDateUtil.areDatesEqual(startDate, newDateVal)){
								changeValue = ZDateUtil.isGreater(endDate, newDateVal) ? true : false;
							}else{
								changeValue = false;
							}
						}
					}
					if(dateToCheck && ZDateUtil.areDatesEqual(dateToCheck, newDateVal) || changeValue){
						var dateValue = newDate.getDate() + step;
						if(!this.options.incrementOnWrapAround){
							var numberOfDays = new Date(newDateVal.getFullYear(), newDateVal.getMonth() + 1, 0).getDate();
							if(dateValue < 1){
								dateValue = numberOfDays;
							}else if(dateValue > numberOfDays){
								dateValue %= numberOfDays;
							}
						}
						newDateVal.setDate(dateValue);
						var time = newDateVal.getTime();
						newDate = new Date(time);
						i=-1;
					}
				}
				newDate.setHours(preserveDate.getHours(), preserveDate.getMinutes(), preserveDate.getSeconds(), 0);
			}
			return newDate;
		},
		_checkIfDateHasTime: function(){
			var format = this.options.format;
			var hasTime = (format.indexOf("H") > -1 || format.indexOf("h") > -1 || format.indexOf("m") > -1);  // No I18N
			if(hasTime){
				this._is12HourFormat = format.indexOf("h") > -1;
			}
			return hasTime;
		},
		_checkMinMaxLimit: function(newDate, part, offset, shouldAddClass){
			shouldAddClass = shouldAddClass === undefined ? true : shouldAddClass;
			this._isModified = false;
			var currentDate = new Date(), minChanged, maxChanged, currentTime = currentDate.getTime();
			if(this.options.max){
				var maxTime, newDateTime, isMore;
				if(!this._hasTime){
					this.options.max.setHours(0,0,0,0);
					currentDate.setHours(0,0,0,0);
					newDate.setHours(0,0,0,0);
				}
				maxTime = this.options.max.getTime(), newDateTime = newDate.getTime();
				isMore = maxTime < currentTime;
				if(newDateTime >= maxTime || (part && !this[part] && isMore && !offset)){
					if(this.options.value){
						shouldAddClass && this.options.spinButtons !== "none" && this._baseElement.find(".h-up").addClass("is-disabled");   // No I18N
						//offset && newDateTime > maxTime && this._addEffect();
					}
					this._isModified =  true;
					if(offset && newDateTime > maxTime){
						newDate = new Date(this._viewDate.getTime());
					}else{
						newDate = new Date(this.options.max.getTime());			
					}
				}else{
					shouldAddClass && this.options.spinButtons !== "none" && newDateTime < maxTime && this._baseElement.find(".h-up").removeClass("is-disabled");   // No I18N
				}
			}
			if(this.options.min){
				var minTime, newDateTime, isMore;
				if(!this._hasTime){
					this.options.min.setHours(0,0,0,0);
					currentDate.setHours(0,0,0,0);
					newDate.setHours(0,0,0,0);
				}
				minTime = this.options.min.getTime(), isMore = minTime > currentTime, newDateTime = newDate.getTime();
				if(newDateTime <= minTime || (part && !this[part] && isMore && !offset)){
					if(this.options.value){
						shouldAddClass && this.options.spinButtons !== "none" && this._baseElement.find(".h-down").addClass("is-disabled");   // No I18N
						//offset && newDateTime < minTime && this._addEffect();
					}
					this._isModified =  true;
					if(offset && newDateTime < minTime){
						newDate = new Date(this._viewDate.getTime());
					}else{
						newDate = new Date(this.options.min.getTime());									

					}
				}else{
					shouldAddClass && this.options.spinButtons !== "none" && newDateTime > minTime && this._baseElement.find(".h-down").removeClass("is-disabled");   // No I18N
				}
			}	
			return newDate;
		},
		_getNumberOfDays: function(year, month){
			return new Date(year, month , 0).getDate();
		},
		_addEffect: function(){
			this._input.addClass("zeffects--skew");
			clearTimeout(this._effectTimeout);
			this._effectTimeout = setTimeout(this._effectTimeoutHandler.bind(this), 1000);
		},
		_effectTimeoutHandler: function(){
			this._input.removeClass("zeffects--skew");
		},
		_parseDate: function(character, currentChar){
			if(!currentChar){
				this._isPartModified(character, false);
				return true;
			}
			var newDate = new Date(this._viewDate.getTime());
			switch(character){
				case "d": // No I18N
					var newValue, numberOfDays = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
					if(this._isNewValue &&  this._oldSegment !== this._currentSegment){
						newValue = 0 + parseInt(currentChar);
					}else{
						newValue = (this._dateModified ? newDate.getDate() * 10 : 0) + parseInt(currentChar);
					}
					if(isNaN(newValue)){
						return;
					}
					if(this.options.jumpOnComplete && newValue >= 4){
						this._isNextSegment = true;
					}
					var str = newValue.toString();
					if(!this.options.jumpOnComplete && newValue > numberOfDays && this._isFastInput){
						if(str.length === 2){
							newValue = this._viewDate.getDate();
						}else if(str.length >= 3){
							while(newValue > 31){
								newValue = parseInt(newValue.toString().slice(1));
							}
						}
					}else{
						if(this.options.jumpOnComplete){
							newValue > numberOfDays && (newValue = parseInt(str[0]));
						}else{
							newValue > numberOfDays && (newValue = parseInt(str[str.length - 1]));
						}						
					}					
					if(newValue < 1){
						this._dateModified = false;
					}else{
						newDate.setDate(newValue);
						if(newDate.getMonth() !== this._viewDate.getMonth()){
							return;
						}
						this._dateModified = true;
					}
				break;
				case "M":  // No I18N
					var newValue;
					if(this._isNewValue && this._oldSegment !== this._currentSegment){
						newValue = 0 + parseInt(currentChar);
					}else{
						newValue = (this._monthModified ? (newDate.getMonth() + 1) * 10 : 0) + parseInt(currentChar);
					}
					if(!isNaN(newValue)){
						if(this.options.jumpOnComplete && newValue >= 2){
							this._isNextSegment = true;
						}
						if(!this.options.jumpOnComplete && newValue > 12 && this._isFastInput){
							var value = parseInt(newValue.toString().slice(1));
							newValue = value > 12 ? parseInt(value.toString()[0]) : this._viewDate.getMonth() + 1;
						}else{
							if(this.options.jumpOnComplete){
								if(newValue > 12 && newValue < 20){
									newValue = 12;
								}else if(newValue > 20){
									newValue = newValue.toString()[0];
								}
							}else{
								if(newValue === 111 || newValue === 112){
									var str = newValue.toString();
									newValue = parseInt(str[str.length -1]);
								}else{
									while(newValue > 12){
										newValue = parseInt(newValue.toString().slice(1));
									}	
								}		
							}				
						}						
						if(newValue < 1){
							this._monthModified = false;
						}else{
							newDate.setMonth(newValue - 1);
							if(newDate.getMonth() !== newValue - 1){
								newDate.setDate(1);
								newDate.setMonth(newValue - 1);
							}
							this._monthModified = true;
						}
					}else{
						var months = this._getI18N("zdatetimefield", "months", this.options.keys);  // No I18N
						this._typedMonthChar += currentChar.toLowerCase();
						while(this._typedMonthChar.length > 0){
							for(var i=0; i<months.length;i++){
								if(months[i].toLowerCase().indexOf(this._typedMonthChar) === 0){
									newDate.setMonth(i);
									if(this.options.jumpOnComplete){
										switch(this._typedMonthChar){
											case "f": case "s": case "o": case "n": case "d": case "ja": case "may":  // No I18N
											case "mar": case "ap": case "au": case "jun": case "jul":    // No I18N
												this._isNextSegment = true;
											break;
										}
									}
									this._monthModified = true;
									this._oldDateValue = new Date(this._viewDate.getTime());
									this._viewDate = newDate;
									return true;
								}
							}
							this._typedMonthChar = this._typedMonthChar.substring(1, this._typedMonthChar.length);
						}
						return false;
					}
				break;
				case "y": // No I18N
					var newValue;
					if(this._isYear2Digit){
						newValue = parseInt((this._yearModified ? newDate.getFullYear().toString().slice(2) : 0)+currentChar);
						if(isNaN(newValue)){
							return;
						}
						var yearString = newValue.toString();
						if(this.options.jumpOnComplete && newValue > 10 && (yearString.length === 2 && yearString[1] !== "0")){
							this._isNextSegment = true;
						}
						while(newValue > 99){
							newValue = parseInt(newValue.toString().slice(1));
						}
						if(newValue < 1){
							this._yearModified = false;
						}else{
							var century = this.options.century - 1;
							newValue = parseInt(century.toString() + newValue.toString());
							newDate.setFullYear(newValue);
							this._yearModified = true;
						}
					}else{
						newValue = (this._yearModified ? newDate.getFullYear() * 10 : 0)+ parseInt(currentChar);
						if(isNaN(newValue)){
							return;
						}
						var yearString = newValue.toString();
						if(this.options.jumpOnComplete && newValue > 1001 && (yearString.length === 4 && yearString[3] !== "0")){  // No I18N
							this._isNextSegment = true;
						}
						while(newValue > 9999){
							newValue = parseInt(newValue.toString().slice(1));
						}				
						if(newValue < 1){
							this._yearModified = false;
						}else{
							newDate.setFullYear(newValue);
							this._yearModified = true;
						}
					}	
				break;
				case "h":    // No I18N
					var newValue = (this._hoursModified ? (newDate.getHours() % 12 * 10): 0) + parseInt(currentChar);
					if(isNaN(newValue)){
						return;
					}
					var hourString = newValue.toString();
					if(!this.options.jumpOnComplete && newValue > 12 && this._isFastInput){
						newValue = parseInt(hourString[0]);
					}else{
						if(this.options.jumpOnComplete){
							while(newValue > 12){
								newValue = parseInt(newValue.toString().slice(1));
							}
						}else{
							newValue > 12 && (newValue = parseInt(hourString[hourString.length - 1]));
						}
					}
					if(this._viewDate.getHours() >= 12){
						newValue = newValue + 12;	
					}
					if(this.options.jumpOnComplete && this._hoursModified && currentChar !== "1"){
						this._isNextSegment = true;
					}
					newDate.setHours(newValue);
					this._hoursModified = true;
				break;
				case "H":  // No I18N
					var newValue;
					if(this._isNewValue &&  this._oldSegment !== this._currentSegment){
						newValue = 0 + parseInt(currentChar);
					}else{
						newValue = (this._hoursModified ? (newDate.getHours()) * 10 : 0) + parseInt(currentChar);
					}
					if(isNaN(newValue)){
						return;
					}
					var hourString = newValue.toString();
					if(this.options.jumpOnComplete && (newValue >= 23 || hourString.length === 2 && hourString[1] !== "0")){ // No I18N
						this._isNextSegment = true;
					}
					var str = newValue.toString();
					if(!this.options.jumpOnComplete && newValue > 23 && this._isFastInput){
						if(str.length === 2){
							newValue = this._viewDate.getHours();
						}else if(str.length >= 3){ 
							newValue > 23 && (newValue = parseInt(newValue.toString().slice(1)));
							if(newValue > 23){
								newValue = parseInt(newValue.toString()[0]);
							}
						}
					}else{
						if(this.options.jumpOnComplete){
							if(newValue > 23){
								newValue = parseInt(str[0]);
							}
						}else{
							newValue > 23 && (newValue = parseInt(str[str.length - 1]));
						}						
					}
					newDate.setHours(newValue);
					this._hoursModified = true;
				break;
				case "m":  // No I18N
					var newValue = (this._minutesModified ? (newDate.getMinutes()) * 10 : 0) + parseInt(currentChar);
					if(isNaN(newValue)){
						return;
					}
					var minuteString = newValue.toString();
					if(this.options.jumpOnComplete && (newValue >= 59 || minuteString.length === 2 && minuteString[1] !== "0")){ // No I18N
						this._isNextSegment = true;
					}
					var str = newValue.toString();
					if(!this.options.jumpOnComplete && newValue > 23 && this._isFastInput){
						if(str.length === 2){
							newValue = this._viewDate.getMinutes();
						}else if(str.length >= 3){ 
							newValue > 59 && (newValue = parseInt(newValue.toString().slice(1)));
							if(newValue > 59){
								newValue = parseInt(newValue.toString()[0]);
							}
						}
					}else{
						if(this.options.jumpOnComplete){
							if(newValue > 59){
								newValue = parseInt(str[0]);
							}
						}else{
							newValue > 59 && (newValue = parseInt(str[str.length - 1]));
						}						
					}
					newDate.setMinutes(newValue);
					this._minutesModified = true;
				break;
				case "s": // No I18N
					var newValue = (this._secondsModified ? (newDate.getSeconds()) * 10 : 0) + parseInt(currentChar);
					if(isNaN(newValue)){
						return;
					}
					var secondString = newValue.toString();
					if(this.options.jumpOnComplete && (newValue >= 59 || secondString.length === 2 && secondString[1] !== "0")){ // No I18N
						this._isNextSegment = true;
					}
					var str = newValue.toString();
					if(!this.options.jumpOnComplete && newValue > 23 && this._isFastInput){
						if(str.length === 2){
							newValue = this._viewDate.getSeconds();
						}else if(str.length >= 3){ 
							newValue > 59 && (newValue = parseInt(newValue.toString().slice(1)));
							if(newValue > 59){
								newValue = parseInt(newValue.toString()[0]);
							}
						}
					}else{
						if(this.options.jumpOnComplete){
							if(newValue > 59){
								newValue = parseInt(str[0]);
							}
						}else{
							newValue > 59 && (newValue = parseInt(str[str.length - 1]));
						}						
					}
					newDate.setSeconds(newValue);
					this._secondsModified = true;
				break;
				case "t": // No I18N
					if(this._hoursModified){
						this._typedPeriodChar += currentChar.toLowerCase();
						while(this._typedPeriodChar.length > 0){
							var AMKey = this._getI18N("zdatetimefield", "AM", this.options.keys), PMKey = this._getI18N("zdatetimefield", "PM", this.options.keys);  // No I18N
							if(AMKey.toLowerCase().indexOf(this._typedPeriodChar) === 0 && newDate.getHours() >=12 || PMKey.toLowerCase().indexOf(this._typedPeriodChar) === 0 && newDate.getHours() < 12){
								newDate.setHours((newDate.getHours() + 12) % 24);
								this._oldDateValue = new Date(this._viewDate.getTime());
								this._viewDate = newDate;
								return true;
							}
							this._typedPeriodChar = this._typedPeriodChar.substring(1, this._typedPeriodChar.length);
						}
						newDate.setSeconds(newValue);
						this._hoursModified = true;
						return true;
					}
				break;
			}
			newDate = this._validateDateValues(newDate);
			this._oldDateValue = new Date(this._viewDate.getTime());
			newDate = this._checkForDisabledDates(newDate);
			this._viewDate = newDate;
			return true;
		},
		_appendZerosToValue: function(number, chars, last){
			var zeros = ["", "0", "00", "000", "0000"];  // No I18N 
			number = number.toString();
			chars = chars || 2;
			last = chars - number.length;
			if(last){
				return zeros[chars].substring(0, last) + number;
			}
			return number;
		},
		_keyUpHandler: function(orgEvent){
			//Check for IE9
			if(orgEvent.type === "input" || (orgEvent.type === "keyup" && ((orgEvent.keyCode >= 186 && orgEvent.keyCode <= 192) || (orgEvent.keyCode >= 219 && orgEvent.keyCode <= 222) || (orgEvent.keyCode >= 48 && orgEvent.keyCode <= 57) || (orgEvent.keyCode >= 65 && orgEvent.keyCode <= 90) || (orgEvent.keyCode ===  ZComponents.keyCode.SPACE) || (orgEvent.keyCode ===  ZComponents.keyCode.BACKSPACE) || (orgEvent.keyCode ===  ZComponents.keyCode.DELETE)))){
				var currentTime = new Date().getTime();
				this._isFastInput = this._keyUpTime && currentTime - this._keyUpTime < 500 ? true : false;
				this._keyUpTime = currentTime;
				if(document.activeElement !== this._input[0]){
					return;
				}
				var i, diff = this._approximateStringMatching(this._oldValue, this._dateFormat, this._input[0].value, this._selectCaretPosition(this._input[0])[0]);				
				var isNavigation = (diff.length === 1 && (diff[0][1] === " " || diff[0][1] === "/" || diff[0][1] === "." || diff[0][1] === "-" || diff[0][1] === ";")); // No I18N
				if(this._isNewValue && this._allowedChars.indexOf(diff[0][0]) > -1 && this._currentSegment !== this._oldSegment){
					this._resetValues(diff[0][0], diff[0][1]);			
				}
				if(!isNavigation){
					for(i=0;i<diff.length;i++){
						this._parseDate(diff[i][0], diff[i][1]);
					}
				}else{
					this._viewDate = this._checkMinMaxLimit(this._viewDate);
				}
				!this._pasteAction && this._updateElementValue();
				if(diff.length && (diff[0][0] !== " " && diff[0][0] !== "/" && diff[0][0] !== "." && diff[0][0] !== "-" && diff[0][0] !== ";")){	// No I18N	
					this._selectText(diff[0][0])
					if(this._isNextSegment){
						var index = this._dateFormat.lastIndexOf(diff[0][0]) + 1;
						if(index < this._dateFormat.length){
							while(this._allowedChars.indexOf(this._dateFormat[index]) === -1 && index < this._dateFormat.length){
								index +=1;
							}
							this._isNextSegment = false;
							this._viewDate = this._checkMinMaxLimit(this._viewDate);
							!this._pasteAction && this._updateElementValue();
							this._selectText(this._dateFormat[index]);
						}
					}
				}
				if(isNavigation){
					var ev = {keyCode: ZComponents.keyCode.RIGHT, preventDefault: function() { }};
					this._keyDownHandler(ev);
				}
				!isNavigation && this._checkForChange(orgEvent, "spin");	 // No I18N
				if(this.options.clearButton !== "none"){
					this._checkIfAPartIsModified();
				}			
			}
		},
		_checkIfAPartIsModified: function(){
			var values = [], j = 0;
			for(var i=0; i<this.options.format.length; i++){
				var part = this.options.format[i];
				switch(part){
					case "d": 
						values[j++] = this._dateModified;
					break;	
					case "M":
						values[j++] = this._monthModified;
					break;
					case "y":
						values[j++] = this._yearModified;
					break;
					case "H": 
					case "h": 
						values[j++] = this._hoursModified;
					break;
					case "m":
						values[j++] = this._minutesModified;
					break
					case "s":
						values[j++] = this._secondsModified;
					break;

				}
			}
			var valModified = false;	
			for(var i=0; i<j;i++){
				if(values[i]){
					valModified = true;
					break;
				}else{
					valModified = false;
				}
			}
			if(this._clearButton){
				this._clearButton[valModified ? "show" : "hide"]();  // No I18N
				this._isClearButtonVisible = this._clearButton.is(":visible"); // No I18N
			}
		},
		_approximateStringMatching: function(oldText, oldFormat, newText, caretPosition){
			this._isNewValue = false;
			var oldTextSeperator = oldText[caretPosition + oldText.length - newText.length], i, diff = [];
			oldText = oldText.substring(0, caretPosition + oldText.length - newText.length);
			newText = newText.substring(0, caretPosition);
			if (oldText === newText && caretPosition > 0) {
	            diff.push([oldFormat[caretPosition - 1], newText[caretPosition - 1]]);
	            return diff;
       		}	
			if(oldText.indexOf(newText) === 0 && (newText.length === 0 || oldFormat[newText.length - 1] !== oldFormat[newText.length])){
				var removedChar = "";	// No I18N
				for(i = newText.length; i<oldText.length; i++){
					if(oldText[i] !== removedChar && this._allowedChars.indexOf(oldFormat[i]) >= 0){
						removedChar = oldFormat[i];
						diff.push([removedChar, ""]);	// No I18N
					}
					switch(removedChar){
						case "y":  // No I18N
							this._viewDate.setFullYear(new Date().getFullYear());
						break;
						case "d":  // No I18N
							this._viewDate.setDate(1);
						break;
						case "M":  // No I18N
							this._viewDate.setMonth(0);
						break;
						case "H":  // No I18N
						// case "h":
							this._viewDate.setHours(0);
						break; 
						case "m":  // No I18N
							this._viewDate.setMinutes(0);
						break;
						case "s":  // No I18N
							this._viewDate.setSeconds(0);
						break;
					}
				}
				return diff;
			}
			var navigationChar = newText[newText.length - 1];
			if(navigationChar === " " || navigationChar === "/" || navigationChar === "-" || navigationChar === "." || navigationChar === ";" || navigationChar === oldTextSeperator){	// No I18N
				return [[oldFormat[caretPosition -1], navigationChar]]; 
			}	
			if(this._focusout){
				switch(oldFormat[caretPosition - 1]){
					case "y": // No I18N
						this._viewDate.setFullYear(0);
					break;
					case "h":  // No I18N
						this._viewDate.setHours(0);
					break;
					case "m": // No I18N
						this._viewDate.setMinutes(0); 
					break;
				}
				this._focusout = false;
			}
			this._isNewValue = true;
       		return [[oldFormat[caretPosition - 1], newText[caretPosition - 1]]];
		},
		_selectText: function(character){
			var start = -1, end = 0;
			this._oldSegment = this._currentSegment;
			for(var i=0; i< this._dateFormat.length; i++){
				if(this._dateFormat[i] === character){
					end  = i + 1;
					if(start === -1){
						start = i;
					}
				}
			}
			if(start < 0){
				start = 0;
			}
			this._currentSegment = character;
			this.options.spinButtons !== "none" && this._addDisabledClass(character);  // No I18N
			this._selectCaretPosition(this._input[0], start, end);	
		},
		_addDisabledClass: function(character){
			if(this.options.value){
				var newDate = this._modifyPartValue(character, -1, true),  
					down = this._baseElement.find(".h-down"), up = this._baseElement.find(".h-up"), 
					isDownDisabled, isUpDisabled, newDateTime, maxTime, minTime;			
				if(!this._hasTime){
					this.options.max && this.options.max.setHours(0,0,0,0);
					this.options.min && this.options.min.setHours(0,0,0,0);
					newDate.setHours(0,0,0,0)
				}
				newDateTime = newDate.getTime();
				this.options.max && (maxTime = this.options.max.getTime());
				this.options.min && (minTime = this.options.min.getTime());					
				if(this.options.min && newDateTime <= minTime){
					down.addClass("is-disabled");
					isDownDisabled = true;
				}
				if(this.options.max && newDateTime >= maxTime){
					down.addClass("is-disabled");
					isDownDisabled = true;
				}
				newDate = this._modifyPartValue(character, 1, true), newDateTime = newDate.getTime();
				if(maxTime && newDateTime >= maxTime){
					up.addClass("is-disabled");
					isUpDisabled = true;
				}
				if(minTime && newDateTime <= minTime){
					up.addClass("is-disabled");
					isUpDisabled = true;
				}
				!isDownDisabled && down.removeClass("is-disabled");
				!isUpDisabled && up.removeClass("is-disabled");
			}			
		},
		_resetValues: function(character, value){
			if(isNaN(value)){
				return;
			}
			switch(character){
				case "y": // No I18N
					this._viewDate.setFullYear(0);
				break;
				//case "h": 
				case "H": // No I18N			  
					this._viewDate.setHours(0);
				break;
				case "m": // No I18N
					this._viewDate.setMinutes(0); 
				break;
				case "s":  // No I18N
					this._viewDate.setSeconds(0);
				break;
			}
		},
		_selectCaretPosition: function(element, start, end){
			var isPositioned = start !== undefined;
			end === undefined && (end = start);
			if(isPositioned && element.disabled){
				return;
			}
			try{
				if(element.selectionStart !== undefined){
					if(isPositioned){
						element.focus();
						element.setSelectionRange(start, end);
					}else{
						start  = [element.selectionStart, element.selectionEnd];
					}
				}
			}catch(e){
				throw e;
			}
			return start;
		},
		_getPlaceHolderValue: function(match){
			switch(this.options.placeholderType){
				case "date-format":     // No I18N
					return match;
				break;
				case "date-format-in-upper":  // No I18N
					return match.toUpperCase();
				break;
				case "date-format-in-lower":  // No I18N
					return match.toLowerCase();
				break
				case "underscore":  // No I18N
					return (new Array(match.length + 1).join("_ "));
				break;
				case "custom":  // No I18N
					switch(match){
						case "d": case "dd":  // No I18N
							return this.options.placeholder.date;
						break;
						case "ddd": case "dddd":  // No I18N
							return this.options.placeholder.weekDay;
						break;
						case "M": case "MM": case "MMM": case "MMMM":  // No I18N
							return this.options.placeholder.month; 
						break;
						case "yy": case "yyyy":  // No I18N
							return this.options.placeholder.year;
						break;
						case "h": case "hh": case "HH": case "H":  // No I18N
							return this.options.placeholder.hour;
						break;
						case "m": case "mm":  // No I18N
							return this.options.placeholder.minute;
						break;
						case "s": case "ss":  // No I18N
							return this.options.placeholder.second;
						break;
					}	
				break;
			}
		},
		_replaceMatchedText: function(match){
			var result;
			switch(match){
				case "d":     // No I18N
					result = this._dateModified ? this._viewDate.getDate().toString() : this._getPlaceHolderValue(match);
				break;   
				case "dd":   // No I18N
					var date = this._viewDate.getDate();
					result = this._dateModified ? (date < 10 ? "0" : "")+date : this._getPlaceHolderValue(match);
				break;
				case "ddd":    // No I18N
					if(this._dateModified && this._monthModified && this._yearModified){
						var day = this._viewDate.getDay();
						result = this._getI18N("zdatetimefield", "daysAbbreviated", this.options.keys)[day];  // No I18N
					}else{
						result = this._getPlaceHolderValue(match);
					}
				break; 
				case "dddd":   // No I18N  
					if(this._dateModified && this._monthModified && this._yearModified){
						var day = this._viewDate.getDay();
						result = this._getI18N("zdatetimefield", "days", this.options.keys)[day] // No I18N
					}else{
						result = this._getPlaceHolderValue(match);
					}
				break;
				case "M":   // No I18N
					result = this._monthModified ?  (this._viewDate.getMonth() + 1).toString() : this._getPlaceHolderValue(match);
				break;
				case "MM":   // No I18N
					if(this._monthModified){
						var month = this._viewDate.getMonth() + 1;
						result = (month < 10 ? "0" : "")+month;
					}else{
						result = this._getPlaceHolderValue(match);
					}			
				break; 
				case "MMM":   // No I18N
				    if(this._monthModified){
				    	var month = this._viewDate.getMonth();
				    	result = this._getI18N("zdatetimefield", "monthsAbbreviated", this.options.keys)[month];   // No I18N
				    }else{
				    	result = this._getPlaceHolderValue(match);
				    }					
				break; 
				case "MMMM":  // No I18N
					var month = this._viewDate.getMonth();
					result = this._monthModified ? this._getI18N("zdatetimefield", "months", this.options.keys)[month] : this._getPlaceHolderValue(match); // No I18N
				break;
				case "yy":  // No I18N
					this._isYear2Digit = true;
					if(this._yearModified){
						var year = this._viewDate.getFullYear();	
						result = this._appendZerosToValue(this._viewDate.getFullYear() % 100)
					}else{
						result = this._getPlaceHolderValue(match);
					}
				break;
				case "yyyy":  // No I18N
					this._isYear2Digit = false;
					result = this._yearModified ? this._appendZerosToValue(this._viewDate.getFullYear(), 4) : this._getPlaceHolderValue(match);
				break;
				case "h":  // No I18N
					result = this._hoursModified ? (this._viewDate.getHours() % 12 || 12).toString() : this._getPlaceHolderValue(match);
				break; 
				case "hh":  // No I18N
					if(this._hoursModified){
						var hours = (this._viewDate.getHours() % 12 || 12);
						result = (hours < 10 ? "0" : "")+hours;
					}else{
						result = this._getPlaceHolderValue(match);
					}
				break;
				case "H":  // No I18N
					result = this._hoursModified ? this._viewDate.getHours().toString() : this._getPlaceHolderValue(match);
				break;
				case "HH":  // No I18N
					if(this._hoursModified){
						var hours = this._viewDate.getHours();	
						result = (hours < 10 ? "0" : "")+hours;
					}else{
						result = this._getPlaceHolderValue(match);
					}
				break; 
				case "m":   // No I18N
					result = this._minutesModified ? this._viewDate.getMinutes().toString() : this._getPlaceHolderValue(match);
				break;
				case "mm":   // No I18N
					if(this._minutesModified){
						var minutes = this._viewDate.getMinutes();
						result = (minutes < 10 ? "0" : "")+minutes
					}else{
						result = this._getPlaceHolderValue(match);
					}					
				break;
				case "s":  // No I18N
					result = this._secondsModified ?  this._viewDate.getSeconds().toString() : this._getPlaceHolderValue(match);
				break;
				case "ss":   // No I18N
					if(this._secondsModified){
						var seconds = this._viewDate.getSeconds();
						result = (seconds < 10 ? "0" : "")+seconds;
					}else{
						result = this._getPlaceHolderValue(match);
					}
				break;
				case "tt":  // No I18N
					result = this._hoursModified ? (this._viewDate.getHours() < 12 ? this._getI18N("zdatetimefield", "AM", this.options.keys) : this._getI18N("zdatetimefield", "PM", this.options.keys)) : this.options.placeholder.period; // No I18N
				break;
				case "z":  // No I18N
					result = this._viewDate.toString().match(/\(([A-Za-z\s].*)\)/)[1]
				break;
				case "zz": // No I18N
					result = this._viewDate.toString().match(/([A-Z]+[+-][0-9]+)/)[1]
				break;
				case "zzz": // No I18N
					result = this._viewDate.toString().match(/([A-Z]+[+-][0-9]+.*)/)[1]
				break;
			}
			result = (result !== undefined ? result : match.slice(1, match.length - 1));
			if(this._retursFormat){
				var formattedResult ="";	// No I18N
				if(match === "ddd"){	// No I18N
					match = "EEE";	// No I18N
				}else if(match === "dddd"){	// No I18N	
					match = "EEEE";	// No I18N
				}else if(match === "z"){  // No I18N
					match = "f"          // No I18N
				}else if(match === "zz"){  // No I18N
					match = "ff"           // No I18N
				}else if(match === "zzz"){ // No I18N
					match = "fff"          // No I18N
				}
				for(var i=0; i<result.length;i++){
					formattedResult += match[0];
				}
				return formattedResult;
			}
			return result;
		},
		_updateElementValue: function(){
			var dateFormatRegExp = /dd{0,3}|MM{0,3}|yyyy|yy|HH|H|hh|h|mm|m|ss|s|tt|zz{0,2}|"[^"]*"|'[^']*'/g; 
			var format = this.options.format;
			this._retursFormat = false;
			var newValue = format.replace(dateFormatRegExp, this._replaceMatchedText.bind(this));
			this._retursFormat = true;
			this._dateFormat = format.replace(dateFormatRegExp, this._replaceMatchedText.bind(this));
			this._input[0].value = newValue;
			this.options.value = this._getDateValue() ? new Date(this._viewDate.getTime()) : undefined; 
			this._oldValue = newValue;
		},
		_parseDateValue: function(date, pattern){
			var val, parsedDate = {}, pattern, formattedDate, matchFound = false, finalValue;
          	var patterns = [];
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
		_resetViewDate: function(){
			return new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);			
		},
		_setValue: function(value){
			var isModified = this._parseValue("value", value); // No I18N
			this._performValidations();
			if(isModified && this.options.value){
				this._viewDate = new Date(this.options.value.getTime());
				this._input.attr("aria-valuenow", ZDateUtil.formatDate(this.options.value, this.options.format));  // No I18N
			}
			if(!this.options.value){
				this._input.removeAttr("aria-valuenow"); // No I18N
			}
			this._checkIfAPartIsModified();
			return isModified;
		},
		_parseValue: function(optionName, value){
			var isModified, dateInfo;
			if(typeof value === "string"){ // No I18N
				if(value === "TODAY" || value === "NOW"){  // No I18N
					this.options[optionName]=  new Date();
				}else{
					dateInfo = this._parseDateValue(value, this.options.format);
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
			this.options[optionName] && !this._hasTime && this.options[optionName].setHours(0,0,0,0); 
			return isModified;
		},
		/** Gets the value currently associated with the specified option name.
			This signature doesn't accept any arguments.
			@function datetime-field.getAttribute
			@param {string} optionName - The name of the option to get.
			@return {string|object} value.
			@example <caption> Example </caption>
	var format = $("#demoField").zdatetimefield("getAttribute","format");*/
		/** Sets the value of the option associated with the specified option name.
			@function datetime-field.setAttribute
			@param {string} optionName - The name of the option to get.
			@param {string} value - A value to set for the option.
			@example <caption> Example </caption>
	$("#demoField").zdatetimefield("setAttribute","min","12/12/2019"); */
		/** Gets an object containing key/value pairs representing the current date time field options.
			This signature doesn't accept any arguments.
			@function datetime-field.getAttributes
			@return {object} options object.
			@example <caption> Example </caption>
	var options = $("#demoField").zdatetimefield("getAttributes");*/
		/** Sets one or more options for the date time field.
			@function datetime-field.setAttributes
			@param {Object} options - A map of option-value pairs to set.
			@example <caption> Example </caption>
	$("#demoField").zdatetimefield("setAttributes",{"format": "dd-MM-yyyy", "placeholderType": "underscore"}); */	
		setAttribute: function(optionName, value){
			if(typeof value === "object" && !(value instanceof Array) && !(value instanceof Date)){  // No I18N
				value = $.extend(true, {}, this.options[optionName], value);
			}
			this.options[optionName] = value;
			if(optionName === "format" || optionName === "value"){  // No I18N
				var dateInfo, isValueModified;
				if(optionName === "format"){	 // No i18N
					this.options.format = value;
				}
				if(optionName === "value"){  // No I18N
					isValueModified = this._setValue(value);
				}
				if(isValueModified){  
					this._format = value;
	 				this._dateModified = this._monthModified = this._yearModified = this._minutesModified =  this._secondsModified = this._hoursModified = true;
					if(optionName === "format"){  // No I18N
						this._changeLocaleSpecifierToDateFormat();
						this._picker && this._picker.zdatetimepicker("setAttribute", "valueFormat", this.options.format);   // No I18N
					}
					for(var i=0; i<this.options.format.length; i++){
						this._isPartModified(this.options.format[i], this.options.value ? true : false);
					}
					this._viewDate = this.options.value ? new Date(this.options.value.getTime()) : this._resetViewDate();
					this._viewDate = this._checkMinMaxLimit(this._viewDate);
					this._updateElementValue();	
				}
				if(optionName === "format"){   // No I18N
					this._hasTime = this._checkIfDateHasTime();	
					this._hasDate = this._checkIfFormatHasDate();
					this._hasPicker = this._hasDate ? this.options.picker : false;
				}
				if(this._hasPicker){
					if(this._calendarIcon && this.options.calendarIconUIType === "button"){  // No I18N
						this._calendarIcon.off("click."+this.eventPrefix).on("click."+this.eventPrefix, this._calendarIconClickHandler.bind(this));  // No I18N
					}
					(this.options.calendarIconUIType !== "button" || (this.options.calendarIconUIType === "button" && this.options.showPickerOnFocus)) && this._baseElement.off("click."+this.eventPrefix).on("click."+this.eventPrefix, this._pickerOpenHandler.bind(this)); // No I18N

				}else{
					this._calendarIcon && this.options.calendarIconUIType === "button" &&  this._calendarIcon.off("click."+this.eventPrefix);  // No I18N

					(this.options.calendarIconUIType !== "button" || (this.options.calendarIconUIType === "button" && this.options.showPickerOnFocus)) && this._baseElement.off("click."+this.eventPrefix); // No I18N
					
				}
			}else if(optionName === "min" || optionName === "max"){	// No I18N
				this._parseValue(optionName, value);
 				this._performValidations();
 				if(this._hasPicker){
 					this._picker.zdatetimepicker("setAttribute", optionName, this.options[optionName]);
 				}
 				if(this.options[optionName]){
 					this._input.attr("aria-value"+optionName, ZDateUtil.formatDate(this.options[optionName], this.options.format));  // No I18N
 				}else{
 					this._input.removeAttr("aria-value"+optionName);  // No I18N
 				}
 				this._viewDate = this._checkMinMaxLimit(this._viewDate);
 				this._updateElementValue();
			}else if(optionName === "placeholderType"){     // No I18N
				if(value !== "date-format" && value !== "underscore" && value !== "date-format-in-upper" && value !== "date-format-in-lower"){   // No I18N
					value = "date-format";   // No I18N
				}
				this.options.placeholerType = value;
				if(!this.options.value){
					this._updateElementValue();
				}
			}else if(optionName === "clearButton"){   // No I18N
				if(value !== "none"){   // No I18N
					this._createClearButton();
					if(value === "focus"){ // No I18N
						this._baseElement.off("mouseenter."+this.eventPrefix).on("mouseenter."+this.eventPrefix, this._mouseEnterHandler.bind(this))  // No I18N
										 .off("mouseleave."+this.eventPrefix).on("mouseleave."+this.eventPrefix, this._mouseLeaveHandler.bind(this));  // No I18N	
					}
					//this._checkIfAPartIsModified();
				}else if(value === "none"){  // No I18N
					this._clearButton.off("mousedown."+this.eventPrefix+" click."+this.eventPrefix);   // No I18N
					this._clearButton.remove();
					this._clearButton = undefined;
				}
			}else if(optionName === "clearButtonSVGIconId" || optionName === "clearButtonIconClassName"){  // No I18N
				if(value.length){
					if(this.options.clearButton !== "none"){  // No I18N
						this._updateClearIcon(this._clearButton.find(".zinputfield__icon"));
					}
				}			
			}else if(optionName === "spinButtons" || optionName === "decrementButtonSVGIconId" || optionName === "incrementButtonSVGIconId" || optionName === "incrementButtonIconClassName" || optionName === "decrementButtonIconClassName"){	// No I18N
				if(this._buttonPane){
					this._buttonPane.remove();
					this._buttonPane = undefined;
				}
				if(value === "none"){  // No I18N
					this._baseElement.removeAttr("role");  // No I18N
					this._baseElement.find(".h-up,.h-down").off("mousedown."+this.eventPrefix+" mouseup."+this.eventPrefix);  // No I18N
					if(this.options.spinButtonsOrientation === "vertical"){ // No I18N
						this._baseElement.find(".zinputfield__spinbuttonpane").remove();
					}
					this._baseElement.find(".h-up,.h-down").remove();
                    this._baseElement.removeClass("zinputfield--split");
                    ZComponents.$document.off("."+this.eventPrefix);
                    this._baseElement.addClass("zdatetimefield--buttonsonhover");
				}else{
					this._baseElement.addClass("zdatetimefield");
					this._createSpinButtons();
					if(value === "focus"){  // No I18N
						this._baseElement.off("mouseenter."+this.eventPrefix).on("mouseenter."+this.eventPrefix, this._mouseEnterHandler.bind(this))  // No I18N
										 .off("mouseleave."+this.eventPrefix).on("mouseleave."+this.eventPrefix, this._mouseLeaveHandler.bind(this));  // No I18N	
					}
					this._baseElement.attr("role", "spinbutton");  // No I18N
                    if(this.options.spinButtonsOrientation === "horizontal"){ // No I18N
                        this._baseElement.addClass("zinputfield--split zdatetimefield");  // No I18N
                    }
                    this.options.spinButtons === "always" && this._baseElement.removeClass("zdatetimefield--buttonsonhover");   // No I18N
				}
			}else if(optionName === "spinButtonsOrientation"){   // No I18N
				if(value !== "horizontal" && value !== "vertical"){  // No I18N
					value = "vertical";  // No I18N
				}
				this.options.spinButtonsOrientation = value;
				if(this.options.spinButtons !== "none"){  // No I18N
					var upButton = this._baseElement.find(".h-up"), downButton = this._baseElement.find(".h-down");
					this._baseElement.empty();	 
					var prependToInput = this.options.calendarIconAlignment === "left" ? true : false;  // No I18N
					if(value === "vertical"){  // No I18N
						var	buttonPane = $("<div class='zinputfield__spinbuttonpane'>")
						buttonPane.append(upButton, downButton);
						this._baseElement.append(prependToInput && this._calendarIcon ? this._calendarIcon : undefined, this._input, !prependToInput && this._calendarIcon ?  this._calendarIcon : undefined,  buttonPane, this.options.clearButton !== "none" ? this._clearButton : undefined).removeClass("zinputfield--split");  // No I18N
					}else{ 
						this._baseElement.append(prependToInput && this._calendarIcon ? this._calendarIcon : undefined, this._input, !prependToInput && this._calendarIcon ? this._calendarIcon : undefined, upButton, downButton, this.options.clearButton !== "none" ? this._clearButton : undefined).addClass("zinputfield--split");  // No I18N
					}
					this._updateIcons(upButton.find(".zinputfield__icon"), downButton.find(".zinputfield__icon"));
					this._bindEvents();
					if(this.options.clearButton !== "none"){  // No I18N
						this._clearButton.on("mousedown."+this.eventPrefix, this._clearButtonMousedownHandler.bind(this));  // No I18N	
						this._clearButton.on("click."+this.eventPrefix, this._clearButtonClickHandler.bind(this));	 // No I18N	
					}
					this._baseElement.find(".h-up,.h-down").on("mousedown."+this.eventPrefix, this._spinButtonsMouseDownHandler.bind(this)) // No I18N
														   .on("mouseup."+this.eventPrefix, this._spinButtonsMouseUpHandler.bind(this)); // No I18N	
				}		
				if(this.options.spinButtonsOrientation === "horizontal"){  // No I18N
					this._baseElement.addClass("zdatetimefield"); // No I18N
				}else{
					!this.options.calendarIcon && this._baseElement.removeClass("zdatetimefield"); // No I18N
				}		
			}else if(optionName === "calendarIcon" || optionName === "calendarSVGIconId" || optionName === "calendarIconClassName" || optionName === "calendarIconUIType"){  // No I18N
				if(this._calendarIcon){
					this._calendarIcon.remove();
					this._calendarIcon = undefined;
					this._baseElement.removeClass('h-hasiconbutton');
				}
				if(value && this.options.calendarIcon){
					this._createCalendarIcon();
					this.options.spinButtons === "focus" && this._baseElement.addClass("zdatetimefield--buttonsonhover");  // No I18N
					if(this.options.calendarIconUIType === "button"){   // No I18N
						!this.options.showPickerOnFocus && this._baseElement.off("click."+this.eventPrefix);  // No I18N
					}else{
						this._baseElement.off("click."+this.eventPrefix).on("click."+this.eventPrefix, this._pickerOpenHandler.bind(this));     // No I18N
					}
				}
			}else if(optionName === "calendarIconAlignment"){  // No I18N
				if(value !== "left" && value !== "right"){ // No I18N
					value = "right";  // No I18N
				} 
				this.options.calendarIconAlignment = value;
				if(this.options.calendarIcon && this._calendarIcon){
					this._calendarIcon[value === "right" ? "insertAfter" : "insertBefore" ](this._input);   // No I18N
				}
			}else if(optionName === "readonly"){  // No I18N
				this._baseElement[(value && !this.options.disabled) ? "addClass" : "removeClass"]("is-readonly");   // No I18N
				this._baseElement[(value || this.options.disabled) ? "addClass" : "removeClass"]("is-disabled");   // No I18N
				this._input.attr("aria-readonly", value);   // No I18N
				if(value){
					this._input.attr("readonly",true);   // No I18N
					this._input.off("input."+this.eventPrefix+" keydown."+this.eventPrefix+" keyup."+this.eventPrefix+" mouseup."+this.eventPrefix+" mousewheel."+this.eventPrefix);   // No I18N
					this.options.clearButton !== "none" && this._clearButton.off("mouseup."+this.eventPrefix+" mousedown."+this.eventPrefix);   // No I18N
				}else{
					this.options.disabled ? this._input.removeAttr("readonly") : this._input.removeAttr("readonly disabled");  // No I18N
					this._bindEvents();
					if(this.options.clearButton !== "none"){
						this._clearButton.on("mouseup."+this.eventPrefix, this._clearButtonClickHandler.bind(this))  // No I18N 
									     .on("mousedown."+this.eventPrefix, this._clearButtonMousedownHandler.bind(this));  // No I18N 	
					}				
				}
			}else if(optionName === "disabled"){  // No I18N
				this._baseElement[value || this.options.readonly ? "addClass" : "removeClass"]("is-disabled");   // No I18N
				this._input.attr("aria-disabled", value);  // No I18N
				if(value){
					this.options.readonly && this._baseElement.removeClass("is-readonly");
					this._input.removeClass("h-hidecursor");
					this._input.attr("disabled",true);  // No I18N
					this.options.clearButton !== "none" && this._clearButton.off("mouseup."+this.eventPrefix+" mousedown."+this.eventPrefix);   // No I18N
				}else{
					this.options.readonly && this._baseElement.addClass("is-readonly");
					this._input.addClass("h-hidecursor");
					!this.options.readonly && this._input.removeAttr("disabled"); // No I18N
					if(this.options.clearButton !== "none"){
						this._clearButton.on("mouseup."+this.eventPrefix, this._clearButtonClickHandler.bind(this))  // No I18N 
										 .on("mousedown."+this.eventPrefix, this._clearButtonMousedownHandler.bind(this));  // No I18N 	
					}			
				}          
			}else if(optionName === "className"){  // No I18N
				this._baseElement.removeClass(this.options.className).addClass(value);
			}else if(optionName === "locale"){  // No I18N
				this._changeLocaleSpecifierToDateFormat();
			}else if(optionName === "century"){ // No I18N 
				value = value - 1
				if(!isNaN(value) && value.toString().length === 2){
					var yearValue = this._viewDate.getFullYear().toString().slice(2);
					var year = parseInt(value.toString() + yearValue);
					this._viewDate.setFullYear(year);
					this.options.value && (this.options.value = new Date(this._viewDate.getTime()));
					this.options.century = value + 1;
				}else{
					throw new Error(this.options.keys.invalidNumber);
				}
			}else if(optionName === "title"){ // No I18N 
				this._baseElement[0].title = value;
			}else if(optionName === "width"){  // No I18N 
				this._baseElement.outerWidth(value);
			}else if(optionName === "picker"){  // No I18N 
				if(value){
					this._hasPicker = true;
					this._initPicker();
					this._bindPickerEvents();
					(this.options.calendarIconUIType !== "button" || (this.options.calendarIconUIType === "button" && this.options.showPickerOnFocus)) && this._baseElement.on("click."+this.eventPrefix, this._pickerOpenHandler.bind(this)); // No I18N
					this.options.calendarIconUIType === "button" && this._calendarIcon.off("click."+this.eventPrefix).on("click."+this.eventPrefix, this._calendarIconClickHandler.bind(this));  // No I18N
					(this._immediateCommit = this._picker.zdatetimepicker("getAttribute", "immediateCommit")); // No I18N
				}else{
					this._picker.zdatetimepicker("destroy");  // No I18N 
					this._picker.remove();
					this._picker = undefined;
					this._hasPicker = false;
					this._baseElement.off("click."+this.eventPrefix);  // No I18N
				}  
			}else if(optionName === "pickerOptions"){   // No I18N
				this._picker.zdatetimepicker("destroy");  // No I18N 
				this._picker.zdatetimepicker(this.options.pickerOptions);
			}else if(optionName === "showPickerOnFocus"){    // No I18N
				if(this.options.calendarIconUIType === "button"){   // No I18N 
					this._baseElement.off("click."+this.eventPrefix);   // No I18N 
					if(value){
						this._baseElement.on("click."+this.eventPrefix, this._pickerOpenHandler.bind(this));   // No I18N
					}
				}
			}
		},
		getAttribute: function(optionName){
			if(optionName === "pickerOptions"){  // No I18N 
				if(this._hasPicker && this._picker){
					return this._picker.zdatetimepicker("getAttributes");  // No I18N 
				}
			}else{
				return this._super(optionName);
			}
		},
		/** 
			Returns a object containing the string and date object representation of the option "value"
			This method does not accept any arguments.
			@function datetime-field.getValue
			@return {Object} dateValue - Object containing keys dateObject and dateString  of the option "value"
			@example <caption> Example: </caption>
	var dateValue = $("#demoField").zdatetimefield("getValue");
		*/
		getValue: function(){
			return { dateObject: this.options.value, dateString: this._input[0].value };
		},
		/** 
			Sets the value of the date time field.
			@function datetime-field.setValue
			@param {String} date - The value of the option "value".
			@example <caption> Example: </caption>
	$("#demoField").zdatetimefield("setValue","12/12/2017");
		*/
		setValue: function(dateString){
			this._parseValue("value", dateString);  // No I18N
			this._viewDate = this._checkMinMaxLimit(this._viewDate);
			for(var i=0; i<this.options.format.length; i++){
				this._isPartModified(this.options.format[i], this._viewDate ? true : false);
			}
			this._updateElementValue();
		},
		/** Opens the associated picker for the date time field. This method does not accept any arguments.
	@function datetime-field.open
	@example <caption> Example </caption>
	$("#demoField").zdatetimefield("openPicker"); */	
		openPicker: function(){
			if(this._hasPicker && this._picker){
				this._picker.zdatetimepicker("open");   // No I18N 
			}
		},
		/** Closes the associated picker for the date time field. This method does not accept any arguments.
	@function datetime-field.close
	@example <caption> Example </caption>
	$("#demoField").zdatetimefield("closePicker"); */	
		closePicker: function(){
			if(this._hasPicker && this._picker){
				this._picker.zdatetimepicker("close");   // No I18N 
			}
		},	
		/** Sets the value of the option associated with the specified optionName.
			@function datetime-field.parseDate
			@param {string} dateString - Date string to be converted to date object .
			@param {string} dateFormat - The format that is used to parse the date string passed.
			@return {Object} dateInfo - Object containing the date object and an information whether the passed date string is a valid input.
			@example <caption> Example </caption>
	var dateInfo = $("#demoField").zdatetimefield("parseDate","12-12-2019 12:24 PM","dd-MM-yyyy hh:mm tt"); */
		parseDate: function(dateString, dateFormat){
			var dateInfo = this._parseDateValue(dateString, dateFormat || this.options.format);
			return dateInfo;
		},
		/** Sets the value of the option associated with the specified optionName.
			@function datetime-field.formatDate
			@param {string} dateObject - Date Object to be converted to date string .
			@param {string} dateFormat - The format that is used to parse the date string passed.
			@example <caption> Example </caption>
	var dateInfo = $("#demoField").zdatetimefield("formatDate",dateObject,"dd-MM-yyyy hh:mm tt"); */
		formatDate: function(dateObject, dateFormat){
			return ZDateUtil.formatDate(dateObject, dateFormat || this.options.format)
		},
		/** 
			Returns a jQuery object containing the element visually representing the date time field.
			This method does not accept any arguments.
			@function datetime-field.getElement
			@return {Object} element - Element representing the date time field component.
			@example <caption> Example: </caption>
	var element = $("#demoField").zdatetimefield("getElement");
		*/
		getElement: function(){
			return this._baseElement;
		},
		/** 
			Returns a jQuery object containing the element visually representing the date picker.
			This method does not accept any arguments.
			@function datetime-field.getPickerElement
			@return {Object} element - Returns the date time picker DOM element.
			@example <caption> Example: </caption>
	var pickerElement = $("#demoField").zdatetimefield("getPickerElement");
		*/
		getPickerElement: function(){
			if(this._hasPicker){
				return this._picker;	
			}
		},
		/** 
			Removes the datetime field component functionality. This will return the element back to its pre-init state.
			This method does not accept any arguments.
			@function datetime-field.destroy
			@example <caption> Example: </caption>
	$("#demoField").zdatetimefield("destroy");
		*/
		destroy: function(){
			this._input.off("."+this.eventPrefix);  // No I18N
			this._baseElement.remove();
			this.element.show().removeData(this.eventPrefix); 
			ZComponents.$document.off("."+this.eventPrefix);  // No I18N
			if(this.options.picker){
				this._picker.zdatetimepicker("destroy");  // No I18N
				this._picker.remove();
				this._picker = undefined;
			}
			this._lastValue = undefined;
			this._baseElement = this._input = undefined;  
		}
	}
	ZComponents.registerComponent("zdatetimefield", datetimeFieldPrototype); // No I18N
	ZComponents.createDatetimefield = function(options){
		var element = $("input");
		options.id && element.attr("id", options.id);  // No I18N
		element.appendTo ? element.appendTo($(options.appendTo)) : element.appendTo("body"); // No I18N
		element = element.zdatetimefield(options);
	}
})(jQuery);
