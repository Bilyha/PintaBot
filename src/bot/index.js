const Bot = require("node-vk-bot-api");
const vkApi = require("node-vk-bot-api/lib/api");
const Stage = require("node-vk-bot-api/lib/stage");
const Session = require("node-vk-bot-api/lib/session");
const Markup = require("node-vk-bot-api/lib/markup");

const { getUserName } = require("../utils/userInfo");
const createRegExp = require("../utils/createRegexp");
const stages = require("./stages");

class PintaBot {
  constructor(token, groupId, confirmation, secretKey) {
    this.token = token;
    this.groupId = groupId;
    this.confirmation = confirmation;
    this.secretKey = secretKey;
    this.stages = stages;

    this.session = new Session();

    this.runBot = this.runBot.bind(this);
    this.setupBot = this.setupBot.bind(this);
    this.setupCommands = this.setupCommands.bind(this);
    this.sendMessageToUser = this.sendMessageToUser.bind(this);
  }

  setupBot() {
    this.bot = new Bot({
      token: this.token,
      group_id: this.groupId,
      confirmation: this.confirmation,
      secret: this.secretKey
    });
  }

  async setupCommands() {
    this.bot.command(createRegExp("/pinta_party"), ctx => {
      ctx.scene.enter("pinta_party");
    });
    this.bot.command("start", ctx => {
      ctx.scene.enter("hello");
    });
    this.bot.event(createRegExp("Go"), async ctx => {
      const userId = ctx.message.from_id;
      const { response } = await this.getUsersProfile(userId);

      const userName = getUserName(response, userId);
      ctx.reply(
        `Hi, ${userName}! You can choose "/pinta_party" button to create event or ask me question.`,
        null,
        Markup.keyboard([Markup.button("/pinta_party")]).oneTime()
      );
    });
    this.bot.event(createRegExp(["Hi", "Hello", "Hey"]), ctx => {
      ctx.reply(`Hi, type Go to start!`);
    });
    this.bot.event("message_new", async ctx => {
      const userId = ctx.message.from_id;
      const { response } = await this.getUsersProfile(userId);

      const userName = getUserName(response, userId);
      ctx.reply("😳");
      ctx.reply(`Sorry, ${userName}. Try again, I don't understand!`);
    });
  }

  runBot() {
    if (!this.bot) {
      throw new Error("Create bot before run");
    }

    this.bot.use(this.session.middleware());
    this.bot.use(this.stages.middleware());
    this.setupCommands();

    this.bot.startPolling(() => {
      console.log("Bot started");
    });
  }

  sendMessageToUser(id, msg) {
    this.bot.sendMessage(id, msg);
  }

  async getUsersProfile(userId) {
    return await vkApi("users.get", {
      access_token: this.token,
      user_ids: [userId]
    });
  }
}

module.exports = PintaBot;
