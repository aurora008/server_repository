const UserClass = require("../classes/UserClass");
const { first_name_cn, last_name_cn } = require("../config/users_names_config");
const { num_letters } = require("../config/user_pwd_config");

const get_last_id = () => {
    return Math.floor(Math.random() * 1000)
}
const get_rand_name = (type) => {
    let name = ""
    if (type === "en") { return name; }
    name += last_name_cn[Math.floor(Math.random() * last_name_cn.length)];
    name += first_name_cn[Math.floor(Math.random() * first_name_cn.length)];
    return name;
}
const get_rand_pwd = (type) => {
    let pwd = "";
    let pwd_len = 6;
    const num_letters_len = num_letters.length;
    if (type === "complex") { pwd_len = 12; return pwd; }
    for (let i = 0; i < num_letters_len; i++) {
        if (i === pwd_len) return pwd;
        pwd += num_letters[Math.floor(Math.random() * num_letters_len)]
    }
    return pwd;
}
const get_rand_user = () => {
    let user = { id: "", name: "", pwd: "" }
    user.id = (get_last_id() + 1);
    user.name = get_rand_name("cn");
    user.pwd = get_rand_pwd("simple");
    return new UserClass(user)
}
module.exports = { get_last_id, get_rand_name, get_rand_pwd, get_rand_user }