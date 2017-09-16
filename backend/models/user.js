/**
 * Created by Administrator on 2017/8/3.
 */
var User = require('../lib/mongoose').User;

module.exports = {
    //新增用户
    create: function(user) {
        return User.create(user);
    },

    //更新用户信息
    update: function (user_id, updatedUser) {
        return User
            .update({ _id: user_id}, { $set: updatedUser})
            .exec();
    },

    // 通过用户名获取用户信息
    getUserByName: function(name) {
        return User
            .findOne({ name: name })
            .exec();
    },

    // 通过_id获取用户信息
    getUserById: function(_id) {
        return User
            .findOne({ _id: _id })
            .exec();
    },
};


