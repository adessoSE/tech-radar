const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name : String,
    email: String,
    passwort: String,
    rolle: String,
});

mongoose.model('users', userSchema);

//ToDO Passwort eventuell verschlüsselt speichern?? Rolle als enum (User/Admin)