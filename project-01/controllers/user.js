const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDBusers = await User.find(); 
    console.log("All users from DB", allDBusers);
    return res.status(200).json(allDBusers);
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({error: "User not found"});
    }
    return res.status(200).json(user);
}

async function addUser(req, res) {
    console.log("Post request received");
    const body = req.body; 

    if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({error:"Please provide all the details"});
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        email: body.email,
        job_title: body.job_title
    });
    console.log("Result is", result);
    return res.status(201).json({status: "done", user: result});
}

async function deleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) {
        return res.status(404).json({error: "User not found"});
    }

    return res.status(200).json({status: "User deleted successfully"});
}

async function updateUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, {last_name: "Changed"});
    return res.json({status: "done"});
}

module.exports = {handleGetAllUsers, getUserById, addUser, deleteUserById, updateUserById}
