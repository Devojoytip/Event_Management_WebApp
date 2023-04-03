const express = require('express');

const router = express.Router();
const events_controller = require("../controllers/events_controller");

router.post('/:id', events_controller.updateEvent);

module.exports = router;