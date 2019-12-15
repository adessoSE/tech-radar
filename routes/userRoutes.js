const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = (app) => {

    app.get('/api/user/',async (req, res) => {
        let users = await User.find({
            email: req.query.email,
            passwort: req.query.passwort
        });
        return res.status(200).send(users);
    });
    app.post(`/api/user`, async (req, res) => {
        let user = await User.findOne(req.body);
        return res.status(200).send({
            error: false,
            user
        })
    })
};

