const initTracer = require('haystack-client').initTracer;

const logger = function () {
    function Logger() {
    }
    Logger.prototype.debug = (message) => {
        console.log(message);
    };
    Logger.prototype.info = (message) => {
        console.log(message);
    };
    Logger.prototype.warn = (message) => {
        console.log(message);
    };
    Logger.prototype.error = (message) => {
        console.log(message);
    };
    return Logger;
}();

const config = {
    serviceName: 'shopping-backend',
    dispatcher: {
        type: 'haystack_agent',
        agentHost: 'haystack-agent',
        agentPort: 34000
    },
    logger: new logger
};

const tracer = initTracer(config);

exports.default = tracer;