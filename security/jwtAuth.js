const jwt = require("jsonwebtoken");

const jwtAuth = {
  createJwt: function(userid) {
    const authToken = jwt.sign({userid}, process.env.JWT_SECRET, {expiresIn:"12h"});
    return authToken;
  },
  setAuth: function(req, res) {
    //JWT 얻기---------------------------------
    let authToken = null;
    if(req.signedCookies.authToken) {
      //JWT가 쿠키로 넘어왔을 때
      authToken = req.signedCookies.authToken;
    } else if(req.headers.authToken) {
      //JWT가 다른 헤더명으로 넘어왔을 때
      authToken = req.headers.authToken;
    } else if(req.query.authToken) {
      //JWT가 쿼리스트링으로 넘어왔을 때
      authToken = req.query.authToken;
    }
    //JWT 유효성 검사 --------------------------
    if(authToken) {
      //JWT 파싱(해석)
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      //JWT의 만료 시간(초) 얻기
      const expires = decoded.exp;
      //현재 시간(초) 얻기
      const now = Math.floor(Date.now()/1000);
      //만료시간과 현재시간을 비교
      if((expires - now) > 0) {
        //JWT에 userid가 포함되어 있을 경우
        if(decoded.userid) {
          //req에 userid를 저장
          req.userid = decoded.userid;
          //모든 Nunjucks 템플릿에서 userid를 바인딩할 수 있도록 설정
          res.locals.userid = decoded.userid;
        }
      }
    }
  },
  checkAuth: function(req, res, next) {
    if(req.userid) {
      next();
    } else {
      //MPA 일 경우
      // res.redirect("/exam12/loginForm");
      //RESTful API일 경우
      const error = new Error("인증 필요");
      error.status = 403;
      next(error);
    }
  }
};

module.exports = jwtAuth;