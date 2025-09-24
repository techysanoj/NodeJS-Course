// const fs = require("fs"); // built in fs module

// // fs.writeFileSync('./test.txt', 'Hey There!'); // write to a file, create the file test.txt if it doesn't exist
// // and it is synchronous method.
// // fs.writeFileSync('./test.txt', 'Hello World!'); // overwrite the file

// // what if we want to use non synchrnouse file?

// // fs.writeFile('./test.txt', 'Hello World! from asynchronous code', (err) => {}); // this is asynchronous method, it takes a callback function as third argument

// // difference? will cover next



// const result = fs.readFileSync("./contact.txt", "utf-8"); // read the file synchronously 
// // here readFileSync will block the code execution until the file is read completely and return the file content
// console.log(result); // will print the content of the file

// fs.readFile("./contact.txt", "utf-8", (err, result) => { // read the file asynchronously
//     if (err) {
//         console.log(err); // if there is an error, print the error
//         return; // return from the function
//     }
//     console.log(result); // if no error, print the content of the file
// }) // this is asynchronous method, it takes a callback function as third argument and does not return the result


// // append in the file
// fs.appendFileSync("./test.txt", `${new Date().toString()} \n`); // append the current date to the file synchronously

// // for copying the file
// fs.cpSync('./test.txt', './newTest.txt');

// // delete the file
// fs.unlinkSync('./newTest.txt');


// // getting metadata
// console.log(fs.statSync('./test.txt')); // will give the metadata of the file
// // and this statSync method also has some methods to check the type of the file, and much more

// // for creating a directory
// fs.mkdirSync('./myDoc', { }); // create a directory

// fs.mkdirSync('./myNew/a/b', {recursive: true}); // create a directory recursively


const fs = require("fs");
console.log('1');
// sync Blocking operation
const result = fs.readFileSync("./contact.txt", "utf-8"); // here a thread is blocked until the file is read completely
console.log(result);
console.log('2');

// so here the order of execution is 1, result, 2

// async non blocking operation
console.log('1');
// sync Blocking operation
fs.readFile("./contact.txt", "utf-8", (err, res) => {
    console.log(res);
}); // here a thread is blocked until the file is read completely
console.log('2');
// here order of execution is 1, 2, result non blocking request


// default thread size = 4
// if our cpu core size = 8 then maximum we can create thread are 8

const os = require('os');
console.log(os.cpus().length); // will give the number of cpu cores