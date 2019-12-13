const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/to-do-list', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose