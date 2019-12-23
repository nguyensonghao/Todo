const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', (err) => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Mashape-Authorization, X-File-Name, Cache-Control, Access-Control-Max-Age, portal, token, name, portalid, targetid");
    next();
})

const auth = require('./routes/auth');
const user = require('./routes/user');
app.use('/auth', auth);
app.use('/user', user);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})