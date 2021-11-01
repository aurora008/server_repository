const express = require("express")
const userLoginRouter = express.Router()
const collectionName = "userLogin"
const { insert, sellect_one, sellect_all, update_one, remove, remove_all } = require("../../mongoose")
//const getCollectionModel=require("../../mongoose/getCollectionModel")
const userLoginModel = require("../../mongoose/userLogin")
const { get_rand_user } = require("../../constructors");

userLoginRouter.get("/post", (req, res) => {
    userLoginModel(get_rand_user()).save().then((data) => {
        console.log('data: ', data);
        res.json(data)
    }).catch((err) => {
        res.json({ message: err })
    })

})
userLoginRouter.get("/", (req, res) => {
    res.send(collectionName)
    return;
})
userLoginRouter.get("/insert", (req, res) => {
    insert(collectionName, get_rand_user(), (docs) => {
        res.json(docs)
    })
    return;
})
userLoginRouter.get("/sellect_one", (req, res) => {
    sellect_one(collectionName, { name: 'xm' }, (doc) => {
        res.json(doc)
    })
    return;
})
userLoginRouter.get("/sellect_all", (req, res) => {
    sellect_all(collectionName, {}, (docs) => {
        res.json(docs)
    });
    return;
})
userLoginRouter.get("/remove_all", (req, res) => {
    remove_all(collectionName)
    res.send("remove_all");
    return;
})
userLoginRouter.get("/remove", (req, res) => {
    let where = { id: "129" }
    let str = "remove:" + JSON.stringify(where);
    remove(collectionName, where, (success) => {
        if (success) str += " successfully"
        if (!success) str += " failed"
        res.send(str);
    })
    return;
})
userLoginRouter.get("/update_one", (req, res) => {
    let where = { id: "456" }
    let str = "update_one:" + JSON.stringify(where);
    update_one(collectionName, where, { name: "new" }, (success_info) => {
        if (success_info) str += " successfully." + JSON.stringify(success_info)
        if (!success_info) str += " failed"
        res.send(str);
    })
    return;
})
module.exports = userLoginRouter