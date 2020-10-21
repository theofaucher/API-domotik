const {urlActionneur, urlCapteur} = require('../models/dbModels');
const mongoose = require('mongoose');
const fs = require('fs')

module.exports = async (io,socket) => {

    let actionneurConnecte = await urlActionneur.findOne({

        id: socket.id

    })

    let capteurConnecte = await urlCapteur.findOne({

        id: socket.id

    })

    if(capteurConnecte) {

        const errorFile = fs.readFileSync('./models/errorModels.json', 'utf8')
        const JSONparseErrorFile = JSON.parse(errorFile)
        
        urlActionneur.find((err,tousLesActionneurs) => {

            tousLesActionneurs.forEach(element1 => {
            
                if(element1.capteurs.find(element => element = capteurConnecte.nom)){
    
                    io.emit('maj',{"nom": element1.nom, "maj": JSONparseErrorFile['warning_sensor_disconnected'].type + ': ' + JSONparseErrorFile['warning_sensor_disconnected'].codeFrancais.replace('${nomCapteur}',capteurConnecte.nom), "code": JSONparseErrorFile['warning_sensor_disconnected'].nom})

                }

            })
            
        })

        urlCapteur.deleteOne(capteurConnecte)
        .then(() => console.log(`Le capteur ${capteurConnecte.nom} deconecté et supprimé de la DB`))
        .catch((error) => console.log(error))

    }
    else if(actionneurConnecte) urlActionneur.deleteOne(actionneurConnecte)
        .then(() => console.log(`L'actionneur ${actionneurConnecte.nom} deconnecté et supprimé de la DB`))
        .catch((error) => console.log(error))
    else return

}