const express = require('express');
const fs = require('fs');
const app = express();

const mongoose = require("mongoose");

const PORT = 8000;

// Route

const users = require("./MOCK_DATA.json");


//Creating schemar and model
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {    
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    }
}, {timestamps: true}); // first its take what are the thing required in the schema then you can pass another argument also


const User = mongoose.model("User", userSchema); // name of the model, schema -> User here is collection name

// connecting to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').then(() => console.log("Connected to MongoDB"))
.catch((err) => {console.log("Error in connecting to MongoDB", err)});



// this is the middleware
app.use(express.urlencoded({extended: false})); // to parse form data

// we can create our own middleware next is basically pointing to the next middleware in the loop if there is any
// app.use((req, res, next) => {
//     console.log("Middleware called: Hello from middleware 1");

// }); // currently it is not doing anything because it is not calling next() nor sending the request nor sending the response.


// app.use((req, res, next) => {
//     console.log("Middleware called: Hello from middleware 1");
//     // return res.json({message: "Hello from middleware 1"}); // now this response will be send.
//     req.myUserName = "techysanoj"; // this will be available from now onwards on the other request object.
//     next(); // now it will call the next middleware in the loop
// });

// app.use((req, res, next) => {
//     console.log("Middleware called: Hello from middleware 2");
//     console.log('req', req.myUserName);
//     return res.json({message: "Hello from middleware 2"}); // now this response will be send.
//     // next(); // now it will call the next middleware in the loop
// });

// make a middleware which will simply log all the request coming to the server
app.use((req, res, next) => {
    const now = new Date();
    fs.appendFile('./log.txt', `\n Request: ${now}: Method: ${req.method}: Path: ${req.path}`, (err) => {
        if(err) {
            console.log("Error in writing log file", err);
        } else {
            console.log("Log file written successfully");
        }
    });
    next();
})


app.get("/users", (req, res) => {
    const html = 
    `   
    <div>
        <h1>Users</h1>
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    </div>
    `;
    res.send(html);
})


// Routes
app.get("/api/users", async (req, res) => {
    // res.setHeader("X-myHeader", "techysanoj"); // custom headers
    // return res.json(users);
    // using mongoose to send the user list
    const allDBusers = await User.find(); // it will return a promise so we need to use async await
    return res.status(200).json(allDBusers);
})


// dynamic path parameters
// simply use :id means id is a variable and it is dynamic

app.get("/api/users/:id", async (req, res) => {
    // const id = req.params.id;
    // const user = users.find(user =>  user.id === parseInt(id));
    // if(!user) {
    //     return res.status(404).json({error: "User not found"});
    // }
    // return res.json(user);
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({error: "User not found"});
    }
    return res.status(200).json(user);
})

// for post method using post
// firstly create the method async
app.post("/api/users", async (req, res) => {
    console.log("Post request received");
    // TO DO create new users
    const body = req.body; // it will show undefined because it do not know how to parse json data or form data
    // so for this we need to use middleware 
    // console.log('Body is', body);

    if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({error:"Please provide all the details"});
    }

    // const len = users.length;
    // const newUser = {id: len + 1, ...body};
    // users.push(newUser);
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     if(err) {
    //         console.log("Error in writing file", err);
    //     } else {
    //         console.log("File written successfully");
    //     }
    //     return res.status(201).json({status: "done", user: newUser});
    // });

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        email: body.email,
        job_title: body.job_title
    });
    console.log("Result is", result);
    return res.status(201).json({status: "done", user: result});

})  


app.patch("/api/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {last_name: "Changed"});
    return res.json({status: "done"});
})

app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
  
    // Read file async
    fs.readFile("./MOCK_DATA.json", "utf8", (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        return res.status(500).json({ error: "Error reading file" });
      }
  
      let jsonData = JSON.parse(data);
  
      // Find user
      const userData = jsonData.find(user => user.id === id);
  
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Filter out user
      const newJSON = jsonData.filter(user => user.id !== id);
  
      // Write back file
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(newJSON, null, 2), (err) => {
        if (err) {
          console.log("Error writing file", err);
          return res.status(500).json({ error: "Error writing file" });
        }
  
        console.log("File written successfully");
        return res.json({ status: "done", user: userData });
      });
    });
  });
  

// now as these id routes are same route so we can merge them
// app.route("/api/users/:id")
// app.route("/api/users/:id").get((req, res) => {
//     const id = req.params.id;
//     const user = users.find(user =>  user.id === parseInt(id));

//     return res.json(user);
// }).patch((req, res) => {
//     return res.json({status: "pending"});
// }).delete( (req, res) => {
//     return res.json({status: "pending"});
// });

app.listen(PORT, () => {console.log("App is running on port " + PORT)});
