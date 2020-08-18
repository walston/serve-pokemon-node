const Koa = require("koa");
const Router = require("@koa/router");
const database = require("./sql");

const app = new Koa();
const router = new Router();

router.get("/type-chart", async (ctx) => {
  return database.getTypechart().then((rows) => {
    ctx.response.statusCode = 200;
    ctx.response.body = rows;
  });
});

router.get("/", async (ctx) => {
  ctx.response.statusCode = 200;
  ctx.response.body = "Hi";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
