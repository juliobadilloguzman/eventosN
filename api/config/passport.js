 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
 const connection = require('../../database');

 /*passport.use(new LocalStrategy({
     usernameField: 'userName',

 }, (req, userName, password, done) => {


 }));*/

 passport.use('local-general', new LocalStrategy({

         usernameField: 'username',
         passwordField: 'password',
         passReqToCallback: true // allows us to pass back the entire request to the callback
     },
     function(req, username, password, done) {

         connection.query("SELECT * FROM usuarios WHERE usuario = '" + username + "'", function(err, rows) {
             if (err)
                 return done(err);
             if (!rows.length) {
                 return done(null, false, req.flash('error_msg', 'El usuario no existe.'));
             }

             // if the user is found but the password is wrong
             if (!(rows[0].password == password))
                 return done(null, false, req.flash('error_msg', 'Contraseña invalida.')); // create the loginMessage and save it to session as flashdata

             // all is well, return successful user
             return done(null, rows[0]);

         });

     }));

 passport.use('local-admin', new LocalStrategy({
         usernameField: 'username',
         passwordField: 'password',
         passReqToCallback: true // allows us to pass back the entire request to the callback
     },
     function(req, username, password, done) {

         let rol = 'A';

         connection.query(`SELECT * FROM usuarios WHERE usuario = ${username} and rol = ${rol}`, function(err, rows) {
             if (err)
                 return done(err);
             if (!rows.length) {
                 return done(null, false, req.flash('error_msg', 'Acceso no autorizado'));
             }
             // all is well, return successful user
             return done(null, rows[0]);

         });

     }));



 // used to serialize the user for the session
 passport.serializeUser(function(user, done) {
     done(null, user.id);
 });

 // used to deserialize the user
 passport.deserializeUser(function(id, done) {
     connection.query("select * from usuarios where id = " + id, function(err, rows) {
         done(err, rows[0]);
     });
 });