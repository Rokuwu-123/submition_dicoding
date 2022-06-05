let hapi = require('@hapi/hapi');
require('dotenv').config();

let routes = require('./app/routes/routes');

let server_run = async()=>{
    const server_backend = hapi.server({
        port : Number(process.env.SERV_PORT),
        host : process.env.SERV_HOST
    });

    server_backend.route(routes);
    await server_backend.start();
    console.log(`Server berjalan pada htpp://${process.env.SERV_HOST}:${process.env.SERV_PORT}`);
}

server_run();