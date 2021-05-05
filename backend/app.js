//Installation du framework Express et import dans le fichier app.js
const  express = require('express');

//Import du bodyParser pour récupérer les données envoyées (POST) sous format JSON
const bodyParser = require('body-parser');

//Import mongoose pour faciliter les interactions avec la base de données MongoDB
const mongoose = require('mongoose');

//Import du router créé 
const sauceRoutes = require('./routes/sauce')

const app = express();

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

// Enregistre le routeur pour toutes les demandes effectuées vers /api/stuff
app.use('/api/stuff', sauceRoutes)



module.exports = app;