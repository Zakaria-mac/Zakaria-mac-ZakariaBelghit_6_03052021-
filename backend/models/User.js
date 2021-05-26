const mongoose = require ('mongoose');

/* Ajout du validateur comme plug-in au schema (package de validation pour pré-valider les infos avant de les enregistrer).
 -> Obj : avoir un à chaque fois un email unique */

const uniqueValidator = require ('mongoose-unique-validator')
const maskdata = require('maskdata')

const userSchema = mongoose.Schema({
    email : { type : String, required : true, unique: true , get: getMaskEmail},
    password : { type: String, required: true}
});

function getMaskEmail(email){
    return maskdata.maskEmail2(email)
}

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);