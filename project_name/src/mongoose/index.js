
//const { mongoose, Schema } = require("./connect_db")
const getCollectionModel = require("./getCollectionModel")
//
//

//更新数据，按条件
const update_one = async (collection_name, where, new_obj, callback) => {
    const collection_model = getCollectionModel(collection_name)
    collection_model.updateOne(where, { $set: new_obj }, {}, (err, raw) => {
        if (err) {
            console.log('更新失败: ', err);
            callback(false);
            return;
        }
        if (raw.matchedCount === 0) {
            console.log('更新失败matchedCount: ', raw.matchedCount);
            callback(false);
            return;
        }
        if (raw.matchedCount) {
            console.log('已更新: ', where);
            callback(true);
            return;
        }
        if (raw.upsertedCount) {
            console.log('未匹配到但已插入: ', raw.upsertedCount);
            callback(true);
            return;
        }
        return;
    })
}
//插入数据 已测试
const insert = async (collection_name, obj, callback) => {
    const collection_model = getCollectionModel(collection_name)
    collection_model.create(obj, (err, docs) => {
        if (err) {
            console.log('插入没有成功: ', JSON.stringify(obj));
            callback(false)
        }
        if (!err) {
            console.log('插入成功: ', JSON.stringify(obj));
            callback(true)
        }
    })
    return;
}
//查询数据,按条件，返回最后一条数据 已测试
const sellect_last = async (collection_name, where, callback) => {
    const collection_model = getCollectionModel(collection_name)
    collection_model.find(where).sort({ _id: -1 }).limit(1).exec((err, docs) => {
        if (err) return undefined
        callback(docs)
        return docs
    })
}
//查询数据,按条件，返回一条数据 已测试
const sellect_one = async (collection_name, where, callback) => {
    const collection_model = getCollectionModel(collection_name)
    collection_model.findOne(where, (err, doc) => {
        if (err) {
            console.log('查询所有数据出错: ', err);
            return undefined
        }
        if (!err) {
            console.log('已查询第一条数据: ', JSON.stringify(doc));
            callback(doc)
            return doc;
        }
    })
}
//查询数据，按条件，返回集合所有数据 已测试
const sellect_all = async (collection_name, where, callback) => {
    const collection_model = getCollectionModel(collection_name)
    collection_model.find(where, (err, docs) => {
        if (err) {
            console.log('查询所有数据出错: ', err);
            return undefined
        }
        if (!err) {
            console.log('已查询所有数据: ', docs.length);
            callback(docs)
            return docs;
        }
    })
}
//移除数据，按条件 已测试
const remove = async (collection_name, where, callback) => {
    const collection_model = getCollectionModel(collection_name)
    collection_model.find(where, (err, docs) => {
        if (err) {
            console.log('查询数据出错: ', err);
            callback(false);
            return;
        }
        docs.forEach((item, index, arr) => {
            item.remove((_err, doc) => {
                if (_err) {
                    console.log('移除数据失败: ', JSON.stringify(doc));
                    callback(false)
                    return;
                }
                if (!_err) { console.log('已移除数据: ', JSON.stringify(doc)); }
            })
        });
        callback(true)
        return;

    })
}
//移除数据，清除集合 已测试
const remove_all = async (collection_name, callback) => {
    const collection_model = getCollectionModel(collection_name)
    await collection_model.deleteMany({}, (err) => {
        if (err) { console.log('清除集合失败: ', err); callback(false); return; }
        console.log('已清除清除集合: ', collection_name);
        callback(true);
    })
    return;
}

module.exports = { insert, sellect_one, sellect_all, update_one, remove, remove_all, sellect_last }









