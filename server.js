const Koa = require("koa");
const Router = require("@koa/router");
// const Sqlite = require("sqlite3").verbose();
const QUERIES = require("./sql");

const app = new Koa();
const router = new Router();

router.get("/type-chart", async (ctx, next) => {
  return new Promise((resolve) => {
    return resolve(QUERIES.GET_EFFECTIVENESS_CHART);
  }).then((rows) => {
    ctx.response.statusCode = 200;
    ctx.response.body = rows;
    next();
  });
});

router.get("/", async (ctx) => {
  ctx.response.statusCode = 200;
  ctx.response.body = "Hi";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
