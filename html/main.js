"use strict";

var jsonfnObj = {
  firstName: "John",
  lastName: "Dow",
  today: new Date(),
  re: /(\w+)\s(\w+)/,
  getFullName: function() {return this.firstName + " " + this.lastName;},
  greetLambda: function(param) {
    var displayMessage = (function(msg1){  
         return function(msg2){  
          return msg1 + msg2;
         };     
    }(param));
    return displayMessage("Lambda World!");
  }
};

function showFirstName(){
  var str = JSONfn.stringify(jsonfnObj);
  var objfn = JSONfn.parse(str);
  alert(objfn.firstName);
}

function showFullName(){
  var str = JSONfn.stringify(jsonfnObj);
  var objfn = JSONfn.parse(str);
  alert(objfn.getFullName());
}

function showLambdaGreeting(){
  var str = JSONfn.stringify(jsonfnObj);
  var objfn = JSONfn.parse(str);
  alert(objfn.greetLambda('Hello '));
}

function testRegexp(){
  var str = JSONfn.stringify(jsonfnObj);
  var objfn = JSONfn.parse(str);
  var name = objfn.getFullName();
  alert(name.replace(objfn.re, "$2, $1"));
}

function testDate(){
  var str = JSONfn.stringify(jsonfnObj);
  var objfn = JSONfn.parse(str,true);
  alert(objfn.today instanceof Date);
}

function showStringObj(){
  alert(JSONfn.stringify(jsonfnObj));
}



function showFirstNameClone(){
  var objfn = JSONfn.clone(jsonfnObj);
  alert(objfn.firstName);
}

function showFullNameClone(){
  var objfn = JSONfn.clone(jsonfnObj);
  alert(objfn.getFullName());
}

function showLambdaGreetingClone(){
  var objfn = JSONfn.clone(jsonfnObj);
  alert(objfn.greetLambda('Hello '));
}

function testRegexpClone(){
  var objfn = JSONfn.clone(jsonfnObj);
  var name = objfn.getFullName();
  alert(name.replace(objfn.re, "$2, $1"));
}

function testDateClone(){
  var objfn = JSONfn.clone(jsonfnObj, true);
  alert(objfn.today instanceof Date);
}


$(document).ready(function()
{
  $('#leftpanel').hide();
  $('#rightpanel').empty().load('html/overview.html');
 
});

function loadTemplate(name)
{
  switch(name) {

    case 'overview':
      $('#leftpanel').hide();
      $('#rightpanel').empty().load('html/overview.html',function(){Rainbow.color();});
      break;
    
    case 'doc':
      $('#leftpanel').hide();
      $('#rightpanel').load('html/doc.html',function(){Rainbow.color();});
      break;
  
    case 'demo':
      $('#leftpanel').show().load('html/basic.html',function(){Rainbow.color();});
      $('#rightpanel').empty().load('html/demo.html',function(){Rainbow.color();});
      break;
      
    case 'demo_parse':
      $('#leftpanel').show().load('html/basic.html',function(){Rainbow.color();});
      $('#rightpanel').empty().load('html/demo_parse.html',function(){Rainbow.color();});
      break;
      
    case 'clone':
      $('#leftpanel').show().load( 'html/basic.html',function(){Rainbow.color();});
      $('#rightpanel').empty().load('html/demo_clone.html',function(){Rainbow.color();});
      break;
      
  }

}
