/**
 * Created by Administrator on 2017/8/3.
 */
var moment = require('moment');
    moment.locale('zh-cn');

module.exports = function(app) {

    app.use('/user', require('./user'));
    app.use('/article', require('./article'));
    app.use('/comment', require('./comment'));
    app.use('/like', require('./like'));
    app.use('/vote', require('./vote'));
}
