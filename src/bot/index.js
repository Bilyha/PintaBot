const Bot = require("node-vk-bot-api");
const vkApi = require("node-vk-bot-api/lib/api");
const { getUserName } = require("../utils/userInfo");

class PintaBot {
  constructor(token, groupId, confirmation, secretKey) {
    this.token = token;
    this.groupId = groupId;
    this.confirmation = confirmation;
    this.secretKey = secretKey;

    this.runBot = this.runBot.bind(this);
    this.setupBot = this.setupBot.bind(this);
    this.sendMessageToUser = this.sendMessageToUser.bind(this);
    this.getUsersProfile = this.getUsersProfile.bind(this);
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

    this.bot.event("message_new", async ctx => {
      const userId = ctx.message.from_id;
      const { response } = await this.getUsersProfile(userId);

      const userName = getUserName(response, userId);

      ctx.reply(`Hello my dear friend, ${userName}!`);
    });
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
