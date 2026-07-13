const express = require('express');
const router = express.Router();
const { sendEnquiry } = require('../controllers/contactController');

router.post('/', sendEnquiry);

module.exports = router;
