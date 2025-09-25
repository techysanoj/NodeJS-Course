// main file should be named with index.js
// because it is a main file which a programmer starts looking for

const http = require("http"); // importing built in http module

const fs = require("fs");

const url = require("url"); // importing downloaded url module

const myServer = http.createServer((req, res) => {
    // console.log('New Request recieved: ');
    // console.log("Request: ", req);
    if(req.url === '/favicon.ico') {
        res.end(); // to end the response
        return; // to exit the function
    }
    // const log = `${Date.now()}: - ${req.url} New request received \n`;
    const log = `${Date.now()}: - ${req.url} Method is - ${req.method} New request received \n`; 
    // by default it is get request

    const myUrl = url.parse(req.url, true); // true to get complete url object

    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
        // res.end("Hello from server \n Logged successfully");
        switch(myUrl.pathname) { // changed accordingly
            case '/': 
                if(req.method === 'GET') {
                    res.end("GET Request on Home page");
                }
                break
            case '/about': 
                // console.log(myUrl.query); // to get the query parameters
                const name = myUrl.query.myname || "Guest"; // to get the name from query parameters
                res.end(`Hello ${name}, Welcome to About us page`);
                break
            case '/signup':
                    if(req.method === 'GET') {
                        res.end("This is a sign up form");
                    }
                    else if(req.method === 'POST') {
                        res.end("Form Submitted successfully");
                    }
            default: res.end("404 Page Not Found");
        }

    })
}); // creating a server and it takes a callback function reqest listener

// to run this server we will use listen method on some port

myServer.listen(8000, () => console.log("Server is running on port 8000")); // listen method takes a port number and a callback function which will be called when the server starts listening on the port

// if we have changed anything then you need to restart the server again using ctrl + c to exit the server and then run the server

// always try to do non blocking task because it may block the threadpool