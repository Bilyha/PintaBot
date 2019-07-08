const Stage = require("node-vk-bot-api/lib/stage");

const pintaPartyScene = require("./pintaParty");
const helloScene = require("./hello");

module.exports = new Stage(pintaPartyScene, helloScene);
