const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const dataSchema = mongoose.Schema({
    _id: String,
    clanName: String,
    player: String,
    guild: String,
})

module.exports = mongoose.models.Data || mongoose.model('Data', dataSchema);