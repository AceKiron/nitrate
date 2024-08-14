const Router = require("../../core/Router");
const CoreRouter = require("../../core/routers/CoreRouter");

const IndexController = require("../controllers/IndexController");

class IndexRouter extends Router {
    constructor(prefixPath) {
        super(prefixPath, new IndexController());

        this.coreRouter = new CoreRouter();
    }

    get() {
        return [
            ...this.coreRouter.get(),
            
            [this.prefixPath + "/", ...this.middlewares, this.controller.index]
        ];
    }
}

module.exports = IndexRouter;