const Scene = require("node-vk-bot-api/lib/scene");
const Stage = require("node-vk-bot-api/lib/stage");

const scene = new Scene(
  "pinta_party",
  ctx => {
    ctx.scene.next();
    ctx.reply("Do you want some beer?");
  },
  ctx => {
    ctx.scene.next();
    ctx.reply("Tell me date");
  }
);

module.exports = new Stage(scene);
