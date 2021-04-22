const Hapi = require("@hapi/hapi");
const routes = require("./app/routes");

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.info(`Server running on ${server.info.uri}`);
};

init();
