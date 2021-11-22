const collectionName = "userRegister"
const express = require("express")
const userRegisterRouter = express.Router()
const cors = require("cors")
userRegisterRouter.use(cors())
const { insert, sellect_last, sellect_all, update_one, remove, remove_all } = require("../../mongoose")
const { get_rand_name, get_rand_pwd } = require("../../constructors/createUserRendom");

userRegisterRouter.get("/", (req, res) => {
    res.send(`${collectionName}`)
    return;
})
userRegisterRouter.get("/insert", (req, res) => {
    let register_user = {
        id: 1000,
        name: get_rand_name('cn'),
        pwd: get_rand_pwd("simple")
    }
    sellect_last(collectionName, {}, (docs) => {
        if (docs.length) {
            register_user.id = docs[0].id + 1
        }
        insert(collectionName, register_user, (inserted) => {
            if (inserted) res.json(register_user)
            if (!inserted) res.json({})
        })
    })
    return;
})
userRegisterRouter.get("/to_register", (req, res) => {
    let register_user = {
        id: 1000,
        name: req.query.name,
        pwd: req.query.pwd
    }
    sellect_last(collectionName, {}, (docs) => {
        if (docs.length) {
            register_user.id = docs[0].id + 1
        }
        insert(collectionName, register_user, (inserted) => {
            if (inserted) res.json(register_user)
            if (!inserted) res.json({})
        })
    })
    return;
})
userRegisterRouter.get("/to_register/:name/:pwd", (req, res) => {
    let register_user = {
        id: 1000,
        name: req.params.name,
        pwd: req.params.pwd
    }
    sellect_last(collectionName, {}, (docs) => {
        if (docs.length) {
            register_user.id = docs[0].id + 1
        }
        insert(collectionName, register_user, (inserted) => {
            if (inserted) res.json(register_user)
            if (!inserted) res.json({})
        })
    })
    return;
})
userRegisterRouter.get("/sellect", (req, res) => {
    let where = JSON.parse(req.query.where)
    sellect_all(collectionName, where, (docs) => {
        res.json(docs)
    })
    return;
})
userRegisterRouter.get("/sellect_last", (req, res) => {
    sellect_last(collectionName, {}, (doc) => {
        res.json(doc)
    })
    return;
})
userRegisterRouter.get("/sellect_all", (req, res) => {
    //res.setHeader("Access-Control-Allow-Origin","*")
    sellect_all(collectionName, {}, (docs) => {
        res.json(docs)
    });
    return;
})
userRegisterRouter.get("/remove", (req, res) => {
    let where = { id: req.query.id }
    remove(collectionName, where, (success) => {
        if (success) res.json({ result: true })
        if (!success) res.json({ result: false })
    })
    return;
})
userRegisterRouter.get("/remove/:id", (req, res) => {
    let where = { id: req.params.id }
    remove(collectionName, where, (success) => {
        if (success) res.json({ result: true })
        if (!success) res.json({ result: false })
    })
    return;
})
userRegisterRouter.get("/remove_all", (req, res) => {
    remove_all(collectionName, (deleted) => {
        if (deleted) res.json({ result: true });
        if (!deleted) res.json({ result: false });
    })
    return;
})
userRegisterRouter.get("/update/:_id", (req, res) => {
    let where = { _id: req.params._id }
    let to_update = {};
    if (req.query.name) to_update.name = req.query.name
    if (req.query.pwd) to_update.pwd = req.query.pwd
    if (JSON.stringify(to_update) === "{}") return;
    update_one(collectionName, where, to_update, (updated) => {
        if (updated) res.json({ result: true })
        if (!updated) res.json({ result: false })
    })
    return;
})
userRegisterRouter.get("/update/:id", (req, res) => {
    let where = { id: req.params.id }
    let to_update = {};
    if (req.query.name) to_update.name = req.query.name
    if (req.query.pwd) to_update.name = req.query.pwd
    if (JSON.stringify(to_update) === "{}") return;
    update_one(collectionName, where, to_update, (updated) => {
        if (updated) res.json({ result: true })
        if (!updated) res.json({ result: false })
    })
    return;
})
module.exports = userRegisterRouter