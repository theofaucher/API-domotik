const {urlActionneur,urlCapteur} = require('../models/dbModels');
const mongoose = require('mongoose');
const fs = require('fs')

module.exports = async (io,auth,socket) => {

    const errorFile = fs.readFileSync('./models/errorModels.json', 'utf8')
    const JSONparseErrorFile = JSON.parse(errorFile)

    urlCapteur.findOne({'nom': auth.nom}, (err,capteurConnecte) => { if(capteurConnecte) return socket.emit('err', { "nom": auth.nom, "erreur": JSONparseErrorFile['error_sensor_already_connected'].type + ': ' + JSONparseErrorFile['error_sensor_already_connected'].codeFrancais.replace('${nomCapteur}',auth.nom), "code": JSONparseErrorFile['error_sensor_already_connected'].nom})})

    urlActionneur.find((err,tousLesActionneurs) => {

        tousLesActionneurs.forEach(element1 => {
            
            if(element1.capteurs.find(element => element = auth.nom)){

                io.emit('maj',{"nom": element1.nom, "maj": JSONparseErrorFile['update_sensor_connected'].type + ': ' + JSONparseErrorFile['update_sensor_connected'].codeFrancais.replace('${nomCapteur}',auth.nom), "code": JSONparseErrorFile['update_sensor_connected'].nom})
            }

        })

    })

    let entryCapteur = new urlCapteur({
        
        id: socket.id,
        nom: auth.nom,
    
    })
    
    console.log(`Le capteur ${auth.nom} s'est connecté et entrée dans la BD`)
    await entryCapteur.save()

}