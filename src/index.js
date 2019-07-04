const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
// const Bot = require("../bot");
const Bot = require("node-vk-bot-api");

const app = new Koa();
const router = new Router();

const bot = new Bot({
  token: process.env.TOKEN,
  group_id: process.env.GROUP_ID
});
// const bot = new Bot({
//   token: process.env.TOKEN
//   //   confirmation: process.env.CONFIRMATION
// });

router.post("/", bot.webhookCallback);

app.use(bodyParser);
app.use(router.routes());

app.listen(process.env.PORT);
