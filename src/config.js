const env = require("dotenv");

env.config();

const { PORT, TOKEN, GROUP_ID, CONFIRMATION, SECRET_KEY } = process.env;

module.exports = {
  port: PORT,
  token: TOKEN,
  groupId: GROUP_ID,
  confirmation: CONFIRMATION,
  secretKey: SECRET_KEY
};
