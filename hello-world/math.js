// function add(a, b) {
//     return a + b;
// }

// in this module all the math related function will be there

// to make this object public we need to export it

// module.exports =  "techysanoj"; // it will export the file as this string means who ever make the object of this file 
// it will get the techysanoj when do the console.log

// function subtract(a, b) {
//     return a - b;
// }


// module.exports = {add, subtract}; // it will export the file as this object means who ever make the object of this file
// it will get the object with add function when do the console.log
// also this exports line overwrite the above techysanoj export

// we can also like this 
// module.exports = {
//     addFun: add,
//     subFun: subtract
// }


// one more way to export is like this
exports.add = (a, b) => a + b;
exports.sub = (a,b) => a - b; // but not a good way to do this because it is kind of anonymous function

// module.export can only be used once