// you can run this in terminal using node hello.js
// console.log("hey there i am js"); 

// you can run this in browser console as well

// this will give error in terminal
// console.log(window); 
// problem is that DOM or Window related elements are not available in node environment


// we need to do npm init -y
// it will create the package.json file
// package.json file contains metadata about the project
// we can change the name and version in package.json file and add scripts like we create start script


// we can import other modules function or anything in this main file

// const math = require("math"); -- if we write like this node will find the math in its installed package

const math = require("./math");
const {add, sub} = require("./math"); // we can also import like this using this
console.log("math value is ", math);
// console.log("using add function from math module", math.addFun(4,3));
console.log("using add function from math module", add(4,3));
// console.log("using add function from math module", math.subFun(1000,3));
console.log("using add function from math module", sub(1000,3));


// overall require fuction needs a path from which we can import the module from that file.


// there are multiple modules present in the node
const math = require("http"); // like this http modules
// like fs etc

// if we give ./{module_name} then this will search in our directory else it will serach in node modules

