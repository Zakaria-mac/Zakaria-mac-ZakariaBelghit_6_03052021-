//Création du routeur pour communiquer avec app.js
const express = require ('express');
const router = express.Router();

//Import du controllers où sont enregistrés les logiques métiers
const sauceCtrl = require('../controllers/sauce');

//Import du middleware qui va sécuriser les routes 
const auth = require('../middleware/auth');

//Import du middleware multer
const multer = require('../middleware/multer-config');


/* IMPLEMENTATION DU CRUD */

router.post('/', auth, multer, sauceCtrl.createSauce);

router.post('/:id/like', auth, multer, sauceCtrl.likeSauce)

router.put('/:id', auth, multer, sauceCtrl.modifySauce);

router.delete('/:id', auth, sauceCtrl.deleteSauce);

router.get('/:id', auth, sauceCtrl.getOneSauce);

router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router