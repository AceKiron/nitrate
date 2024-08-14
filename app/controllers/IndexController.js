class IndexController {
    index(req, res) {
        res.render("homepage", {
            nitrate_version: "1.0.0"
        });
    }
}

module.exports = IndexController;