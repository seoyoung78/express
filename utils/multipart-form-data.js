const multer = require("multer");

const multipartFormData = multer({
  storage: multer.diskStorage({    //저장 위치
    destination: function (req, file, done) {
      done(null, process.env.UPLOAD_PATH);
    },
    filename: function(req, file, done) {
      done(null, Date.now() + "-" + file.originalname);
    }
  }),
  limits: {fileSize: 10*1024*1024}      //용량 제한
});

module.exports = multipartFormData;