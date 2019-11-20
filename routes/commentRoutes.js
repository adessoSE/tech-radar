const mongoose = require('mongoose');
const Comment = mongoose.model('comments');

module.exports = (app) => {

    app.get('/api/comment/', async (req, res) => {
        console.log(req.query.radar); // TODO remove
        let comments = await Comment.find({radar: req.query.radar});
        return res.status(200).send(comments);
    });
};

//TODO bisher nur beispiel endpoints, um zu testen, dass überhaupt was läuft --> müssen für unsere zwecke angepasst/ erweitert werden
