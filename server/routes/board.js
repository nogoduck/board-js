const express = require("express");
const router = express.Router();

const { Board } = require("../models/Board");
const { getDate } = require("../routes/_utils");

router.post("/delete", (req, res) => {
  const target = req.body;
  console.log("[ Server ] delete target >> ", target);
  if (Object.keys(target).length === 0) {
    return res.status(500).json({
      message: "The target to be removed has not been entered",
    });
  }
  Board.findOneAndDelete(target, (err, doc) => {
    console.log("[ Server ] delete doc >> ", doc);
    if (err)
      return res.status(500).json({
        message: err,
      });
    return res.status(200).json({
      success: true,
      data: doc,
    });
  });
});

router.post("/update", (req, res) => {
  const target = req.body;
  const filter = { _id: target._id };
  const update = {
    title: target.title,
    description: target.description,
    updatedAt: getDate(),
  };
  Board.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
    console.log("[ Server ] update doc >> ", doc);
    if (err)
      return res.status(500).json({
        message: err,
      });
    return res.status(200).json({
      success: true,
      data: doc,
    });
  });
});

router.post("/getAll", (req, res) => {
  Board.find()
    .sort({ createdAt: "desc" })
    .then((board) => {
      return res.status(200).json({
        board,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.post("/create", (req, res) => {
  const board = new Board(req.body);
  board.save((err, data) => {
    if (err) return res.json({ success: false, err });
    console.log("[ Server ] create data >> ", data);
    return res.status(200).json({
      success: true,
      message: "You uploaded the post successfully",
    });
  });
});

router.post("/detail", (req, res) => {
  Board.findOne(req.body)
    .populate("writer")
    .exec((err, doc) => {
      console.log("[ Server ] detail doc >> ", doc);
      if (err) return res.status(500).json({ message: err });
      return res.status(200).json({ doc });
    });
});

module.exports = router;
