const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Bot = require("node-vk-bot-api");

const { port, token, groupId, confirmation } = require("./config");

const app = new Koa();
const router = new Router();

const bot = new Bot({
  token: token,
  group_id: groupId,
  confirmation: confirmation
});

bot.on(ctx => {
  ctx.reply("Hello!");
});
// const bot = new Bot({
//   token: process.env.TOKEN
//   //   confirmation: process.env.CONFIRMATION
// });

router.get("/", async ctx => {
  ctx.set("Cache-Control", "no-cache");
  ctx.body = { status: "OK" };
});
router.post("/", bot.webhookCallback);

app.use(bodyParser());
app.use(router.routes());
console.log(port);

app.listen(port);
