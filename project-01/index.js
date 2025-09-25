const express = require('express');

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


// for post method using post
app.post("/api/users", (req, res) => {
    console.log("Post request received");
    // TO DO create new users
    return res.json({status: "pending"});
})


app.patch("/api/users/:id", (req, res) => {
    return res.json({status: "pending"});
})

app.delete("/api/users/:id", (req, res) => {
    return res.json({status: "pending"});
})

// now as these id routes are same route so we can merge them
// app.route("/api/users/:id")
app.route("/api/users/:id").get((req, res) => {
    const id = req.params.id;
    const user = users.find(user =>  user.id === parseInt(id));

    return res.json(user);
}).patch((req, res) => {
    return res.json({status: "pending"});
}).delete( (req, res) => {
    return res.json({status: "pending"});
});

app.listen(PORT, () => {console.log("App is running on port " + PORT)});