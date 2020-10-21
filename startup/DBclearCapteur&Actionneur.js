const {urlCapteur, urlActionneur} = require('../models/dbModels');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = async () => {

    await urlActionneur.deleteMany()
    await urlCapteur.deleteMany()
}