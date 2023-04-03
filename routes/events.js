const express = require('express');

const router = express.Router();
const events_controller = require("../controllers/events_controller");

router.get('/marriage',  events_controller.marriage);
router.get('/birthday',  events_controller.birthday);
router.get('/new-year',  events_controller.newYear);
router.get('/anniversary',  events_controller.anniversary);
// router.post('/register-marriage', events_controller.regMarriage);
router.post('/register-event', events_controller.regEvent);

router.post('/update/:id', events_controller.updateEvent);

module.exports = router;