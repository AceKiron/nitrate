const Application = require("./Application");
const Server = require("./Server");

const app = new Application();

app.listen((server) => {
    console.log(`Listening on http://localhost:${server.port}`);
});