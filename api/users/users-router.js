const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// The middleware functions also need to be required
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get();
    console.log(users);
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({ message: "could not retrieve users" });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const User = await Users.getById(req.user.id);
    res.status(200).json(User);
  } catch(err) {
    res.status(500).json({ message: "Could not retrieve user" });
  }
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const {name} = req.body;
    const newUser = await Users.insert({name});
    res.status(201).json(newUser);
  } catch(err) {
    res.status(500).json({ message: "The user could not be created" });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const {name} = req.body;
    const updUser = await Users.update(req.user.id, {name});
    res.status(200).json(updUser);
  } catch(err) {
    res.status(500).json({ message: "The user could not be updated" });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const delUser = await Users.remove(req.user.id);
    res.json(delUser);
  } catch(err) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;