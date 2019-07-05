const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const PintaBot = require("./bot");

const { port, token, groupId, confirmation } = require("./config");

const app = new Koa();
const router = new Router();
const pintaBot = new PintaBot(token, groupId, confirmation);

pintaBot.setupBot();
pintaBot.runBot();
pintaBot.sendMessageToUser([102036098, 64081057], "Hello Ilya!");

router.get("/", async ctx => {
  ctx.set("Cache-Control", "no-cache");
  ctx.body = { status: "OK" };
});
router.post("/", async ctx => {
  ctx.body = confirmation;
});

app.use(bodyParser());
app.use(router.routes());

app.listen(port);
