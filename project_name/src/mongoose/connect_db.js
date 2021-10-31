const config = require("../config")

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(config.mongodb_url + config.db_name);
mongoose.connection.once('open', () => {
    console.log('已连接数据库: ', config.db_name);
})
mongoose.connection.once('close', () => {
    console.log('已关闭数据库: ', config.db_name);
})
module.exports = { mongoose, Schema }