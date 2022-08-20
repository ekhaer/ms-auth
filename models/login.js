const { getDb } = require('../config/config')
const ObjectId = require('mongodb').ObjectID;

class Login {

    static async add(token) {
        return getDb().collection('access_token').insertOne(token)
    }

    static async findById(id) {
        return getDb().collection('access_token').findOne({"user_id" : id})
    }

    static async findByToken(token) {
        return getDb().collection('access_token').findOne({"access_token" : {'$regex': token}})
    }

    static async update(id, data) {
        return getDb().collection('access_token').updateOne({"user_id" : id}, { $set : {access_token : data.access_token, expired_time : data.expired_time}})
    }
}

module.exports = Login