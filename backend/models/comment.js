/**
 * Created by Administrator on 2017/8/10.
 */
var Comment = require('../lib/mongoose').Comment;

module.exports = {
    //新增评论
    create: function (comment) {
        return Comment
            .create(comment);
    },

    //获取文章评论列表
    getArticleCommentList: function (data) {
        var skipNumber = (data.activeCommentsPage-1) * 10;
        return Comment
            .find({
                article: data.article_id
            })
            .populate({path: 'author', select: 'name avatar ', model: "User"})
            .sort({ _id: 1 })
            .skip(skipNumber)
            .limit(10)
            .exec();
    },

    //获取一条评论下的所有回复
    getCommentReplies: function (root_comment) {
        return Comment
            .find({ root_comment: root_comment })
            .populate([
                {path: 'author', select: 'name avatar ', model: "User"},
                {path: 'receiver', select: 'name avater', model: "User"}
                ])
            .exec();
    },

    //获取文章评论数目
    getCommentsCountByArticleId: function(article_id) {
        return Comment
            .count({ $or: [{article: article_id},{root_article: article_id}] })
            .exec();
    },

    //获取用户评论列表
    getUserCommentList: function (data) {
        var skipNumber = (data.activeCommentsPage-1) * 10;
        return Comment
            .find({
                author: data.user_id
            })
            .populate([
                {path: 'author', select: 'name avatar', model: "User"},
                {path: 'article', select: 'title', model: 'Article'},
                {path: 'root_article', select: 'title', model: 'Article'},
                {path: 'receiver', select: 'name avater', model: "User"}
            ])
            .sort({ _id: -1 })
            .skip(skipNumber)
            .limit(10)
            .exec();
    },

    //获取用户评论数目
    getCommentsCountByUserId: function (user_id) {
        return Comment
            .count({ author: user_id })
            .exec();
    },

    //通过article_id删除文章对应所有评论
    deleteCommentsByArticleId: function (data) {
        return Comment
            .remove(data)
            .exec();
    },

    //通过comment_id删除一条评论
    deleteCommentByCommentId: function(data) {
        return Comment
            .remove(data)
            .exec();
    },

    //获取用户收到的所有评论
    getUserReceivedComments: function (user) {
        return Comment
            .find({ receiver: user })
            .populate([
                { path: 'author', select: 'name avatar', model: "User" },
                { path: 'article', select: 'title', model: 'Article' },
                { path: 'reply_comment', select: 'content', model: 'Comment' },
                { path: 'root_article', select: 'title', model: 'Article' },
                { path: 'receiver', select: 'name avater', model: "User" }
            ])
            .sort({ _id: -1 })
            .exec();
    },

    //获取用户新收到的未读的评论数目
    getUserNewReceivedCommentsCount: function (user) {
        return Comment
            .count({ receiver: user, status: 0 })
            .exec();
    },

    //更新用户新收获的评论的status(标志为已读)
    updateUserNewReceivedCommentsStatus: function (user) {
        return Comment
            .update({ receiver: user, status: 0 }, { $set: { status: 1 } }, { multi: true })
            .exec();
    }

}