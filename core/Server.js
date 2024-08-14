const http = require("http");
const fs = require("fs");
const path = require("path");

const Request = require("./Request");
const Response = require("./Response");

class Server {
    constructor(options) {
        this.port = (options || {}).port === undefined ? 8080 : options.port;
    }

    listen(callback, indexRouter) {
        const routes = {
            GET: indexRouter.get(),
            POST: indexRouter.post()
        }

        http.createServer(async function(req, res) {
            const myRequest = new Request({
                url: req.url,
                headers: req.headers,
                method: req.method
            });
            const myResponse = new Response(res);

            let found = false;

            for (const [route, ...handlers] of routes[req.method] || []) {
                if (req.url == route) {
                    found = true;
                    for (let i = 0; i < handlers.length; i++) {
                        const useNextHandler = await new Promise(async (resolve, reject) => {
                            if (handlers[i].length === 3) {
                                await handlers[i](myRequest, myResponse, resolve);
                            } else {
                                await handlers[i](myRequest, myResponse);
                                resolve(false);
                            }
                        });
                        if (!useNextHandler) break;
                    }
                }
            }

            if (!found) {
                myResponse.status(404);
                myResponse.render("errors/404");
            }

            myResponse.end();
        }).listen(this.port, (err) => {
            if (err) throw err;
            callback(this);
        });
    }
}

module.exports = Server;
module.exports.defaultServer = new Server();