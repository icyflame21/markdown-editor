const express = require('express');
const { convertMarkdown, convertToRaw } = require('../controllers/markdownController');

const router = express.Router();

router.get('/convert', convertMarkdown);
router.get('/raw', convertToRaw);

module.exports = router;
