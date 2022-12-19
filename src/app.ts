import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";

const server = Fastify();

server.get("/health", async () => {
  return { status: "OK" };
});

const main = async () => {
  server.register(userRoutes, {prefix:'api/users'});

  try {
    await server.listen({ port: 3000 });

    console.log("server ready at port 3000");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
