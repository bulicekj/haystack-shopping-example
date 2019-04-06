const express = require('express');
const opentracing = require('opentracing');
const router = express.Router();

const tracer = require('../tracer').default;

router.get('/', function(req, res) {
    // Retrieve parent span information sent from http headers
    const parent = opentracing.SpanContext(req.headers['x-trace-id'], req.headers['x-span-id'], '');
    // Construct child span from the server
    const serverSpan = tracer
        .startSpan('/retrieve-cars', {
            childOf: parent,
            tags: {
                'span.kind': 'server',
                'http.method': 'GET',
                'custom.tag': 'car-search'
            }
        });

    res.json([{
        id: 1,
        name: "BMW"
    }, {
        id: 2,
        name: "Volkswagen"
    }, {
        id: 3,
        name: "Audi"
    }, {
        id: 4,
        name: "Toyota"
    }]);

    serverSpan.finish();
});

module.exports = router;