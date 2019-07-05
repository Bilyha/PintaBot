const Bot = require("node-vk-bot-api");

class PintaBot {
  constructor(token, groupId, confirmation, secretKey) {
    this.token = token;
    this.groupId = groupId;
    this.confirmation = confirmation;
    this.secretKey = secretKey;
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

    this.bot.on(ctx => {
      console.log("RESPONSE!");

      ctx.reply("Hello from other side!");
    });

    this.bot.startPolling();

    // this.bot.command("start", ctx => {
    //   this.bot.sendMessage([102036098, 64081057], "Hello!");
    // });
  }

  sendMessageToUser(id, msg) {
    console.log(this.bot);

    this.bot.sendMessage(id, msg);
  }
}

module.exports = PintaBot;
