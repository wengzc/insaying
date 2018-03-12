/**
 * Created by Administrator on 2017/8/10.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');

var ArticleModel = require('../models/article');
var CommentModel = require('../models/comment');
var LikeModel = require('../models/like');
var VoteModel = require('../models/vote');

//新增文章
router.post('/', function (req,res) {
    var author = req.session.user._id;
    var title = req.body.title;
    var content = req.body.content;
    var article = {
        author: author,
        title: title,
        content: content,
        created_at: moment().format('YYYY-MM-DD HH:mm'),
    };
    ArticleModel.create(article).then(function(response) {
        var article = response;
        res.json({
            message: '文章发表成功,正在跳往文章页面中...',
            article: article
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//更新文章内容
router.put('/:article_id/content', function (req,res) {
    var articleId = req.params.article_id;
    var author = req.session.user._id;
    var updatedArticle = {
        title: req.body.title,
        content: req.body.content,
        updated_at: moment().format('YYYY-MM-DD HH:mm')
    }
    ArticleModel.getArticleById(articleId).then(function(article) {
        if(article.author._id.toString() !== author.toString()) {
            throw new Error('没有权限');
        }
        ArticleModel.updateContent(articleId, author, updatedArticle).then(function (result) {
            res.json({
                message: '文章更新成功,正在跳往文章页面中...',
            })
        }).catch(function (e) {
            console.log("error:"+ e);
        })
    })
})

//获得文章喜欢
router.get('/likes', function (req, res) {
    var article = req.query.article;
    LikeModel.getArticleLikes({ article: article }).then(function (response) {
        res.json({
            likes: response,
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//删除文章
router.delete('/:article_id', function (req, res) {
    var articleId = req.params.article_id;
    var author = req.session.user._id;
    ArticleModel.getArticleById(articleId).then(function(article) {
        if(article.author._id.toString() !== author.toString()) {
            throw new Error('没有权限');
        }
        ArticleModel.delete(articleId).then(function (result) {
            CommentModel.deleteCommentsByArticleId({ article: articleId });
            CommentModel.deleteCommentsByArticleId({ root_article: articleId });
            LikeModel.deleteLikesByArticleId(articleId);
            VoteModel.deleteVotesByRootArticleId(articleId);
        }).then(function (result) {
            res.json({
                message: "文章删除成功"
            })
        })
    })
})

// //根据页数获取该页所有文章
router.get('/page/:activePage', function (req, res) {
    var activePage = req.params.activePage;
    var data = {
        article: {},
        activePage: activePage
    }
    ArticleModel.getArticleListByActivePage(data).then(function (result) {
        return Promise.all(result.map(function (article) {
            article.created_at = moment(article.created_at, 'YYYY-MM-DD HH:mm').fromNow();
            return CommentModel.getCommentsCountByArticleId(article._id).then(function (commentsCount) {
                article.commentsCount = commentsCount;
                return article;
            });
        }));
    }).then(function (articles) {
        return Promise.all(articles.map(function (article) {
            return LikeModel.getArticleLikesCount({ article: article._id }).then(function (likesCount) {
                article.likesCount = likesCount;
                return article;
            });
        }));
    }).then(function (result) {
        var articles = result;
        ArticleModel.getArticlesCount().then(function (result) {
            var articlesCount = result;
            res.json({
                articles: articles,
                articlesCount: articlesCount
            })
        });
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//获取作者其它文章
router.get('/others', function (req, res) {
    var article_id = req.query.article_id;
    ArticleModel.getArticleById(article_id).then(function (result) {
        var article = result;
        var data = {
            author_id: article.author._id,
            article_id: article_id
        }
        ArticleModel.getOtherArticleByAuthorId(data).then(function (others) {
            res.json({
                otherArticles: others
            })
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })

})

//根据页数获取用户该页所有文章
router.get('/user', function (req,res) {
    var user_id = req.query.user_id;
    var activePage = req.query.activePage;
    var data = {
        article: { author: user_id },
        activePage: activePage
    }
    ArticleModel.getArticleListByActivePage(data).then(function (result) {
        return Promise.all(result.map(function (article) {
            article.created_at = moment(article.created_at, 'YYYY-MM-DD HH:mm').fromNow();
            return CommentModel.getCommentsCountByArticleId(article._id).then(function (commentsCount) {
                article.commentsCount = commentsCount;
                return article;
            });
        }));
    }).then(function (articles) {
        return Promise.all(articles.map(function (article) {
            return LikeModel.getArticleLikesCount({ article: article._id }).then(function (likesCount) {
                article.likesCount = likesCount;
                return article;
            });
        }));
    }).then(function (result) {
        var articles = result;
        ArticleModel.getUserArticlesCount(user_id).then(function (result) {
            var articlesCount = result;
            res.json({
                articles: articles,
                articlesCount: articlesCount
            })
        });
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//根据页数获取用户该页所有喜欢的文章
router.get('/user/like', function (req,res) {
    var user_id = req.query.user_id;
    var activePage = req.query.activePage;
    var data = {
        user_id: user_id,
        activePage: activePage
    }
    LikeModel.getUserLikes(data).then(function (likes) {
            return Promise.all(likes.map(function (like) {
                return ArticleModel.getArticleById(like.article._id).then(function (article) {
                    article.content = '';
                    like.article = article;
                    return like;
                });
            }))
    }).then(function (likes) {
        return Promise.all(likes.map(function (like) {
            like.article.created_at = moment(like.article.created_at, 'YYYY-MM-DD HH:mm').fromNow();
            return CommentModel.getCommentsCountByArticleId(like.article._id).then(function (commentsCount) {
                like.article.commentsCount = commentsCount;
                return like;
            });
        }))
    }).then(function (likes) {
        return Promise.all(likes.map(function (like) {
            return LikeModel.getArticleLikesCount({ article: like.article._id }).then(function (likesCount) {
                like.article.likesCount = likesCount;
                return like;
            });
        }));
    }).then(function (likes) {
        LikeModel.getUserLikesCount(user_id).then(function(likesCount) {
            res.json({
                likes: likes,
                likesCount: likesCount
            })
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
}),

//获取单篇文章
router.get('/:article_id', function (req,res) {
    var article_id = req.params.article_id;
    ArticleModel.getArticleById(article_id).then(function (result) {
            ArticleModel.increasePv(result._id);
            return result;
    }).then(function (result) {
            var article = result;
            article.created_at = moment(article.created_at, 'YYYY-MM-DD HH:mm').fromNow();
            res.json({
                article: article
            })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

//根据评论页数获取文章该页所有评论
router.get('/:article_id/comment', function (req,res) {
    var article_id = req.params.article_id;
    var activeCommentsPage = req.query.activeCommentsPage;
    var data = {
        article_id: article_id,
        activeCommentsPage: activeCommentsPage
    }
    CommentModel.getArticleCommentList(data).then(function (comments) {
        return Promise.all(comments.map(function (comment) {
            comment.created_at = moment(comment.created_at, 'YYYY-MM-DD HH:mm').fromNow();
            return CommentModel.getCommentReplies(comment._id).then(function (replies) {
                replies.map(function (reply) {
                    reply.created_at = moment(reply.created_at, 'YYYY-MM-DD HH:mm').fromNow();
                })
                comment.replies = replies;
                return comment;
            });
        }));
    }).then(function (comments) {
        return Promise.all(comments.map(function (comment) {
            return VoteModel.getCommentVotes({comment: comment._id}).then(function (votes) {
                comment.votes = votes;
                return comment;
            })
        }))
    }).then(function(comments) {
        CommentModel.getCommentsCountByArticleId(article_id).then(function (commentsCount) {
            res.json({
                comments: comments,
                commentsCount: commentsCount
            })
        }).catch(function (e) {
            console.log("error:"+ e);
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    })
})

module.exports = router;