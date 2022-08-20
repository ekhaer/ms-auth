const bcrypt = require('bcrypt');

function hashPassw(plainPassw) {
    return bcrypt.hashSync(plainPassw, 8);
}

function comparePassw(plainPassw, encryptPassw) {
    return bcrypt.compareSync(plainPassw, encryptPassw);
}

module.exports = {
    hashPassw, comparePassw
}