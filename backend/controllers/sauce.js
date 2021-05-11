/* Enregistrement de la logique métier placés dans routes pour simplifier la lecture des routes */

/* Import du modèle sauce créé dans le dossier models/Sauce.js */
const Sauce = require('../models/Sauce');

/* Import de fileSystem de node pour avoir accès aux différentes opérations liées au système de fichier */
const fs = require('fs');
const { resolveSoa } = require('dns');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    /* On enlève le champs id du corps de la requête avant de copier l'objet */
    delete sauceObject._id;

    /* Création d'une nouvelle instance du modèle Sauce */
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,//récupération des segments url de l'image --> Pour aiguiller le front-end
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []  
   }); 

   /* Utilisation de la méthode save() qui enregistre l'objet Sauce dans la base de données et retourne un Promise */
    sauce.save()
        .then(() => res.status(201).json({ message : 'Objet enregistré'}))
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
        console.log(req.body)
    Sauce.findOne({  _id: req.params.id })

    .then(sauce => {
        if (req.body.like === -1 && ! sauce.usersDisliked.includes(req.body.userId)){
            sauce.usersDisliked.push(req.body.userId)
            sauce.dislikes += 1
        } else if (req.body.like === 1 && ! sauce.usersLiked.includes(req.body.userId)){
            sauce.usersLiked.push(req.body.userId)
            sauce.likes += 1
        } else {
            if (sauce.usersDisliked.includes(req.body.userId)){
               sauce.dislikes -=1 
            }
            if (sauce.usersLiked.includes(req.body.userId)){
                sauce.likes -=1
            }        
            sauce.usersLiked = sauce.usersLiked.filter((item) => console.log(item) || item.toString() !== req.body.userId )
            sauce.usersDisliked = sauce.usersDisliked.filter((item) => item.toString() !== req.body.userId )
            console.log(sauce.usersLiked)
        }
        return sauce.save()
    })
    
        .then(() => res.status(201).json({ message : 'Objet liké'}))
        .catch(error => res.status(400).json({ error }))   
};
            
exports.modifySauce = (req, res, next) => {
    /* On vérifie s'il y un fichier file dans la base de données avec ? */
    const sauceObject = req.file ?
    /* Si oui, on récupére la chaine de caractère et utilise JSON.parse pour avoir toutes les informations sur l'objet qui sont dans cette partie de la requête */
        {
            ...JSON.parse(req.body.sauce),

            /* Et on génère la nouvelle image URL - Une nouvelle image qui va venir modifier l'ancienne */
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body}; /* Ou sinon, on prend simplement le corps de la requête avec { ...req.body}; */
    Sauce.updateOne({  _id: req.params.id }, { ...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({ message : 'Objet modifé'}))
        .catch(error => res.status(400).json({ error }))
};

exports.deleteSauce = (req, res, next) => {
    /* On trouve l'objet que l'on souhaite supprimer dans la base de données */
    Sauce.findOne({ _id: req.params.id }) 
        .then(sauce => {
            /* Une fois trouvé, on extrait le nom du fichier à supprimer grâce à split */
            const filename = sauce.imageUrl.split('/images/')[1]; 
            /* Utilisation de la fonction 'unlink' pour supprimer un fichier */
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message : 'Objet supprimé '}))
                    .catch(error => res.status(400).json({ error }))
            }) 
        })
        .catch(error => res.status(500).json({ error }));
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
};
