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

