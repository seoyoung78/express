const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
  res.render("exam06_data_receive/index");
});

router.get("/getQueryString", (req, res, next) => {
  console.log(req.query);
  const bno = parseInt(req.query.bno);
  const pageNo = parseInt(req.query.pageNo);
  //res.end();  //실제 응답 내용은 x
  res.redirect("/exam06");
});

router.get("/getPathVariable/:bno/:pageNo", (req, res, next) => {
  console.log(req.params);
  const bno = parseInt(req.params.bno);
  const pageNo = parseInt(req.params.pageNo);
  res.redirect("/exam06");
});

router.post("/postReceive", (req, res, next) => {
  console.log(req.body);
  const board = req.body
  res.render("exam06_data_receive/postReceive", {board});
  //res.redirect("/exam06");  - ajax 요청은 redirect x
})
module.exports = router;