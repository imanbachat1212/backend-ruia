const express = require("express");
const commentController = require("../controller/commentController");

const router = express.Router();

router.get("/get", commentController.getComments);
router.post("/post", commentController.postComment);

module.exports = router;
