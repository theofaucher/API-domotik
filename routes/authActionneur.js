const {urlActionneur, urlCapteur} = require('../models/dbModels');
const mongoose = require('mongoose');
const fs = require('fs')

module.exports = async (io,auth,socket) => {

    const errorFile = fs.readFileSync('./models/errorModels.json', 'utf8')
    const JSONparseErrorFile = JSON.parse(errorFile)

    urlActionneur.findOne({'nom': auth.nom}, (err,actionneurConnecte) => { if(actionneurConnecte) return socket.emit('err', { "nom": auth.nom, "erreur": JSONparseErrorFile['error_operator_already_connected'].type + ': ' + JSONparseErrorFile['error_operator_already_connected'].codeFrancais.replace('${nomActionneur}',auth.nom), "code": JSONparseErrorFile['error_operator_already_connected'].nom})})

    let entryActionneur = new urlActionneur({
        
        id: socket.id,
        nom: auth.nom,
        capteurs: auth.capteurs
    
    })

    if(!entryActionneur.capteurs == undefined)
    {

        entryActionneur.capteurs.forEach(element => {
        
            urlCapteur.findOne({'nom': element}, (err,capteurConnecte) => { 
        
                if(!capteurConnecte) {
             
                    socket.emit('maj',{"nom": element1.nom, "erreur": JSONparseErrorFile['warning_sensor_not_connected'].type + ': ' + JSONparseErrorFile['warning_sensor_not_connected'].codeFrancais.replace('${nomCapteur}',auth.nom), "code": JSONparseErrorFile['warning_sensor_not_connected'].nom})

                }
        
            });

        });

    }

    console.log(`L'actionneur ${auth.nom} s'est connecté et entrée dans la BD`)
    await entryActionneur.save()

}