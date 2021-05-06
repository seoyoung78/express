const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function() {
    try {
      const result = await db.Board.count()
      return result;
    } catch(error) {
      throw error;
    }
  },
  list: async function() {
    try {
      const result = await db.Board.findAll({
        where: { [Op.and]: [
          {bno: { [Op.gte]: 1}},
          {bno: { [Op.lte]: 5}}
        ]}
      });
      return result;
    } catch(error) {
      throw error;
    }
  }
};
