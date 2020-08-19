const Koa = require("koa");
const Router = require("@koa/router");
const database = require("./sql");

const app = new Koa();
const rootRouter = new Router();

const typeRouter = new Router();

typeRouter.get("/", async (ctx) => {
  return database.getTypechart().then((rows) => {
    ctx.response.status = 200;
    ctx.response.body = rows;
  });
});

typeRouter.get("/target", async (ctx) => {
  const { type } = ctx.query;
  if (!type) {
    ctx.response.status = 400;
    ctx.response.body = "Please supply at 1 or 2 `?target=` query parameter(s)";
    return;
  }

  return database.getTypeWeaknesses(type).then((row) => {
    ctx.response.status = 200;
    ctx.response.body = row;
  });
});

rootRouter.get("/", async (ctx) => {
  ctx.response.statusCode = 200;
  ctx.response.body = "Hi";
});

rootRouter.use("/type", typeRouter.routes(), typeRouter.allowedMethods());
app.use(rootRouter.routes(), rootRouter.allowedMethods());
app.listen(3000);
