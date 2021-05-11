const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const User = require('./User');

const sauceSchema = mongoose.Schema({
    userId : { type: String, required: true },   /* Identifiant MongoDB pour l'utilisateur qui a créé la sauce */
    name : { type: String, required: true },     /* Nom de la sauce */
    manufacturer : { type: String, required: true }, /* Nom de la sauce */
    description : { type: String, required: true }, /* Description de la sauce */
    mainPepper : { type: String, required: true }, /* Principal ingrédient dans la sauce */
    imageUrl : { type: String, required: true }, /* Lien de l'image de la sauce téléchargée par l'utilisateur */
    heat : { type: Number, required: true }, /* Nombre entre 1 et 10 décrivant la sauce */ 
    likes : { type: Number, required: true }, /* Nombre d'utilisateurs qui aiment la sauce */ 
    dislikes : { type: Number, required: true }, /* Nombre d'utilisateurs qui n'aiment pas la sauce */
    usersLiked : [{ type: ObjectId, ref : "User" }], /* Tableau d'identifiants d'utilisateurs ayant aimé la sauce */
    usersDisliked : [{ type: ObjectId, ref : "User" }], /* Tableau d'identifiants d'utilisateurs ayant aimé la sauce */
});

module.exports = mongoose.model('Sauce', sauceSchema);