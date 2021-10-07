const express = require('express');
const router = express.Router();
const acteurService = require('./acteur.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.delete('/:id', _delete);
router.put('/:id', update);

module.exports = router;

function create(req, res, next) {
    acteurService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    acteurService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    acteurService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    acteurService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    acteurService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    acteurService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}