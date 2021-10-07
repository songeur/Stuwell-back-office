const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ user_login, user_pass }) {
    const user = await User.findOne({ user_login });
    if (user && bcrypt.compareSync(user_pass, user.user_pass)) {
        const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    console.log("when creation a user ", userParam);
    if (await User.findOne({ user_login: userParam.user_login })) {
        throw `Nom d'utilisateur ` + userParam.user_login + ` existant`;
    }

    const user = new User(userParam);
    // hash user_pass
    if (userParam.user_pass) {
        user.user_pass = bcrypt.hashSync(userParam.user_pass, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'Utilisateur non trouvé';
    if (user.user_login !== userParam.user_login && await User.findOne({ user_login: userParam.user_login })) {
        throw `Nom d'utilisateur ` + userParam.user_login + ` existant`;
    }

    // hash user_pass if it was entered
    if (userParam.user_pass) {
        userParam.user_pass = bcrypt.hashSync(userParam.user_pass, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}