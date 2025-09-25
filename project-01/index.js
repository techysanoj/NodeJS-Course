const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 8000;

// Route

const users = require("./MOCK_DATA.json")

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
app.get("/api/users", (req, res) => {
    return res.json(users);
})


// dynamic path parameters
// simply use :id means id is a variable and it is dynamic

app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find(user =>  user.id === parseInt(id));

    return res.json(user);
})

// this is the middleware
app.use(express.urlencoded({extended: false})); // to parse form data

// for post method using post
app.post("/api/users", (req, res) => {
    console.log("Post request received");
    // TO DO create new users
    const body = req.body; // it will show undefined because it do not know how to parse json data or form data
    // so for this we need to use middleware 
    console.log('Body is', body);

    const len = users.length;
    const newUser = {id: len + 1, ...body};
    users.push(newUser);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if(err) {
            console.log("Error in writing file", err);
        } else {
            console.log("File written successfully");
        }
        return res.json({status: "done", user: newUser});
    });
})


app.patch("/api/users/:id", (req, res) => {
    return res.json({status: "pending"});
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
