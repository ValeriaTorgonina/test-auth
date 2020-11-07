if (!('toJSON' in Error.prototype))
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            if (key !== 'stack') {
                alt[key] = this[key];
            }
        }, this);

        return alt;
    },
    configurable: true,
    writable: true
});

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

module.exports.Error404 = class Error404 extends HttpError {
    constructor(message) {
        super(404, message);
    }
}

module.exports.ForbiddenError = class Error404 extends HttpError {
    constructor(message) {
        super(403, message);
    }
}

module.exports.HttpError = HttpError;