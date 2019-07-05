const Bot = require("node-vk-bot-api");

class PintaBot {
  constructor(token, groupId, confirmation) {
    this.token = token;
    this.groupId = groupId;
    this.confirmation = confirmation;
  }

  setupBot() {
    this.bot = new Bot({
      token: this.token,
      group_id: this.groupId,
      confirmation: this.confirmation
    });
  }

  runBot() {
    if (!this.bot) {
      throw new Error("Create bot before run");
    }

    // this.bot.on(ctx => {
    //   console.log("RESPONSE!");

    //   ctx.reply("Hello!");
    // });

    this.bot.command("start", ctx => {
      ctx.reply("Hello");
    });
  }
}

module.exports = PintaBot;
