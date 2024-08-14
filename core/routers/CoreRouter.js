const Router = require("../Router");

const CoreController = require("../controllers/CoreController");

class CoreRouter extends Router {
    constructor() {
        super("", new CoreController());
    }

    get() {
        return [
            ["/bundle.js", this.controller.bundleJs],
            ["/bundle.css", this.controller.bundleCss]
        ]
    }
}

module.exports = CoreRouter;