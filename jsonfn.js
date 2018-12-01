/**
* JSONfn - javascript (both node.js and browser) plugin to stringify,
*          parse and clone objects with Functions, Regexp and Date.
*
* Version - 1.1.0
* Copyright (c) Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/jsonfn/
*
* Licensed under the MIT license ( http://www.opensource.org/licenses/mit-license.php )
*
*   USAGE:
*     browser:
*         JSONfn.stringify(obj);
*         JSONfn.parse(str[, date2obj]);
*         JSONfn.clone(obj[, date2obj]);
*
*     nodejs:
*       var JSONfn = require('path/to/json-fn');
*       JSONfn.stringify(obj);
*       JSONfn.parse(str[, date2obj]);
*       JSONfn.clone(obj[, date2obj]);
*
*
*     @obj      -  Object;
*     @str      -  String, which is returned by JSONfn.stringify() function;
*     @date2obj - Boolean (optional); if true, date string in ISO8061 format
*                 is converted into a Date object; otherwise, it is left as a String.
*/

(function (exports) {
   "use strict";

   exports.stringify = function (obj) {

      return JSON.stringify(obj, function (key, value) {
         let fnBody;
         if (value === String) return '_Schema_String';
         else if (value === Number) return '_Schema_Number';
         else if (value === Boolean) return '_Schema_Boolean';
         else if (value === Date) return '_Schema_Date';
         else if (value === Buffer) return '_Schema_Buffer';
         else if (value === Array) return '_Schema_Array';
         else if (value === Map) return '_Schema_Map';

         if (value instanceof Function || typeof value == 'function') {
            fnBody = value.toString();

            if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
               return '_NuFrRa_' + fnBody;
            }
            return fnBody;
         }
         if (value instanceof RegExp) {
            return '_PxEgEr_' + value;
         }
         return value;
      });
   };

   exports.parse = function (str, date2obj) {

      const iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

      return JSON.parse(str, function (key, value) {
         let prefix;

         if (typeof value != 'string') {
            return value;
         }
         if (value.length < 8) {
            return value;
         }

         prefix = value.substring(0, 8);

         if (iso8061 && value.match(iso8061)) {
            return new Date(value);
         }
         if (prefix === 'function') {
            return eval('(' + value + ')');
         }
         if (prefix === '_PxEgEr_') {
            return eval(value.slice(8));
         }
         if (prefix === '_NuFrRa_') {
            return eval(value.slice(8));
         }
         if (prefix === '_Schema_') {
            if (value === '_Schema_String') return String;
            if (value === '_Schema_Number') return Number;
            if (value === '_Schema_Boolean') return Boolean;
            if (value === '_Schema_Date') return Date;
            if (value === '_Schema_Buffer') return Buffer;
            if (value === '_Schema_Array') return Array;
            if (value === '_Schema_Map') return Map;
         }

         return value;
      });
   };

   exports.clone = function (obj, date2obj) {
      return exports.parse(exports.stringify(obj), date2obj);
   };

}(typeof exports === 'undefined' ? (window.JSONfn = {}) : exports));