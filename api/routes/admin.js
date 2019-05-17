const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdminAuthenticated } = require('../helpers/auth');
const passport = require('passport');
const connection = require('../../database');

router.get('/controlpanel', isAdminAuthenticated, (req, res) => {
    res.render('admin/prueba');
});

router.get('/dashboardU', isAdminAuthenticated, (req, res) => {

    let query = 'SELECT * from usuarios';

    connection.query(query, (error, rows, fields) => {

        if (!error) {
            res.render('admin/usuarios', { usuarios: rows });
        }

    });


});

router.get('/dashboardE', isAdminAuthenticated, (req, res) => {

    let query = 'SELECT * from eventos; Select * from lugar';


    connection.query(query, (error, rows, field) => {


        console.log(rows[1]);
        res.render('admin/eventos', { eventos: rows[0], lugares: rows[1] });



    });

});

router.get('/agregarUsuario', isAdminAuthenticated, (req, res) => {
    res.render('admin/agregarUsuario');
});

router.get('/agregarEvento', isAdminAuthenticated, (req, res) => {

    let query = 'SELECT * from lugar; SELECT * from categoria';

    connection.query(query, (error, rows, field) => {

        if (!error) {



            console.log(rows);
            res.render('admin/agregarEvento', { lugares: rows[0], categorias: rows[1] });
        } else {
            console.log(error);
        }

    });


});


module.exports = router;