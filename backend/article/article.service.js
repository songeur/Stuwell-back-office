const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Article = db.Article;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Article.find();
}

async function getById(id) {
    return await Article.findById(id);
}

async function create(articleParam) {
    const article = new Article({ data: articleParam.dataArticle });
    // save article
    await article.save();
}

async function update(id, userParam) {
    const article = await Article.findById(id);

    // validate
    if (!article) throw 'User not found';
    if (article.username !== userParam.username && await Article.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(article, userParam);

    await article.save();
}

async function _delete(id) {
    await Article.findByIdAndRemove(id);
}