const express = require('express');
const opentracing = require('opentracing');
const router = express.Router();

const tracer = require('../tracer').default;

router.get('/', function(req, res) {
    // Retrieve parent span information sent from http headers
    const parent = opentracing.SpanContext(req.headers['x-trace-id'], req.headers['x-span-id'], '');
    // Construct child span from the server
    const serverSpan = tracer
        .startSpan('/retrieve-flights', {
            childOf: parent,
            tags: {
                'span.kind': 'server',
                'http.method': 'GET',
                'custom.tag': 'flight-search'
            }
        });

    res.json([{
        id: 1,
        name: "Alaska"
    }, {
        id: 2,
        name: "Southwest"
    }, {
        id: 3,
        name: "United"
    }, {
        id: 4,
        name: "Delta"
    }]);

    serverSpan.finish();
});

module.exports = router;