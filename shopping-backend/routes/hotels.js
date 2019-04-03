const express = require('express');
const opentracing = require('opentracing');
const router = express.Router();

const tracer = require('../tracer').default;

router.get('/', function(req, res, next) {
    const serverSpan = tracer
        .startSpan('/hotels', {
            childOf: tracer.extract(opentracing.FORMAT_HTTP_HEADERS, {
                'X-Trace-ID': req.params.traceId,
                'X-Span-ID': req.params.spanId,
                'X-Parent-ID': req.params.parentSpanId
            }),
            tags: {
                'span.kind': 'server',
                'http.method': 'GET'
            }
        });

    res.json([{
        id: 1,
        name: "Four Seasons"
    }, {
        id: 2,
        name: "Ritz Carlton"
    }, {
        id: 3,
        name: "Marriott"
    }, {
        id: 4,
        name: "Holiday Inn"
    }]);

    serverSpan.finish();
});

module.exports = router;