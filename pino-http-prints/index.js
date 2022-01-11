"use strict";
// https://github.com/pinojs/pino-http-print/issues/12
const Hapi = require("@hapi/hapi");
// Configure logging
const hapiPino = require('hapi-pino');
const printerFactory = require("pino-http-print");

const pino = require('pino');

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

  const printer = printerFactory({
    all: true,
    lax: true,
    relativeUrl: true,
    translateTime: "HH:MM:ss.l",
  }, {
    ignore: "req,pid,hostname",
  });
  
  await server.register({
    plugin: hapiPino,
    options: {
      logPayload: false,
      ignoredEventTags: { log: ['client'], request: '*' },
      instance: pino({}, printer) 
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
