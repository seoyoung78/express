const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  const userId= null;
  const userName = "넌적스";

  const board = {
    bno:1, btitle:"제목1", bcontent:"내용1", bwriter:"user1", bdate:"2021.5.11"
  };
  const boards = [];
  for (var i = 1; i <= 10; i++) {
    boards.push({
      bno:i, btitle:"제목"+i, bcontent:"내용"+i, bwriter:"user1", bdate:new Date()
    });
  }
  res.render("exam02_bind_if_for", {userId:userId, userName, board, boards});
});

module.exports = router;