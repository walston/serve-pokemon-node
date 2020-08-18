const Koa = require("koa");
const Router = require("@koa/router");
// const Sqlite = require("sqlite3").verbose();

const app = new Koa();
const router = new Router();

const getTypeChartSql = `SELECT att.name, def.name, damage_factor FROM type_efficacy
    JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
        AS att ON type_efficacy.damage_type_id = att.type_id
    JOIN (SELECT * FROM type_names WHERE local_language_id = 9)
        AS def ON type_efficacy.target_type_id = def.type_id
    ;`;
router.get("/type-chart", async (ctx, next) => {
  return new Promise((resolve) => {
    return resolve(getTypeChartSql);
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
