const { MongoClient } = require('mongodb');

let database = null

async function connect() {
    try {
        const uri = 'mongodb://127.0.0.1:27017'
        const client = new MongoClient(uri, {useUnifiedTopology: true})
        await client.connect()
        const db = await client.db('ms-auth');
        database = db
        return db 
    } catch (error) {
        console.log("error ini ", error)
    }
}

function getDb() {
    return database
}

module.exports = {connect, getDb}
