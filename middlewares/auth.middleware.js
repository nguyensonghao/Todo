const config = require('config');

const AuthHelper = require('../helpers/auth.helper');

const login = async (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization) {
        try {
            let user = await AuthHelper.getUserWithToken(req);
            if (user) {
                next();
            } else {
                res.json({
                    status: config.get('STATUS.ACCESS_DENIED')
                })
            }   
        } catch (error) {
            res.json({
                status: config.get('STATUS.ERROR'),
                message: error.message
            })    
        }        
    } else {
        res.json({
            status: config.get('STATUS.ACCESS_DENIED')
        })
    }
}

module.exports = {
    login
}