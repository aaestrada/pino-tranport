"use strict";
// see docs https://github.com/pinojs/pino/blob/master/docs/pretty.md *prod
// https://www.npmjs.com/package/pino-transmit-http/v/1.0.0-alpha.3
// see docs https://github.com/pinojs/pino-pretty *dev
const Hapi = require("@hapi/hapi");
const pino = require('pino');
const hapiPino = require('hapi-pino');

const getResponse = [
  { string: "string1", number: 1, boolean: true },
  { string: "string2", number: 2, boolean: false }
];

async function start() {

  // Create a server with a host and port
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    debug: false // disable Hapi debug console logging
  });

  // Add the route
  server.route({
    method: "GET",
    path: "/items",
    options: {
      log: { collect: true },
      cache: { expiresIn: 5000 },
      handler: async function (request, h) {
        try {
          // you can also use a pino instance, which will be faster
          request.logger.info('GET_items', getResponse)
          return h.response(getResponse);
        } catch (err) {
          console.log(err);
          return request.logger.error('GET_error', err)
        }
      }
    }
  });

  // const transport = pino.transport({
  //   pipeline: [
  //     {
  //         target: './my-transform.mjs'
  //     }, 
  //     {
  //         target: './to-file-transport.js',
  //         options: { 
  //           destination: 'logs/.logs.log'
  //         }
  //     }
  // ]
  // });
  
  await server.register({
    plugin: hapiPino,
    options: {
      transport: {
        targets: [
          {
            target: "pino-file.js",
            options: {
              destination: 1
            }
          }
        ]
      }
    }
  });

  await server.start();
  server.log(["SERVER_INFO"], `server running: ${server.info.uri}/items`);
  return server;
}

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
