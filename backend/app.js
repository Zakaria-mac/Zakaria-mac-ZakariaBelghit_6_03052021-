// Installation du framework Express et import dans le fichier app.js
const  express = require('express');

// Import du bodyParser pour récupérer les données envoyées (POST) sous format JSON
const bodyParser = require('body-parser');

// Import mongoose pour faciliter les interactions avec la base de données MongoDB
const mongoose = require('mongoose');

// Import node pour accéder au path du serveur
const path = require('path');

// Import de Helmet pour sécuriser le framework Express 
const helmet = require('helmet')

// Import de express-rate limiters 
const rateLimit = require ('express-rate-limit')

//Import des routers créés
const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

const app = express();

// Sécure le frameworks Express en mettant en place des Headers spécifiques dans les requêtes HTTP
app.use(helmet());

// Express.req.limit le nombre de tentative de connexion sur l'API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max : 100
});

app.use('/api/', apiLimiter)

mongoose.connect('mongodb+srv://OC_P6:OpenClassroomP6@cluster0.omsnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology:true })
      .then(() => console.log("Connexion à MongoDB réussie"))
      .catch(() => console.log("Connexion à MongoDB échouée"))

/*  Middleware créé pour ajouter les Headers nécessaire pour la requête GET;
    Middleware ne prend pas d'addrese en premier paramètre pour s'appliquer à toutes les routes;
    Permet à toutes les demandes d'accéder à l'API; */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

/*  Requête faite à app.js pour servir la ressource 'images', et indiquer comment répondre aux requêtes envoyées à /images.
    On rend le dossier 'images' statique (grâce au sous-répertoire du répertoire de base __dirname) à chaque fois qu'il 
    reçoit une requête vers la route /images */
app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistre les routeurs pour toutes les demandes effectuées vers /api/sauce et /api/auth
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;