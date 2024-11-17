const express = require('express');
const router = express.Router();
const questionController = require('../Controllers/questionController');

router.post('/solve', questionController.solveQuestion);

module.exports = router;