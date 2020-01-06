const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// IMPORT MODELS
require('./models/comment');
require('./models/user');

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.ini');
var password = properties.get('main.password');
var username = properties.get('main.username');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || ('mongodb+srv://' + username + ':' + password + '@techradarhtw-tdfaj.mongodb.net/test'));

app.use(bodyParser.json());
app.use(cors());


//IMPORT ROUTES
require('./routes/commentRoutes')(app);
require('./routes/userRoutes')(app);


// TODO bisher soweit ich das sehe gar nicht genutzt, entweder entfernen oder config setzen
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});