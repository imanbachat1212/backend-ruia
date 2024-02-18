// controllers/commentsController.js

const Comment = require("../models/commentModel");

// POST a new comment
const postComment = async (req, res) => {
  try {
    const newComment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postComment,
  getComments,
};
