const Database = require("../../core/Database");

class APIController {
    get(req, res) {
        // console.log(req.params.id);

        console.log();

        res.write(JSON.stringify(Database.FindByRowId("users", req.params.id), null, 4));
    }
}

module.exports = APIController;