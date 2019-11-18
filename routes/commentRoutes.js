const mongoose = require('mongoose');
const Comment = mongoose.model('comments');

module.exports = (app) => {

    app.get(`/api/comment`, async (req, res) => {
        let comments = await Comment.find();
        return res.status(200).send(comments);
    });

    app.post(`/api/comment`, async (req, res) => {
        let comments = await Comment.create(req.body);
        return res.status(201).send({
            error: false,
            comment: comments
        })
    });
};

//TODO bisher nur beispiel endpoints, um zu testen, dass überhaupt was läuft --> müssen für unsere zwecke angepasst/ erweitert werden
