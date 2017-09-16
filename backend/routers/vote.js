/**
 * Created by Administrator on 2017/9/9.
 */

var express = require('express');
var router = express.Router();
var moment = require('moment');

var VoteModel = require('../models/vote');

router.post('/', function (req, res) {
    var user = req.session.user._id;
    var receiver = req.body.receiver;
    var comment = req.body.comment;
    var root_article = req.body.root_article;
    var vote = {
        user: user,
        receiver: receiver,
        comment: comment,
        root_article: root_article,
        created_at: moment().format('YYYY-MM-DD HH:mm'),
    }
    VoteModel.create(vote).then(function (response) {
        res.json({
            message: '赞同评论!',
        })
    }).catch(function (e) {
        console.log("error:" + e);
    })
})

router.delete('/', function (req, res) {
    var user = req.session.user._id;
    var comment = req.query.comment;
    var data = {
        user: user,
        comment: comment,
    }
    VoteModel.delete(data).then(function (response) {
        res.json({
            message: '取消赞同!',
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

module.exports = router;