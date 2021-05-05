//Création du routeur pour communiquer avec app.js
const express = require ('express');
const router = express.Router();

//Import du controllers où sont enregistrés les logiques métiers
const sauceCtrl = require('../controllers/sauce')


/* IMPLEMENTATION DU CRUD */

// Méthode pour ajouter une nouvelle ressource/sauce
router.post('/', sauceCtrl.createSauce);

// Méthode qui permet de mettre à jour/modifier un objet sélectionné grâce à son id
router.put('/:id', sauceCtrl.modifySauce);

// Méthode pour supprimer un objet
router.delete('/:id', sauceCtrl.deleteSauce);

//Affichage des détails d'une sauce sélectionnée
router.get('/:id', sauceCtrl.getOneSauce);

//Affichage des sauces 
router.get('/', sauceCtrl.getAllSauces);

module.exports = router