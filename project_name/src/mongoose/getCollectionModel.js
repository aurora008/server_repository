
const userLoginModel = require("./userLogin")
const userRegisterModel = require("./userRegister")



module.exports = (collection_name) => {
    if (collection_name == "userLogin") return userLoginModel;
    if (collection_name == "userRegister") return userRegisterModel;

}