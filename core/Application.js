const nunjucks = require("nunjucks");

const Server = require("./Server");

class Application {
    constructor(options) {
        this.server = (options || {}).server || Server.defaultServer;
        this.indexRouter = (options || {}).indexRouter || new (require("../app/routers/IndexRouter"))("");
        
        nunjucks.configure((options || {}).nunjucksPath || "views", (options || {}).nunjucksOptions || {
            autoescape: true,
            trimBlocks: true,
            watch: true
        });
    }

    listen(callback) {
        this.server.listen(callback, this.indexRouter);
    }
}

module.exports = Application;