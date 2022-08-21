const Login = require('../models/login')
const { comparePassw } = require('../helper/bcrypt');
const { generateToken, generateRefreshToken } = require('../helper/jwt');
const axios = require('axios').default;
const baseUrl = process.env.SERVICE_USER_BASE_URL;
const { setExpire } = require('../helper/date')
const { verify, verifyRefreshToken } = require("../helper/jwt");

class LoginController {
    static async login(req, res, next) {
        try {
            console.log("login", req.body)
            let data = req.body
            const request = `${baseUrl}/validate`;
            const response = await axios.post(request, data);
            if (response.data.isValid) {
                let user = response.data;
                // const isPasswMatch = comparePassw(user.password)
                const isPasswMatch = comparePassw(data.password, user.password)
                if (!isPasswMatch) {
                    res.status(401).json({ message: "Invalid Email / Password" })
                } else {
                    //generate token jwt
                    const access_token = generateToken({
                        _id: user._id,
                        username: user.username,
                        role: user.role
                    })
                    const refresh_token = generateRefreshToken({
                        _id: user._id,
                        username: user.username,
                        role: user.role
                    })
                    //check the collection
                    const isLogin = await Login.findById(user._id)
                    if (!isLogin) {
                        //create
                        const logged = {
                            user_id: user._id,
                            access_token,
                            refresh_token,
                        }
                        await Login.add(logged)
                    } else {
                        //update
                        const data = { access_token, refresh_token }
                        console.log("update deh", data)

                        await Login.update(user._id, data)
                    }
                    res.status(200).json({ access_token, refresh_token })
                }
            } else {
                throw next({
                    name: "user not found"
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async refreshToken(req, res, next) {
        const { refreshToken } = req.body;
        const user = verifyRefreshToken(refreshToken)
        const getAccessToken = generateToken({
            _id: user._id,
            username: user.username,
            role: user.role
        })
        const getRefreshToken = generateRefreshToken({
            _id: user._id,
            username: user.username,
            role: user.role
        })
        res.status(200).json({ access_token: getAccessToken, refreshToken: getRefreshToken })
    }

    static async logout(req, res, next) {
        const { refresh_token } = req.body;
        try {
            const user = verifyRefreshToken(refresh_token)
            if (user) {
                //delete refresh token in db
                await Login.deleteRefreshToken(user._id)
                res.status(200).json("successfully logout")
            }

        } catch (error) {
            next(error)
        }
    }

    static async verify(req, res, next) {
        let data = req.body;
        //check isExist
        try {
            const isExist = await Login.findByToken(data.access_token)
            if (!isExist) {
                throw {
                    name: "InvalidJWT"
                }
            } else {
                if (isExist.refresh_token !== "") {
                    const verifying = verify(data.access_token)
                    if (verifying) {
                        let output = {
                            _id: verifying._id,
                            username: verifying.username,
                            role: verifying.role
                        }
                        res.status(200).json(output)
                    }
                } else {
                    throw {
                        name: "refresh_token_expired"
                    }
                }
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = LoginController