/**
 * Created by Administrator on 2017/9/9.
 */
var Vote = require('../lib/mongoose').Vote;

module.exports = {
    //新增赞同
    create: function (like) {
        return Vote
            .create(like);
    },

    //删除赞同
    delete: function (data) {
        return Vote
            .remove({ comment: data.comment, user: data.user })
            .exec();
    },

    //删除文章时通过comment_id删除评论的赞同
    deleteVotesByCommentId: function (comment_id) {
        return Vote
            .remove({ comment: comment_id })
            .exec();
    },

    ///删除文章时通过root_article删除文章评论的赞同
    deleteVotesByRootArticleId: function (root_article) {
        return Vote
            .remove({ root_article: root_article })
            .exec();
    },

    //获得评论的赞同
    getCommentVotes: function (data) {
        return Vote
            .find(data)
            .populate({ path: 'user', select: 'name avatar', model: "User" })
            .exec();
    },

    //获取用户新收到的未读的赞同数目
    getUserNewReceivedVotesCount: function (user) {
        return Vote
            .count({ receiver: user, status: 0 })
            .exec();
    },

    //获得用户收获的赞同
    getUserReceivedVotes: function (user) {
        return Vote
            .find({
                receiver: user
            })
            .populate([
                { path: 'root_article', select: 'title', model: 'Article' },
                { path: 'comment', select: 'content', model: 'Comment' },
                { path: 'user', select: 'name avatar', model: "User" }
            ])
            .sort({ _id: -1 })
            .exec();
    },

    //更新用户新收获的赞同的status(标志为已读)
    updateUserNewReceivedVotesStatus: function (user) {
        return Vote
            .update({ receiver: user, status: 0 }, { $set: { status: 1 } }, { multi: true })
            .exec();
    }
}