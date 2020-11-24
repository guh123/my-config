/* $Id$ */
var ZDateUtil = (function($){
	return {
		monthsAbbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],	// No I18N
		daysAbbreviated: ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"],  // No I18N
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],  // No I18N
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // No I18N
		invalidInput: "Invalid date/time provided. Please provide correct input", // No I18N
		century: 21,
		AM: "AM",  // No I18N
		PM: "PM",  // No I18N
		_setMonth: function(date, val){
			var day = date.getDate();
			if(isNaN(date)){
				return date;
			}
			val -= 1;
			val %= 12;
			date.setMonth(val);
			while(val > 0 && date.getMonth() !== val){
				date.setDate(--day);
			}
			return date;
		},
		parsePattern: function(pattern){
			var acceptedVal = /d(?:d{1,3})?|M(?:M{1,3})?|yy(?:yy)?|h(?:h)?|H(?:H)?|m(?:m)?|s(?:s)|t{2}/g;
			var dateSeperator =  pattern.replace(acceptedVal, '\0').split('\0'),
				dateParts = pattern.match(acceptedVal);
			if(!dateSeperator || !dateSeperator.length || !dateParts || !dateParts.length){
				return false;
			}
			return {dateSeperator: dateSeperator, dateParts: dateParts};
		},
		parseDate: function(date, pattern){
			var val, parsedDate = {}, pattern, formattedDate, filtered, matchFound = false;
			if(!date){
				return undefined;
			}
			if(date instanceof Date){
				return {date: date, isValid: true};
			}
			if(typeof date !== "string" || typeof date === "string" && !date.length){  // No I18N
				return undefined;
			}
			var filterDate = function(date){
				var month = date.slice(0, dateParts[i].length), part = dateParts[i].slice(0, month.length);
				return month.toLowerCase() === part.toLowerCase();
          	}
			var date1 = date;
			date = date1;
			typeof pattern === "string" && (pattern = ZDateUtil.parsePattern(pattern));	// No I18N	          	
          	var part, dateParts = date.match(/[^ -/:-@\u5e74\u6708\u65e5[-`{-~\t\n\r]+/g) || [];
          	dateParts.indexOf("at") > -1 && dateParts.splice(dateParts.indexOf("at"), 1);
          	var pParts = pattern.dateParts.slice();
          	date = new Date();     	
          	if(dateParts.length === pParts.length){
          		for(var i=0; i< pParts.length; i++){
          			val = parseInt(dateParts[i], 10),
          			part = pParts[i];
          			if(isNaN(val)){
          				if(part === "MMM" || part === "MMMM"){	// No I18N
          					switch(part){
	          					case "MMM": 	// No I18N
	          					case "MMMM": 	// No I18N
	          						filtered = ZDateUtil.monthsAbbreviated.filter(filterDate);
	          						val = $.inArray(filtered[0], ZDateUtil.monthsAbbreviated) + 1;
	          					break;
          					}
          					parsedDate[part] = val;
          				}else if(part === "tt"){  // No I18N			
          					if(dateParts[i] === "AM" || dateParts[i] === "PM"){ // No I18N	
	          					var value = dateParts[pParts.indexOf("hh")], hourValue = parseInt(value), modValue = hourValue % 12; // No I18N	
	          					if(dateParts[i] === "AM"){  // No I18N	
	          						parsedDate.hh = modValue === 0 ? 0 : hourValue;
	          					}
	          					if(dateParts[i] === "PM"){ // No I18N	
	          						parsedDate.hh = modValue === 0 ? 12 : hourValue + 12;
	          					}
	          					parsedDate[part] = value;
          					}
          				}
          			}else{
          				if(part === "yyyy" || part === "yy"){  // No I18N	
          					if(val > 9999){
          						dateParts[i] = "9999";  // No I18N	
          					}
          				}
          				if(!((part.indexOf("d") > -1 && val > 31) || (part.indexOf("M") > -1 && val > 12) || (part.indexOf("y") > -1 && part.length !== dateParts[i].length))){  // No I18N	
	          				parsedDate[part] = val;	
          				}else{
          					break;
          				}
          			}
          		} 
          	}
          	if(Object.keys(parsedDate).length && dateParts.length === Object.keys(parsedDate).length){
          		date = ZDateUtil._getFormattedDate(parsedDate, date);
          		if(pattern.dateParts.indexOf("s") === -1 || pattern.dateParts.indexOf("ss") === -1){  // No I18N	
          			date.setSeconds(0,0);
          		}
          		date = {date: date, isValid: true};
          	}else{
          		date = {date: date, isValid: false};
          	}
            return date;
		},
		getDateFromOffset: function(dateOffset, date, datePattern){
			var offsetValue;
			if(dateOffset.indexOf("TODAY") === 0){  // No I18N
				offsetValue  = dateOffset.substring(5);
			}else if(dateOffset.indexOf("FROM_VALUE") === 0){  // No I18N
				offsetValue = dateOffset.substring(10);
			}else{	
				return {date: undefined, isValid: false};
			}
	 		var pattern =  /([+-][0-9]+)(DAYS|MONTHS|YEARS|WEEKS)/g, matches = pattern.exec(offsetValue), 
	 			day = date.getDate(), month = date.getMonth(), year = date.getFullYear(), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(); 
	 		if(!matches){
	 			try {
	 				var value = {date: ZDateUtil._getDateByIntelligence(dateOffset, datePattern), isValid: true};
					return value;
	 			}catch(exception){
	 				var value = {date: undefined, isValid: false};
	 				return value;
	 			}
	 		}
	 		while(matches){
	 			switch(matches[2] || "DAYS"){	// No I18N
	 				case "DAYS":  // No I18N
	 				 	day += parseInt(matches[1], 10); 
	 				break;
	 				case "WEEKS":
	 					day += (parseInt(matches[1],10) * 7);
	 				break;
	 				case "MONTHS":  // No I18N
	 					month += parseInt(matches[1], 10);
	 					day = Math.min(day, new Date(year, month + 1, 0).getDate());
	 				break;
	 				case "YEARS": // No I18N
	 				 	year += parseInt(matches[1], 10);
	 					day = Math.min(day, new Date(year, month + 1, 0).getDate());
	 				break;	
	 				case "HOURS":  // No I18N
	 					hour += parseInt(matches[1], 10);
	 				break;
	 				case "MINUTES":  // No I18N
	 					minutes += parseInt(matches[1], 10);
	 				break;
	 				case "SECONDS": // No I18N
	 					seconds += parseInt(matches[1], 10);
	 				break;
	 			}
	 			matches = pattern.exec(offsetValue);
	 		}      
	 		date = ZDateUtil._getDate(year, month, day, hour, minutes, seconds);    
	 		var returnObj = {date: date, isValid: true};
 			return returnObj;
		},
		convertOffsetToValue: function(offset){
			var pattern = /([+-]{1}([0-9])+$)/g, match = pattern.exec(offset);
			if(!match){
				return 0;
			}
			return parseInt(match[0]);
		},
		_getFormattedDate: function(parsedDate, date){
			var executionOrder = ["yyyy", "yy", "M", "MM", "MMM", "MMMM", "d","dd","ddd","dddd", "H", "HH", "h", "hh", "m", "mm", "s", "ss"], formattedDate, pattern;  // No I18N
			for(var i=0; i<executionOrder.length;i++){
      			pattern =  executionOrder[i];
      			if(pattern in parsedDate && !isNaN(parsedDate[pattern])){
      				formattedDate = new Date(date);
      				switch(pattern){
      					case "M": case "MM": case "MMM": case "MMMM":  // No I18N
      						formattedDate = ZDateUtil._setMonth(formattedDate, parsedDate[pattern]);
      						break;
      					case "yyyy":  // No I18N
      						parsedDate[pattern] > 9999 ? formattedDate.setFullYear(9999) : formattedDate.setFullYear(parsedDate[pattern]);
      						break;
      					case "yy":
      						var century = ZDateUtil.century - 1;
      						var year = century.toString() + parsedDate[pattern];
      						formattedDate.setFullYear(parseInt(year));
      					break;
      					case "d": case "dd": case "ddd": case "dddd":   	// No I18N      					
      						formattedDate.setDate(parsedDate[pattern]);
      						break
      					case "H": case "HH": // No I18N 
      						formattedDate.setHours(parsedDate[pattern]);
      						break;
      					case "h": case "hh":  // No I18N 
      						formattedDate.setHours(parsedDate[pattern]);
      						break;
      					case "m": case "mm":  // No I18N 
      						formattedDate.setMinutes(parsedDate[pattern]);
      						break;
      					case "s": case "ss":  // No I18N 
      						formattedDate.setSeconds(parsedDate[pattern]);
      						break;
      				}
      				if(!isNaN(formattedDate)){
      					date = formattedDate;
      				}
      			}
      		}
      		return formattedDate;
		},
		_getDateByIntelligence: function(date, pattern){		
			var dateObject = new Date(date), matches = date.match(new RegExp("[-/. ?]", "g")) || [], noMatchFound;
			if(!isNaN(dateObject)){
				if(matches.length === 1){
					if(dateObject.getFullYear() === 2001){
						dateObject.setFullYear(new Date().getFullYear());
					}
				}
				return dateObject;
			}else{
				var values = pattern.values, colonMatch = date.match(new RegExp(":", "g")), colonCount;
				if(colonMatch){
					var invalidTime = false, hourValue, minuteValue, secondValue;
					colonCount = colonMatch.length;
					var elements = ["AM","PM","am","pm"], periodIndex; // No I18N
					if(values){
						values[0] && (values[0] = parseInt(values[0]));
						values[1] && (values[1] = parseInt(values[1]));
						values[2] && !isNaN(values[2]) && (values[2] = parseInt(values[2]));
					}
					for(var i=0; i<elements.length; i++){
						if(values.indexOf(elements[i]) > -1){
							periodIndex = values.indexOf(elements[i]);
							break;
						}
					}
					if(colonCount === 0){
						invalidTime = true;
					}else if(colonCount === 1){
						if(periodIndex && periodIndex > -1){
							var period = values[periodIndex].toUpperCase();
							if(values[0] >= 1 && values[0] <= 12 && values[1] >=0 && values[1] <= 59){
								var modValue = values[0] % 12
	          					if(period === "AM"){  // No I18N	
	          						hourValue = modValue === 0 ? 0 : values[0];
	          					}
	          					if(period === "PM"){ // No I18N	
	          						hourValue = modValue === 0 ? 12 : values[0] + 12;
	          					}
	          					minuteValue = values[1];
							}else{
								invalidTime = true;
							}
						}else{
							if(values[0] >= 0 && values [0] <= 23 && values[1] >=0 && values[1] <= 59){
								hourValue = values[0], minuteValue = values[1];
							}else{
								invalidTime = true;
							}
						}
					}else if(colonCount === 2){
						if(periodIndex && periodIndex > -1){
							var period = values[periodIndex].toUpperCase();
							if(values[0] >= 1 && values[0] <= 12 && values[1] >=0 && values[1] <= 59 && values[2] >= 0 && values[2] <= 59){
								var modValue = values[0] % 12
	          					if(period === "AM"){  // No I18N	
	          						hourValue = modValue === 0 ? 0 : values[0];
	          					}
	          					if(period === "PM"){ // No I18N	
	          						hourValue = modValue === 0 ? 12 : values[0] + 12;
	          					}
	          					minuteValue = values[1], secondValue = values[2]
							}
						}else{
							if(values[0] >= 0 && values [0] <= 23 && values[1] >=0 && values[1] <= 59 && values[2] >=0 && values[1] <= 59){
								hourValue = values[0], minuteValue = values[1], secondValue = values[2];
							}else{
								invalidTime = true;
							}
						}
					}else{
						invalidTime = true;
					}
					if(!invalidTime){
						date = new Date();
						hourValue !== undefined && date.setHours(hourValue);
						minuteValue !== undefined  && date.setMinutes(minuteValue);
						secondValue !== undefined  ? date.setSeconds(secondValue) : date.setSeconds(0);
					}else{
						noMatchFound = true;
					}
				}else if(matches.length){
					var dateElements = date.split(matches[0]), month, year;
					if(dateElements[0].length === 4){
						year = parseInt(dateElements[0]);
						month = parseInt(dateElements[1]);
					}else if(dateElements[1].length === 4){
						month = parseInt(dateElements[0]);
						year = parseInt(dateElements[1]);
					}
					if(month !== undefined && year !== undefined){
						date = new Date();
						date.setFullYear(year);
						date.setDate(1);
						date.setMonth(month);
						
					}else{
						noMatchFound = true;
					}
				}else{
					noMatchFound = true;
				}			
				if(noMatchFound){
					throw new Error(ZDateUtil.invalidInput);
				}
				return date;
			}
		},
		_getDate: function(year, month, date, hours, mins, seconds){
			return new Date(year, month, date, hours, mins, seconds);
		},
		getUTCDate: function(){
			return new Date(Date.UTC.apply(Date, arguments));
		},
		areDatesEqual: function(first, second){
			return (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && 
					 first.getDate() === second.getDate());
		},
		areTimesEqual: function(first, second){
			return (first.getHours() === second.getHours() && first.getMinutes() === second.getMinutes() && first.getSeconds() === second.getSeconds());
		},
		isGreater: function(first, second){
			if(first.getTime() < second.getTime()){
				return false;
			}
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
		_replaceMatchedText: function( date, match){
            var minutes;
            var result;
            var sign;
            switch(match){
            	case "d":   // No I18N
            		result = date.getDate();
            	break;
            	case "dd":  // No I18N
            		var date = date.getDate();
                	result = (date < 10 ? "0" : "")+date;  // No I18N
                break;
                case "ddd":  // No I18N
                	result = ZDateUtil.daysAbbreviated[date.getDay()];
                break;
                case "dddd":  // No I18N
                	result = ZDateUtil.days[date.getDay()];
                break;
                case "M":  // No I18N
                	result = date.getMonth() + 1;
                break;
                case "MM":  // No I18N
                	var month = date.getMonth() + 1;
					result = (month < 10 ? "0" : "")+month;  // No I18N
				break;
				case "MMM":   // No I18N
					result = ZDateUtil.monthsAbbreviated[date.getMonth()];
				break; 
				case "MMMM":   // No I18N
					result = ZDateUtil.months[date.getMonth()];
				break; 
				case "yy":  // No I18N
					result = this._appendZerosToValue(date.getFullYear() % 100);
				break;
				case "yyyy":   // No I18N
					result = this._appendZerosToValue(date.getFullYear(), 4);
				break;
				case "h":  // No I18N
					result = date.getHours() % 12 || 12;
				break;
				case "hh":  // No I18N
	            	var hours = (date.getHours() % 12 || 12);
					result = (hours < 10 ? "0" : "")+hours;  // No I18N
				break;
				case "H":  // No I18N
					result = date.getHours();
				break;
				case "HH":  // No I18N
					var hours = date.getHours();	
					result = (hours < 10 ? "0" : "")+hours;  // No I18N
				break;
				case "m":  // No I18N
					result = date.getMinutes();
				break;
				case "mm":  // No I18N
	                var minutes = date.getMinutes();
					result = (minutes < 10 ? "0" : "")+minutes;  // No I18N
				break;
				case "s":  // No I18N
					result = date.getSeconds();
				break;
				case "ss":  // No I18N
					var seconds = date.getSeconds();
					result = (seconds < 10 ? "0" : "")+seconds;  // No I18N
				break;
				case "tt":  // No I18N
					result = date.getHours() < 12 ? "AM" : "PM";  // No I18N
				break;
				case "z":  // No I18N
					result = date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
				break;
				case "zz":  // No I18N
					result = date.toString().match(/([A-Z]+[+-][0-9]+)/)[1];  
				break;
				case "zzz":
					result = date.toString().match(/([A-Z]+[+-][0-9]+.*)/)[1];  
				break;
            }
            return result !== undefined ? result : match.slice(1, match.length - 1);
		},
		formatDate: function(date, format){
	   		 var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|zzz|zz|z|"[^"]*"|'[^']*'/g; // No I18N
	   		 var base = this;
	   		 if(date instanceof Date){
	   		 	return format.replace(dateFormatRegExp, ZDateUtil._replaceMatchedText.bind(this, date));
	   		 }
		}
	}
}(jQuery));
