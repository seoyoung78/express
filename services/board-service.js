const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(searchMethod) {
    try {
      let where = null;
      if(searchMethod) {
        if (searchMethod.column === "btitle") {
          where = {
            "btitle": {
              [Op.like]: "%" + searchMethod.keyword + "%"
            }
          }
        } else {
          where = {
            [Op.or]: [
              {"btitle": {[Op.like]: "%" + searchMethod.keyword + "%"}},
              {"bcontent": {[Op.like]: "%" + searchMethod.keyword + "%"}}
            ]
          }
        }
      } 

      const result = await db.Board.count({
        where: where
      })
      return result;
    } catch(error) {
      throw error;
    }
  },
  list: async function(pager, searchMethod) {
    try {
      let where = null;
      if(searchMethod) {
        if (searchMethod.column === "btitle") {
          where = {
            "btitle": {
              [Op.like]: "%" + searchMethod.keyword + "%"
            }
          }
        } else {
          where = {
            [Op.or]: [
              {"btitle": {[Op.like]: "%" + searchMethod.keyword + "%"}},
              {"bcontent": {[Op.like]: "%" + searchMethod.keyword + "%"}}
            ]
          }
        }
      } 

      const result = await db.Board.findAll({
        attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
        where,
        order: [["bno", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  rangeList: async function(startBno, endBno) {
    try {
      const result = await db.Board.findAll({
        attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
        where: {
          [Op.and]: [
            {"bno": {[Op.gte]: startBno}},
            {"bno": {[Op.lte]: endBno}}
          ]
        }
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  getBoard: async function (bno) {
    try {
      const board = await db.Board.findOne({
        where: {bno: bno}
      });
      return board;
    } catch(error) {
      throw error;
    }
  },

  create: async function (board) {
    try {
      const dbBoard = await db.Board.create(board);
      return dbBoard;
    } catch(error) {
      throw error;
    }
  },

  update: async function (board) {
    try {
      const rows = await db.Board.update({
        btitle: board.btitle,
        bcontent: board.bcontent
      }, {
        where: {bno: board.bno}
      });
      return rows;
    } catch(error) {
      throw error;
    }
  },

  delete: async function (bno) {
    try {
      const rows = await db.Board.destroy({
        where: {bno}
      });
      return rows;
    } catch(error) {
      throw error;
    }
  },

  getUserAndBoard: async function (userid) {
    try {
      //방법1
      // const user = await db.User.findOne({
      //   where: {userid},
      //   include: [{
      //     model: db.Board,
      //     where: {
      //       bno: {[Op.lte]: 5}
      //     }
      //   }]
      // });
      // return user;

      //방법2
      const user = await db.User.findOne({
        where: {userid}
      });
      user.dataValues.Boards = await user.getBoards({
        where: {
          bno: {[Op.lte]: 5}
        }
      });
      return user;
    } catch(error) {
      throw error;
    }
  }
};
