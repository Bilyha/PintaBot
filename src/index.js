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
  console.log("RESPONSE!");

  ctx.reply("Hello!");
});

bot.startPolling(() => {
  console.log("Bot Started!");
});
// const bot = new Bot({
//   token: process.env.TOKEN
//   //   confirmation: process.env.CONFIRMATION
// });

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
