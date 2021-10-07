const mongoose = require('mongoose');

const sRubriqueSchema = new mongoose.Schema({
    name: { type: String, required: false }
});

module.exports = mongoose.model('Sous-Rubrique', sRubriqueSchema);