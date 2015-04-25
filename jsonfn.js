/**
 * JSONfn - javascript (both node.js and browser) plugin to stringify,
 *          parse and clone objects with Functions, Regexp and Date.
 *
 * Version - 0.60.00
 * Copyright (c) 2012 - 2014 Vadim Kiryukhin
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

"use strict";

(function (exports) {



    exports.stringify = function(obj) {

        //Original Stringify
        var partialStringify = function (obj) {

            return JSON.stringify(obj, function (key, value) {

                if (value instanceof Function || typeof value == 'function') {
                    return value.toString();
                }
                if (value instanceof RegExp) {
                    return '_PxEgEr_' + value;
                }
                return value;
            });
        };

        //Calculate normal return
        var normal = partialStringify(obj);
        //Stringify prototype
        var proto = obj.__proto__? this.stringify(obj.__proto__): "";

        //If prototype was not {} empty
        if( proto.length > 2 ) {
            //Slide the brackets and put a coma in between
            return normal.slice(0,-1) + ', "__proto__" : ' + proto + '}';
        } else {
            return normal;
        }

    };

    exports.parse = function (str, date2obj) {

        var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

        var obj = JSON.parse(str, function (key, value) {
            var prefix;

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

            return value;
        });

        if( obj.__proto__ ) {
            var n = obj.__proto__;
            delete obj.__proto__;

            obj.__proto__ = n;
        }

        return obj;
    };

    exports.clone = function (obj, date2obj) {
        return exports.parse(exports.stringify(obj), date2obj);
    };

}(typeof exports === 'undefined' ? (window.JSONfn = {}) : exports));


