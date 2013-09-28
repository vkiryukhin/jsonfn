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
*        JSONfn.parse(jsonStr);
*		 JSONfn.stringify(obj);
*
*        @obj     -  javascript object;
*		 @jsonStr -  String in JSON format; 
*
*   Examples:
*		
*        var str = JSONfn.stringify(obj);
*        var obj = JSONfn.parse(str);
*
*/

// Create a JSON object only if it does not already exist. 
var JSONfn;
if (!JSONfn) {
    JSONfn = {};
}

(function () {

	JSONfn.stringify = function(obj) {
		return JSON.stringify(obj,function(key, value){
				return (typeof value === 'function' ) ? value.toString() : value;
			});
	};
	
	JSONfn.parse = function(str, restoreDateObj) {
	
		if(restoreDateObj) { // if "date string" is found, convert it into a Date object //
		
			return JSON.parse(str,function(key, value){
			
				if(typeof value != 'string') return value;

				if( value.substring(0,8) === 'function') {
					return eval('('+ value +')');
				} else 
				if( value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/)) { 
					return new Date(value);
				} else {
					return value;
				}
			});
		
		} else { 
			return JSON.parse(str,function(key, value){
				if(typeof value != 'string') {
					return value;
				}
				return ( value.substring(0,8) === 'function') ? eval('('+value+')') : value;
			});
		}
		
	};
	
	JSONfn.clone = function(obj, restoreDateObj) {
		return JSONfn.parse(JSONfn.stringify(obj), restoreDateObj);
	}
	

}()); 