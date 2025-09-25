// main file should be named with index.js
// because it is a main file which a programmer starts looking for

const http = require("http"); // importing built in http module

const fs = require("fs");

const myServer = http.createServer((req, res) => {
    // console.log('New Request recieved: ');
    // console.log("Request: ", req);
    const log = `${Date.now()}: - ${req.url} New request received \n`;
    fs.appendFile("log.txt", log, (err, data) => {
        // res.end("Hello from server \n Logged successfully");
        switch(req.url) {
            case '/': res.end("Homepage");
            break
            case '/about': res.end("techysanoj");
            break
            default: res.end("404 Page Not Found");
        }

    })
}); // creating a server and it takes a callback function reqest listener

// to run this server we will use listen method on some port

myServer.listen(8000, () => console.log("Server is running on port 8000")); // listen method takes a port number and a callback function which will be called when the server starts listening on the port

// if we have changed anything then you need to restart the server again using ctrl + c to exit the server and then run the server

// always try to do non blocking task because it may block the threadpool