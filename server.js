const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cors"), {
  origin: true, // Option for all origins
});

fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "fastify-api" },
  },
});

fastify.register(require("./routes/articlesRoutes"));

const PORT = 3007;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
