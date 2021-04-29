const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  const board = {
    bno:1, btitle:"제목1", bcontent:"내용1", bwriter:"user1", bdate:"2021.5.11"
  };
  res.render("exam03_include/index", {board});
})

module.exports = router