const express = require('express');
const router = express.Router();
const rubriqueService = require('./rubrique.service');

// routes
router.get('/', getAll);
router.post('/create', create);
router.delete('/:id', _delete);
// router.get('/current', getCurrent);
// router.get('/:id', getById);
// router.put('/:id', update);

module.exports = router;

function create(req, res, next) {
    rubriqueService.createSousRubrique(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    rubriqueService.getAllSousRubrique()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    rubriqueService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    rubriqueService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    rubriqueService.updateSousRubrique(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    rubriqueService.deleteSousRubrique(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}