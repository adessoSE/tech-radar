const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = (app) => {

    app.get('/api/user/', async (req, res) => {
        console.log(req.query.email);
        console.log(req.query.passwort);
        let users = await User.find({
            passwort: req.query.passwort,
            email: req.query.passwort
        });
        console.log(users);
        return res.status(200).send(users);
    });

};

