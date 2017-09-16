/**
 * Created by Administrator on 2017/9/8.
 */
var Like = require('../lib/mongoose').Like;

module.exports = {
    //新增喜欢
    create: function (like) {
        return Like.create(like)
            // .exec();
    },

    //删除喜欢
    delete: function (data) {
        return Like
            .remove({ article: data.article, user: data.user })
            .exec();
    },

    //通过article_id删除文章对应所有喜欢
    deleteLikesByArticleId: function (article_id) {
        return Like
            .remove({article: article_id})
            .exec();
    },

    //获得文章的喜欢
    getArticleLikes: function (data) {
        return Like
            .find(data)
            .populate({ path: 'user', select: 'name avatar', model: "User" })
            .exec();
    },

    //获得用户的喜欢
    getUserLikes: function (data) {
        var skipNumber = (data.activePage-1) * 10;
        return Like
            .find({
                user: data.user_id
            })
            .populate({ path: 'article', model: "Article" })
            .sort({ _id: -1 })
            .skip(skipNumber)
            .limit(10)
            .exec();
    },

    //获得文章的喜欢数目
    getArticleLikesCount: function (data) {
        return Like
            .count(data)
            .exec();
    },

    //获得用户喜欢的文章的数目
    getUserLikesCount: function (user) {
        return Like
            .count({ user: user })
            .exec();
    },

    //获得用户收获的喜欢
    getUserReceivedLikes: function (user) {
        return Like
            .find({
                receiver: user
            })
            .populate([
                { path: 'article', select: 'title', model: 'Article' },
                { path: 'user', select: 'name avatar', model: "User" }
                ])
            .sort({ _id: -1 })
            .exec();
    },

    //获得用户收获的喜欢总数目
    getUserReceivedLikesCount: function (user) {
        return Like
            .count({ receiver: user })
            .exec();
    },

    //获得用户新收获的未读的喜欢数目
    getUserNewReceivedLikesCount: function (user) {
        return Like
            .count({ receiver: user, status: 0 })
            .exec();
    },

    //更新用户新收获的喜欢的status(标志为已读)
    updateUserNewReceivedLikesStatus: function (user) {
        return Like
            .update({ receiver: user, status: 0 }, { $set: { status: 1 } },{ multi: true })
            .exec();
    }
}