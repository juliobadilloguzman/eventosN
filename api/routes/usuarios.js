const express = require('express');
const router = express.Router();
const connection = require('../../database');
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local-general', {
    successRedirect: '/controlpanel',
    failureRedirect: '/login',
    failureFlash: true
}));

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
});

module.exports = router;