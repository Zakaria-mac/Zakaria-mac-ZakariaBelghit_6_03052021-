const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv').config()

module.exports = (req, res, next) => {
    try{ 
        const checkToken = process.env.DB_JWT_TOKEN
        const token = req.headers.authorization.split(' ')[1]; // On récupère le deuxième élément du tableau renvoyé par split : token
        const decodedToken = jwt.verify(token, checkToken); //On décode et vérifie le token
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable';
        }else {
            next();
        }
    } catch(error){
        res.status(401).json({ error : error | 'Requête non authentifiée'})
    }
}