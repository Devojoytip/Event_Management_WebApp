const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('Router loaded !');

router.get('/', homeController.home_fn);

router.use('/users',require('./users'));

router.use('/events',require('./events'));
router.use('/admins',require('./admins'));
router.use('/managers',require('./managers'));

router.use('/update', require('./update'));

module.exports = router;