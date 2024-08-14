class Request {
    constructor(options) {
        this.url = (options || {}).host;
        this.headers = (options || {}).headers;
        this.method = (options || {}).method;
    }
}

module.exports = Request;