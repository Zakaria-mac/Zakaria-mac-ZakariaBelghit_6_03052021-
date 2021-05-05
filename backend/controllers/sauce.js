/* Enregistrement de la logique métier placés dans routes pour simplifier la lecture des routes */

//Import du modèle sauce créé dans le dossier models/Sauce.js
const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    /* On enlève le champs id du corps de la requête avant de copier l'objet */
    delete req.body._id;
    /* Création d'une nouvelle instance du modèle Sauce */
    const sauce = new Sauce({
        ...req.body
   }); 
   /* Utilisation de la méthode save() qui enregistre l'objet Sauce dans la base de données et retourne un Promise */
   sauce.save()
    .then(() => res.status(201).json({ message : 'Object enregistré'}))
    .catch(error => res.status(400).json({ error }));
};

