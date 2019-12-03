const mongoose = require('mongoose');
const User = mongoose.model('user_collection');

module.exports = (app) => {

    app.get('/api/user/', async (req, res) => {
        let users = await User.find(function (mail){mail.email && mail.name});
        return res.status(200).send(users);
    });

};

