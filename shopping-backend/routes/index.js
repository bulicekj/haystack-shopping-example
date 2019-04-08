const express = require('express');
const router = express.Router();

const contactCarsBackend = require('./apis/cars');
const contactHotelsBackend = require('./apis/hotels');
const contactFlightsBackend = require('./apis/flights');
const contactPackageBackend = require('./apis/package');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/cars', (req, res) => {
  res.json(contactCarsBackend(req.headers));
});

router.get('/api/hotels', (req, res) => {
  res.json(contactHotelsBackend(req.headers));
});

router.get('/api/flights', (req, res) => {
  res.json(contactFlightsBackend(req.headers));
});

router.get('/api/package', (req, res) => {
  res.json(contactPackageBackend(req.headers))
});

module.exports = router;
