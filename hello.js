//assigning a property called 'world' to an object called 'exports'. Such an 'exports' object is available 
//in every module, and it is returned whenever the require function is used to include the module. 

/*

Note, many node users are overwriting the exports object directly like so.

module.exports = function(){
	
}

This will directly cause the require function to return the assigned function. This is useful if you're doing object 
oriented programming where each file exports the constructor of one class 

*/

exports.world = function(){
	
	console.log('Hello World from a function');
} 