const Router = require("../../core/Router");

const APIController = require("../controllers/APIController");

class IndexRouter extends Router {
    constructor(prefixPath) {
        super(prefixPath, new APIController());

        this.middlewares.push((req, res, next) => {
            console.log(req);
            next(true);
        });
    }

    get() {
        return [
            [this.prefixPath + "/{id:number}", ...this.middlewares, this.controller.get]
        ];
    }
}

module.exports = IndexRouter;