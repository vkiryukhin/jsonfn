/**
* JSONfn - javascript plugin to stringify, parse and clone objects with methods.
*  
* Version - 0.5.00
* Copyright (c) 2012 - 2014 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/jsonfn/
* 
* Licensed under the MIT license ( http://www.opensource.org/licenses/mit-license.php )
*
*   USAGE:
* 
*        JSONfn.stringify(obj);
*        JSONfn.parse(str[, date2obj]);
*		 JSONfn.clone(obj[, date2obj]);
*
*        @obj      -  Object;
*		 @str      -  String, which is returned by JSONfn.stringify() function; 
*		 @date2obj - Boolean (optional); if true, date string in ISO8061 format
*					 is converted into a Date object; otherwise, it is left as a String.
*/

/* Create a JSONfn object only if it does not already exist. */

var JSONfn;
if (!JSONfn) {
    JSONfn = {};
}

/* Create methods in a closure to avoid creating global variables. */

(function () {

JSONfn.stringify = function(obj) {

	return JSON.stringify(obj,function(key, value){

			if(value instanceof Function || typeof value == 'function') return value.toString();
			if(value instanceof RegExp ) return '_PxEgEr_'+value; 
			return value;
		});
};

JSONfn.parse = function(str, date2obj) {
	
	var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;
			
	return JSON.parse(str,function(key, value){
			var prefix;
			
			if(typeof value != 'string') return value;
			if(value.length < 8) return value;
			
			prefix = value.substring(0,8);

			if( iso8061 && value.match( iso8061 )) 	return new Date(value);
			if( prefix === 'function') return eval('('+ value +')');
			if( prefix === '_PxEgEr_') return eval(value.slice(8)); 
				
			return value;
		});
};
	
JSONfn.clone = function(obj, date2obj) {
	return JSONfn.parse(JSONfn.stringify(obj), date2obj);
}
	

}()); 