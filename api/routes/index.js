const express = require('express');
const router = express.Router();
const connection = require('../../database');


router.get('/', (req, res) => {

    let query = 'SELECT * FROM categoria; SELECT * from eventos';


    connection.query(query, (error, rows, field) => {



        if (!error) {
            res.render('index.hbs', { categorias: rows[0], eventos: rows[1] });
        } else {
            console.log(error);
        }



    });





});

router.get('/subirImagen', (req, res) => {
    res.render('users/imagen');

});


router.post('/subirImagen', (req, res) => {

    let file = req.files.uploaded_image;
    let img_name = file.name;

    let titulo = 'titulo prueba';
    let descripcion = 'descripcion prueba';
    let fechaRealizacion = '2019-05-12';
    let lugar = 1;

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

        file.mv('public/images/upload_images/' + file.name, function(err) {

            if (err)

                return res.status(500).send(err);
            var sql = "INSERT INTO eventos(titulo, descripcion, fechaRealizacion, imagen, lugar) VALUES(?,?,?,?,?)";

            connection.query(sql, [titulo, descripcion, fechaRealizacion, img_name, lugar], function(err, result) {
                if (!err) {
                    res.redirect('/');
                } else {
                    console.log(err);
                }
            });
        });
    }


});

module.exports = router;