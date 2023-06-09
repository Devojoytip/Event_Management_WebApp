const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');

const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn,
} = require('../middleware/validation/users');

router.get('/', homeController.home_fn);

// router.get('/profile', passport.authenticate('jwt', {session: false}), usersController.profile_fn);
router.get('/book-your-events', usersController.booking_fn);
router.get('/show-orders', usersController.orders_fn);
router.get('/profile', usersController.profile_fn);

router.get('/profile/:id', usersController.profile_fn2);

router.post('/update-profile/:id',  usersController.update_profile);

router.get('/sign-up',usersController.users_signup);

router.get('/login', usersController.users_login);

router.post('/create', validateUserSignUp, userValidation, usersController.create);

// router.post('/create-session',passport.authenticate(
//     'local',
//     {
//         failureRedirect: '/users/login'
//     },
// ), usersController.createSession);
// router.get('/create-session',passport.authenticate(
//     'local',
//     {failureRedirect: '/users/login'},
// ), usersController.createSession);

router.get('/logout',usersController.destroySession);

module.exports = router;