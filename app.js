//모듈 가져오기
const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const {sequelize} = require("./sequelize/models/index");
const sessionAuth = require("./security/sessionAuth");
const jwtAuth = require("./security/jwtAuth");
const cors = require("cors");

//라우터 가져오기
const exam01Home = require("./routes/exam01-home");
const exam02BindIfFor = require("./routes/exam02-bind-if-for");
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extends-block");
const exam05MiddleWare = require("./routes/exam05-middleware");
const exam06DataReceive = require("./routes/exam06-data-receive");
const exam07MultipartFormData = require("./routes/exam07-multipart-form-data");
const exam08Cookie = require("./routes/exam08-cookie");
const exam09Session = require("./routes/exam09-session");
const exam10Router = require("./routes/exam10-router");
const exam11Sequelize = require("./routes/exam11-sequelize");
const exam12Auth = require("./routes/exam12-auth");
const exam13Cors = require("./routes/exam13-cors");

//.env 파일을 읽어서 process.env에 추가
dotenv.config();

//애플리케이션 객체 생성
const app = express();
app.set("port", process.env.PORT);

//템플릿 엔진으로 nunjucks 설정
//view 파일의 확장명을 .html로 지정
app.set("view engine", "html");
//view 파일의 폴더 설정
//watch - view 파일의 변경에 따른 nunjucks 엔진 재실행하여 html 생성
nunjucks.configure("views", {
    express: app,
    watch: true     //소스가 변경되는 것을 감시한 후 리랜더링
});

//sequelize 데이터 연결과 동시에 모델과 테이블을 매칭(동기화)
sequelize.sync()
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.log("DB 연결 실패: ", err.message);
    });

//Cors 설정
//직접 설정
// app.use((req, res, next) => {
//     res.set("Access-Control-Allow-Origin", "*"); //헤더 설정
//     res.set("Access-Control-Allow-Credentials", "false");   //JWT 쿠키 인증 시 true로 사용 - 구체적 설정 필요
//     res.set("Access-Control-Allow-Headers", "*");   //특정 헤더에 담에 전송할 경우
//     res.set("Access-Control-Allow-Methods", "*");   //특정 방식을 설정할 경우 - GET, POST는 기본
//     next();
// })
//패키지 이용
app.use(cors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    credentials: false
}));

//정적 파일들을 제공하는 폴더 지정
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));

//http://localhost:8080/ 응답을 제공
// app.get("/", (req, res) => {  //req: 요청 객체, res: 응답 객체
//     res.sendFile(__dirname + "/views/index.html");     //sendFile은 절대경로만 가능
// });

//라우터도 미들웨어의 일종
// app.use("/", (req,res, next) => {
//     res.send("<html><body>Test</body></html>");
// });

//모든 요청 경로에 실행되는 미들웨어
// app.use((req, res, next) => {
//     console.log("미들웨어1 전처리");
//     next();
//     console.log("미들웨어1 후처리");
// });

// app.use((req, res, next) => {
//     console.log("미들웨어2 전처리");
//     next();
//     console.log("미들웨어2 후처리");
// }, (req, res, next) => {
//     console.log("미들웨어3 전처리");
//     next();
//     console.log("미들웨어3 후처리");
// });

//로그 출력을 위한 미들웨어 적용
//app.use(morgan("dev"));
//app.use(morgan("combined"));
//app.use(morgan(":method :url :remote-addr :status :res[content-length]"));

//브라우저 캐싱 금지 미들웨어 적용
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

//요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서
//req.body 객체로 만드는 미들웨어
app.use(express.urlencoded({extended:true}));   //x-www-form-urlencoded: param1=value&param2=vaule2
app.use(express.json());    //raw/json: {"param1":"value1", "param2":"value2"}

//요청 HTTP 헤더에 있는 쿠키를 파싱해서
//req.cookies 또는 req.singnedCookies 객체로 생성하는 미들웨어 적용
app.use(cookieParser(process.env.COOKIE_SECRET));   //비밀키를 받아 쿠키 생성 및 파싱 시 암호화

//세션 설정 - JWT 인증 시 불필요
app.use(session({
    resave: false,      //요청이 올 때마다 세션에 수정 사항이 없더라도 세션 객체를 세션 저장소에 저장하는 것을 방지
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*30
    }
}));

//모든 템플릿(뷰 - .html)에서 바인딩할 수 있는 데이터를 설정하는 미들웨어 적용
app.use((req, res, next) => {
    res.locals.uid = req.session.uid || null;
    //세션 인증일 경우
    //sessionAuth.setAuth(req, res);
    //req.locals.userid = req.session.userid || null;
    
    //JWT 인증일 경우
    jwtAuth.setAuth(req, res);

    next();
});

//요청 경로와 라우터 매핑
app.use("/", exam01Home);
app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);
app.use("/exam05", exam05MiddleWare);
app.use("/exam06", exam06DataReceive);
app.use("/exam07", exam07MultipartFormData);
app.use("/exam08", exam08Cookie);
app.use("/exam09", exam09Session);
app.use("/exam10", exam10Router);
app.use("/exam11", jwtAuth.checkAuth, exam11Sequelize);
app.use("/exam12", exam12Auth);
app.use("/exam13", exam13Cors);

//404 처리 미들웨어 - 위의 라우터가 실행이 안 됐을 경우
app.use((req, res, next) => {
    const err = new Error("잘못된 요청");
    err.status = 404;
    next(err);    
});

//에러 처리 미들웨어
app.use((err, req, res, next) => {
    const error = (process.env.NODE_ENV !== "production")? err: {}
    //err = (req.app.get("env") !== "production")? err: {}
    error.message = req.method + " " + req.url + ": " + err.message;
    error.status = err.status || 500;
    res.status(error.status);
    //res.sendFile(path.join(__dirname, "views/common/error.html"));
    res.render("common/error.html", {error});    //nunjucks 적용되어 있을 경우 사용 가능
})

//애플리케이션 실행
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}`);
});