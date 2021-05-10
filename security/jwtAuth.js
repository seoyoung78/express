const jwt = require("jsonwebtoken");

const jwtAuth = {
  createJwt: function(userid) {
    const authToken = jwt.sign({userid}, process.env.JWT_SECRET, {expiresIn: "12h"});
    return authToken;
  },
  setAuth: function(req, res) {
    //JWT 얻기 --------------------------------------------------
    let authToken = null;
    if (req.singedCookies.authToken) {
      //JWT가 쿠키로 넘어왔을 경우
      authToken = req.singedCookies.authToken;
    } else if (req.headers.authToken) {
      //JWT가 다른 헤더명으로 넘어왔을 경우
      authToken = req.headers.authToken;
    } else if (req.query.authToken) {
      //JWT가 쿼리스트링으로 넘어왔을 경우
      authToken = req.query.authToken;
    }

    //JWT 유효성 검사 --------------------------------------------------
    if (authToken) {
      //JWT 파싱 - 해석해서 페이로드 리턴
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      //JWT 만료 시간(초) 얻기
      const expires = decoded.exp;
      //현재 시간(초) 얻기
      const now = Math.floor(Date.now()/1000);
      //만료 시간과 현재 시간 비교
      if((expires - now) > 0) {
        //JWT에 userid가 포함되어 있을 경우
        if(decoded.userid) {
          //req에 userid 저장
          req.userid = decoded.userid;
          //모든 Nunjucks 템플릿에서 userid를 바인딩할 수 있도록 설정
          res.locals.userid = decoded.userid;
        }
      }
    }
  },
  checkAuth: function() {}
};

module.exports = jwtAuth;