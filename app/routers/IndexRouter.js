const Router = require("../../core/Router");
const CoreRouter = require("../../core/routers/CoreRouter");

const IndexController = require("../controllers/IndexController");

const APIRouter = require("./APIRouter");

class IndexRouter extends Router {
    constructor(prefixPath) {
        super(prefixPath, new IndexController());

        this.coreRouter = new CoreRouter();
        this.apiRouter = new APIRouter("/api");
    }

    get() {
        return [
            ...this.coreRouter.get(),
            ...this.apiRouter.get(),
            
            [this.prefixPath + "/", ...this.middlewares, this.controller.index]
        ];
    }
}

module.exports = IndexRouter;