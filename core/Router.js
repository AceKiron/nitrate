class Router {
    constructor(prefixPath, controller) {
        this.prefixPath = prefixPath;
        this.controller = controller;
        this.middlewares = [];
    }

    get() {
        return [];
    }

    post() {
        return [];
    }
}

module.exports = Router;