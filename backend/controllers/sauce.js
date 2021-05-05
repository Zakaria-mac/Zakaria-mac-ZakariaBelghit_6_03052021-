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
    .then(() => res.status(201).json({ message : 'Objet enregistré'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({  _id: req.params.id }, { ...req.body, _id })
        .then(() => res.status(200).json({ message : 'Objet modifé'}))
        .catch(error => res.status(400).json({ error }))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message : 'Objet supprimé '}))
        .catch(error => res.status(400).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}
