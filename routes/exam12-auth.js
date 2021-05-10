const express = require("express");
const userService = require("../services/user-service");
const sessionAuth = require("../security/sessionAuth");

const router = express.Router();

router.get("", (req, res, next) => {
  res.render("exam12_auth/index");
});

router.get("/loginForm", (req, res, next) => {
  //로그인 실패시 리다이렉트해서 요청된 경우 에레 정보 얻기
  let loginError = req.session.loginError;
  //로그인 실패 시 저장했던 에러 정보 삭제
  //사용자가 직정 /loginForm을 요청했을 대 에러 정보가 나오면 안되기 때문
  if(loginError) {
    delete req.session.loginError;
  } else {
    loginError = {};
  }
  res.render("exam12_auth/loginForm", {loginError});
});

router.get("/joinForm", (req, res, next) => {
  res.render("exam12_auth/joinForm");
});

router.post("/join", async (req, res, next) => {
  try {
    const user = req.body;
    await userService.create(user);
    res.redirect("/exam12");
  } catch(error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = req.body;
    const result = await userService.login(user);
    if (result.id !== "success") {
      req.session.loginError = result;
      res.redirect("/exam12/loginForm");
    } else {
      sessionAuth.setAuth(req, res, user.userid);
      res.redirect("/");
    }
  } catch(error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  sessionAuth.removeAuth(req);
  res.redirect("/exam12/loginForm");
});

module.exports = router;