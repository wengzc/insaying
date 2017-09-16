/**
 * Created by Administrator on 2017/8/3.
 */
module.exports = {
    port: 8000,
    // port: 3100,
    session: {
        secret: 'blog',
        key: 'blog',
        maxAge: 2592000000
    },
    mongodb: ''
    //set the MongoDB connection string to access your new database.
};
