//모듈 가져오기
const express = require("express");
const boardService = require("../services/board-service");
const paging = require("../utils/paging");

//Router 객체 생성
const router = express.Router();

//요청 매핑하기
router.get("", async (req, res, next) => {
  res.render("exam11_sequelize");
});

router.get("/path1", async (req, res, next) => {
  try {
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const totalRows = await boardService.totalRows();
    const pager = paging.init(5, 5, pageNo, totalRows);
    const boards = await boardService.list(pager);
    res.json({boards, pager});
  } catch(error) {
    next(error);
  }
});

router.get("/path2", async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const column = req.query.column;
    const searchMethod = {keyword, column};
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const totalRows = await boardService.totalRows(searchMethod);
    const pager = paging.init(5, 5, pageNo, totalRows);
    const boards = await boardService.list(pager, searchMethod);
    res.json({boards, pager});
  } catch(error) {
    next(error);
  }
});

router.get("/path3", async (req, res, next) => {
  try {
    let {startBno, endBno} = req.query;
    startBno = parseInt(startBno);
    endBno = parseInt(endBno);
    const boards = await boardService.rangeList(startBno, endBno);
    res.json(boards);
  } catch(error) {
    console.log(error);
    next(error);
  }
});

router.get("/path4", async (req, res, next) => {
  try {
    const bno = parseInt(req.query.bno);
    const board = await boardService.getBoard(bno);
    res.json(board);
  } catch(error) {
    next(error);
  }
});

router.post("/path5", async (req, res, next) => {
  try {
    // const board = req.body;
    // board.bwriter = "user1";
    const board = {...req.body, bwriter:"user1"};
    const dbBoard = await boardService.create(board);
    res.json(dbBoard);
  } catch(error) {
    next(error);
  }
});

router.put("/path6", async (req, res, next) => {
  try {
    // const bno = parseInt(req.body.bno);
    // const btitle = req.body.btitle;
    // const bcontent = req.body.bcontent;
    // const board = {bno, btitle, bcontent};
    const board = {...req.body, bno:parseInt(req.body.bno)};

    const rows = await boardService.update(board);
    res.json({result: rows + "행이 수정됨"});
  } catch(error) {
    next(error);
  }
});

router.delete("/path7", async (req, res, next) => {
  try {
    const bno = parseInt(req.body.bno);
    const rows = await boardService.delete(bno);
    res.json({result: rows + "행이 삭제됨"});
  } catch(error) {
    next(error);
  }
});

router.get("/path8", async (req, res, next) => {
  try {
    const userid = req.query.userid;
    const user = await boardService.getUserAndBoard(userid);
    res.json(user);
  } catch(error) {
    next(error);
  }
});

router.get("/path9", async (req, res, next) => {
  try {
    const bno = parseInt(req.query.bno);
    const board = await boardService.getBoardAndUser(bno);
    res.json(board);
  } catch(error) {
    next(error);
  }
});

router.get("/path10", async (req, res, next) => {
  try{
    const userid = req.query.userid;
    const user = await boardService.getUserWithOrderIfno(userid);
    res.json(user);
  } catch(error) {
    next(error);
  }
});

//모든 라우터는 모듈로 만들어야 함
module.exports = router;