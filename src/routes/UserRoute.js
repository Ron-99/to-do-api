const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../services/Auth');

router.get('/', Auth.authorize ,UserController.index);
router.get('/:id', Auth.authorize , UserController.index);
router.post('/', Auth.authorize , UserController.store);
router.post('/login', UserController.login)
router.put('/:id', Auth.authorize , UserController.update);
router.delete('/:id', Auth.authorize, UserController.delete);

module.exports = router;