// Node.js with Express framework and MongoDB database

const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true }
});

const Comment = mongoose.model('Comment', CommentSchema);

const app = express();
const server = app.listen(3000, () => console.log('Server started'));
const wss = new WebSocket.Server({ server });

mongoose.connect('mongodb://localhost/comment-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log(error));

app.use(express.json());

app.post('/comments', async (req, res) => {
  const { comment } = req.body;
  const newComment = new Comment({ comment });
  await newComment.save();
  res.sendStatus(201);
  wss.clients.forEach((client) => client.send(comment));
});

wss.on('connection', (ws) => {
  Comment.find().then((comments) => {
    comments.forEach((comment) => ws.send(comment.comment));
 
