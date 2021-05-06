//모듈 가져오기
const express = require("express");
const boardService = require("../services/board-service");

//Router 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("", async (req, res, next) => {
  try {
    // const result = await boardService.totalRows();
    // console.log(result);

    const result = await boardService.list();
    console.log(result);

    res.render("exam11_sequelize");
  } catch (error) {
    next(error)
  }
});

//모든 라우터는 모듈로 만들어야 함
module.exports = router;