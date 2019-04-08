const tracer = require('../../tracer').default;
const SpanContext = require('haystack-client').SpanContext;
const opentracing = require('opentracing');

function contactHotelsBackend(headers) {
    // Construct parent SpanContext from request headers
    const parent = new SpanContext(headers['x-trace-id'], headers['x-span-id'], headers['x-parent-id']);
    // Construct child span from the server
    const serverSpan1 = tracer
        .startSpan('/retrieve-hotels', {
            childOf: parent,
            tags: {
                'span.kind': 'server',
                'http.method': 'GET',
                'custom.tag': 'hotel-search'
            }
        });

    // Dummy span to represent database call
    const serverSpan2 = tracer
        .startSpan('/call-hotels-database', {
            childOf: serverSpan1,
            tags: {
                'span.kind': 'client',
                'http.method': 'GET',
                'custom.tag': 'hotel-search',
                'custom.tag2': 'calling database'
            }
        });

    // Randomly set errors 10% of the time
    Math.floor(Math.random() * 10) === 0 && serverSpan1.setTag(opentracing.Tags.ERROR, true);
    Math.floor(Math.random() * 10) === 0 && serverSpan2.setTag(opentracing.Tags.ERROR, true);

    // Send finished spans to agent
    const dummyDuration = Math.floor(Math.random() * 1000);
    setTimeout(() => {serverSpan2.finish()}, dummyDuration);
    setTimeout(() => {serverSpan1.finish()}, dummyDuration + 100);

    // Stub data to be passed back to front end, along with traceId for linking to Haystack-UI
    return {
        hotels: [{
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
            }],
        traceId: headers['x-trace-id']
    }
}

module.exports = contactHotelsBackend;