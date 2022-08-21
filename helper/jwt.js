const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(payload) {
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

function verify(token) {
    console.log(token)
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { generateToken, verify }