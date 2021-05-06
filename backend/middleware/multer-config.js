//Import de multer
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Création d'objet configuration pour mutler pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
    //indication à multer d'enregistrer les fichiers dans 'images'
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //récupération du nom du fichier en supprimant les espaces par un underscore
        const name = file.originalname.split(' ').join('_');
        //création de l'extension du fichier grâce au dictionnaire créé MIME_TYPES:
        const extension = MIME_TYPES[file.mimetype];
        //callback avec l'ajout d'un timestamp Date.now() pour rendre le fichier unique
        callback(null, name + Date.now() + '.' + extension)
    }
});

module.exports = multer({ storage }).single('image');