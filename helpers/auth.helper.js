const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id
    }, process.env.JWT_KEY);
}

const getUserWithToken = (req) => {            
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization) {
            let token = req.headers.authorization;
            try {
                jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decode);
                    }
                })
            } catch (error) {
                reject(error);
            }
        } else {
            resolve(null);
        }
    })
}

module.exports = {
    generateToken,
    getUserWithToken
}