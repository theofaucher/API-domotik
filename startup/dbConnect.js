#!/usr/bin/env node

require('dotenv').config()
const mongoose = require('mongoose');

module.exports = function () {
    const dbURI = "mongodb://localhost:27017/domotik?retryWrites=true&w=majority"//process.env.DB_URI;
    mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log(`Connected to MongoDB, URL = ${dbURI}...`))
        .catch(err => console.error('Failed to connect to MongoDB...'))
}