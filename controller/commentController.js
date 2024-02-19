// controllers/commentsController.js

const Comment = require("../models/commentModel");

// POST a new comment
const postComment = async (req, res) => {
  try {
    const newComment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      postIdentifier: req.body.postIdentifier,
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
    console.log(`Post Identifier: ${req.params.postIdentifier}`);
    const postIdentifier = req.params.postIdentifier.replace(/^:|:$/g, ""); // This will remove colons at the start or end

    const comments = await Comment.find({ postIdentifier: postIdentifier });
    console.log(`Fetching comments for postIdentifier: ${postIdentifier}`);
    console.log(`Found comments: `, comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postComment,
  getComments,
};
