
const userLoginModel = require("./userLogin")


module.exports = (collection_name) => {
    if (collection_name == "userLogin") return userLoginModel;

}