// Import du package du chiffrement bcrypt pour la fonction signup - Sécuriser le mot de passe grâce au hash
const bcrypt = require('bcrypt');

//Import du package qui génère des TOKEN et les vérifie 
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
//Crypter grâce au hash le mot de passe
    bcrypt.hash(req.body.password, 10) // on appelle la fonction de hachage bcrypt et lui demande de saler 10 fois le mot de passe
        .then(hash => { // Utilisateur créé suite au hash généré
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save() // Enregistrement de l'utilisateur dans la base de donnée
                .then(() => res.status(201).json({ message : 'Utilisateur créé '}))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //Récupération l'utilisateur de la base de donnée qui correspond à l'adresse e-mail entrée
        .then( user => {
            if (!user){
                return res.status(401).json({ error : "Utilisateur non trouvé" }) // Dans le cas où l'email ne correspond à aucun user
            }
            bcrypt.compare(req.body.password, user.password) // On compare avec la fonction 'compare' de bcrypt le mot de passe entré avec le hash qui est gardé dans la base de donnée
                .then(valid => {
                if (!valid){
                    return res.status(401).json({ error : "Mot de passe incorrecte" }) // Erreur renvoyée si la comparaison n'est pas bonne
                } 
                res.status(200).json({ 
                    userId: user._id,
                    token: jwt.sign( // Encodage d'un nouvea token
                        { userId : user._id }, // le token qui sera généré contient l'ID de l'utilisateur en tant que payload
                        'RANDOM_TOKEN_SECRET_PROJECT_OPENCLASSROOM',
                        { expiresIn: '24h'}
                    )
                }); // Si la comparaison est bonne, on renvoie son userId et un TOKEN d'authentification
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};