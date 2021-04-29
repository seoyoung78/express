//모듈 가져오기
const express = require("express");

//Router 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("", (req, res) => {
  res.render("exam01_home");
});

//모든 라우터는 모듈로 만들어야 함
module.exports = router;