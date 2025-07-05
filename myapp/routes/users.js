const router = require('express').Router();

// GET /users
router.get('/', (req, res) => res.send('User list'));

// POST /users
router.post('/', (req, res) => res.send('Create user'));

// GET /users/:userId
router.get('/:userId', (req, res) => 
  res.send(`User ID: ${req.params.userId}`)
);

module.exports = router;