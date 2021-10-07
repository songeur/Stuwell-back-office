const express = require('express');
const router = express.Router();
const temoignageService = require('./temoignage.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.delete('/:id', _delete);
router.put('/:id', update);
// router.get('/current', getCurrent);

module.exports = router;

function create(req, res, next) {
    temoignageService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    temoignageService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    temoignageService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    temoignageService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    temoignageService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    temoignageService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
