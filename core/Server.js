const http = require("http");

const Request = require("./Request");
const Response = require("./Response");

function turnIntoRegExpRoute(route) {
    return route
        .replaceAll("/", "\\/")
        .replaceAll(".", "\\.")
        .replaceAll(/\{[^:]+\:number\}/g, "\\d+")
        .replaceAll(/\{[^:]+\:string\}/g, ".*")
    ;
}

class Server {
    constructor(options) {
        this.port = (options || {}).port === undefined ? 8080 : options.port;
    }

    listen(callback, indexRouter) {
        const routes = {
            GET: indexRouter.get().map((route) => [route[0], new RegExp(`^${turnIntoRegExpRoute(route[0])}$`), ...route.slice(1)]),
            POST: indexRouter.post().map((route) => [route[0], new RegExp(`^${turnIntoRegExpRoute(route[0])}$`), ...route.slice(1)])
        };

        http.createServer(async function(req, res) {
            const myRequest = new Request({
                url: req.url,
                headers: req.headers,
                method: req.method
            });
            const myResponse = new Response(res);

            let found = false;

            for (let [route, routeRegex, ...handlers] of routes[req.method] || []) {
                const match = req.url.match(routeRegex);
                if (match) {
                    const occurances = route.split("{").length - 1;
                    for (let i = 0; i < occurances; i++) {
                        const index0 = route.indexOf("{");
                        const index1 = route.indexOf("}");
                        const index2 = index0 + req.url.slice(index0).match(new RegExp(`${turnIntoRegExpRoute(route.slice(index1 + 1))}$`)).index;

                        const [key, type] = route.slice(index0 + 1, index1).split(":");
                        const value = req.url.slice(index0, index2);

                        if (type === "string") {
                            myRequest.params[key] = value.toString();
                        } else if (type === "number") {
                            myRequest.params[key] = Number.parseInt(value);
                        }

                        route = route.slice(index1 + 1);
                        req.url = req.url.slice(index2);
                    }

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

                    break;
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