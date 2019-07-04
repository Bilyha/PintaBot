const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Bot = require("node-vk-bot-api");

const { port, token, groupId } = require("./config");

const app = new Koa();
const router = new Router();

const bot = new Bot({
  token: token,
  group_id: groupId
});

bot.on(ctx => {
  ctx.reply("Hello!");
});
// const bot = new Bot({
//   token: process.env.TOKEN
//   //   confirmation: process.env.CONFIRMATION
// });

router.post("/", bot.webhookCallback);

app.use(bodyParser);
app.use(router.routes());

app.listen(port);
