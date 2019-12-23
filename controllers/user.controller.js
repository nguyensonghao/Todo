const config = require('config');

const UserModel = require('../models/user.model');
const AuthHelper = require('../helpers/auth.helper');

const getInformation = async (req, res) => {
    let user = await AuthHelper.getUserWithToken(req);
    user = await UserModel.findOne({
        _id: user._id
    }, {
        email: 1,
        name: 1
    })
    
    res.json({
        status: config.get('STATUS.SUCCESS'),
        data: user
    })
}

module.exports = {
    getInformation
}