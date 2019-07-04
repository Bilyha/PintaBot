const env = require("dotenv");

env.config();

const { PORT, TOKEN, GROUP_ID } = process.env;

module.exports = {
  port: PORT,
  token: TOKEN,
  groupId: GROUP_ID
};
