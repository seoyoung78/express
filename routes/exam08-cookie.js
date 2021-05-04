const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
  res.render("exam08_cookie/index");
});

router.get("/createCookie", (req, res, next) => {
  const user = {uid:"user1", uname:"홍길동"};
  const strUser = JSON.stringify(user);
  res.cookie("user", strUser, {  //쿠키 생성과 동시에 응답 해더에 쿠키 저장
    domain: "localhost",   //어떤 서버로 접속할 때 가지고 갈 것인지
    path: "/",           //도메인 내에서 경로 지정
    expires: new Date(new Date().getTime + 1000*60*30),    //유효 기간 - 현재 시간+30분 뒤의 객체 생성
    signed: true,        //쿠키의 변질 방지 - 서버가 서명을 해서 쿠키의 값을 변항하지 못 하도록 설정
    httpOnly: true,      //자바스크립트 접근 방지, 네트워크 통신에서만 접근 가능 - 클라이언트의 JS가 쿠키에 접근하지 못 하도록 방지
    secure: false        //http, https 모두 쿠키를 전송할 수 있도록 설정 - true면 https로만 가능
  });
  res.redirect("/exam08");
});

router.get("/readCookie", (req, res, next) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  const user = JSON.parse(req.signedCookies.user);   //문저열 -> 객체
  res.render("exam08_cookie/readCookie", {user});
});

module.exports = router;