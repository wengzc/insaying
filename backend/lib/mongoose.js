/**
 * Created by Administrator on 2017/8/3.
 */
var config = require('config-lite')(__dirname);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb,{useMongoClient: true});

// var moment = require('moment');

var UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    password: { type: String },
    salt: { type: String },
    avatar: { type: String, default: 'default.png' },
    bio: { type: String, default: '这个人很懒，还没有添加任何描述...' },
    email: { type: String },
    github: { type: String },
    website: { type: String },
    created_at: { type: String},
});


var ArticleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    content: { type: String },
    pv: { type: Number, default: 0 },
    created_at: { type: String},
    updated_at: { type: String},
    commentsCount: { type: Number },
    likesCount: { type: Number }
})

var CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId },
    receiver: { type: mongoose.Schema.Types.ObjectId },
    reply_comment: { type: mongoose.Schema.Types.ObjectId },
    root_comment: { type: mongoose.Schema.Types.ObjectId },
    root_article: { type: mongoose.Schema.Types.ObjectId },
    content: { type: String },
    article: { type: mongoose.Schema.Types.ObjectId },
    created_at: { type: String},
    replies: {},
    votes: {},
    status: { type: Number, default: 0 },
})

var LikeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId },
    receiver: { type: mongoose.Schema.Types.ObjectId },
    article: { type: mongoose.Schema.Types.ObjectId },
    created_at: { type: String },
    status: { type: Number, default: 0},
})

var VoteSchema = new mongoose.Schema(({
    user: { type: mongoose.Schema.Types.ObjectId },
    receiver: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: mongoose.Schema.Types.ObjectId },
    root_article: { type: mongoose.Schema.Types.ObjectId },
    created_at: { type: String },
    status: { type: Number, default: 0},
}))


exports.User = mongoose.model('User', UserSchema);
exports.Article = mongoose.model('Article', ArticleSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.Like = mongoose.model('Like', LikeSchema);
exports.Vote = mongoose.model('Vote', VoteSchema);