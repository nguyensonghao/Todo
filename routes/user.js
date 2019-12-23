const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const UserMiddleware = require('../middlewares/auth.middleware');

router.get('/get-information', UserMiddleware.login, UserController.getInformation);
module.exports = router;