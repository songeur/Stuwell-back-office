const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Temoignage = db.Temoignage;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Temoignage.find();
}

async function getById(id) {
    return await Temoignage.findById(id);
}

async function create(temoignageParam) {
    const temoignage = new Temoignage({ data: temoignageParam.dataTemoignage });
    // save temoignage
    await temoignage.save();
}

async function _delete(id) {
    await Temoignage.findByIdAndRemove(id);
}

async function update(id, param) {
    const temoignage = await Temoignage.findById(id);
    // validate
    if (!temoignage) throw 'Témoignage non trouvé';
    Object.assign(temoignage, param);
    await temoignage.save();
}

