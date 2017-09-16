/**
 * Created by Administrator on 2017/8/10.
 */
var Article = require('../lib/mongoose').Article;

module.exports = {
    //新增文章
    create: function(article) {
        return Article
            .create(article);
    },

    //更新文章
    updateContent: function (article_id, author, article) {
        return Article
            .update({_id: article_id, author: author}, { $set: article })
            .exec();
    },

    //删除文章
    delete: function (article_id) {
        return Article
            .remove({
            _id: article_id
            })
            .exec()
    },

    //获取单篇文章
    getArticleById: function(article_id) {
        return Article
            .findOne({ _id: article_id })
            .populate({path: 'author', select: '_id name avatar bio', model: "User"})
            .exec();
    },

    //获取作者其它文章
    getOtherArticleByAuthorId: function (data) {
        return Article
            .find({ author: data.author_id, _id: { $ne: data.article_id }})
            .select("title")
            .sort({ _id: -1 })
            .exec();
    },

    //更新文章pv
    increasePv: function (article_id) {
        return Article
            .update({ _id: article_id }, { $inc: { pv: 1 } })
            .exec();
    },

    //通过页数获取首页文章列表/用户写的文章列表/用户喜欢的文章列表
    getArticleListByActivePage: function (data) {
        var skipNumber = (data.activePage-1) * 10;
        return Article
            .find(data.article)
            .populate({path: 'author', select: 'name avatar bio', model: "User"})
            .sort({ _id: -1 })
            .skip(skipNumber)
            .limit(10)
            .exec();
    },

    //获取文章数目
    getArticlesCount: function () {
        return Article
            .count()
            .exec();
    },

    //获取用户文章数目
    getUserArticlesCount: function (user_id) {
        return Article
            .count({author: user_id})
            .exec();
    }
}