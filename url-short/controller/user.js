const User = require("../models/user");
const {setUser, getUser} = require("../service/auth");

const{v4: uuidv4} = require('uuid');

async function handleUserSignUP(req, res) {
    const {name, email, password} = req.body;

    await User.create({name, email, password});

    return res.redirect("/login");
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({email, password});

    if(!user) {
        console.log('NO user found')
        return res.render("login", {
            error: "Invalid email or password"
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/");

}

module.exports = {handleUserSignUP, handleUserLogin}