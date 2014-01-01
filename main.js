
var jsonfnObj = {
	firstName:"John", 
	lastName:"Dow",
	getFullName:function() {return this.firstName+" "+this.lastName},
	greetLambda:function(param) {
		var displayMessage = (function(msg1){  
			   return function(msg2){  
					return msg1 + msg2;
			   }     
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

function showStringObj(){
	alert(JSONfn.stringify(jsonfnObj));
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
			$('#rightpanel').empty().load('html/overview.html');
			break;
		
		case 'doc':
			$('#leftpanel').hide();
			$('#rightpanel').load('html/doc.html');
			break;
	
		case 'demo':
			$('#leftpanel').show().load('html/basic.html');
			$('#rightpanel').empty().load('html/demo.html');
			break;
			
		case 'clone':
			$('#leftpanel').show().load( 'html/obj2clone.html');
			$('#rightpanel').empty().load('html/test_embed.html');
			break;
			
	}

}
