const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Rubrique = db.Rubrique;
const sRubrique = db.sRubrique;


module.exports = {
    getAll,
    getAllSousRubrique,
    getById,
    createRubrique,
    createSousRubrique,
    updateRubrique,
    deleteRubrique,
    deleteSousRubrique
};

async function getAll() {
    return await Rubrique.find();
}

async function getAllSousRubrique() {
    return await sRubrique.find();
}

async function getById(id) {
    return await Rubrique.findById(id);
}

async function createRubrique(rubriqueParam) {
    let rubrique = new Rubrique({
        name: rubriqueParam.name, pays: rubriqueParam.pays, sRubrique: rubriqueParam.sRubrique
        , data: rubriqueParam.data
    });
    // save rubrique
    await rubrique.save();
}

async function createSousRubrique(sRubriqueParam) {
    let rubrique = new sRubrique({ name: sRubriqueParam.dataSRubrique });
    // save rubrique
    await rubrique.save();
}

async function deleteSousRubrique(id) {
    await sRubrique.findByIdAndRemove(id);
}

async function updateRubrique(id, param) {
    const rubrique = await Rubrique.findById(id);
    // validate
    if (!rubrique) throw 'Rubrique non trouvé';
    Object.assign(rubrique, param);
    await rubrique.save();
}

async function deleteRubrique(id) {
    await Rubrique.findByIdAndRemove(id);
}