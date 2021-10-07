require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(express.static(path.join(__dirname, './dist/stuwel-frontend-app')));
// api routes
app.use(jwt());
app.use('/api/users', require('./users/users.controller'));
app.use('/api/article', require('./article/article.controller'));
app.use('/api/rubrique', require('./rubrique/rubrique.controller'));
app.use('/api/sous-rubrique', require('./rubrique/sous-rubrique.controller'));
app.use('/api/acteur', require('./acteur/acteur.controller'));
app.use('/api/temoignage', require('./temoignage/temoignage.controller'));

// global error handler
app.use(errorHandler);




// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 4000;

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
