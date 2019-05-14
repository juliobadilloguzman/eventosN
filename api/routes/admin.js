const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdminAuthenticated } = require('../helpers/auth');
const passport = require('passport');
const connection = require('../../database');

router.get('/controlpanel', isAdminAuthenticated, (req, res) => {
    res.render('admin/prueba');
});

router.get('/dashboardU', (req, res) => {

    let query = 'SELECT * from usuarios';

    connection.query(query, (error, rows, fields) => {

        if (!error) {
            res.render('admin/usuarios', { usuarios: rows });
        }

    });


});

router.get('/dashboardE', (req, res) => {

    let query = 'SELECT * from eventos; Select * from lugar';


    connection.query(query, (error, rows, field) => {


        console.log(rows[1]);
        res.render('admin/eventos', { eventos: rows[0], lugares: rows[1] });



    });

});

router.get('/agregarUsuario', (req, res) => {
    res.render('admin/agregarUsuario');
});

router.get('/agregarEvento', (req, res) => {

    let query = 'SELECT * from lugar';

    connection.query(query, (error, rows, field) => {

        if (!error) {
            console.log(rows);
            res.render('admin/agregarEvento', { lugares: rows });
        } else {
            console.log(error);
        }

    });


});

router.get('/editarUsuario/:id', (req, res) => {
    res.render('admin/editarUsuario');
});

module.exports = router;
