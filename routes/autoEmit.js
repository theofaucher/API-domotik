const mongoose = require('mongoose')
const {urlActionneur, urlCapteur, urlData} = require('../models/dbModels')
const fs = require('fs')

const errorFile = fs.readFileSync('./models/errorModels.json', 'utf8')
const JSONparseErrorFile = JSON.parse(errorFile)

module.exports = async (io, socket, data) => {

    if(!data.valeur && data.valeur == 0 || !data.nom) return io.emit('err',{"nom": data.nom, "erreur": JSONparseErrorFile['error_empty_data'].type + ': ' + JSONparseErrorFile['error_empty_data'].codeFrancais.replace('${nomCapteur}',data.nom), "code": JSONparseErrorFile['error_empty_data'].nom})
    console.log(`Valeur reçu ${data.valeur} de la part de ${data.nom}`)

    let entryData = new urlData({
        
        nom: data.nom,
        valeur: data.valeur
    
    })

    urlActionneur.find((err,tousLesActionneurs) => {

        tousLesActionneurs.forEach(element1 => {
        
            if(element1.capteurs.find(element => element = data.nom)){

                entryData.save()
                io.emit('actionneurs',{"nom": element1.nom, "capteur":data.nom, "valeur": data.valeur})

            }

        })
        
    })
    
}