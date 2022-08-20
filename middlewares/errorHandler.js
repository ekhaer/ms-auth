module.exports = (err, req, res, next) => {
    if (err.name === "InvalidJWT") {
        res.status(401).json({ message : 'Wrong/Invalid JWT'})
    } else if (err.name === 'NoAccess') {
        res.status(401).json({ message : 'Unauthorized User'})
    } else if (err.name === 'user not found') {
        res.status(401).json({ message : 'User Not Found'})
    } else {
        res.status(500).json({ message : err.message || 'Internal Server Error'})
    }
}