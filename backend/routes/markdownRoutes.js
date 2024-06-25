const express = require('express');
const { convertMarkdown } = require('../controllers/markdownController');

const router = express.Router();

router.get('/convert', convertMarkdown);

module.exports = router;
