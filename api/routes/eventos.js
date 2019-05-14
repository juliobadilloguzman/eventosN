const express = require('express');
const router = express.Router();
const connection = require('../../database');
const passport = require('passport');

router.get('/eventos/:id', (req, res) => {

    const id = req.params.id;

    let query = 'SELECT * from eventos WHERE id = ?';

    connection.query(query, [id], (error, rows, field) => {

        if (!error) {
            res.json(rows);
        }

    });

});
//INSERT
router.post('/eventos', (req, res) => {

    let file = req.files.imagen;
    let img_name = file.name;

    let evento = req.body;

    console.log(evento);

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

        file.mv('public/images/upload_images/' + file.name, function(err) {

            if (err)

                return res.status(500).send(err);
            var sql = "INSERT INTO eventos(titulo, descripcion, fechaRealizacion, imagen, lugar) VALUES(?,?,?,?,?)";

            connection.query(sql, [evento.titulo, evento.descripcion, evento.fechaRealizacion, img_name, evento.lugar], function(err, result) {
                if (!err) {
                    req.flash('success_msg', 'Evento creado satisfactoriamente');
                    res.redirect('/agregarEvento');
                } else {
                    console.log(err);
                }
            });
        });
    }


});

router.patch('/eventos/:id', (req, res) => {


    let evento = req.body;

    const id = req.params.id;

    let query = 'UPDATE eventos SET titulo = ?, descripcion = ?, fechaRealizacion = ?, lugar = ? WHERE id = ?';

    connection.query(query, [evento.titulo, evento.descripcion, evento.fechaRealizacion, evento.lugar, id], (error, rows, fields) => {

        if (error)
            console.log(error);
        else {
            res.json(rows);
            console.log('Evento:' + evento);
        }

    });





});

module.exports = router;