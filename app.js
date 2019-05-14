const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const fileUpload = require('express-fileupload');
var $ = require("jquery");

const IndexRoutes = require('./api/routes/index');
const UsersRoutes = require('./api/routes/usuarios');
const AdminRoutes = require('./api/routes/admin');
const EventosRoutes = require('./api/routes/eventos');

require('./api/config/passport');

///////////////**********Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

///////////////**********Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
})


app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());

///////////////**********Global variables
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');

    res.locals.error_msg = req.flash('error_msg');

    res.locals.error = req.flash('error');
    
    res.locals.usuario = req.user || null;

    next();

});


///////////////ROUTES
app.use('/', IndexRoutes);
app.use('/', UsersRoutes);
app.use('/', AdminRoutes);
app.use('/', EventosRoutes);


///////////////**********Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;