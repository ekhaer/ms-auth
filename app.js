if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express')
const {connect} = require('./config/config')
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

app.use(express.urlencoded({ extended : false }))
app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
    res.send('okei')
})

app.use(router)
app.use(errorHandler)

connect()
    .then(async (db) => {
        console.log('mongodb is connected successfully')
        database = db
        app.listen(PORT, () => console.log('connected to port: ' + PORT))
    })
