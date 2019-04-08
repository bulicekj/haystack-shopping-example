const tracer = require('../../tracer').default;
const SpanContext = require('haystack-client').SpanContext;

function contactCarsBackend(headers) {
    // Construct parent SpanContext from request headers
    const parent = new SpanContext(headers['x-trace-id'], headers['x-span-id'], headers['x-parent-id']);
    // Construct child span from the server
    const serverSpan1 = tracer
        .startSpan('/retrieve-cars', {
            childOf: parent,
            tags: {
                'span.kind': 'server',
                'http.method': 'GET',
                'custom.tag': 'car-search'
            }
        });

    // Dummy span to represent database call
    const serverSpan2 = tracer
        .startSpan('/call-cars-database', {
            childOf: serverSpan1,
            tags: {
                'span.kind': 'client',
                'http.method': 'GET',
                'custom.tag': 'car-search',
                'custom.tag2': 'calling database'
            }
        });

    // Send finished spans to agent
    serverSpan1.finish();
    serverSpan2.finish();

    // Stub data to be passed back to front end, along with traceId for linking to Haystack-UI
    return {
        cars: [{
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
            }],
        traceId: headers['x-trace-id']
    }
}

module.exports = contactCarsBackend;