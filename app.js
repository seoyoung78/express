//모듈 가져오기
const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");

//라우터 가져오기
const exam01Home = require("./routes/exam01-home");

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
    watch: true
});

//정적 파일들을 제공하는 폴더 지정
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));

//http://localhost:8080/ 응답을 제공
// app.get("/", (req, res) => {  //req: 요청 객체, res: 응답 객체
//     res.sendFile(__dirname + "/views/index.html");     //sendFile은 절대경로만 가능
// });

//요청 경로와 라우터 매핑
app.use("/", exam01Home);

//애플리케이션 실행
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}`);
});