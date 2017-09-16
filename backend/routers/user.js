/**
 * Created by Administrator on 2017/8/3.
 */
var fs = require('fs');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var path = require('path');

var UserModel = require('../models/user');
var ArticleModel = require('../models/article');
var CommentModel = require('../models/comment');
var LikeModel = require('../models/like');
var VoteModel = require('../models/vote');


var  multer=require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, 'avatar' + '_' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//添加配置文件到muler对象
var upload = multer({
    storage: storage
});

var crypto = require('crypto');

//生成随机盐
const creatSalt = function () {
    var time = Date.now() % 100,
        str = '';
    time = time === 0 ? '00' : String(time);
    for (var i = 0; i < 8; i++) {
        const base = Math.random() < 0.5 ? 65 : 97;
        str += String.fromCharCode(
            base +
            Math.floor(
                Math.random() * 26
            )
        );
    }
    return time + str;
}
const md5 = function (text) {
    return crypto.createHash("md5").update(String(text)).digest("hex");
}
const encrypt = function (password, salt) {
    return md5(md5(password) + salt);
}

//通过cookie获取用户信息
router.get('/',function (req,res) {
    var user_id;
    var isLogin = false;
    if(!req.session.user) {
        res.json({
            isLogin: isLogin,
            user: {
                _id: "",
                name: "",
                password: '',
                salt: '',
                avatar: '',
                created_at: ''
            }
        })
    } else {
        isLogin = true;
        user_id = req.session.user._id;
        UserModel.getUserById(user_id).then(function (result) {
            var user = result;
            user.password = '';
            user.salt = '';
            res.json({
                isLogin: isLogin,
                user: user
            })
        }).catch(function (e) {
            console.log("error:"+ e);
        });
    }
});

//注册
router.post('/',function(req,res) {
    var name = req.body.username;
    var password = req.body.password;
    UserModel.getUserByName(name).then(function(result) {
        var userCheck = result;
        if(userCheck){
            res.json({
                message: '"' + name + '" 已经存在,请更换名字重新注册!'
            })
        } else {
            var salt = creatSalt();
            password = encrypt(password, salt);
            var newuser = {
                name: name,
                password: password,
                salt: salt,
                created_at: moment().format('YYYY-MM-DD HH:mm')
            };
            UserModel.create(newuser).then(function (result) {
                var user = result;
                    user.password = '';
                    user.salt = '';
                req.session.user = user;
                res.json({
                    isLogin: true,
                    message: '注册成功,正在跳往首页中...',
                    user: user
                })
            }).catch(function (e) {
                console.log("error:"+ e);
            })
        }
    }).catch(function (e) {
        console.log("error:"+ e);
    });
});

//更新用户基本资料
router.put('/basics', function (req,res) {
    var email = req.body.email;
    var bio = req.body.bio;
    var github = req.body.github;
    var website = req.body.website;
    var user_id = req.session.user._id;

    var updatedUser = {
        email: email,
        bio: bio,
        website: website,
        github: github
    }
    UserModel.update(user_id, updatedUser).then(function(result) {
        res.json({
            message: '设置成功!'
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//更新用户密码
router.put('/password', function (req,res) {
    var originalPassword = req.body.originalPassword;
    var salt = creatSalt();
    var newPassword = encrypt(req.body.newPassword, salt);
    var user_id = req.session.user._id;
    var updatedUser = {
        password: newPassword,
        salt: salt
    }
    UserModel.getUserById(user_id).then(function (user) {
        originalPassword = encrypt(originalPassword, user.salt);
        if(originalPassword !== user.password) {
            res.json({
                changeResult: false,
                errorMsg: '原密码输入错误!'
            })
        } else {
            UserModel.update(user_id, updatedUser).then(function(result) {
                res.json({
                    changeResult: true,
                    successMsg: '密码更改成功!'
                })
            }).catch(function (e) {
                console.log("error:"+ e);
            });
        }
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//更新用户头像文件
router.put('/avatar', upload.single('files'), function(req, res) {
    var newAvatar = req.file.path.split(path.sep).pop();
    var user_id = req.session.user._id;
    var updatedUser = {
        avatar: newAvatar
    }
    UserModel.getUserById(user_id).then(function (result) {
        if(result.avatar !== 'default.png') {
            fs.unlink( 'public/img/' + result.avatar);
        }
        return result;
    }).then(function(result) {
        UserModel.update(user_id, updatedUser).then(function(result) {
            res.json({
                message: '头像更换成功!'
            })
        }).catch(function (e) {
            console.log("error:"+ e);
        });
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//登陆
router.post('/session',function (req,res) {
    var name = req.body.username;
    var password = req.body.password;

    UserModel.getUserByName(name).then(function(user) {
        if(!user){
            res.json({
                isLogin: false,
                message: '"' + name + '" 用户不存在!'
            })
        } else{
            password = encrypt(password, user.salt);
            if ( password !== user.password ) {
            res.json({
                isLogin: false,
                message: '用户名或密码错误!'
            })
            } else {
                user.password = '';
                user.salt = '';
                req.session.user = user;
                res.json({
                    isLogin: true,
                    message: '登陆成功,正在跳转中...',
                    user: user
            });
            }
        }
    })
})

//登出
router.delete('/session',function (req,res) {
    req.session.user = null;
    res.end();
})

//通过_id获取用户信息
router.get('/:id', function (req,res) {
    var _id = req.params.id;

    UserModel.getUserById(_id).then(function (result) {
        res.json({
            user: result
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户收获的评论
router.get('/received/comments', function (req, res) {
    var user_id = req.query.user_id;
    CommentModel.getUserReceivedComments(user_id).then(function (response) {
        response.map(function (comment) {
            comment.created_at = moment(comment.created_at, 'YYYY-MM-DD HH:mm').fromNow();
        })
        res.json({
            comments: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户收获的喜欢
router.get('/received/likes', function (req, res) {
    var user_id = req.query.user_id;
    LikeModel.getUserReceivedLikes(user_id).then(function (response) {
        response.map(function (like) {
            like.created_at = moment(like.created_at, 'YYYY-MM-DD HH:mm').fromNow();
        })
        res.json({
            likes: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户收获的赞同
router.get('/received/votes', function (req, res) {
    var user_id = req.query.user_id;
    VoteModel.getUserReceivedVotes(user_id).then(function (response) {
        response.map(function (vote) {
            vote.created_at = moment(vote.created_at, 'YYYY-MM-DD HH:mm').fromNow();
        })
        res.json({
            votes: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户新收到的未读的评论数目
router.get('/received/new/comments/count', function (req, res) {
    var user_id = req.query.user_id;
    CommentModel.getUserNewReceivedCommentsCount(user_id).then(function (response) {
        res.json({
            commentsCount: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//更新用户新收获的评论的status(标志为已读)
router.put('/received/comments', function (req, res) {
    var user_id = req.body.user_id;
    CommentModel.updateUserNewReceivedCommentsStatus(user_id).then(function (response) {
        res.end();
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户新收到的未读的喜欢数目
router.get('/received/new/likes/count', function (req, res) {
    var user_id = req.query.user_id;
    LikeModel.getUserNewReceivedLikesCount(user_id).then(function (response) {
        res.json({
            likesCount: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//更新用户新收获的喜欢的status(标志为已读)
router.put('/received/likes', function (req, res) {
    var user_id = req.body.user_id;
    LikeModel.updateUserNewReceivedLikesStatus(user_id).then(function (response) {
        res.end();
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户新收到的未读的赞同数目
router.get('/received/new/votes/count', function (req, res) {
    var user_id = req.query.user_id;
    VoteModel.getUserNewReceivedVotesCount(user_id).then(function (response) {
        res.json({
            votesCount: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//更新用户新收获的赞同的status(标志为已读)
router.put('/received/votes', function (req, res) {
    var user_id = req.body.user_id;
    VoteModel.updateUserNewReceivedVotesStatus(user_id).then(function (response) {
        res.end();
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//通过user_id和评论页数获取该页所有评论
router.get('/:id/comments', function (req, res) {
    var user_id = req.params.id;
    var activeCommentsPage = req.query.activeCommentsPage;
    var data = {
        user_id: user_id,
        activeCommentsPage: activeCommentsPage
    }
    CommentModel.getUserCommentList(data).then(function (result) {
        var comments = result;
            comments.map(function (comment) {
                comment.created_at = moment(comment.created_at, 'YYYY-MM-DD HH:mm').fromNow();
            })
        return comments;

    }).then(function (comments) {
        CommentModel.getCommentsCountByUserId(user_id).then(function (commentsCount) {
            res.json({
                comments: comments,
                commentsCount: commentsCount
            })
        }).catch(function (e) {
            console.log("error:"+ e);
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户收获的喜欢数目
router.get('/received/likes/count', function (req, res) {
    var user_id = req.query.user_id;
    LikeModel.getUserReceivedLikesCount(user_id).then(function (response) {
        res.json({
            receivedlikesCount: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户喜欢的文章数目
router.get('/likes/count', function (req, res) {
    var user_id = req.query.user_id;
    LikeModel.getUserLikesCount(user_id).then(function (response) {
        res.json({
            userlikesCount: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})

//获取用户写的文章数目
router.get('/articles/count', function (req, res) {
    var user_id = req.query.user_id;
    ArticleModel.getUserArticlesCount(user_id).then(function (response) {
        res.json({
            userArticlesCount: response
        })
    }).catch(function (e) {
        console.log("error:"+ e);
    });
})



module.exports = router;