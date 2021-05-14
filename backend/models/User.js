const mongoose = require ('mongoose');

/* Ajout du validateur comme plug-in au schema (package de validation pour pré-valider les infos avant de les enregistrer).
 -> Obj : avoir un à chaque fois un email unique */

const uniqueValidator = require ('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email : { type : String, required : true, unique: true },
    emailMasked : { type : String, required : true, unique: true },
    password : { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);