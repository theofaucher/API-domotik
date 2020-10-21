const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs')

let pieces = ['salon','chambre','entree','cuisine','salledebain']

require('./startup/DBclearCapteur&Actionneur')()
require('./startup/dbConnect')()

const errorFile = fs.readFileSync('./models/errorModels.json', 'utf8')
const JSONparseErrorFile = JSON.parse(errorFile)

io.on('connection', async function(socket){

    socket.on('auth', (auth) => {

        const authName = auth.nom.split('_')[0]
        const authPiece = auth.nom.split('_')[1]

        if(!auth.type && !auth.nom) return socket.emit('err',{"nom": auth.nom, "erreur": JSONparseErrorFile['error_empty_form'].type + ': ' + JSONparseErrorFile['error_empty_form'].codeFrancais.replace('${nomCapteur}',auth.nom), "code": JSONparseErrorFile['error_empty_form'].nom})
        if(auth.type != 'actionneur' && auth.type != 'capteur') return  socket.emit('err',{"nom": auth.nom, "erreur": JSONparseErrorFile['error_unknow_type'].type + ': ' + JSONparseErrorFile['error_unknow_type'].codeFrancais.replace('${nomCapteur}',auth.nom), "code": JSONparseErrorFile['error_unknow_type'].nom})
        if(!pieces.find(element=> element == authPiece)) return socket.emit('err',{"nom": auth.nom, "erreur": JSONparseErrorFile['error_unknow_piece'].type + ': ' + JSONparseErrorFile['error_unknow_piece'].codeFrancais.replace('${nomCapteur}',auth.nom), "code": JSONparseErrorFile['error_unknow_piece'].nom})

        if(auth.type == "actionneur") require('./routes/authActionneur')(io, auth, socket)
        else if (auth.type == "capteur") require('./routes/authCapteur')(io, auth, socket)

    })

    socket.on('capteurs', (data) => require('./routes/autoEmit')(io, socket, data))
    socket.on('rechercheDonnee', (data) => require('./routes/searchData')(io, socket, data))

    socket.on('disconnect', () => require('./routes/disconnect')(io, socket))

})


const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server running on ${PORT}`))