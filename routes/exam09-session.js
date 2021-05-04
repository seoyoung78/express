const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
  res.render("exam09_session");
});

router.post("/login", (req, res, next) => {
  const user = req.body;
  //세션에 uid를 저장
  req.session.uid = user.uid;
  res.redirect("/exam09");
});

router.get("/logout", (req, res, next) => {
  delete req.session.uid;   //속성 값 제거
  //req.session.destroy();    //전체 세션 삭제
  res.redirect("/exam09");
});

module.exports = router;