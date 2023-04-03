const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');
const homeController = require('../controllers/home_controller');
const events_controller = require("../controllers/events_controller");


// router.get('/', homeController.home_fn);

// router.get('/profile', passport.authenticate('jwt', {session: false}), adminController.profile_fn);
// router.get('/book-your-events', adminController.booking_fn);
// router.get('/profile', adminController.profile_fn);

// router.get('/profile/:id', adminController.profile_fn2);

// router.post('/update-profile/:id',  adminController.update_profile);

// router.get('/sign-up', adminController.users_signup);

// router.get('/login', adminController.users_login);

// router.get('/admin-login', adminController.admin_login);
router.get('/', adminController.admins_login);
router.post('/events-update/:id', adminController.updateEvent);
router.post('/create-manager', adminController.createManager);

// router.post('/create', adminController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/admins'},
), adminController.createSession);
// router.post('/create-session', adminController.createSession);

router.get('/logout',adminController.destroySession);

module.exports = router;