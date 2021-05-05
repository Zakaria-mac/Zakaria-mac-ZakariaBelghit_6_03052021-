//Création du routeur pour communiquer avec app.js
const express = require ('express');
const router = express.Router();

//Import du controllers où sont enregistrés les logiques métiers
const sauceCtrl = require('../controllers/sauce');

//Import du middleware qui va sécuriser les routes 
const auth = require('../middleware/auth' )


/* IMPLEMENTATION DU CRUD */

// Méthode pour ajouter une nouvelle ressource/sauce
router.post('/', auth, sauceCtrl.createSauce);

// Méthode qui permet de mettre à jour/modifier un objet sélectionné grâce à son id
router.put('/:id', auth, sauceCtrl.modifySauce);

// Méthode pour supprimer un objet
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Affichage des détails d'une sauce sélectionnée
router.get('/:id', auth, sauceCtrl.getOneSauce);

//Affichage des sauces 
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router