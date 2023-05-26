const express = require('express');
const router = express.Router();
const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn,
} = require('../../middleware/validation/users');

const usersAPI = require('../../controllers/api/users_api');

router.post('/create-session', validateUserSignIn, userValidation, usersAPI.createSession);

module.exports = router;