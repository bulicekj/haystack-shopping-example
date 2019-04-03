const express = require('express');
const router = express.Router();
const tracer = require('../tracer').default;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
