const Scene = require("node-vk-bot-api/lib/scene");
const { IDs } = require("../../constants");
const isStringWithHand = require("../../utils/stringWithHand");

const scene = new Scene(
  "pinta_party",
  ctx => {
    if (
      ctx.message.from_id === IDs.alex &&
      !isStringWithHand(ctx.message.text)
    ) {
      ctx.scene.leave();
      return ctx.reply("Raise your hand and ask again (use ✋🏻)");
    }
    ctx.scene.next();
    ctx.reply("Do you want some beer?");
  },
  ctx => {
    ctx.scene.leave();
    ctx.reply("Me too!");
  }
);

module.exports = scene;
