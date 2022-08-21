// const bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
const CRYPTO_SECRET = process.env.CRYPTO_SECRET;

// function hashPassw(plainPassw) {
//     let ciphertext = CryptoJS.AES.encrypt(plainPassw, 'secret key 123').toString();
//     // return bcrypt.hashSync(plainPassw, 8);
//     return ciphertext
// }

function comparePassw(plainPassw, encryptPassw) {
    let bytes  = CryptoJS.AES.decrypt(encryptPassw, CRYPTO_SECRET);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("oritext ", originalText)
    if (plainPassw === originalText) {
        return true
    } else {
        return false
    }
}


module.exports = {
    comparePassw
}