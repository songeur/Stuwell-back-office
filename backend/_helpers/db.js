const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose.connect(process.env.MONGODB_ADDON_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Article: require('../article/article.model'),
    Rubrique: require('../rubrique/rubrique.model'),
    sRubrique: require('../rubrique/sous-rubrique.model'),
    Acteur: require('../acteur/acteur.model'),
    Temoignage: require('../temoignage/temoignage.model')
};