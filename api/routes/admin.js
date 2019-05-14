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