	
	var obj = {
		firstName:"John", 
		lastName:"Dow",
		getFullName:function() {
			return this.firstName+" "+this.lastName;
		},
		greetLambda:function(param) {
			var displayMessage = (function(msg1){  
				return function(msg2){  
					return msg1 + msg2;
			   }     
			}(param));
			return displayMessage("Lambda World!");
		}
	},
	JSONfn = require('../jsonfn'),
	strfn,
	objfn,
	objClone;
 	
	function printTestResult(strfn, objfn, title){

		console.log('\n================================'+title+'==============================================\n');

		console.log('\n/*------- stringified obgect: -------*/\n\n' + strfn + '\n');

		console.log('\n/*------- First Name: -------*/\n\n' + objfn.firstName + '\n');
		console.log('\n/*------- Full name: -------------*/\n\n' + objfn.getFullName()  + '\n');
		console.log('\n/*------- Lambda Greeting: -------*/\n\n' + objfn.greetLambda('Hello ') + '\n');
		console.log('\n===============================================================================\n');
	}

	strfn = JSONfn.stringify(obj),
	objfn = JSONfn.parse(strfn);
	
	printTestResult(strfn, objfn, 'Testing Original Object');
	
	console.log('\n/*------- Clonning Obgect . . . -------*/\n\n');
	objClone = JSONfn.clone(obj);
	console.log('\n/*------- Done with clonning -------*/\n\n');
	
	strfn = JSONfn.stringify(objClone),
	objfn = JSONfn.parse(strfn);
	
	printTestResult(strfn, objfn, 'Testing Clonned Object');





