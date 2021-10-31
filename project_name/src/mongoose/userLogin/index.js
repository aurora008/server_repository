
const userLoginType = require("./type")
const { mongoose, Schema } = require("../connect_db")

const schema = new Schema(userLoginType);
const userLoginModel = mongoose.model("userLogin", schema);
module.exports = userLoginModel