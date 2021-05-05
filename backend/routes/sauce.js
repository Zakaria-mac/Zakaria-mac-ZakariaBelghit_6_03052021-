//Création du routeur pour communiquer avec app.js
const express = require ('express');
const router = express.Router();

//Import du controllers où sont enregistrés les logiques métiers
const sauceCtrl = require('../controllers/sauce')


/* IMPLEMENTATION DU CRUD */

router.post('/', sauceCtrl.createSauce);

// Méthode updateOne() qui permet de mettre à jour/modifier un objet sélectionné grâce à son id
router.put('/:id', (req, res, next) => {
    Sauce.updateOne({  _id: req.params.id }, { ...req.body, _id })
        .then(() => res.status(200).json({ message : 'Objet modifé'}))
        .catch(error => res.status(400).json({ error }))
})

// Méthode delete() pour supprimer un objet
router.delete('/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message : 'Objet supprimé '}))
        .catch(error => res.status(400).json({ error }))
})

//Affichage des détails d'une sauce sélectionnée
router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
})

//Affichage des sauces 
router.get('/', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
});

module.exports = router