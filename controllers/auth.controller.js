const config = require('config');

const UserService = require('../services/user.service');
const AuthHelper = require('../helpers/auth.helper');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            let user = await UserService.login(email, password);
            user.password = undefined;
            let token = await AuthHelper.generateToken(user);
            res.json({
                status: config.get('STATUS.SUCCESS'),
                data: { token, user }
            })
        } catch (error) {
            res.json({
                status: config.get('STATUS.ERROR'),
                message: error.message
            })
        }
    } else {
        res.json({
            status: config.get('STATUS.ERROR'),
            message: 'Email and password are required!'
        })
    }    
}

const register = async (req, res) => {
    const { email, name, password } = req.body;
    if (email && password && name) {
        try {
            await UserService.register({email, password, name});
            res.json({
                status: config.get('STATUS.SUCCESS')
            })
        } catch (error) {
            res.json({
                status: config.get('STATUS.ERROR'),
                message: error.message
            })
        }
    } else {
        res.json({
            status: config.get('STATUS.ERROR'),
            message: 'Email, username and password are required!'
        })
    }    
}

module.exports = {
    login,
    register
}