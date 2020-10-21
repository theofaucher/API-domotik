const {urlActionneur, urlCapteur, urlData} = require('../models/dbModels');
const mongoose = require('mongoose');
const fs = require('fs')

module.exports = (io, socket, data) => {

    switch(data.type){
        case 'actionneur':

            urlActionneur.find((err,tousLesActionneurs) => {

                socket.emit('rechercheDonnee', {"nom": data.nom, "valeur": tousLesActionneurs})

            })

            break;

        case 'capteur':

                break;   

    }

}