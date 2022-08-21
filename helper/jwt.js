const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateToken(payload) {
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

function verify(token) {
    console.log(token)
    const options = {
        expiresIn: '1h'
    }
    return jwt.verify(token, JWT_SECRET, options)
}

function generateRefreshToken(payload) {
    const options = {
        expiresIn: '1y'
    }
    return jwt.sign(payload, JWT_REFRESH_SECRET, options)
}

function verifyRefreshToken(token) {
    console.log(token)
    const options = {
        expiresIn: '1h'
    }
    return jwt.verify(token, JWT_REFRESH_SECRET)
}

module.exports = { generateToken, verify, generateRefreshToken, verifyRefreshToken }