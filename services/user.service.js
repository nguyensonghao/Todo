const bcrypt = require('bcrypt');

const UserModel = require('../models/user.model');

const login = async (email, password) => {
    const user = await UserModel.findOne({
        email: email        
    })

    if (user) {
        const isPasswordMatch = await bcrypt.compare(user.password, password)
        if (isPasswordMatch) {
            throw new Error('Password is incorrect!');
        } else {
            return user;
        }
    } else {
        throw new Error('Email is not exist!');
    }    
}

const register = async (user) => {
    const userModel = new UserModel();
    userModel.email = user.email;
    userModel.name = user.name;
    userModel.password = user.password;
    await userModel.save();
    return userModel;
}

module.exports = {
    login,
    register
}