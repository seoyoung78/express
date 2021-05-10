const sessionAuth = {
  setAuth: function(req, res, userid) {
    //userid가 있다면
    if(userid) {
      //세션에 userid를 저장
      req.session.userid = userid;
    }
    //req에 추가적으로 userid를 저장(편리성, JWT 인증과 통일화)
    req.userid = req.session.userid || null;
    //nunjucks의 모든 템플릿(뷰)에서 userid를 바인딩 할 수 있도록 설정
    res.locals.userid = req.session.userid || null;
  },
  checkAuth: function(req, res, next) {
    if(req.userid) {
      next();
    } else {
      //MPA 일 경우
      res.redirect("/exam12/loginForm");
      //RESTful API일 경우
      // const error = new Error("인증 필요");
      // error.status = 403;
      // next(error);
    }
  },
  removeAuth: function(req) {
    delete req.session.userid;
  }
};

module.exports = sessionAuth;