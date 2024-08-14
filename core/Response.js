const nunjucks = require("nunjucks");

class Response {
    constructor(raw) {
        this._raw = raw;
        
        this.text = "";
        
        this.headers = {
            "Content-Type": "text/plain"
        };

        this.statusCode = 200;
        
        this.isHTML = false;
    }

    status(code) {
        this.statusCode = code;
    }

    header(key, value) {
        if (value === undefined) return this.headers[key];
        this.headers[key] = value;
    }

    write(text) {
        this.text += text;
    }

    render(view, parameters) {
        this.header("Content-Type", "text/html");

        this.text = nunjucks.render(view + ".njk", parameters);
    }

    end() {
        this._raw.writeHead(this.statusCode, undefined, {
            "Content-Length": Buffer.byteLength(this.text),
            ...this.headers
        });
        
        this._raw.end(this.text);
    }
}

module.exports = Response;