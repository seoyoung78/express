const express = require("express");

const router = express.Router();

router.all("", (req, res, next) => {
  const board =  {bno:1, btitle:"제목", bcontent:"내용", bwriter:"user1", bdate:"2021.5.11"};
  res.render("exam05_middleware", {board});
});

module.exports = router;