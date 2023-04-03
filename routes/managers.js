const express = require('express');
const router = express.Router();
const passport = require('passport');

const managerController = require('../controllers/manager_controller');
const homeController = require('../controllers/home_controller');

// router.get('/profile', passport.authenticate('jwt', {session: false}), managerController.profile_fn);
router.get('/', managerController.managers_login);
router.post('/events-update/:id', managerController.updateEvent);

// router.post('/create', managerController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/managers'},
), managerController.createSession);
// router.post('/create-session', managerController.createSession);

router.get('/logout',managerController.destroySession);

module.exports = router;