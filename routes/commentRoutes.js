const mongoose = require('mongoose');
const Comment = mongoose.model('comments');

module.exports = (app) => {

    app.get('/api/comment/', async (req, res) => {
        let comments = await Comment.find({radar: req.query.radar});
        return res.status(200).send(comments);
    });
};

