const mongoose = require('mongoose');

const rubriqueSchema = new mongoose.Schema({
    name: { type: String, required: false },
    pays: { type: String, required: false },
    sRubrique: { type: String, required: false },
    data: { type: String, required: false }
});

module.exports = mongoose.model('Rubrique', rubriqueSchema);