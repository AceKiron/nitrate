const fs = require("fs");
const path = require("path");

const publicDirectory = path.join(__dirname, "../../public");

const _bundleJs = fs.existsSync(path.join(publicDirectory, "bundle.js")) ? fs.readFileSync(path.join(publicDirectory, "bundle.js")) : "";
const _bundleCss = fs.existsSync(path.join(publicDirectory, "bundle.css")) ? fs.readFileSync(path.join(publicDirectory, "bundle.css")) : "";

class CoreController {
    bundleJs(req, res) {
        res.write(_bundleJs);
        res.header("Content-Type", "text/javascript");
    }

    bundleCss(req, res) {
        res.write(_bundleCss);
        res.header("Content-Type", "text/css");
    }
}

module.exports = CoreController;