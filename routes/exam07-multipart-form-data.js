const express = require("express");
const multipartFormData = require("../utils/multipart-form-data");
const jwtAuth = require("../security/jwtAuth");

const router = express.Router();

router.get("", (req, res, next) => {
  res.render("exam07_multipart_form_data");
});

router.post("/upload1", multipartFormData.single("battach"), (req, res, next) => {
  console.log(req.body);  //문자 정보 저장
  console.log(req.file);  //파일 정보 저장
  res.redirect("/exam07");
});

router.post("/upload2", multipartFormData.array("battach"), (req, res, next) => {
  console.log(req.body);  //문자 정보 저장
  console.log(req.files);  //파일 정보 저장
  res.redirect("/exam07");
});

router.post("/upload3", multipartFormData.fields([{name: "battach1"}, {name: "battach2"}]), (req, res, next) => {
  console.log(req.body);  //문자 정보 저장
  console.log(req.files);  //파일 정보 저장
  res.redirect("/exam07");
});

router.post("/upload4", multipartFormData.array("battach"), (req, res, next) => {
  console.log(req.body);  //문자 정보 저장
  console.log(req.files);  //파일 정보 저장
  const result = {charPart: req.body, filePart: req.files};
  res.json(result);
});

router.post("/upload5", multipartFormData.fields([{name: "battach1"}, {name: "battach2"}]), (req, res, next) => {
  console.log(req.body);  //문자 정보 저장
  console.log(req.files);  //파일 정보 저장
  const result = {charPart: req.body, filePart: req.files};
  res.json(result);
});

// router.get("/download", (req, res, next) => {
//   const fileOrigianlName = req.query.fileOriginalName;
//   const fileSavePath = process.env.UPLOAD_PATH + req.query.flieSaveName;
//   res.download(fileSavePath, fileOrigianlName);
// });

router.get("/download", (req, res, next) => {
  const fileOriginalName = req.query.fileOrigianlName;
  const fileSavePath = process.env.UPLOAD_PATH + req.query.fileSaveName;
  res.download(fileSavePath, fileOriginalName);
});

module.exports = router;