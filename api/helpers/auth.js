const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Acceso no autorizado');
    res.redirect('/login');
}

helpers.isAdminAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Acceso no autorizado');
    res.redirect('/');
}

helpers.isValidUsername = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'El usuario ya existe');
    res.redirect('/signup');
}

module.exports = helpers;