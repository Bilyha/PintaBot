const Bot = require("node-vk-bot-api");

class PintaBot {
  constructor(token, groupId, confirmation, secretKey) {
    this.token = token;
    this.groupId = groupId;
    this.confirmation = confirmation;
    this.secretKey = secretKey;

    this.runBot = this.runBot.bind(this);
    this.setupBot = this.setupBot.bind(this);
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

  runBot() {
    if (!this.bot) {
      throw new Error("Create bot before run");
    }

    this.bot.event("message_new", ctx => {
      console.log(ctx);

      ctx.reply("New hello!");
    });
    this.bot.startPolling(() => {
      console.log("Bot started");
    });
  }

  sendMessageToUser(id, msg) {
    this.bot.sendMessage(id, msg);
  }
}

module.exports = PintaBot;
