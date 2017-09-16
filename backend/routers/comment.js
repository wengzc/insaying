/**
 * Created by Administrator on 2017/8/12.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');

var CommentModel = require('../models/comment');
var VoteModel = require('../models/vote');

//新增评论
router.post('/', function (req,res) {
    var author = req.session.user._id;
    var content = req.body.content;
    var article_id = req.body.article_id;
    var receiver =  req.body.receiver;
    var comment = {
        author: author,
        receiver: receiver,
        content: content,
        article: article_id,
        created_at: moment().format('YYYY-MM-DD HH:mm')
    }
    CommentModel.create(comment).then(function (response) {
        var comment = response;
        res.json({
            message: '评论发表成功!',
            comment: comment
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//删除文章一条评论
router.delete('/:comment_id', function (req,res) {
    var comment_id = req.params.comment_id;
    CommentModel.deleteCommentByCommentId({ _id: comment_id }).then(function (result) {
        VoteModel.deleteVotesByCommentId(comment_id);
        CommentModel.deleteCommentByCommentId({ root_comment: comment_id });
    }).then(function (response) {
        res.json({
            message: '评论删除成功'
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//新增评论回复
router.post('/reply', function (req,res) {
    var reply_comment = req.body.reply_comment;
    var root_comment =  req.body.root_comment;
    var root_article = req.body.root_article;
    var author = req.session.user._id;
    var content = req.body.content;
    var receiver =  req.body.receiver;
    var comment = {
        reply_comment: reply_comment,
        root_comment: root_comment,
        root_article: root_article,
        author: author,
        receiver: receiver,
        content: content,
        created_at: moment().format('YYYY-MM-DD HH:mm')
    }
    CommentModel.create(comment).then(function (response) {
        var comment = response;
        res.json({
            message: '回复发表成功!',
            comment: comment
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

module.exports = router;