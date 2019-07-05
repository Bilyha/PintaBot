const Scene = require("node-vk-bot-api/lib/scene");

const scene = new Scene("meet", ctx => {
  ctx.scene.next();
  ctx.reply("Do you want some beer?");
});
