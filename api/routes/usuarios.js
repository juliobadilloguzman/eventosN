const express = require('express');
const router = express.Router();
const connection = require('../../database');
const passport = require('passport');
const { isAdminAuthenticated } = require('../helpers/auth');
const path = require('path');
const nodemailer = require('nodemailer');


router.get('/login', (req, res) => {
    res.render('users/login');
});


router.post('/login', passport.authenticate('local-general', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {



        let redirectTo = '/'; // Set default redirect value
        let redirectToU = '/';
        if (req.session.reqUrl) {
            redirectTo = req.session.reqUrl; // If our redirect value exists in the session, use that.
            req.session.reqUrl = null; // Once we've used it, dump the value to null before the redirect.
        };

        res.redirect(redirectTo);
    });


router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/usuarios', (req, res) => {

    let query = 'SELECT * from usuarios';

    connection.query(query, (error, rows, field) => {

        res.json(rows);

    });

});

router.get('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    let query = 'SELECT * from usuarios WHERE id = ?';

    connection.query(query, [id], (error, rows, field) => {

        res.json(rows);

    });

});

router.delete('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    let query = 'DELETE FROM usuarios WHERE id = ?';

    connection.query(query, [id], (error, rows, field) => {

        res.json(rows);

    });

});

router.patch('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    var usuario = req.body;

    console.log(usuario);

    let query = 'UPDATE usuarios SET nombre = ?, usuario = ?, password = ?, usuarioActivo = ?, rol = ? WHERE id = ?';

    connection.query(query, [usuario.nombre, usuario.usuario, usuario.password, usuario.usuarioActivo, usuario.rol, id], (error, rows, field) => {

        if (!error) {
            req.flash('success_msg', 'Usuario actualizado satisfactoriamente');
            res.redirect('/dashboardU');
        }

    });

});

router.post('/usuarios/agregarUsuario', (req, res) => {

    let usuario = req.body;

    let query = 'INSERT INTO usuarios SET ?';

    connection.query(query, [usuario], (error, rows, field) => {

        if (!error) {
            req.flash('success_msg', 'Cuenta creada satisfactoriamente');
            res.redirect('/agregarUsuario');
        } else {
            res.json({
                error: error
            });
        }

    });


});

router.post('/signup', (req, res, next) => {

    const { nombre, nombreUsuario, password } = req.body;
    const errors = [];
    const usuarioActivo = 'Y';
    const accesoIntentos = 0;
    const rol = 'U';

    const data = {
        nombre: nombre,
        usuario: nombreUsuario,
        password: password,
        usuarioActivo: usuarioActivo,
        accesoIntentos: accesoIntentos,
        rol: rol
    }

    console.log(data);


    if (nombre.length <= 0) {
        errors.push({ mensaje: 'El nombre no puede estar vacio' });
    }

    if (password.length <= 0) {
        errors.push({ mensaje: 'La contraseña no puede estar vacia' });
    }

    if (password.length < 5) {
        errors.push({ mensaje: 'La contraseña debe ser mayor a 4 digitos' });
    }

    let queryVerify = "SELECT * from usuarios WHERE usuario = ?";

    connection.query(queryVerify, [nombreUsuario], (error, rows, field) => {

        if (rows.length > 0) {
            errors.push({ mensaje: 'El nombre de usuario ya esta en uso' });
        }

        //si hay errores
        if (errors.length > 0) {
            res.render('users/signup', { errors, nombre, nombreUsuario, password });
        } else {

            let query = 'INSERT INTO usuarios SET ?';

            connection.query(query, [data], (error, rows, field) => {
                if (!error) {
                    req.flash('success_msg', 'Cuenta creada satisfactoriamente');
                    res.redirect('/login');
                }
            });

        }



    });



});

router.post('/enviar', (req, res) => {

    let correo = req.body;

    let smtpTransport = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            user: "correpsss@gmail.com",
            pass: "pass233"
        }
    });

    let mailOptions = {
        from: "Team <correpsss@gmail.com>",
        to: correo.email,
        subject: correo.asunto,
        text: correo.texto
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
    });


});


module.exports = router;