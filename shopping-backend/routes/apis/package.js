const tracer = require('../../tracer').default;
const SpanContext = require('haystack-client').SpanContext;
const contactCarsBackend = require('./cars');
const contactHotelsBackend = require('./hotels');
const contactFlightsBackend = require('./flights');

function contactPackageBackend(headers) {
    // Construct parent SpanContext from request headers
    const parent = new SpanContext(headers['x-trace-id'], headers['x-span-id'], headers['x-parent-id']);
    // Construct child span from the server
    const serverSpan1 = tracer
        .startSpan('/retrieve-packages', {
            childOf: parent,
            tags: {
                'span.kind': 'server',
                'http.method': 'GET',
                'custom.tag': 'package-search'
            }
        });

    // Dummy span to represent database call
    const serverSpan2 = tracer
        .startSpan('/call-other-services', {
            childOf: serverSpan1,
            tags: {
                'span.kind': 'client',
                'http.method': 'GET',
                'custom.tag': 'package-search',
                'custom.tag2': 'calling database'
            }
        });

    const childHeaders = {'x-trace-id': serverSpan2._spanContext.traceId, 'x-span-id': serverSpan2._spanContext.spanId, 'x-parent-id': serverSpan2._spanContext.parentSpanId};

    const cars = contactCarsBackend(childHeaders).cars;
    const hotels = contactHotelsBackend(childHeaders).hotels;
    const flights = contactFlightsBackend(childHeaders).flights;

    // Send finished spans to agent
    const dummyDuration = Math.floor(Math.random() * 1000);
    setTimeout(() => {serverSpan2.finish()}, dummyDuration);
    setTimeout(() => {serverSpan1.finish()}, dummyDuration + 100);

    // Stub data to be passed back to front end, along with traceId for linking to Haystack-UI
    const packages = cars.map((car, index) => {
        return {car: car.name, flight: flights[index].name, hotel: hotels[index].name}
    });

    return {
        packages,
        traceId: headers['x-trace-id']
    }
}

module.exports = contactPackageBackend;