//모듈 가져오기
const express = require("express");
const jwtAuth = require("../security/jwtAuth");
const boardService = require("../services/board-service");
const paging = require("../utils/paging");

//Router 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("", (req, res) => {
  res.render("exam13_cors");
});

router.get("/boardlist", jwtAuth.checkAuth, async (req, res) => {
  try {
    const pageNo = 1;
    const totalRows = await boardService.totalRows();
    const pager = paging.init(5, 5, pageNo, totalRows);
    const boards = await boardService.list(pager);
    res.json({boards, pager});
  } catch(error) {
    next(error);
  }
});

//모든 라우터는 모듈로 만들어야 함
module.exports = router;