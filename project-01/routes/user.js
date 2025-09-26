const express = require("express");
const {handleGetAllUsers, getUserById, addUser, deleteUserById, updateUserById} = require('../controllers/user')

// as we are making seperate routes so we need router
const router = express.Router();

// Routes
router.get("/", handleGetAllUsers) // this is basically a controller

router.get("/:id", getUserById);

router.post("/", addUser);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUserById);


module.exports = router;