const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const linkSchema = mongoose.Schema({
    _id: String,
    steamId: Number,
    guild: String,
})

module.exports = mongoose.models.Link || mongoose.model('Link', linkSchema);