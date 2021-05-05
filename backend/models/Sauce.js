const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : { type: String, required: true },   /* Identifiant MongoDB pour l'utilisateur qui a créé la sauce */
    name : { type: String, required: true },     /* Nom de la sauce */
    manufacturer : { type: String, required: true }, /* Nom de la sauce */
    description : { type: String, required: true }, /* Description de la sauce */
    mainPepper : { type: String, required: true }, /* Principal ingrédient dans la sauce */
    imageUrl : { type: String, required: true }, /* Lien de l'image de la sauce téléchargée par l'utilisateur */
    heat : { type: Number, required: true }, /* Nombre entre 1 et 10 décrivant la sauce */ 
    likes : { type: Number, required: true }, /* Nombre d'utilisateurs qui aiment la sauce */ 
    dislikes : { type: Number}, /* Nombre d'utilisateurs qui n'aiment pas la sauce */
    usersLiked : { type: [String], default: undefined }, /* Tableau d'identifiants d'utilisateurs ayant aimé la sauce */
    usersDisliked : { type: [String], default: undefined }, /* Tableau d'identifiants d'utilisateurs ayant aimé la sauce */
});

module.exports = mongoose.model('Sauce', sauceSchema);