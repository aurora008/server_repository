
const userRegisterType = require("./type")
const { mongoose, Schema } = require("../connect_db")

const schema = new Schema(userRegisterType);
const userRegisterModel = mongoose.model("userRegister", schema);
module.exports = userRegisterModel