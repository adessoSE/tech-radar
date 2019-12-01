const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name : String,
    email: String,
    password: String,
    role: String,
});

mongoose.model('user', userSchema);

//ToDO Passwort eventuell verschlüsselt speichern?? Rolle als enum (User/Admin)