/**
* JSONfn - javascript plugin to stringify, parse and clone objects with methods.
*  
* Version - 0.4.00.beta 
* Copyright (c) 2012 - 2013 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/jsonfn/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*   USAGE:
* 
*        JSONfn.stringify(obj);
*        JSONfn.parse(str[, date2obj]);
*		 JSONfn.clone(obj[, date2obj]);
*
*        @obj      -  Object;
*		 @str      -  String, which is returned by JSONfn.stringify() function; 
*		 @date2obj - Boolean (optional); if true (or evaluates to true), date string in ISO8061 format
*					 is converted into a Date object; therwise, it is left as a String.
*/

// Create a JSONfn object only if it does not already exist. 

var JSONfn;
if (!JSONfn) {
    JSONfn = {};
}

// Create methods in a closure to avoid creating global variables.

(function () {

JSONfn.stringify = function(obj) {
	return JSON.stringify(obj,function(key, value){
			return (typeof value === 'function' ) ? value.toString() : value;
		});
};

	
JSONfn.parse = function(str, date2obj) {
	
	var iso8061 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;

	if(date2obj) { // ISO-8061 string should be converted into "Date" object 
			
		return JSON.parse(str,function(key, value){
		
			if(typeof value != 'string') return value;

			if( value.substring(0,8) === 'function') {
				return eval('('+ value +')');
			} else 
			if( value.match( iso8061 )) { 
				return new Date(value);
			} else {
				return value;
			}
		});
	
	} else { // don't test strings on ISO-8061 format.

		return JSON.parse(str,function(key, value){
			if(typeof value != 'string') {
				return value;
			}
			return ( value.substring(0,8) === 'function') ? eval('('+value+')') : value;
		});
	}
	
};

	
JSONfn.clone = function(obj, date2obj) {
	return JSONfn.parse(JSONfn.stringify(obj), date2obj);
}
	

}()); 