const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: [validateEmail, 'Email is invalid!'],
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    })
})

module.exports = mongoose.model('User', UserSchema);