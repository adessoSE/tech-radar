const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    autor: String,
    text: String,
    meinung: String,
    zeit: String,
    technologie: String,
    radar: String,
});

mongoose.model('comments', commentSchema);


//TODO schema muss an unsere zwecke noch weiter angepasst werden --> zeit sollte klein string sein, meinung vermutlich sowas wie ein enum und radar auch