const Scene = require("node-vk-bot-api/lib/scene");

const scene = new Scene("hello", ctx => {
  ctx.scene.leave();
  ctx.reply("Hi! I'm PintaBot, just type PintaBot and we will start");
});

module.exports = scene;
