const { connect, connection } = require('mongoose');

const { config } = require('dotenv');

module.exports = () => {
    config();
    const uri = process.env.DB_URI;

    connect(uri, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch(() => console.log("Connexion à MongoDB échouée"))

    connection.on('disconnected', () => {
        console.log('Mongoose déconnecté')
    })

    process.on('SIGINT', () => {
        connection.close(() =>{
            console.log("Mongoose s'est déconnecté du serveur");
            process.exit(0)
        })
    })

}