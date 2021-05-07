const bcrypt = require("bcrypt");
const db = require("../sequelize/models/index");

module.exports = {
  create: async function(user) {
    try {
      user.userpassword = await bcrypt.hash(user.userpassword, 12);
      user.userauthority = "ROLE_USER";
      user.userenabled = 1;
      const dbUser = await db.User.create(user);
      return dbUser;
    } catch(error) {
      throw error;
    }
  }
};