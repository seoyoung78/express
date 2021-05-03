//모듈 가져오기
const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");

//라우터 가져오기
const exam01Home = require("./routes/exam01-home");
const exam02BindIfFor = require("./routes/exam02-bind-if-for");
const exam03Include = require("./routes/exam03-include");
const exam04ExtendsBlock = require("./routes/exam04-extends-block");
const exam05MiddleWare = require("./routes/exam05-middleware");

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
app.use((req, res, next) => {
    console.log("미들웨어1 전처리");
    next();
    console.log("미들웨어1 후처리");
});

app.use((req, res, next) => {
    console.log("미들웨어2 전처리");
    next();
    console.log("미들웨어2 후처리");
}, (req, res, next) => {
    console.log("미들웨어3 전처리");
    next();
    console.log("미들웨어3 후처리");
});

//로그 출력을 위한 미들웨어 적용
 app.use(morgan("dev"));
// app.use(morgan("combined"));
//app.use(morgan(":method :url :remote-addr :status :res[content-length]"));

//브라우저 캐싱 금지 미들웨어 적용
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

//요청 경로와 라우터 매핑
app.use("/", exam01Home);
app.use("/exam02", exam02BindIfFor);
app.use("/exam03", exam03Include);
app.use("/exam04", exam04ExtendsBlock);
app.use("/exam05", exam05MiddleWare);

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