const fs = require('fs');

function logRequests(filename) {
    return (req, res, next) => {
        const now = new Date();
        fs.appendFile(filename, `\n Request: ${now}: Method: ${req.method}: Path: ${req.path}`, (err) => {
            if(err) {
                console.log("Error in writing log file", err);
            } else {
                console.log("Log file written successfully");
            }
        });
        next();
    }
}

module.exports = {logRequests}