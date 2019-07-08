const Bot = require("node-vk-bot-api");
const vkApi = require("node-vk-bot-api/lib/api");
const Session = require("node-vk-bot-api/lib/session");
const Markup = require("node-vk-bot-api/lib/markup");

const { getUserName } = require("../utils/userInfo");
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

  setupStages(stages) {
    stages.map(stage => {
      this.bot.use(this.session.middleware());
      this.bot.use(stage.middleware());
    });
  }

  async setupCommands() {
    this.bot.event("message_new", ctx => {
      ctx.reply("Hi");
    });
    this.bot.command("/pinta_party", ctx => {
      ctx.scene.enter("pinta_party");
    });
    this.bot.event("PintaBot", async ctx => {
      const userId = ctx.message.from_id;
      const { response } = await this.getUsersProfile(userId);

      const userName = getUserName(response, userId);
      ctx.reply(
        `Hi, ${userName}! You can choose button or ask me question`,
        null,
        Markup.keyboard([
          Markup.button("Create Event", null, "pinta_party")
        ]).oneTime()
      );
    });
  }

  runBot() {
    if (!this.bot) {
      throw new Error("Create bot before run");
    }

    this.setupStages(this.stages);
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
