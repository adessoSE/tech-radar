const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {

    app.get('/api/user/', async (req, res) => {
        let users = await User.find({
            email: req.query.email,
            passwort: req.query.passwort
        });
        return res.status(200).send(users);
    });

};

