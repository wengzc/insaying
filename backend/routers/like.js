/**
 * Created by Administrator on 2017/9/8.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');

var LikeModel = require('../models/like');

router.post('/', function (req, res) {
    var user = req.session.user._id;
    var receiver = req.body.receiver;
    var article = req.body.article;
    var like = {
        user: user,
        receiver: receiver,
        article: article,
        created_at: moment().format('YYYY-MM-DD HH:mm'),
    }
    LikeModel.create(like).then(function (response) {
        res.json({
            message: '喜欢文章!',
        })
    }).catch(function (e) {
        console.log("error:" + e);
    })
})

router.delete('/', function (req, res) {
    var user = req.session.user._id;
    var article = req.query.article;
    var data = {
        user: user,
        article: article,
    }
    LikeModel.delete(data).then(function (response) {
        res.json({
            message: '取消喜欢成功!',
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

module.exports = router;