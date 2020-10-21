const mongoose = require('mongoose');
    
const datalSchema = new mongoose.Schema({
    nom: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    valeur: {
         
    }
}, {

    collection : 'collectionDomotik'

});

const capteurSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nom: {
        type: String
    }
}, {

    collection : 'collectionCapteur'

}); 

const actionneurSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nom: {
        type: String
    },
    capteurs: {
        type: Array
    }
}, {

    collection : 'collectionActionneur'

}); 

const urlData = mongoose.model('urlData', datalSchema);
const urlCapteur = mongoose.model('urlCapteur', capteurSchema);
const urlActionneur = mongoose.model('urlActionneur', actionneurSchema);

module.exports = {
    urlData,
    urlCapteur,
    urlActionneur
}