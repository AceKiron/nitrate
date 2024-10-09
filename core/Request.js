class Request {
    constructor(options) {
        this.url = (options || {}).url;
        this.headers = (options || {}).headers;
        this.method = (options || {}).method;
        this.params = {};
    }
}

module.exports = Request;